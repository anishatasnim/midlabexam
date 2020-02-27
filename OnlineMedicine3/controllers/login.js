var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){

	var users ={
		uname: req.body.uname,
		password: req.body.password
	};

	userModel.validate(users, function(status){
	 	if(status){
			res.cookie('uname', req.body.uname);
			userModel.getByType(users,function(result){
				var type = JSON.stringify(result.type.toString());
				
				if(type=='"Admin"'){
					res.redirect('/adminhome');
				}else{
					res.redirect('/home');
				}

				});			
		}
		else{			
			res.redirect('/login');
		}
			
	});
});
router.get('/registration', function(req, res){
	res.render('login/registration');
});
router.post('/registration', function(req, res){

	var users ={
		id: req.params.id,
		uname: req.body.uname,
		cno: req.body.cno,
		password: req.body.password,
		type: req.body.type
	};
	

	userModel.insert(users, function(status){
	 	if(status){
			res.redirect('/login');
		}else{
			console.log(status);
			res.redirect('/registration');
		}
	});
});

module.exports = router;