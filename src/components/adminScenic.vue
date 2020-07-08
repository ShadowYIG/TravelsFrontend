<template>
  <div class="admin_scenic">
    <el-table :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      " style="width: 800px">
      <el-table-column label="景点名称" width="180" prop="name">
      </el-table-column>
      <el-table-column label="主图" width="250">
        <template slot-scope="scope">
          <img class="scenic-img" :src="api_url + scope.row.main_img" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="加入时间" prop="create_at"> </el-table-column>
      <el-table-column label="热门景点">
        <template slot-scope="scope">
          {{ scope.row.is_hot ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="user"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pagesize" :total="scenicCount" layout="total, sizes, prev, pager, next, jumper" :hide-on-single-page="true">
    </el-pagination>
    <div style="height:1100px;">
      <div class="add-bar">
        <h1>加入景点</h1>
        <div class="add-main">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="true" :http-request="handleMainImgUpload" :multiple="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <span>主图</span>
          </el-upload>

          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="景点名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="热门景点">
              <el-radio v-model="formLabelAlign.is_Hot" label="1">是</el-radio>
              <el-radio v-model="formLabelAlign.is_Hot" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="游玩时长">
              <el-input-number v-model="formLabelAlign.play_time" :min="1" :max="100">
              </el-input-number>
            </el-form-item>

            <el-form-item label="推荐时间">
              <el-input v-model="formLabelAlign.recommend_time_s" placeholder="开始"></el-input>
              <el-input v-model="formLabelAlign.recommend_time_e" placeholder="结束"></el-input>
            </el-form-item>
            <el-form-item label="景点描述">
              <el-input type="textarea" v-model="formLabelAlign.describe" maxlength="200" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="景点建议">
              <el-input type="textarea" v-model="formLabelAlign.proposal" maxlength="200" show-word-limit></el-input>
            </el-form-item>
            <el-upload class="upload-scenic" action="" multiple ref="upload" :limit="3" :on-success="successUpload" :http-request="handleUpload" :auto-upload="false" :file-list="fileList" :on-exceed="handleExceed" list-type="picture-card">
              <span>其他图片</span>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过2M
              </div>
            </el-upload>
            <el-button class="submit-btn" type="primary" @click="handleSubmit">确定</el-button>
          </el-form>
        </div>
      </div>
    </div>
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
      api_url: this.GLOBAL.api_url,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      img_list: "",
      imageUrl: "",
      sid: "",
      fileList: [],
      scenicCount: 0,
      formLabelAlign: {
        name: "",
        recommend_time_s: 1,
        recommend_time_e: 1,
        main_img: "",
        is_hot: "1",
        play_time: "",
        describe: "",
        proposal: ""
      }
    };
  },
  methods: {
    showMore () {
      this.$apollo.queries.Scenicp.fetchMore({
        variables: {
          first: this.pagesize,
          page: this.currentPage
        },
        updateQuery: (tableData, { fetchMoreResult }) => {
          console.log(fetchMoreResult);
          this.tableData = [
            ...tableData.Scenicp.data,
            ...fetchMoreResult.Scenicp.data
          ];
          // console.log(fetchMoreResult);
        }
      });
    },

    handleSubmit () {
      let info = this.formLabelAlign;
      let that = this;
      if (
        info.name == "" ||
        info.main_img == "" ||
        info.is_hot == "" ||
        info.play_time == "" ||
        info.describe == "" ||
        info.proposal == "" ||
        info.recommend_time_s == "" ||
        info.recommend_time_e == ""
      ) {
        this.$message({
          type: "error",
          message: "请填写完整!"
        });
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($data: CreateSceincInput!) {
                createScenic(input: $data) {
                  sid
                }
              }
            `,
            variables: {
              data: {
                name: info.name,
                main_img: info.main_img,
                is_hot: info.is_hot == "1" ? true : false,
                play_time: info.play_time,
                recommend_time_s: info.recommend_time_s,
                recommend_time_e: info.recommend_time_e,
                describe: info.describe,
                proposal: info.proposal,
                users_uid: this.$store.state.userInfo.uid
              }
            }
          })
          .then(data => {
            that.sid = data.data.createScenic.sid;
            this.$refs.upload.submit();
          });
      }
    },
    handleMainImgUpload ({ file }) {
      let that = this;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($files: [Upload!]!, $type: String) {
              uploadFile(files: $files, type: $type)
            }
          `,
          variables: {
            type: "scenic",
            files: [file]
          }
        })
        .then(data => {
          console.log(data);
          that.formLabelAlign.main_img = data.data.uploadFile[0];
          that.imageUrl = that.GLOBAL.api_url + data.data.uploadFile[0];
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "图片上传失败"
          });
        });
    },
    handleExceed () {
      this.$message({
        type: "error",
        message: "最多上传3张图片!"
      });
    },
    handleUpload ({ file }) {
      console.log(file);
      if (!file) {
        return;
      }
      let that = this;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($sid: ID!, $files: [Upload!]!) {
              uploadScenicFile(sid: $sid, files: $files)
            }
          `,
          variables: {
            sid: that.sid,
            files: [file]
          }
        })
        .then(data => {
          console.log(data);
          let temp = [];
          for (i in data.data.uploadScenicFile) {
            temp.push({
              name: i,
              url: that.GLOBAL.api_url + data.data.uploadFile[i]
            });
          }
        })
        .catch(error => {
          // this.$message({
          //   type: "error",
          //   message: "图片上传失败"
          // });
        });
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      // if (currentPage * this.pagesize < this.tableData) {

      // }
      this.currentPage = currentPage;
      this.showMore();

    },
    successUpload () {
      this.$message({
        type: "success",
        message: "上传成功"
      });
    }
  },
  apollo: {
    // 简单的查询，将更新 'hello' 这个 vue 属性
    scenicCount: gql`
      {
        scenicCount
      }
    `,
    Scenicp: {
      // GraphQL 查询
      query: gql`
        query Scenicp($page: Int!, $first: Int!) {
          Scenicp(page: $page, first: $first) {
            data {
              sid
              name
              main_img
              is_hot
              created_at
              users {
                name
              }
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
      // update: data => data.Scenicp
    }
  }
};
</script>
<style scoped>
.scenic-img {
  position: relative;
  height: 120px;
  width: 200px;
}
.add-bar {
  position: absolute;
  border: 1px solid gray;
  width: 500px;
  top: 10px;
  right: 50px;
  /* height: 700px; */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.add-bar h1 {
  text-align: center;
}

.avatar-uploader {
  height: 180px;
  width: 180px;
  border: 1px dashed gray;
  margin: 30px auto;
  border-radius: 6px;
  margin-bottom: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed gray;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-scenic {
  margin: 20px 0;
}
</style>
