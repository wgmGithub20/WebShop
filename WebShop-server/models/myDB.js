var mongoose = require('mongoose')

// 连接数据库
mongoose.connect(
  'mongodb://localhost/shop01',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库连接成功')
    }
  }
)

var Schema = mongoose.Schema

// 创建集合以及字段类型
//轮播图字段
var swipeSchema = new Schema({
  url: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
})

// 新闻字段
var newsSchema = new Schema({
  title: {
    type: String,
  },
  add_time: {
    type: Date,
  },
  summary: {
    type: String,
  },
  click: {
    type: Number,
  },
  img_url: {
    type: String,
  },
  content: {
    type: String,
  },
})

// 新闻评论字段
var commentsSchema = new Schema({
  user_name: {
    type: String,
  },
  add_time: {
    type: Date,
  },
  content: {
    type: String,
  },
})

// 消费者（买家秀模块）字段
var consumerSchema = new Schema({
  user_name: {
    type: String,
  },
  add_time: {
    type: Date,
  },
  content: {
    type: String,
  },
  img: {
    type: Array,
  },
  head: {
    type: String,
  },
})

//商品字段
var goodsSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  sell: {
    type: Number,
  },
  tag: {
    type: String,
  },
  addr: {
    type: String,
  },
  company: {
    type: String,
  },
  type: {
    type: String,
  },
  time: {
    type: String,
  },
  swiper: {
    type: Array,
  },
  detailimages: {
    type: Array,
  },
})

//用户字段
var userSchema = new Schema({
  // 用户名
  name: { type: String },
  // 密码
  pwd: { type: String },
  // 类型
  phone: { type: String },
})

const swipe = mongoose.model('swipes', swipeSchema)
const news = mongoose.model('news', newsSchema)
const comments = mongoose.model('comments', commentsSchema)
const consumers = mongoose.model('consumers', consumerSchema)
const goods = mongoose.model('goods', goodsSchema)
const users = mongoose.model('users', userSchema)

// 导出
module.exports = {
  swipe,
  news,
  comments,
  consumers,
  goods,
  users,
}
