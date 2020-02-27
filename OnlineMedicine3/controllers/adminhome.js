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

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['uname'], function(result){
		res.render('adminhome/index', {user: result});
	});
});

router.get('/viewInfo', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('adminhome/viewInfo', {userlist: results});
			}else{
				res.redirect('/adminhome');
			}
		});
});
router.get('/addmedicine', function(req, res){
	
		
				res.render('adminhome/addmedicine');
			
});
router.post('/addmedicine', function(req, res){

	var medicines ={
		medid: req.params.medid,
		medname: req.body.medname,
		vendname:req.body.vendname,
		quantity:req.body.quantity,
		genre: req.body.genre,
		
	};
	
	
	userModel.insertMed(medicines, function(status){
	 	if(status){
			res.redirect('/adminhome');
		}else{
			console.log(status);
			res.redirect('/adminhome');
		}
	});
});
router.get('/viewMed', function(req, res){
	
		userModel.getAllMed(function(results){
			if(results.length > 0){
				res.render('adminhome/viewMed', {medicinelist: results});
			}else{
				res.redirect('/adminhome');
			}
		});
});
router.get('/viewCustomer', function(req, res){
	
		userModel.getAllCustomer(function(results){
			if(results.length > 0){
				res.render('adminhome/viewCustomer', {userlist: results});
			}else{
				res.redirect('/adminhome');
			}
		});
});
router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('adminhome/edit', {user: result});
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
				res.redirect('/adminhome/viewInfo');
			}else{
				res.redirect('/adminhome/edit/'+req.params.id);
			}
		});
});

module.exports = router;