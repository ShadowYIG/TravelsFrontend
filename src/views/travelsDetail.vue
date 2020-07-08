<template>
  <div id="travels_detail">
    <div class="travels-detail-title">
      <h3>游记</h3>
    </div>
    <div class="travels-detail-content">

      <div class="travels-detail-info">
        <img :src="travelsInfo.avatar_src?travelsInfo.avatar_src:this.GLOBAL.default_avator" alt="">
        <div class="detail-info-r">
          <h1>{{travelsInfo.name}}</h1>
          <div class="info-item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-riqi"></use>
            </svg>
            <span class="info-label">出发日期：</span>
            <span class="info-data">{{travelsInfo.start_date}}</span>
          </div>
          <div class="info-item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yueliang"></use>
            </svg>
            <span class="info-label">天数：</span>
            <span class="info-data">{{travelsInfo.play_time}}天</span>
          </div>
          <p>
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-chengshi1"></use>
                </svg>
                <span class="info-label">途径：</span>
              </li>
              <li>
                <span class="list-item">{{travelsInfo.channel}}</span>
              </li>
              <!-- <li v-for="(item,index) in cityList" :key="item">
                <span class="list-item">{{item}}</span><span v-if="index!=(cityList.length-1)" class="division">></span>
              </li> -->
            </ul>
          </p>
          <p>
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xingcheng2"></use>
                </svg>
                <span class="info-label">行程：</span>
              </li>
              <li>
                <span class="list-item">{{travelsInfo.trip}}</span>
              </li>
              <!-- <li v-for="(item,index) in cityList" :key="item">
                <span class="list-item">{{item}}</span><span v-if="index!=(cityList.length-1)" class="division">></span>
              </li> -->
            </ul>
          </p>
        </div>

      </div>
      <div id="travels_main">
        {{travelsInfo.detail}}
      </div>
    </div>

  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  created () {
    this.getTravel(1);
  },
  data () {
    return {
      travelsInfo: {},
      cityList: ['北京', '广州', '深圳']
    }
  },
  methods: {
    getTravel (id) {
      this.$apollo.addSmartQuery("travel", {
        query: gql`
        query travel($tid: ID!) {
          travel(tid:$tid) {
            tid
            name
            main_img
            play_time
            start_date
            channel
            trip
            city
            detail
            img_list{
              img_src
            }
            users{
              name
              avatar_src
            }
          }
        }
      `,
        variables: {
          tid: id,
        },
        result (data) {
          // console.log(data);
          this.travelsInfo = {
            id: data.data.travel.tid,
            name: data.data.travel.name,
            play_time: data.data.travel.play_time,
            city: data.data.travel.city,
            channel: data.data.travel.channel,
            trip: data.data.travel.trip,
            detail: data.data.travel.detail,
            start_date: this.dateFormat(data.data.travel.start_date),
            main_img: this.GLOBAL.api_url + data.data.travel.main_img,
            user_name: data.data.travel.users.name,
            img_count: data.data.travel.img_list.length,
            avatar_src: data.data.travel.users.avatar_src ? this.GLOBAL.api_url + data.data.travel.users.avatar_src : '',
          };
        }
      });
    },
    dateFormat (data) {
      return data.split(" ")[0];
    }
  }
}
</script>
<style scoped>
#travels_detail {
  position: relative;
  min-height: 500px;
}

.travels-detail-title {
  width: 81%;
  margin: 40px auto;
}
.travels-detail-title > h3 {
  display: inline-block;
  background: url("../assets/img/pic1.png") no-repeat right bottom;
  /* border: 1px solid gray; */
  /* float: left; */
  height: 42px;
  line-height: 32px;
  font-size: 30px;
  color: rgb(0, 188, 212);
  padding-right: 30px;
}
.travels-detail-info {
  /* border: 1px solid gray; */
  height: 150px;
  display: flex;
  margin-left: 100px;
  border-bottom: 2px dashed gray;
}
.detail-info-r {
  margin-left: 30px;
}
.travels-detail-info > img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid gray;
  align-items: center;
}
.detail-info-r .info-item {
  display: inline-block;
  margin-left: 20px;
}
.detail-info-r .icon {
  color: rgb(3, 169, 244) !important;
  font-size: 20px;
}
.detail-info-r p {
  margin-top: 10px;
}
.detail-info-r ul {
  list-style: none;
  display: inline;
  margin-left: 20px;
}
.detail-info-r li {
  display: inline;
}
.travels-detail-content {
  width: 81%;
  margin: 40px auto;
}
.travels-detail-content h1 {
  text-align: left;
}
#travels_main {
  position: relative;
  /* border: 1px solid gray; */
  width: 80%;
  margin: 50px auto;
}
</style>