// pages/movieList/movieList.js
import utils from "../../../utils/utils.js";
import Movie from "../../../domain/movie.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top250: [],
    theaters: [],
    comingSoon: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadInfo();
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

  loadTop250Info() {
    let url = `/v2/movie/top250?start=0&count=3`;
    return utils.doubanFetch(url).then(data => {
      let { subjects } = data;
      let top250 = !!subjects && subjects.length > 0 ? subjects.map(item => {
        let movie = new Movie();
        movie.fromDouban(item);
        return movie;
      }) : [];

      this.setData({ top250 });

    })
      .catch(ex => {
        throw ex;
      })
  },
  loadComingSoonInfo() {
    let url = `/v2/movie/coming_soon?start=0&count=3`;
    return utils.doubanFetch(url).then(data => {
      let { subjects } = data;
      let comingSoon = !!subjects && subjects.length > 0 ? subjects.map(item => {
        let movie = new Movie();
        movie.fromDouban(item);
        return movie;
      }) : [];
      this.setData({ comingSoon });
    })
      .catch(ex => {
        throw ex;
      })
  },
  loadTheatersInfo() {
    let url = `/v2/movie/in_theaters?start=0&count=3`;
    return utils.doubanFetch(url).then(data => {
      let { subjects } = data;
      let theaters = !!subjects && subjects.length > 0 ? subjects.map(item => {
        let movie = new Movie();
        movie.fromDouban(item);
        return movie;
      }) : [];
      this.setData({ theaters });
    })
      .catch(ex => {
        throw ex;
      })
  },
  loadInfo() {
    let promise_1 = this.loadTop250Info(),
      promise_2 = this.loadComingSoonInfo(),
      promise_3 = this.loadTheatersInfo();
    wx.showLoading({ mask: true, title: "加载中" });
    Promise.all([promise_1, promise_2, promise_3])
      .then(data => {
        wx.hideLoading();
      })
      .catch(ex => {
        wx.hideLoading();
        wx.showToast({ title: "数据加载异常", icon:"none" });
      })
  },

  catchtap_more(event){
    console.log(1)
    wx.navigateTo({
      url: "../movieGrid/movieGrid?column=" + event.currentTarget.dataset.column
    })
  }
})