// pages/movie/movieGrid/movieGrid.js
import utils from "../../../utils/utils.js";
import Movie from "../../../domain/movie.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],

  },
  configData: {
    loadUrl: "",
    pageSize: 20,
    currentSize: 0,
    total:0,
    pageTitle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { column } = options, url = "";
    this.configData.pageTitle = column;
    switch (column) {
      case "排行榜": url = '/v2/movie/top250'; break;
      case "影院热映": url = '/v2/movie/in_theaters'; break;
      case "即将上映": url = '/v2/movie/coming_soon'; break;
      default: url = '/v2/movie/coming_soon';
    }

    this.configData.loadUrl = url;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.configData.pageTitle)
    wx.setNavigationBarTitle({
      title: this.configData.pageTitle
    })
    this.loadMoviesInfo();
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
  onReachBottom: function () {
    let {total,currentSize} = this.configData;
    if(total<=currentSize){
      wx.showToast({
        title: '已到最底部',
        icon:"none"
      });
      return ;
    }
    this.loadMoviesInfo(true);
   
  },
  onPullDownRefresh: function () {
    this.conifgData.currentSize = 0;
    this.loadMoviesInfo();
  },
  loadMoviesInfo(appendData=false) {
    wx.showLoading({
      title: '数据加载中',
    })

    let url = `${this.configData.loadUrl}?start=${this.configData.currentSize}&count=${this.configData.pageSize}`;

    utils.doubanFetch(url)
      .then(data => {
        let { subjects, total } = data;
        this.configData.total = total;
        let movies = !!subjects && subjects.length > 0 ? subjects.map(item => {
          let movie = new Movie();
          movie.fromDouban(item);
          return movie;
        }) : [];

//是否追加数据
        if(appendData){
          movies.unshift.apply(movies,this.data.movies);
        }
        this.configData.currentSize = movies.length;
        this.setData({ movies });
        wx.hideLoading();
      })
      .catch(ex => {
        console.log(ex);
        wx.hideLoading();
      })
  },
  tapCellMoive(event){
    let { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id='+id,
    })
  }
})