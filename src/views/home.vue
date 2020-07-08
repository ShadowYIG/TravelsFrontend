<template>
  <div id="home">
    <carousel height="400px" />
    <!-- 聚焦图 -->
    <div id="concentrate">
      <concentrate />
    </div>

    <div id="scenic">
      <div class="title-bar">
        <svg class="icon title-icon">
          <use xlink:href="#icon-scenery"></use>
        </svg>
        <h3 class="title">景点</h3>
        <router-link class="more" to="/scenic">更多>>></router-link>
      </div>
      <div class="content">
        <div class="left-content">
          <h3>热门目的地</h3>
          <ul>
            <li v-for="item in scenicList.slice(0, 20)" :key="item.id" v-on:click="ShowDialog('scenic',item.id)">
              <a :href="item.url" v-if="item.is_hot">
                <span class="l-con-title">{{ item.city }}</span>
                <span class="l-con-des">{{ item.desc }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="right-content">
          <div class="g-item" v-for="item in scenicList.slice(0, 6)" :key="item.id" :id="item.id" v-on:click="ShowDialog('scenic',item.id)">
            <scenicCard :cardInfo="item" :data-id="item.id" />
          </div>
        </div>
      </div>
    </div>

    <div id="introduction">
      <div class="title-bar">
        <svg class="icon title-icon">
          <use xlink:href="#icon-youji1"></use>
        </svg>
        <h3 class="title">
          游记<span>|</span>
          <router-link to="/addtravels" class="release">发布游记</router-link>
        </h3>
        <router-link class="more" to="/travels">更多>>></router-link>
      </div>
      <div class="introduction-content">
        <div class="introduction-item" v-for="(item, index) in travelsList.slice(0, 5)" :key="item.id" :style="{ 'grid-area': 'a' + index }">
          <router-link :to="'/travelsdetail/' + item.id">
            <introductionCard :cardInfo="item" />
          </router-link>
        </div>
      </div>
    </div>

    <div id="travels">
      <div class="title-bar">
        <svg class="icon title-icon">
          <use xlink:href="#icon-gonglve"></use>
        </svg>
        <h3 class="title">攻略</h3>
        <router-link class="more" to="/introduction">更多>>></router-link>
      </div>
      <div class="travels-content">
        <div class="g-item" v-for="item in introductionList.slice(0, 6)" :key="item.id" v-on:click="ShowDialog('introduction',item.id)">
          <travelsCard :cardInfo="item" />
        </div>
      </div>
    </div>
    <dialogScenic :show="dialogShow['scenic']" v-if="dialogShow['scenic']" v-on:hideModal="hideDialog" :scenicId="nowId" />
    <dialogIntroduction :show="dialogShow['introduction']" v-if="dialogShow['introduction']" v-on:hideModal="hideDialog" :introId="nowId" />
  </div>
</template>
<script>
import carousel from "@/components/carousel";
import concentrate from "@/components/concentrate";
import scenicCard from "@/components/scenicCard";
import travelsCard from "@/components/travelsCard";
import introductionCard from "@/components/introductionCard";
import dialogScenic from "@/components/dialogScenic";
import dialogIntroduction from "@/components/dialogIntroduction";
import gql from "graphql-tag";
export default {
  components: {
    carousel,
    concentrate,
    scenicCard,
    travelsCard,
    introductionCard,
    dialogScenic,
    dialogIntroduction
  },
  created () {
    this.getScenic();
    this.getIntroduction();
    this.getTravel();
  },
  data () {
    return {
      dialogShow: { scenic: false, travels: false, introduction: false },
      scenicList: [],
      scenic: '',
      ScenicImgList: [],
      nowId: 0,
      introductionList: [],
      travelsList: []
    };
  },
  methods: {
    ShowDialog: function (typeName, id) {
      this.nowId = parseInt(id);
      if (typeName == "scenic") {
        this.dialogShow.scenic = true;
      } else if (typeName == "travels") {
        this.dialogShow.travels = true;
      } else if (typeName == "introduction") {
        this.dialogShow.introduction = true;
      }
      // this.$store.commit("setShowDialogStatus", true);
      // this.$store.commit('setScrollTop', document.scrollingElement.scrollTop);
    },
    hideDialog: function (typeName) {
      if (typeName == "scenic") {
        this.dialogShow.scenic = false;
      } else if (typeName == "travels") {
        this.dialogShow.travels = false;
      } else if (typeName == "introduction") {
        this.dialogShow.introduction = false;
      }
      // this.$store.commit("setShowDialogStatus", false);
      // this.$store.commit('setScrollTop', document.scrollingElement.scrollTop);
    },
    getScenic () {
      this.$apollo.addSmartQuery("scenics", {
        query: gql`
        query scenics {
          scenics {
            sid
            name
            main_img
            describe
            is_hot
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
              is_hot: data.data.scenics[i].is_hot,
              img: this.GLOBAL.api_url + data.data.scenics[i].main_img
            });
          }
          this.scenicList = temp;
        }
      });
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
              author: data.data.introductions[i].author,
              main_img: this.GLOBAL.api_url + data.data.introductions[i].main_img,
              created_at: data.data.introductions[i].created_at
            });
          }
          this.introductionList = temp;
        }
      });
    },
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
              start_date: this.dateFormat(data.data.travels[i].start_date),
              main_img: this.GLOBAL.api_url + data.data.travels[i].main_img,
              user_name: data.data.travels[i].users.name,
              img_count: data.data.travels[i].img_list.length,
              avatar_src: data.data.travels[i].users.avatar_src ? this.GLOBAL.api_url + data.data.travels[i].users.avatar_src : '',
            });
          }
          this.travelsList = temp;
        }
      });
    },
    dateFormat (data) {
      return data.split(" ")[0];
    }
  }
};
</script>

<style scoped>
#home {
  min-height: 500px;
  padding-bottom: 50px;
}
#concentrate {
  height: 150px;
  width: 81%;
  margin: 0 auto;
  margin-top: 30px;
}
#scenic,
#introduction,
#travels {
  width: 70%;
  margin: 50px auto;
  background-color: #fff;
}
#scenic {
  height: 720px;
  /* border: 1px solid gray; */
}
#introduction {
  /* border: 1px solid gray; */
  height: 450px;
}
#travels {
  height: 415px;
  /* border: 1px solid gray; */
}
.title-bar {
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #eceef3;
  margin: 15px 0;
  padding: 5px 20px;
}
.title-icon {
  font-size: 50px;
  color: rgb(3, 169, 244);
}
.title {
  display: block;
  flex: 1;
  font-size: 25px;
  color: #333333;
  padding: 5px 0;
  margin-left: 10px;
}
#scenic .content {
  display: flex;
  height: 600px;
  margin: 5px;
}
#scenic .right-content {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(2, 50%);
  grid-template-columns: repeat(3, 30%);
  justify-content: center;
  grid-row-gap: 1.5%;
  grid-column-gap: 1.5%;
}
#introduction .introduction-content {
  display: grid;
  height: 380px;
  margin: 0 auto;
  width: 98%;

  position: relative;
  top: 50%;
  margin-top: -225px;

  grid-template: repeat(2, 1fr) / repeat(4, 1fr);
  grid-template-areas:
    "a0 a0 a1 a2"
    "a0 a0 a3 a4";
  justify-content: center;
  grid-row-gap: 1.5%;
  grid-column-gap: 1.5%;
}
#introduction .introduction-item {
  overflow: hidden;
}
#travels .travels-content {
  /* width: 80%; */
  flex: 1;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
}

.g-item {
  border: 2px solid #eceef3;
  margin: 5px;

  overflow: hidden;
}
#travels .g-item {
  margin-bottom: 20px;
  width: 200px;
  height: 300px;
  flex-shrink: 0;
}
.g-item:hover {
  border: 2px solid rgb(41, 182, 246);
  box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.5);
}
.left-content {
  width: 20%;
  height: 100%;
  padding: 20px;
  /* border: 1px solid #eceef3; */
}

.left-content ul {
  list-style: none;
  margin-top: 10px;
}

.left-content li > a {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #9e9e9e;
  /* border: 1px solid green; */
  width: 100%;
}
.l-con-title {
  font-weight: 500;
  font-size: 16px;
  color: black;
  cursor: pointer;
}
.l-con-des {
  width: 200px;
  margin-left: 10px;
  font-weight: 300;
  font-size: 14px;
  cursor: pointer;
}
.l-con-des:hover {
  color: rgb(77, 208, 225);
}
.left-content a {
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
}
.more {
  color: rgb(56, 142, 60);
  font-size: 18px;
}

#introduction .title > span {
  color: gray;
  margin: 0 20px;
}
.release {
  color: rgb(0, 188, 212);
  font-size: 24px;
  font-weight: 400;
}
</style>
