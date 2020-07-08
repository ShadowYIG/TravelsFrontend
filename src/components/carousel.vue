<template>
  <el-carousel :interval="5000" arrow="always" :height="height" :indicator-position="indicator">
    <el-carousel-item class="el-item" v-for="(item, index) in imgList" :key="index">
      <img :src="item.src" alt="" :height="height" width="100%" />
      <div class="info-bar" v-show="showInfo">
        <p>{{ item.title }}</p>
        <p>{{ item.desc }}</p>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import gql from "graphql-tag";
export default {
  props: {
    indicator: String,
    height: String,
    showInfo: false
  },
  created () {
    this.$apollo.addSmartQuery("carimg", {
      query: gql`
        query PublicImgByType($type: String!) {
          carimg:PublicImgByType(type: $type) {
            img_src
          }
        }
      `,
      variables: {
        type: "main"
      },
      update: data => data.hello,
      result (data) {
        let temp = [];
        for (let i in data.data.carimg) {
          temp.push({
            src: this.GLOBAL.api_url + data.data.carimg[i].img_src,
            // title: data.data.carimg[i].title,
            // desc: data.data.carimg[i].describe
          });
        }
        this.imgList = temp;
      }
    });
  },
  data () {
    return {
      carimg: "",
      imgList: [],
      type: "main"
    };
  }
};
</script>
<style>
.info-bar {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  z-index: 5999;
  width: 60%;
  height: 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info-bar > p {
  color: white;
}
.info-bar > p:nth-child(1) {
  font-size: 28px;
  /* border: 1px solid green; */
  font-weight: 400;
  margin-bottom: 10px;
}
.info-bar > p:nth-child(2) {
  /* border: 1px solid yellow; */
  /* width: 80%; */
  /* margin-bottom: 10px; */
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
