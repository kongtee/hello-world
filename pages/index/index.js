//index.js
//获取应用实例
const app = getApp()
const recommend = require('../../common/request/recommend')

Page({
  data: {
    BannerImage: {},
    NewImageList: [],
    RecommendImageList: []
  },
  enterAlbum: function(e) {
    let url = '../detail/detail?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title
    wx.navigateTo({
      url: url
    })
  },
  onLoad: function () {
    //获取图片列表
    wx.request({
      url: recommend.queryrecommendlist, 
      data: {
        QueryStartPos: 0,
        QueryNumber: 10
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data);
        let resData = res.data || {}
        if (resData.RspHeader && resData.RspHeader.ErrNo == 200) {
          let rspJson = resData.RspJson || []
          let query = wx.createSelectorQuery()
          let dom = query.select('#headerImgWrap').boundingClientRect((rect) => {
            let systemInfo = app.globalData.systemInfo
            let picParam = '?x-oss-process=image/resize,m_lfit,h_' + (rect.height * systemInfo.pixelRatio) + ',w_' + (rect.width * systemInfo.pixelRatio)
            //处理banner列表
            let bannerList = rspJson.BannerList[0]
            bannerList.Url += picParam
            //处理最新列表
            let newImageList = rspJson.NewImageList
            for (let newImage of newImageList) {
              newImage.Url += picParam
            }
            //处理推荐列表
            let recommendImageList = rspJson.RecommendImageList
            for (let recommendImage of recommendImageList) {
              recommendImage.Url += picParam
            }
            this.setData({
              BannerImage: bannerList,
              NewImageList: newImageList,
              RecommendImageList: recommendImageList
            })
          }).exec()
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '一大波人正在等你……',
      path: '/pages/index/index',
      success: function (res) {
        console.log('转发成功')
        // 转发成功
      },
      fail: function (res) {
        console.log('转发失败')
        // 转发失败
      }
    }
  }
})
