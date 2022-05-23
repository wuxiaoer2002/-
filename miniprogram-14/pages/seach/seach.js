// pages/seach/seach.js
import request from "../../utils/request"
let issend=false;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showKeyword:'',
        hot:'',
        suggest:[],
        getinputvaluedata:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options){
        this.getshowKeyword()
        this.gethotlist()
        // this.tosuggest()
    },
     /*获取默认搜索框*/
    async getshowKeyword(){
        let getshowKeyworddata= await request('/search/default?')
        this.setData({
            showKeyword:getshowKeyworddata.data.showKeyword
        })
    },
    /*获取热搜列表*/
    async gethotlist(){
        let gethotlistdata= await request('/search/hot/detail')
        this.setData({
            hot:gethotlistdata.data
        })
    },
    /*获取输入框的值*/
    getinputvalue(event){
        this.setData({
            getinputvaluedata:event.detail.value
        })
        if(issend){
            return
        }
        issend=true;
        this.tosuggest()
        setTimeout(()=>{
            issend=false
        },300)
    },
    /*获取搜索结果*/
    async tosuggest(){
        if(!this.data.getinputvaluedata){
            this.setData({
                suggest:[]
            })
            return
        }
        let tosuggestdata= await request('/search/suggest',{keywords:this.data.getinputvaluedata})
        this.setData({
            suggest:tosuggestdata.result.songs
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