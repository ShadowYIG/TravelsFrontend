<template>
  <div id="user">
    <h1>个人中心</h1>
    <div class="user-containers">
      <el-tabs tab-position="left">
        <el-tab-pane label="个人信息">
          <userInfo />
        </el-tab-pane>
        <el-tab-pane label="已发布游记">
          <userTravelList />
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <changePwd />
        </el-tab-pane>
        <el-tab-pane label="退出登陆">
          <button class="logout-btn" @click="logout">退出登陆</button>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import userInfo from "@/components/userInfo";
import changePwd from "@/components/changePwd";
import userTravelList from "@/components/userTravelList";
import gql from 'graphql-tag'
import { onLogout } from '../vue-apollo'
export default {
  components: {
    userInfo,
    changePwd,
    userTravelList
  },
  methods: {
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
  }
}
</script>
<style scoped>
#user {
  width: 70%;
  margin: 50px auto;
  position: relative;
  min-height: 600px;
}

.user-containers {
  /* width: 90%; */
  margin: 50px auto;
}
.logout-btn {
  width: 120px;
  height: 40px;
  margin-left: 40px;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 10px;
  outline: none;
}
</style>