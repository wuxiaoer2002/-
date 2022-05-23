import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isplay:false,
        song:{},
        musicid:'',
        songci:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       let musicid=options.musicid
       this.setData({
           musicid
       })
       this.getmusicinfo(musicid)
       this.getmusicsongci(musicid)
       //创建背景音频实例
       this.backmusic=wx.getBackgroundAudioManager();
           //监听背景音频播放事件
        this.backmusic.onPlay(()=>{
            this.changmusicplay(true)
        })
         //监听背景音频暂停事件
        this.backmusic.onPause(()=>{
            this.changmusicplay(false)
        })
        //监听背景音频暂停事件
        this.backmusic.onStop(()=>{
            this.changmusicplay(false)
        })
    },
        //修改音乐的状态  暂停还是播放
    changmusicplay(isplay){
        this.setData({
            isplay
        })
    },
    //获取音乐内容
    async getmusicinfo(musicid){
        let songdata= await request('/song/detail',{ids:musicid})
        this.setData({
            song:songdata.songs[0]
        })
        wx.setNavigationBarTitle({
            title:this.data.song.name
        })
    },
    //获取歌词
    async getmusicsongci(musicid){
        let songcidata= await request('/lyric',{id:musicid})
        this.setData({
            songci:songcidata.lrc
        })
    },
    handlemusicplay(){
        let isplay= !this.data.isplay
        // this.setData({
        //     isplay
        // })
        let {musicid}=this.data;
        this.musicControl(isplay,musicid);
    },
      async musicControl(isplay,musicid){
            if(isplay){
            let musicurldata=await request('/song/url',{id:musicid})
            let musicurl=musicurldata.data[0].url;
           this.backmusic.src=musicurl 
           this.backmusic.title=this.data.song.name
            }else {
             this.backmusic.pause()
            }
        },
        leftnext(){
            
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