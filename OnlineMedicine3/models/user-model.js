var db = require('./db');

module.exports= {
	getById : function(id, callback){
		var sql = "select * from users where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getByType : function(user, callback){
		var sql = "select * from users where uname=? and password=?";
		db.getResults(sql, [user.uname,user.password], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from users";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllMed : function(callback){
		var sql = "select * from medicines";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllCustomer : function(callback){
		var sql = "select * from users where type='Customer'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validate: function(users, callback){
		var sql ="SELECT * FROM users where uname=? and password=?";
		db.getResults(sql, [users.uname, users.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from users where uname=?";
		db.getResults(sql, [uname], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(users, callback){
		var sql = "insert into users values(?,?,?,?,?)";
		db.execute(sql, [null, users.uname, users.cno, users.password, users.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(users, callback){
		var sql = "update users set uname=?,cno=?, password=?, type=? where id=?";
		db.execute(sql, [users.uname,users.cno, users.password, users.type, users.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from users where id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertMed: function(medicines, callback){
		var sql = "insert into medicines values(?,?,?,?,?)";
		db.execute(sql, [null, medicines.medname,medicines.vendname,medicines.quantity, medicines.genre], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    }
	}