<template>
  <div class="user_travel_list">
    <el-table :data="tableData" stripe style="width: 80%; margin: 0 auto;">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="date" label="发布时间" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import travelsItem from "@/components/travelsItem";
export default {
  components: {
    travelsItem
  },
  data () {
    return {
      tableData: [
        { 'title': "jfiodaj囧发角色i哦佛教覅哦奥收到回复i·1耦合i偶会哦会好uihiuhui会关于i关于i贵", 'date': "2020-02-02" }
      ]
    }
  }
}
</script>
<style scoped>
#user_travel_list {
  width: 80%;
}
</style>