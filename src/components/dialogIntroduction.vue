<template>
  <div class="modal-bg" v-show="show" @mousemove="modalMove" @mouseup="cancelMove">
    <div class="modal-container">
      <div class="close-btn" @click="hideModal">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
      <div class="dialog-content">
        <div class="dialog-pic">
          <img :src="this.GLOBAL.api_url+introduction.main_img" />
        </div>
        <div class="dialog-detail">
          <h1>{{introduction.name}}</h1>
          <h2>{{introduction.name_en}}</h2>
          <h4>{{introduction.name}}简介</h4>
          <p>{{introduction.describe}}</p>
          <ul>
            <li><b>国家:</b> {{introduction.country}}</li>
            <li><b>城市:</b> {{introduction.name+" "+introduction.name_en}}</li>
            <li><b>作者:</b> {{introduction.author}}</li>
            <li><b>发布时间:</b> {{introduction.created_at}}</li>
          </ul>
          <button class="download-btn">下载攻略</button>
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
    introId: Number
  },
  data () {
    return {
      x: 0,
      y: 0,
      node: null,
      isCanMove: false,
      introduction: ""
    };
  },
  mounted () {
    this.node = document.querySelector(".modal-container");
    this.getIntroduction(this.introId);
    console.log(this.introduction)
  },
  methods: {
    hideModal () {
      this.$emit("hideModal", "introduction");
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
    getIntroduction (id) {
      this.$apollo.addSmartQuery("introduction", {
        query: gql`
        query introduction($iid: ID!) {
          introduction(iid:$iid) {
            iid
            name
            name_en
            main_img
            country
            describe
            author
            created_at
          }
        }
      `,
        variables: {
          iid: id,
        },
        update: data => data.introduction,
      });
    }
  }
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
  height: 600px;
  width: 900px;
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
.dialog-pic {
  position: relative;
  height: 530px;
  width: 410px;
  border: 1px solid gray;
}
.dialog-pic img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 520px;
  width: 400px;
  /* border: 1px solid gray; */
}
.dialog-detail {
  height: 530px;
  width: 410px;
  /* border: 1px solid gray; */
  margin-left: 15px;
  padding: 0 10px;
}
.dialog-detail h1,
.dialog-detail h2 {
  margin: 0 auto;
  line-height: 40px;
  /* border: 1px solid green; */
  text-align: center;
}
.dialog-detail h4 {
  display: block;
  font-weight: bold;
  font-size: 20px;
  padding: 30px 0 16px 0;
  color: #333;
}
.dialog-detail p {
  font-size: 14px;
  color: #999;
  line-height: 22px;
}
.dialog-detail h1 {
  border-top: 1px solid gray;
}
.dialog-detail h2 {
  border-bottom: 1px solid gray;
}
.dialog-detail ul {
  width: 100%;
  overflow: hidden;
  margin: 25px 0 20px 0;
}

.dialog-detail li {
  list-style: none;
  color: #999;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  border-bottom: dashed 1px #999;
}
.dialog-detail b {
  color: black;
  font-weight: 500;
  font-size: 16px;
}
.dialog-detail .download-btn {
  height: 40px;
  width: 150px;
  background-color: rgb(30, 136, 229);
  border: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
  font-weight: 400;
  border-radius: 10px;
}
.dialog-detail .download-btn:hover {
  box-shadow: 0 0 10px 2px rgb(30, 136, 229);
}
</style>
