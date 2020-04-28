var express = require('express')
//引入svg-captcha实现随机验证码
var svgCaptcha = require('svg-captcha')
const md5 = require('blueimp-md5')
var router = express.Router()
// 导入操作数据库的model
var {
  swipe,
  news,
  comments,
  consumers,
  goods,
  users,
} = require('../models/myDB')

// 轮播图接口
router.get('/api/getlunbo', function (req, res, next) {
  swipe.find(function (err, data) {
    if (err) {
      console.log('查询失败')
    }
    res.json({
      code: 0,
      message: data,
    })
  })
})

//新闻咨询接口
router.get('/api/getnews', function (req, res, next) {
  news.find(function (err, data) {
    if (err) {
      console.log('查询失败')
    }
    res.json({
      code: 0,
      news: data,
    })
  })
})

//新闻详情接口，参数id
router.get('/api/getnewsInfo', function (req, res, next) {
  var id = req.query.id * 1
  news.findOne({ id }, function (err, data) {
    if (err) {
      console.log('查询失败')
    }

    res.json({
      code: 0,
      newsInfo: data,
    })
  })
})

//买家秀列表
router.get('/api/getshow', function (req, res, next) {
  consumers.find(function (err, data) {
    if (err) {
      console.log('查询失败')
    }
    res.json({
      code: 0,
      message: data,
    })
  })
})

//根据id获取商品
router.get('/api/getgoodsbyid', function (req, res, next) {
  var id = req.query.id * 1
  goods.findOne({ id }, function (err, data) {
    if (err) {
      console.log('查询失败')
    } else if (data == null) {
      res.json({
        code: 1, //0表示数据库没有记录
      })
    } else {
      res.json({
        code: 0, //0表示查询成功
        message: data,
      })
    }
  })
})
/* ******************登录相关*********************** */
//图形验证码
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    ignoreChars: '0o1l', //忽略的字母
    noise: 3, //干扰线条数
    color: true, //验证码是否需要五彩颜色
    size: 4, //验证码个数
  })
  req.session.captcha = captcha.text.toLowerCase()

  console.log(req.session.captcha)

  res.type('svg')
  res.send(captcha.data)
})

//密码登录
router.post('/loginByPwd', function (req, res) {
  const name = req.body.name
  const pwd = md5(req.body.pwd)
  const captcha = req.body.captcha.toLowerCase()

  console.log('/login_pwd', name, pwd, captcha, req.session)

  // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
  if (captcha !== req.session.captcha) {
    return res.send({ success:false, msg: '验证码不正确' })
  }
  // 删除保存的验证码
  delete req.session.captcha

  users.findOne({ name }, function (err, user) {
    if (user) {
      //查找到信息则返回
      console.log('findUser', user)
      if (user.pwd !== pwd) {
        res.send({ success:false, msg: '用户名或密码不正确!' })
      } else {
        req.session.userid = user._id
        console.log("登录成功");
        
        res.send({
          success:true,
          data: { _id: user._id, name: user.name, phone: user.phone },
        })
      }
    } else {
      //查找不到则注册并返回
      users.create(
        {
          name,
          pwd,
        },
        function (err,user) {
          if (err) {
            console.log(err)
          }
          console.log('添加成功')
          req.session.userid = user._id
          const data = { _id: user._id, name: user.name }
          //返回数据(新的user)
         console.log(req.session.userid);
         
          res.send({success:true, msg:"登录成功",data })
        }
      )
    }
  })
})


// 根据sesion中的userid, 查询对应的user
router.get('/userinfo', function (req, res) {
  // 取出userid
  const userid = req.session.userid
  // 查询
  users.findOne({ _id: userid }, function (err, user) {
    // 如果没有, 返回错误提示
    if (!user) {
      // 清除浏览器保存的userid的cookie
      delete req.session.userid

      res.send({ success:false, msg: '请先登陆' })
    } else {
      // 如果有, 返回user
      res.send({ success:true, data: user })
    }
  })
})

//退出登录
router.get('/logout', function (req, res) {
  // 清除浏览器保存的userid的cookie
  delete req.session.userid
  // 返回数据
  res.send({ success:true })
})


module.exports = router
