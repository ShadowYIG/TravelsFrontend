<template>
  <div id="scenic">
    <div class="head">
      <input class="screach" type="text" placeholder="想好去哪儿了吗？"><button class="screach-btn">GO</button>
    </div>
    <div class="content">
      <h1 class="title">全球景点</h1>
      <div class="scenic-content">
        <div class="scenic-item" v-for="item in scenicList" :key="item.id" @click="dialogShow(item.id)">
          <img :src="item.img" alt="">
          <div class="desc">
            <span class="city">{{item.city}}</span>
            <span class="desc-info">{{item.desc}}</span>
          </div>
        </div>
      </div>
    </div>
    <dialogScenic :show="Showdialog" v-if="Showdialog" v-on:hideModal="hideDialog" :scenicId="nowScenic" />
  </div>
</template>
<script>
import dialogScenic from "@/components/dialogScenic";
import gql from "graphql-tag";
export default {
  components: {
    dialogScenic
  },
  created () {
    this.$apollo.addSmartQuery("scenics", {
      query: gql`
        query scenics {
          scenics {
            sid
            name
            main_img
            describe
          }
        }
      `,
      result (data) {
        // console.log(data);
        let temp = [];
        for (let i in data.data.scenics) {
          temp.push({
            id: data.data.scenics[i].sid,
            city: data.data.scenics[i].name,
            desc: data.data.scenics[i].describe,
            img: this.GLOBAL.api_url + data.data.scenics[i].main_img
          });
        }
        this.scenicList = temp;
      }
    });
  },
  data () {
    return {
      scenicList: [],
      Showdialog: false,
      nowScenic: 0,
      scenic: '',
    }
  },
  methods: {
    dialogShow (id) {
      this.nowScenic = parseInt(id)
      // console.log(id)
      this.$store.commit('setShowDialogStatus', true);
      this.Showdialog = true;
    },
    hideDialog () {
      this.$store.commit('setShowDialogStatus', false);
      this.Showdialog = false;
    }
  }

}
</script>
<style scoped>
.head {
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("../assets/img/fj2.jpg");
  background-size: 100% 100%;
}
.head > .screach {
  width: 500px;
  height: 40px;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto auto;
  padding-left: 10px;
  transform: translateX(-60px);
  border: 3px solid rgb(41, 121, 255);
  border-radius: 20px 0 0 20px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-weight: 100;
  font-size: 20px;
}
.head > .screach:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.head > .screach-btn {
  width: 120px;
  height: 47px;
  border: none;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  transform: translateX(250px);
  background-color: rgb(41, 121, 255);
  border-radius: 0 20px 20px 0;
  color: #fff;
  font-size: 26px;
  font-weight: 100;
  cursor: pointer;
}
.head > .screach-btn:active {
  top: 2px;
}
.head > .screach:focus {
  box-shadow: 5px 5px 50px rgb(41, 121, 255);
}

.content {
  width: 81%;
  /* border: 1px solid gray; */
  margin: 50px auto;
}
.title {
  color: #333333;
  margin-bottom: 20px;
}
.scenic-content {
  display: flex;
  /* border: 1px solid green; */
  flex-wrap: wrap;
}
.scenic-content:after {
  content: "";
  flex-grow: 999;
}
.scenic-item {
  position: relative;
  overflow: hidden;
  /* border: 1px solid black; */
  margin: 5px;
}
.scenic-item > img {
  position: relative;
  height: 220px;
  width: auto;
  flex-grow: 1;
  object-fit: cover;
}
.scenic-item > .desc {
  position: absolute;
  /* border: 1px solid green; */
  height: 90px;
  left: 0;
  right: 0;
  width: auto;
  background-color: rgba(238, 238, 238, 0);
  bottom: -40px;
  padding-left: 10px;
  transition: 0.5s;
  overflow: hidden;
}
.scenic-item > .desc > .city {
  display: block;
  font-size: 30px;
  color: #fff;
  margin-bottom: 8px;
}
.scenic-item:hover .desc {
  bottom: 5px;
  background-color: rgba(238, 238, 238, 0.8);
}
.scenic-item:hover .city {
  color: #000;
}
.scenic-item > .desc > .desc-info {
  font-weight: 300;
  color: #fff;
}
.scenic-item:hover .desc > .desc-info {
  color: #000;
}
</style>