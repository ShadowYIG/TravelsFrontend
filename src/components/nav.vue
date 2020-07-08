<template>
  <div id="nav" ref="nav">
    <div class="left-box">
      <ul>
        <li v-for="(item, i) in getNav" :key="i">
          <router-link :to="item.path" v-if="item.pos === 'left'">{{
            item.navItem
          }}</router-link>
        </li>
      </ul>
    </div>
    <div class="avatar-box" v-if="this.$store.state.isLogin" v-on:mouseleave="showInfoBar(false)">
      <img id="avatar"
        :src="this.$store.state.userInfo.avatar?this.GLOBAL.api_url+userInfo.avatar:this.GLOBAL.default_avator" alt="头像"
        @click="showInfoBar(true)" />
      <span>{{userInfo.userName}}</span>
    </div>
    <div class="avatar-menu" v-if="isShowInfoBar" v-on:mouseenter="showInfoBar(true)"
      v-on:mouseleave="showInfoBar(false)">
      <ul>
        <li>{{userInfo.userName}}</li>
        <li>
          <router-link :to="'/user/'+userInfo.uid">个人中心</router-link>
        </li>
        <li @click="logout">退出登陆</li>
      </ul>
    </div>
    <div class="right-box" v-if="!this.$store.state.isLogin">
      <ul>
        <li v-for="(item, i) in getNav" :key="i">
          <router-link :to="item.path" v-if="item.pos === 'right'">{{
            item.navItem
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onLogout } from '../vue-apollo'
export default {
  data () {
    return {
      navList: [
        { path: "/home", navItem: "首页", pos: "left", active: true, needAdmin: false },
        { path: "/scenic", navItem: "景点", pos: "left", active: true, needAdmin: false },
        { path: "/introduction", navItem: "攻略", pos: "left", active: true, needAdmin: false },
        { path: "/travels", navItem: "游记", pos: "left", active: true, needAdmin: false },
        { path: "/admin", navItem: "管理", pos: "left", active: true, needAdmin: true },
        { path: "/about", navItem: "关于", pos: "left", active: true, needAdmin: false },
        { path: "/user/login", navItem: "登陆", pos: "right", active: true, needAdmin: false }

        // { path: '/user/register', navItem: '注册', pos: 'right', active: true },
      ],
      isShowInfoBar: false,
    };
  },
  computed: {
    // isLogin () {
    //   return this.$store.state.isLogin;
    // },
    userInfo () {
      return this.$store.state.userInfo
    },
    getNav () {
      if (this.$store.state.userInfo && this.$store.state.userInfo.isAdmin && this.$store.state.isLogin) {
        return this.navList;
      } else {
        return this.navList.filter(item => {
          return item.needAdmin == false;
        })
      }
    }
  },
  methods: {
    showShadow () {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll === 0) {
        this.$refs.nav.style.boxShadow = "0px 0px 0px 0px rgba(0, 0, 0, 0.5)";
      }
      if (scroll > 0) {
        this.$refs.nav.style.boxShadow = "0px 2px 10px 0px rgba(0, 0, 0, 0.5)";
      }
    },
    showInfoBar (value) {
      this.isShowInfoBar = value;
      console.log(value)
    },
    logout () {
      this.$confirm('你确定要退出登陆吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('logout');
        onLogout(this.$apollo.provider.defaultClient);
        this.$message({
          type: 'success',
          message: '退出登陆成功!'
        });
        this.$router.push({ path: '/home' });
        window.location.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登陆'
        });
      });
    }
  },
  mounted () {
    window.addEventListener("scroll", this.showShadow);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#nav {
  /* position: relative; */
  background-color: #535c64;
  height: 60px;
  position: sticky;
  top: 0px;
  z-index: 10;
  /* box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5); */
}
.left-box {
  position: absolute;
  left: 100px;
}
.right-box {
  position: absolute;
  right: 30px;
}
li {
  float: left;
  list-style: none;
  height: 60px;
  line-height: 60px;
}
a {
  text-decoration: none;
  display: block;
  text-align: center;
  color: #ffffff;
  transition: background-color 1s, color 1s;
}
.left-box a {
  font-size: 1.2em;
  width: 100px;
  height: 57px;
}
.right-box a {
  font-size: 1em;
  width: 60px;
  height: 60px;
}
span {
  width: 100px;
  height: 57px;
  line-height: 57px;
}
.left-box .router-link-exact-active {
  color: #f9ca59;
  border-bottom: 3px solid #f9ca59;
  height: 57px;
}
.left-box a:hover {
  color: #f9ca59;
  border-bottom: 3px solid #f9ca59;
  background-color: rgb(59, 67, 73);
}
.left-box a:active {
  color: #f9ca59;
  border-bottom: 3px solid #f9ca59;
  height: 57px;
}
.avatar-box {
  position: absolute;
  width: 140px;
  right: 10px;
  top: 50%;
  margin-top: -18px;
  cursor: pointer;
}
.avatar-box > span {
  color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
#avatar {
  width: 36px;
  height: 36px;
  border: 1px solid gray;
  border-radius: 50%;
  margin-right: 5px;
}
.avatar-box:hover #avatar {
  border: 1px solid #f9ca59;
}
.avatar-menu {
  position: absolute;
  right: 72px;
  top: 60px;
  /* height: 50px; */
  width: 120px;
  background-color: #535c64;
  box-shadow: 0 0 2px 2px gray;
}
.avatar-menu:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -10px;
  left: 50px;
  border-right: solid 10px transparent;
  border-left: solid 10px transparent;
  border-bottom: solid 10px gray;
}
.avatar-menu ul {
  width: 80%;
  /* display: block; */
  margin: 0 auto;
}
.avatar-menu li {
  float: none;
  display: block;
  text-align: center;
  color: white;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid white;
}
.avatar-menu li:last-child {
  border: none;
  cursor: pointer;
}
</style>
