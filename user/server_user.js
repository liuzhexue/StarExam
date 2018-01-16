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




app.listen('8088');