// pages/movieList/movieList.js
let utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top250: { movies: [], columnInfo: { name: "TOP250", id: "top250" } },
    theaters: { movies: [], columnInfo: { name: "影院热映", id: "theaters" } },
    comingSoon: { movies: [], columnInfo: { name: "即将上映", id: "comingSoon" } }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadTheatersInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '电影',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadTheatersInfo(){
    let url = "/v2/movie/top250"
    utils.doubanFetch(url).then(data=>{
      console.log(data)
    })
    .catch(ex=>{

    })
  }
})