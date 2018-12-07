const express = require(`express`);
const route = express.Router();
const teams = require(`../modules/teams`);
const multer = require(`multer`);
const storage = multer.diskStorage({
    destination: `./public/images/upload`,
    filename: function(req, file, cb) {
        let name = file.originalname.split(`.`);
        cb(null, file.originalname + `-` + Date.now()+"."+name[1]);
    }
});
const upload = multer({ storage: storage});


route.get(`/get`, (req, res) => {
    if (res.locals.userData !== null) {
        teams.getTeams((err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    };

});

route.post(`/create`, upload.single(`teamImg`), (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`){
        const teamName = req.body.teamName;
        const description = req.body.description;
        const imgLink = `/images/upload/` + req.file.filename;
        teams.createTeams(teamName, description, imgLink, (err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    }

});

route.delete(`/:teamId`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
        const teamId = req.params.teamId;
        teams.deleteTeams(teamId, (err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    }

});

route.put(`/edit/:teamId`, (req, res) => {
    if (res.locals.userData !== null && res.locals.userData.group == `admin`) {
        
        const teamId = req.params.teamId;
        const teamName = req.body.teamName;
        
        const description = req.body.description;
        const updateData = {
        };
        if (teamName !== undefined) {
            updateData.name = teamName;
        };
        if (description !== undefined) {
            updateData.description = description;
        };
        
        teams.editTeams(teamId, updateData, (err, data) => {
            if (err) {
                
            } else {
                res.json(data);
            };
        });
    } else {
        res.status(403).end();
    }

})


module.exports = route;
