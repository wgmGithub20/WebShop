var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
//使用session先导入session模块



var app = express()

// 设置跨域
app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  // res.set("Access-Control-Allow-Origin", "*");
  // res.set("Access-Control-Allow-Origin", "http://192.168.137.1:8080");
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  res.set("Access-Control-Allow-Credentials", "true");
  // res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Methods", "*");
  // res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  // res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.send(200);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')))

//配置session中间件
app.use(session({
  secret: '12345',// 相当于是一个加密密钥，目的是增加安全性，值可以是任意字符串
  cookie: {maxAge: 1000*60*60*24 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
  saveUninitialized: true,// 强制将未初始化的 session 存储。  默认值是true  建议设置成true
}));


app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
