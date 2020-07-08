<template>
  <div class="travels-item" :style="getTravelsStyle(index)">
    <div class="author-info" :style="getAuthorStyle(index)">
      <img class="avatar" :src="travelsInfo.avatar_src?travelsInfo.avatar_src:this.GLOBAL.default_avator" alt="">
      <h2 align="center">{{travelsInfo.user_name}}</h2>
      <div class="travels-info">
        <p>出发：{{travelsInfo.start_date}}</p>
        <p>城市：{{travelsInfo.city}}</p>
        <p>总天数：{{travelsInfo.play_time}}天</p>
        <!-- <p>共{{travelsInfo.totalday}}天</p> -->
      </div>

    </div>
    <div class="travels-content">
      <h3>{{travelsInfo.name}}</h3>
      <div class="trip-info">
        <p>途径城市：{{travelsInfo.channel}}</p>
        <p>行程：{{travelsInfo.trip}}</p>
      </div>
      <div class="travels-desc">{{travelsInfo.detail}}</div>
    </div>
    <img class="main-img" :src="travelsInfo.main_img" alt="" :style="getMainImgStyle(index)">
  </div>
</template>
<script>
export default {
  props: {
    travelsInfo: Object,
    index: Number
  },
  methods: {
    getTripCity: function (city) {
      let cityStr = ""
      for (let i = 0; i < city.length - 1; i++) {
        cityStr = cityStr + city[i] + " > ";
      }
      cityStr = cityStr + city[city.length - 1];
      return cityStr;
    },
    getAuthorStyle: function (index) {
      if (index % 2 != 0) { // 偶数
        return "border-left: 2px dashed gray;";
      } else {
        return "border-right: 2px dashed gray;";
      }
    },
    getTravelsStyle: function (index) {
      if (index % 2 != 0) { // 偶数
        return "flex-direction: row-reverse;";
      } else {
        return "";
      }
    },
    getMainImgStyle: function (index) {
      if (index % 2 != 0) { // 偶数
        return "border-radius: 10px 0 0 10px;";
      } else {
        return "border-radius: 0 10px 10px 0;";
      }
    }
  }
}
</script>
<style  scoped>
.travels-item {
  height: 250px;
  /* border: 1px solid gray; */
  border-radius: 10px;
  box-shadow: 0 1px 20px -8px rgba(0, 0, 0, 0.5);
  display: flex;
  cursor: pointer;
}
/* 分三块 */
.author-info {
  /* border: 1px solid yellow; */
  width: 200px;
  height: auto;
  margin: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.travels-content {
  flex: 1;
  height: auto;
  /* border: 1px solid red; */

  /* margin: 10px 10px 10px 0; */
  margin: 10px;
}
.main-img {
  width: 380px;
  height: auto;

  /* border-radius: 10px 0 0 10px; */
}

.avatar {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border: 2px solid gray;
  border-radius: 50%;
}
.author-info > h2 {
  /* width: 150px; */
  font-size: 16px;
  font-weight: 500;
  margin: 5px;
}
.travels-info {
  margin: 0 auto;
  margin-top: 30px;
}
.travels-info > p {
  font-size: 12x;
  font-weight: 300;
  color: gray;
}
.travels-content > h3 {
  font-size: 20px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.travels-desc {
  /* border: 1px solid gray; */
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 30px;
  color: gray;
}
.trip-info {
  margin: 10px;
  font-size: 14px;
  color: gray;
}
.trip-info > p {
  margin: 5px;
}
</style>