//index.js
//获取应用实例
const app = getApp()
const recommend = require('../../common/request/recommend')

Page({
  data: {
    BannerImage: {},
    NewImageList: [],
    RecommendImageList: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  enterAlbum: function(e) {
    let url = '../detail/detail?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title;
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

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
