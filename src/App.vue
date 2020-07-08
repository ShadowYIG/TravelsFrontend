<template>

  <div id="app" :class="showDialog?'scrollDisable':''+{'top':scrollTop+'px'}">
    <el-backtop></el-backtop>
    <mynav v-show="isNavShow()" />
    <transition mode="out-in">
      <router-view v-bind:style="{minHeight: Height+'px'}"></router-view>
    </transition>

    <div v-show="isNavShow()" class="footer">
      <footer>
        <myfoot />
      </footer>
    </div>
    <!-- 回到顶部 -->
  </div>
</template>

<script>
import mynav from "./components/nav";
import myfoot from "./components/foot";
import gql from 'graphql-tag'
export default {
  name: "app",
  data () {
    return {
      Height: 0
    }
  },
  components: {
    mynav,
    myfoot
  },
  mounted () {
    //动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 100;
    //监听浏览器窗口变化　
    window.onresize = () => { this.Height = document.documentElement.clientHeight - 100 }
  },
  methods: {
    isNavShow () {
      let arr = [
        "home",
        "about",
        "introduction",
        "scenic",
        "user",
        "travels",
        "addTravels",
        "travelsdetail",
        "admin"
      ];
      let index = arr.length;
      while (index--) {
        if (this.$route.name === arr[index]) {
          return true;
        }
      }
      return false;
    }
  },
  computed: {
    showDialog () {
      return this.$store.state.showDialog
    },
    scrollTop () {
      return this.$store.state.scrollTop
    }
  },
  created: function () {
    if (localStorage.getItem('apollo-token')) {
      this.$apollo.addSmartQuery('me', {
        query: gql`query{
          me{
            uid
            userName:name
            email
            phone
            isAdmin:is_admin
            adminLevel:admin_level
            avatar:avatar_src
            travelCount:travel_count
            regtime:created_at
          }
        }`,
        result (response) {
          console.log(response)
          this.$store.commit('login', response.data.me);
        },

      })
    }

  }
};
</script>

<style>
/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

/* 样式处理 */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
* {
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
}
.footer {
  position: absolute;
  width: 100%;
  margin-top: 40px;
}
.v-enter {
  opacity: 1;
  transform: translateX(-500px);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
/* 禁止滚动 */
.scrollDisable {
  overflow: hidden;
  position: fixed !important;
  width: 100%;
}
</style>
