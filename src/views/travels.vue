<template>
  <div id="travels_detail">
    <div class="travels-title">
      <h3>游记</h3>
      <router-link to="/addtravels" class="release">发布游记</router-link>
    </div>
    <div class="travels-content">
      <div class="travels-item" v-for="(item, index) in travelsInfo" :key="item.id">
        <router-link :to="'/travelsdetail/'+item.id">
          <travelsItem :travelsInfo="item" :index="index" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import travelsItem from "@/components/travelsItem";
import gql from "graphql-tag";
export default {
  created () {
    this.getTravel()
  },
  components: {
    travelsItem
  },
  data () {
    return {
      travelsInfo: []
    };
  },
  methods: {
    getTravel () {
      this.$apollo.addSmartQuery("travels", {
        query: gql`
        query travels {
          travels {
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
        result (data) {
          // console.log(data);
          let temp = [];
          for (let i in data.data.travels) {
            temp.push({
              id: data.data.travels[i].tid,
              name: data.data.travels[i].name,
              play_time: data.data.travels[i].play_time,
              city: data.data.travels[i].city,
              channel: data.data.travels[i].channel,
              trip: data.data.travels[i].trip,
              detail: data.data.travels[i].detail,
              start_date: this.dateFormat(data.data.travels[i].start_date),
              main_img: this.GLOBAL.api_url + data.data.travels[i].main_img,
              user_name: data.data.travels[i].users.name,
              img_count: data.data.travels[i].img_list.length,
              avatar_src: data.data.travels[i].users.avatar_src ? this.GLOBAL.api_url + data.data.travels[i].users.avatar_src : '',
            });
          }
          this.travelsInfo = temp;
        }
      });
    },
    dateFormat (data) {
      return data.split(" ")[0];
    }
  },
};
</script>
<style scoped>
#travels_detail {
  width: 81%;
  margin: 0 auto;
  margin-bottom: 200px;
}
.travels-title {
  display: flex;
  align-items: flex-end;
  margin: 50px 0;
}
.travels-title > a {
  border: none;
  font-size: 22px;
  color: rgb(0, 188, 212);
  text-decoration: none;
}
.travels-title > h3 {
  display: inline-block;
  background: url("../assets/img/pic1.png") no-repeat right bottom;
  /* border: 1px solid gray; */
  /* float: left; */
  height: 42px;
  line-height: 32px;
  font-size: 20px;
  color: #999;
  padding-right: 30px;
}
.travels-title > h3 > p {
  display: inline-block;
  /* float: left; */
  height: 42px;
  line-height: 42px;
  font-size: 12px;
  color: #999;
}
.travels-content {
  margin-top: 80px;
  width: 90%;
  margin: 0 auto;
  /* border: 1px solid gray; */
}
.travels-content a {
  outline: none;
  text-decoration: none;
  color: black;
}
.travels-item {
  margin-bottom: 50px;
}
</style>
