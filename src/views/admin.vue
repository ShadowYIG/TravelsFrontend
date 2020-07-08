<template>
  <div id="admin">
    <el-tabs tab-position="left">
      <el-tab-pane label="基本状态" v-if="false">基本状态</el-tab-pane>
      <el-tab-pane label="用户管理">
        <userManage />
      </el-tab-pane>
      <el-tab-pane label="主页设置">
        <adminMainPage />
      </el-tab-pane>
      <el-tab-pane label="景点设置">
        <adminScenic />
      </el-tab-pane>
      <el-tab-pane label="攻略设置">
        <adminIntro />
      </el-tab-pane>
      <el-tab-pane label="游记设置" v-if="false">
        <adminTravel />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import userManage from "@/components/userManage";
import adminMainPage from "@/components/adminMainPage";
import adminScenic from "@/components/adminScenic";
import adminIntro from "@/components/adminIntro";
import adminTravel from "@/components/adminTravel";
export default {
  components: {
    userManage,
    adminMainPage,
    adminScenic,
    adminIntro,
    adminTravel
  }
}
</script>
<style scoped>
</style>