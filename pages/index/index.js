//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    headerBg: 'http://r.ezenlive.cn/ksyunadmin/5a1e8456ef3c733349.jpeg',
    imgUrls: [
      'http://r.ezenlive.cn/ksyunadmin/5a2106a7619be23043.jpeg',
      'http://r.ezenlive.cn/ksyunadmin/5a21172337f1d91928.jpeg',
      'http://r.ezenlive.cn/ksyunadmin/5a2106f04db5890130.jpeg',
      'http://r.ezenlive.cn/ksyunadmin/5a1e86168692695029.jpeg',
      'http://r.ezenlive.cn/ksyunadmin/5a1e85f50937b91227.jpeg'
    ],
    piclist: [
      {
        RoomId: 10001,
        LiveId: 10001,
        AnchorUrl: 'http://r.ezenlive.cn/ksyunadmin/5a1e9d94ddbe552972.jpeg',
        Thumbnail: 'http://r.ezenlive.cn/ksyunadmin/5a1e9d94ddbe552972.jpeg',
        AnchorDec: '丰满可爱的美女小可爱'
      },
      {
        RoomId: 10002,
        LiveId: 10002,
        AnchorUrl: 'http://r.ezenlive.cn/ksyunadmin/5a1e85c7e128025793.jpeg',
        Thumbnail: 'http://r.ezenlive.cn/ksyunadmin/5a1e85c7e128025793.jpeg',
        AnchorDec: '可爱大胸美女私拍套图'
      },
      {
        RoomId: 10003,
        LiveId: 10003,
        AnchorUrl: 'http://r.ezenlive.cn/ksyunadmin/5a1e85b84ad8c33290.jpeg',
        Thumbnail: 'http://r.ezenlive.cn/ksyunadmin/5a1e85b84ad8c33290.jpeg',
        AnchorDec: '可爱大尺度勾魂照片'
      },
      {
        RoomId: 10004,
        LiveId: 10004,
        AnchorUrl: 'http://r.ezenlive.cn/ksyunadmin/5a1e85903345e21877.jpeg',
        Thumbnail: 'http://r.ezenlive.cn/ksyunadmin/5a1e85903345e21877.jpeg',
        AnchorDec: '可爱大胸美女私拍套图'
      },
      {
        RoomId: 10005,
        LiveId: 10005,
        AnchorUrl: 'http://r.ezenlive.cn/ksyunadmin/5a1e85807b51f35184.jpeg',
        Thumbnail: 'http://r.ezenlive.cn/ksyunadmin/5a1e85807b51f35184.jpeg',
        AnchorDec: '可爱性感美女私拍套图'
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  enterRoom: function() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
