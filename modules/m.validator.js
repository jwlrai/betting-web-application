module.exports = {
    rules   : [], 
    errors  : [],
    reqData : {},

    // this function sets the rules 
    // @param 
    //     name   : STRING , this is the feild description used for error message,
    //     data   : this is query data,
    //     rules  : STRING, name of the available rules eg: numeric, alphanumericspace.....,
    //     option : STRING, if this param is set it will set property of an reqData, property name will be this param value and property value //  //                   will be query data eg : { @option : @data}
    setRules:function(name,data, rules,option){
       this.rules.push({
           name : name,
           val  : data,
           rule : rules,
           option:option
       });
    },
    getError : function(){     
        const err = this.errors;
        
        return err;
    },
    resetValidation : function(){
        this.errors = [];
        this.reqData = {};
        this.rules = [];
    },
    getData : function(){
        const data = this.reqData;
        
        return data;
    },
    exec:function(){
        for(let i=0; i < this.rules.length; i++){
            let val = this.rules[i].val;
            let rule = this.rules[i].rule.replace(/\s/g, "").split('|');
            let name = this.rules[i].name;
            
            if(val === undefined){
                this.errors.push(`${name} field is required`);
            }
            else{
                for(let j=0; j < rule.length; j++){
                    if(this[rule[j]] === undefined){
                        this.errors.push(`${name} field contains invalid rules`);
                    }
                    else if(!this[rule[j]](val)){
                        this.errors.push(`${name} field contains invalid data`);
                    }
                   
                }
                if(typeof(val) ==='string'){
                    
                    this.reqData[this.rules[i].option] = val.trim();
                }
                else{
                    this.reqData[this.rules[i].option] = val;
                }
            }
           
        }
       return this.errors.length==0;
    },
    alpha : function(data){
      
        if(typeof(data) !='string') return false;
        return /^[a-zA-Z]+$/.test(data);
    },
    empty: function(data){
        return data.replace(/\s/g, "")==='';
        
    },
    numeric : function(data){
        return typeof(data);
        // return /^[0-9]+$/.test(data);
    },
    alphaNumeric: function(data){
        
        if(typeof(data)!='string') return false;
        
        if( this.empty(data) ) return false;
        return /^[0-9a-zA-Z]+$/.test(data);
    },
    alphaNumericSpace : function(data){
        if(typeof(data)!='string') return false;
        if( this.empty(data) ) return false;
        return /^[0-9a-zA-Z\s]+$/.test(data);
    },
    email : function(data){
        if(typeof(data)!='string') return false;
        if( this.empty(data) ) return false;
        return /^\S+@\S+$/.test(data);
    },
    istring : function(data){
        return typeof(data)=='string';
    }
}