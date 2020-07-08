<template>
  <div>
    <carousel height="400px" indicator="none" />
    <div class="body">
      <div class="hot-intro" v-if="hotIntro.length">
        <div class="intro-title">
          <h3>热门攻略</h3>
          <p>中国最聪明、最接地气的出境游便携指南，当地人带路的优质行程，私享深度路线一书尽览。</p>
        </div>
        <div class="intro-content">
          <div class="intro-item" v-for="item in hotIntro" :key="item.id">
            <div @click="dialogShow(item.id)">
              <introductionItem :introInfo="item" />
            </div>
            <button class="dl-btn" @click="handleDownload(item.id)">下载攻略</button>
          </div>
        </div>
      </div>
      <div class="all-intro">
        <div class="intro-title">
          <h3>全部攻略</h3>
          <p></p>
        </div>
        <div class="intro-content">
          <div class="intro-item" v-for="item in introductionList" :key="item.id">
            <div @click="dialogShow(item.id)">
              <introductionItem :introInfo="item" />
            </div>
            <button class="dl-btn" @click="handleDownload(item.id)">下载攻略</button>
          </div>
        </div>
      </div>
    </div>
    <dialogIntroduction :show="Showdialog" v-if="Showdialog" v-on:hideModal="hideDialog" :introId="nowId" />
  </div>
</template>
<script>
import carousel from "@/components/carousel";
import introductionItem from "@/components/introductionItem";
import dialogIntroduction from "@/components/dialogIntroduction";
import gql from "graphql-tag";
export default {
  created () {
    this.getIntroduction();
  },
  components: {
    carousel,
    introductionItem,
    dialogIntroduction
  },
  data () {
    return {
      introInfo: [],
      Showdialog: false,
      introductionList: [],
      nowId: 0
    }
  },
  computed: {
    hotIntro: function () {
      return this.introductionList.filter(function (item) {
        return item.is_hot == true
      })
    }
  },
  methods: {
    dialogShow (id) {
      this.nowId = parseInt(id);
      this.$store.commit('setShowDialogStatus', true);
      this.Showdialog = true;
    },
    hideDialog () {
      this.$store.commit('setShowDialogStatus', false);
      this.Showdialog = false;
    },
    getIntroduction () {
      this.$apollo.addSmartQuery("introductions", {
        query: gql`
        query scenics {
          introductions {
            iid
            name
            name_en
            main_img
            author
            created_at
          }
        }
      `,
        result (data) {
          // console.log(data);
          let temp = [];
          for (let i in data.data.introductions) {
            temp.push({
              id: data.data.introductions[i].iid,
              name: data.data.introductions[i].name,
              name_en: data.data.introductions[i].name_en,
              is_hot: data.data.introductions[i].is_hot,
              author: data.data.introductions[i].author,
              main_img: this.GLOBAL.api_url + data.data.introductions[i].main_img,
              created_at: data.data.introductions[i].created_at
            });
          }
          this.introductionList = temp;
        }
      });
    },
    handleDownload (id) {
      console.log(1)
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($iid: ID!) {
              downloadIntroduction(iid: $iid)
            }
          `,
          variables: {
            iid: id,
          }
        })
        .then(data => {
          // console.log(data);
          window.open(this.GLOBAL.api_url + data.data.downloadIntroduction)
        });
    }

  }
}
</script>
<style scoped>
.body {
  width: 81%;
  margin: 50px auto;

  /* border: 1px solid gray; */
}
.intro-title {
  display: flex;
  align-items: flex-end;
  margin: 50px 0;
}
.intro-title > h3 {
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
.intro-title > h3 > p {
  display: inline-block;
  /* float: left; */
  height: 42px;
  line-height: 42px;
  font-size: 12px;
  color: #999;
}
.intro-content {
  display: flex;
  flex-wrap: wrap;
}
.intro-item {
  margin: 30px 20px;
}
.dl-btn {
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: rgb(0, 188, 212);
  color: #fff;
  margin-top: 5px;
  cursor: pointer;
  outline: none;
}
.dl-btn:active {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>