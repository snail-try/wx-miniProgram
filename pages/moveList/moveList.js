// pages/moveList/moveList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorActiveColor:"#fff",
    indicatorColor:"#fff"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("page load")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("page ready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("page show")
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
  swiperChange: function (event){
    let {current,source} = event.detail;
    let activeColor = "#fff"
    switch(current){
      case 1: 
      case 3: activeColor = "#000";break;
      case 2:
      case 4: activeColor = "#fff";break;
      default: activeColor = "#fff";break;
    }

    let color = "#ebebeb"
    switch (current) {
      case 1:
      case 3: color = "#ebebeb"; break;
      case 2:
      case 4: color = "#ff4400"; break;
      default: color = "#ff4400"; break;
    }
  
     this.setData({
       indicatorActiveColor: activeColor,
       indicatorColor: color
     })
  }
})