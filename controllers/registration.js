var express=require('express');
var asyncValidator=require('async-validator');
var router=express.Router();
var regModel=require.main.require('./models/registration-model');
var regValidation=require.main.require('./Validation_rules/registration_validation');


// Request Handler

router.get('/',function(req,res){
	res.render('registration/index');
});


router.post('/',function(req,res){
	var data={
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		address: req.body.address
	};
	
	var validator = new asyncValidator(regValidation.registration);
	validator.validate(data, function(errors, fields){
		
		console.log(errors);
		console.log('-----------------------------------------------------------');
		console.log(fields);

		if(errors)
		{
			res.render('registration/registration',{errors:errors});
		}
		else
		{
			if(req.body.password==req.body.cpassword)
			{
				regModel.validateUser(data,function(valid)
				{
					if(valid)
					{
						res.redirect('./registration');
					}
					else
					{
						res.redirect('/error');
					}
				});
			}
			else
			{
				res.redirect('./error/error');
			}
		}
	});
});

//Exports

module.exports=router;
