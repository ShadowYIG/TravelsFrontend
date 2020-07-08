<template>
  <div id="concentrate_bar" ref="container_bar">
    <div :style="{ left: preLeft + 'px' }" class="scoll-bar" ref="preBar">
      <ul v-on:mouseover="stopmove()" v-on:mouseout="move()">
        <li class="marquee" v-for="item in conList.slice(0, 5)" :key="item.id" @click="dialogShow(item.id)">
          <div class="con-item">
            <img :src="item.img" alt="" />
            <!-- <img src="../assets/img/index.jpg" alt=""> -->
            <div class="content">
              <span>{{ item.name }}</span>
              <div>{{ item.content }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div :style="{ left: afterLeft + 'px' }" class="scoll-bar" ref="afterBar"></div>
    <dialogScenic :show="Showdialog" v-on:hideModal="hideDialog" v-if="Showdialog" :scenicId="nowId" />
  </div>
</template>
<script>
import dialogScenic from "@/components/dialogScenic";
import gql from "graphql-tag";
export default {
  name: "concentrate",
  components: {
    dialogScenic
  },
  props: {
    // conList: Array
  },
  data () {
    return {
      preLeft: 0,
      afterLeft: 0,
      conWidth: 0,
      Showdialog: false,
      conList: [],
      nowId: 0,
      scenics: ""
    };
  },
  created () {

  },
  mounted () {
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
            name: data.data.scenics[i].name,
            content: data.data.scenics[i].describe,
            img: this.GLOBAL.api_url + data.data.scenics[i].main_img
          });
        }

        this.conList = temp;
        this.conWidth = temp.length * 390;
        if (temp.length > 6) {
          this.conWidth = 5 * 390;
        }

        this.$refs.preBar.style.width = this.conWidth + "px";
        if (this.conList.length > 4) {
          // 大于4个才滚动
          this.$refs.afterBar.innerHTML = this.$refs.preBar.innerHTML;
          this.$refs.afterBar.style.width = this.conWidth + "px";
          this.$refs.afterBar.style.left = this.conWidth + "px";
          this.afterLeft = this.conWidth;
          this.move();
        } else {
          //居中显示
          this.$refs.preBar.style.left = "0";
          this.$refs.preBar.style.right = "0";
          this.$refs.preBar.style.margin = "auto";
        }
      }
    });

  },
  methods: {
    //移动
    move () {
      if (this.conList.length > 4) {
        this.timer = setInterval(this.starmove, 2000);
      }
    },
    //开始移动
    starmove () {
      this.preLeft -= 390;
      this.afterLeft -= 390;
      if (this.preLeft <= -this.conWidth) {
        this.preLeft = this.conWidth;
      } else if (this.afterLeft <= -this.conWidth) {
        this.afterLeft = this.conWidth;
      }
    },
    //鼠标悬停时停止移动
    stopmove () {
      if (this.conList.length > 4) {
        clearInterval(this.timer);
      }
    },
    dialogShow (id) {
      this.nowId = parseInt(id);
      this.Showdialog = true;
    },
    hideDialog () {
      this.Showdialog = false;
    }
  }
};
</script>
<style scoped>
/* 走马灯效果 */

#concentrate_bar {
  position: relative;
  overflow: hidden;
  height: 160px;
}
.scoll-bar {
  position: absolute;
  height: 100%;
}
.scoll-bar ul {
  position: absolute;
  display: inline;
  /* white-space: nowrap; */
}

.scoll-bar ul > li {
  display: inline-block;
  margin-right: 35px;
  margin-left: 5px;
  list-style: none;
}

/* 卡片布局 */
.con-item {
  display: flex;
  /* border: 1px solid green; */
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 140px;
  margin-top: 5px;
  align-items: center;
  cursor: pointer;
}
.con-item:hover {
  box-shadow: 0 2px 10px 0 rgb(41, 182, 246);
}
img {
  width: 180px;
  height: 120px;
  margin: 10px;
}
.content {
  display: flex;
  height: 100%;
  width: 150px;
  /* border: 1px solid red; */
  flex-direction: column;
  /* overflow: hidden; */
}
.content > span:nth-child(1) {
  height: 25px;
  font-weight: 400;
  font-size: 20px;
}
.content > div {
  display: -webkit-box;
  width: 90%;
  height: 82px;
  margin: 10px 0;
  /* border: 1px solid yellow; */
  font-weight: 200;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
