var express 	= require('express');

var app 		= express();

app.set('views engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('./public'));

app.get('/index',function(req,res){
	res.render('index',{});
})

app.get('/introduce',function(req,res){
	res.render('introduce',{});
})

app.get('/about',function(req,res){
	res.render('about',{});
})

//POST:
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//---------------登陆------------------
app.post('/login',urlencodedParser,function(req,res){
	var username = req.body.username;
 	var password = req.body.password;
 	console.log('----------get post--------');
 	console.log(req.body);
    var LoginDao = require('./dao/LoginDao');
    var loginDao = new LoginDao;

	loginDao.queryuser(username,password,function(result){
		if(result == 0){
			//用户不存在
			res.write('0');
 			res.end();
		}else if(result == 1){
			//密码错误
			res.write('1');
 			res.end();
		}else{
			//登录成功,保存session
			// req.session.username = username;
			// res.write('2');
 		// 	res.end();	
		}
	});

});

//---------------注册--------------------
app.post('/regist',urlencodedParser,function(req,res){
	var username = req.body.username;
    var password = req.body.password;
    var email 	 = req.body.email;

    var RegistDao = require('./dao/RegistDao');
    var registDao = new RegistDao;
	
	registDao.registUser(username,password,email,function(result){
		if(result == 0){
			//用户名被占用
			res.end('0');
		}else{
			//注册成功
			res.end('1');
		}
	});
});

// ----------------注销-----------------------
app.post('/logout',urlencodedParser,function(req,res){
	delete req.session.username;
	res.end('1');
});
app.listen('8088');