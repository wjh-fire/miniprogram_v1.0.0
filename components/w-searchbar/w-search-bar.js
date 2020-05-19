// pages/home/childCpns/w-search-bar/w-search-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    sercherRecord: [],
    isShowRecord: false //显示搜索记录标志位
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
      //检索出缓存中的搜索历史
      this.openLocationsercher();
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false,
        isShowRecord: false
      });
      // getList(this);
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
      // getList(this);
    },

    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },

    //点击搜索按钮时触发
    confirmSearch() {
      var value =this.data.inputVal
      if (value.length == 0) {
        return;
      }
      //控制搜索历史
      if (this.data.inputVal != '') {
        //将搜索记录更新到缓存
        const searchData = this.data.sercherRecord;
        const length = searchData.length
        const index = searchData.indexOf(value)
        console.log(index)
        console.log(searchData)
        if(index != -1){
          searchData.splice(index,1)
        }else{
          if (searchData.length>3) {
            searchData.pop()
          }
        }
        searchData.unshift(value)
        wx.setStorageSync('searchData', searchData);
        this.setData({
          isShowRecord: false,
        })
      }
    },

    //清除缓存历史
    clearSearchStorage: function () {
      wx.removeStorageSync('searchData')
      this.setData({
        sercherRecord: [],
        isShowRecord: false,
      })
    },
    // 打开历史记录列表
    openLocationsercher: function () {
      this.setData({
        sercherRecord: wx.getStorageSync('searchData') || [],
        isShowRecord: true
      })
    }
  }
})