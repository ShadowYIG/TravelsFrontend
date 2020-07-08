<template>
  <div>
    <el-table :data="
        searchData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      " style="width: 100%" stripe>
      <el-table-column label="UID" prop="uid"> </el-table-column>
      <el-table-column label="用户名" prop="userName"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{ scope.row.phone ? scope.row.phone : "未设置" }}
        </template>
      </el-table-column>
      <el-table-column label="是否管理">
        <template slot-scope="scope">
          {{ scope.row.isAdmin ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column label="用户级别">
        <template slot-scope="scope">
          {{
            scope.row.isAdmin
              ? scope.row.adminLevel == 5
                ? "超级管理"
                : "普通管理"
              : "用户"
          }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          {{dateFormat(scope.row.regtime)}}
        </template>

      </el-table-column>
      <!-- <el-table-column label="最后登陆时间" prop="lastlogin">
      </el-table-column> -->
      <el-table-column align="right" width="350px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="设置/取消管理" placement="bottom">
            <el-button size="mini" type="primary" @click="handleSetAdmin(scope.$index, scope.row)">管理</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="重置密码" placement="bottom">
            <el-button size="mini" type="warning" @click="handleResetPwd(scope.$index, scope.row)">重置</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除用户" placement="bottom">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pagesize" :total="userCount" layout="total, sizes, prev, pager, next, jumper" :hide-on-single-page="true">
    </el-pagination>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  mounted: function () {
    this.showMore();
  },
  data () {
    return {
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      search: '',
    };
  },
  methods: {
    showMore () {
      this.$apollo.queries.userPage.fetchMore({
        variables: {
          first: this.pagesize,
          page: this.currentPage
        },
        updateQuery: (tableData, { fetchMoreResult }) => {
          this.tableData = [
            ...tableData.users.data,
            ...fetchMoreResult.users.data
          ];
        }
      });
    },
    handleResetPwd (index, row) {
      this.$confirm(
        `你确定要将 uid:${row.uid}  用户名：${row.userName}  用户密码重置吗?(该操作不可逆)`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation($uid: ID!) {
                  resetPassword(uid: $uid) {
                    uid
                    name
                  }
                }
              `,
              variables: {
                uid: row.uid
              }
            })
            .then(data => {
              this.$message({
                type: "success",
                message: "重置成功，默认密码为：12345678!"
              });
              window.location.reload();
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleDelete (index, row) {
      this.$confirm(
        `你确定要将 uid:${row.uid}  用户名：${row.userName}  用户删除吗?(该操作不可逆)`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation($uid: ID!) {
                  deleteUser(uid: $uid) {
                    uid
                    name
                  }
                }
              `,
              variables: {
                uid: row.uid
              }
            })
            .then(data => {
              this.$message({
                type: "success",
                message: "用户已删除!"
              });
              // window.location.reload();
              this.showMore()
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "error",
                message: "用户删除失败，用户不存在或权限不足!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSetAdmin (index, row) {
      let usertype = row.isAdmin == true ? "取消管理" : "设为管理";
      this.$confirm(
        `你确定要将 uid:${row.uid}  用户名：${row.userName}  用户${usertype}吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation($uid: ID!, $is_admin: Boolean) {
                  ChangeAdmin(uid: $uid, is_admin: $is_admin) {
                    uid
                    name
                  }
                }
              `,
              variables: {
                uid: row.uid,
                is_admin: !row.isAdmin
              }
            })
            .then(data => {
              this.$message({
                type: "success",
                message: `用户已${usertype}!`
              });
              window.location.reload();
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "error",
                message: `用户${usertype}失败，用户不存在或权限不足!`
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.showMore();


    },
    dateFormat (data) {
      return data.split(" ")[0];
    }
  },
  computed: {
    searchData: function () {
      return this.tableData.filter(data => {
        return (
          !this.search ||
          data.username.toLowerCase().includes(this.search.toLowerCase()) ||
          data.uid.toString().includes(this.search.toLowerCase())
        );
      });
    }
  },
  apollo: {
    // 简单的查询，将更新 'hello' 这个 vue 属性
    userCount: gql`
      {
        userCount
      }
    `,
    userPage: {
      // GraphQL 查询
      query: gql`
        query users($page: Int!, $first: Int!) {
          users(page: $page, first: $first) {
            data {
              uid
              userName: name
              email
              phone
              isAdmin: is_admin
              adminLevel: admin_level
              travelCount: travel_count
              regtime: created_at
            }
            paginatorInfo {
              currentPage
              lastPage
            }
          }
        }
      `,
      variables: {
        first: 10,
        page: 1
      },
      update: data => data.users
    }
  }
};
</script>
<style scoped></style>
