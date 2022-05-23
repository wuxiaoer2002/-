import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerlist:[],
        recommendlist:[],
        topList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let bannerlistdata= await request('/banner',{type:8});
        this.setData({
            bannerlist:bannerlistdata.banners
        })
       let recommendlistdata= await request('/personalized',{limit:8});
       this.setData({
           recommendlist:recommendlistdata.result
       })
       let allTopListData = await request('/toplist')
        let topList = allTopListData.list.slice (0, 4)
        let topListDetail = []
        for (let item of topList) {
        let detailList = await request(`/playlist/detail?id=${item.id}`, { limit: 10 })
        topListDetail.push({name: detailList.playlist.name, tracks: detailList.playlist.tracks.slice(0, 4)})
        this.setData({
         topList: topListDetail
        })
        }
    },
    toseach(){
        wx.navigateTo({
          url: '/pages/seach/seach',
        })
    },
    torecommendsong(){
        wx.navigateTo({
          url: '/pages/recommendsong/recommendsong',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    }
})