<template>
  <div class="modal-bg" v-show="show" @mousemove="modalMove" @mouseup="cancelMove">
    <div class="modal-container">
      <div class="close-btn" @click="hideModal">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
      <div class="dialog-content" v-if="scenic">
        <div class="dialog-slide">
          <dialogScenicPic v-if="ScenicImgList" :dataList="ScenicImgList" />
        </div>
        <div class="dialog-describe">
          <h1>{{scenic.city}}</h1>
          <div class="countbox">
            <div class="c_item">
              {{scenic.desc}}
            </div>
            <div class="c_item">建议游玩：<span class="sum">{{scenic.play_time}}</span>天。</div>
            <div class="c_item">
              {{scenic.proposal}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dialogScenicPic from "../components/dialogScenicPic";
import gql from "graphql-tag";
export default {
  name: "modal",
  components: {
    dialogScenicPic
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    scenicId: Number,
  },
  data () {
    return {
      x: 0,
      y: 0,
      node: null,
      isCanMove: false,
      ScenicImgList: [],
      scenic: {},
      scenics: {},
    };
  },
  mounted () {
    this.node = document.querySelector(".modal-container");
    this.getScenic(this.scenicId)

  },
  methods: {
    hideModal () {
      this.$emit("hideModal", "scenic");
    },

    setStartingPoint (e) {
      this.x = e.clientX - this.node.offsetLeft;
      this.y = e.clientY - this.node.offsetTop;
      this.isCanMove = true;
    },

    modalMove (e) {
      if (this.isCanMove) {
        this.node.style.left = e.clientX - this.x + "px";
        this.node.style.top = e.clientY - this.y + "px";
      }
    },

    cancelMove () {
      this.isCanMove = false;
    },
    getScenic (id) {
      this.$apollo.addSmartQuery("scenic", {
        query: gql`
        query scenic($sid: ID!) {
          scenic(sid:$sid) {
            sid
            name
            main_img
            describe
            play_time
            proposal
            img_list{
              img_src
            }
          }
        }`,
        variables: {
          sid: id,
        },
        result (data) {
          // console.log(data);
          this.scenic = {
            id: data.data.scenic.sid,
            city: data.data.scenic.name,
            desc: data.data.scenic.describe,
            play_time: data.data.scenic.play_time,
            proposal: data.data.scenic.proposal,
            img: this.GLOBAL.api_url + data.data.scenic.main_img
          }
          this.ScenicImgList = [];
          for (let i in data.data.scenic.img_list) {
            this.ScenicImgList.push(this.GLOBAL.api_url + data.data.scenic.img_list[i].img_src)
          }
        }
      });

    }
  },
};
</script>
<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 12;
}
.modal-container {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 1100px;
}
.close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.close-btn > .icon {
  color: rgb(0, 188, 212);
  font-size: 28px;
}

.dialog-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 95%;
  height: 85%;
  margin: auto;
  /* background-color: #fafafa; */
  display: flex;
}
.dialog-slide {
  border: 1px solid gray;
  border-right: none;
  width: 720px;
  height: 420px;
  /* margin: 40px 0 0 10px; */
  align-self: center;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
}
.dialog-describe {
  height: 420px;
  border: 1px solid gray;
  border-left: none;
  padding-left: 30px;
  align-self: center;
  border-radius: 0 10px 10px 0;
  flex: 1;
}
.dialog-describe > h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: normal;
}
.dialog-describe .countbox {
  padding-top: 28px;
  width: 240px;
  line-height: 22px;
}
.dialog-describe .countbox .c_item {
  padding-bottom: 20px;
  font: normal 16px arial, sans-serif;
  clear: both;
  background-color: #fff;
  width: 100%;
  color: #555;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.dialog-describe .countbox .c_item .sum {
  color: #1badb6;
  font-size: 16px;
  font-family: tahoma;
}
</style>
