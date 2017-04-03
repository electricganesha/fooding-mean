var mongoose = require('mongoose');
var Skills = mongoose.model('Skill');

module.exports.skillsGetAll = function(req, res) {

  Skills.find(function(err,skills){
    if(err){ return next(err); }
    res.json(skills);
  });

};

module.exports.skillsGetAllByName = function(req, res) {

  Skills.find(function(err,skills){
    if(err){ return next(err); }

    var temp = [];

    for(var i=0; i<skills.length; i++)
    {
      temp.push(skills[i].name)
    }

    res.json(temp);
  });

};


module.exports.skillsCreate = function(req, res) {

    var newSkill = new Skills(req.body);

    newSkill.save(function(err,newskill){
      if(err){ return next(err);}
      res.json(newskill);
    });
};
