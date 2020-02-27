var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});
router.get('/updateInfo', function(req, res){
	
		
				res.render('home/updateInfo');
			
});
router.post('/updateInfo', function(req, res){

	var users ={
	    id: req.params.id,
		uname: req.body.uname,
		cno:req.body.vendname,
		password:req.body.password,
		type: req.body.type,
		
	};
	
	
	userModel.update(users, function(status){
	 	if(status){
			res.redirect('/home');
		}else{
			console.log(status);
			res.send("hoy na");
		}
	});
});
router.get('/', function(req, res){
	userModel.getByUname(req.cookies['uname'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/viewInfo', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/viewInfo', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			uname: req.body.uname,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/viewInfo');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

module.exports = router;