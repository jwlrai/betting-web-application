module.exports = {

    isEmpty: function(data){
        if(typeof(data)!='string') return false;
        else if(data.replace(/\s/g, "")=='') return false;
        return true;
    },
    isNumeric : function(data){
        return typeof(data)==='number';
    },
    isAlphaNumeric: function(data){
        if(typeof(data)!='string') return false;
        return /^[0-9a-z]+$/.test(data);
    },
    isAlphaNumericSpace : function(data){
        if(typeof(data)!='string') return false;
        return /^[0-9a-z\s]+$/.test(data);
    },
    isEmail : function(data){
        return /^\S+@\S+$/.test(data);
    }
}