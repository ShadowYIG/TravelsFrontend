<template>
  <div class="slide-show" @mouseover="cleanInv" @mouseout="invIndex">
    <div class="slide-img">
      <transition name="slide-trans">
        <img v-if="isShow" :src="dataList[nowIndex]" />
      </transition>
      <transition name="slide-trans-old">
        <img v-if="!isShow" :src="dataList[nowIndex]" />
      </transition>
    </div>
    <div class="slide-bar">
      <ul>
        <li v-for="(item, index) in dataList" :key="index">
          <img :src="item" :class="{ imgon: index === nowIndex }" @mouseenter="goto(index)" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    };
  },

  methods: {
    goto (index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      }, 10);
    },
    invIndex () {
      this.invId = setInterval(() => {
        // this.goto(this.nextIndex);
        if (this.nowIndex < this.dataList.length - 1) {
          this.goto(this.nowIndex + 1);
        } else {
          this.goto(0);
        }
      }, 2000);
    },
    cleanInv () {
      clearInterval(this.invId); //清除自动轮播
    }
  },
  mounted () {
    this.invIndex(); //自动轮播
  }
};
</script>
<style scoped>
.slide-trans-enter-active {
  transition: all 0.8s;
}
.slide-trans-enter {
  transform: translateX(720px);
}
.slide-trans-old-leave-active {
  transition: all 0.8s;
  transform: translateX(-720px);
}
.slide-show {
  position: relative;
  /* margin: 15px 15px 15px 0; */
  width: 720px;
  height: 420px;
  /* border-radius: 10px; */
  overflow: hidden;
}
.slide-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.slide-bar {
  height: 70px;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
}
.slide-bar ul {
  position: absolute;
  right: 10px;
  top: 10px;
}
.slide-bar li {
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
}
.slide-bar img {
  width: 100px;
  height: 50px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  background-color: #fff;
  opacity: 0.5;
}
.slide-bar img:hover {
  border: 2px solid rgb(255, 167, 38);
  opacity: 1;
}
.slide-bar li .imgon {
  border: 2px solid rgb(255, 167, 38);
  opacity: 1;
}
</style>
