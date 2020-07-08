<template>
  <div class="admin_scenic">
    <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 840px">
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="英文名称" prop="name">
      </el-table-column>
      <el-table-column label="主图" width="180">
        <template slot-scope="scope">
          <img class="scenic-img" :src="api_url + scope.row.main_img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="国家" prop="country">
      </el-table-column>
      <el-table-column label="作者" prop="name">
      </el-table-column>
      <el-table-column label="下载链接" prop="file_src">
      </el-table-column>
      <el-table-column label="加入时间" prop="created_at">
      </el-table-column>
      <el-table-column label="操作人" prop="users.name">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="width: 800px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pagesize" :total="introductionCount" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <div style="height:800px;">
      <div class="add-bar">
        <h1>添加攻略</h1>
        <div class="add-main">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="true" :http-request="handleMainImgUpload" :multiple="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <span>主图</span>
          </el-upload>

          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="中文名">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="英文名">
              <el-input v-model="formLabelAlign.name_en"></el-input>
            </el-form-item>
            <el-form-item label="国家">
              <el-input v-model="formLabelAlign.country"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="formLabelAlign.author"></el-input>
            </el-form-item>
            <el-form-item label="攻略描述">
              <el-input type="textarea" v-model="formLabelAlign.describe" maxlength="200" show-word-limit></el-input>
            </el-form-item>
            <el-upload class="upload-scenic" action="" multiple ref="upload" :limit="1" :http-request="handleUpload" :auto-upload="false" :file-list="fileList" :on-exceed="handleExceed" list-type="text">
              <span>点击上传攻略文件</span>
              <div slot="tip" class="el-upload__tip">
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
      tableData: [],
      api_url: this.GLOBAL.api_url,
      currentPage: 1,
      pagesize: 10,
      imageUrl: '',
      fileList: [],
      iid: 0,
      introductionCount: 0,
      formLabelAlign: {
        name: '',
        name_en: '',
        country: '',
        author: '',
        describe: '',
        main_img: ''
      }
    }
  },
  methods: {
    showMore () {
      this.$apollo.queries.introductionp.fetchMore({
        variables: {
          first: this.pagesize,
          page: this.currentPage
        },
        updateQuery: (tableData, { fetchMoreResult }) => {
          // console.log(this.tableData);
          this.tableData = [
            // ...tableData.introductionp.data,
            ...fetchMoreResult.introductionp.data
          ];
          // console.log(this.tableData);
        }
      });
    },
    handleDelete (index, row) {
      this.$confirm(
        `你确定要将 名称：${row.name}  删除吗?(该操作不可逆)`,
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
                mutation($iid: ID!) {
                  deleteIntroduction(iid: $iid) {
                    iid
                    name
                  }
                }
              `,
              variables: {
                iid: row.iid
              }
            })
            .then(data => {
              this.$message({
                type: "success",
                message: "该攻略已删除!"
              });
              this.showMore()
              // window.location.reload();
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "error",
                message: "攻略删除失败，攻略不存在或权限不足!"
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
      if (currentPage * this.pagesize < this.tableData()) {
        this.showMore();
      }
      this.currentPage = currentPage;
    },
    handleExceed () {
      this.$message({
        type: "error",
        message: "最多上传1个文件!"
      });
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
            type: "introduction",
            files: [file]
          }
        })
        .then(data => {
          // console.log(data);
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
    handleSubmit () {
      let info = this.formLabelAlign;
      let that = this;
      if (
        info.name == "" ||
        info.main_img == "" ||
        info.name_en == "" ||
        info.country == "" ||
        info.author == "" ||
        info.describe == ""
      ) {
        this.$message({
          type: "error",
          message: "请填写完整!"
        });
      } else {
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($data: CreateIntroductionInput!) {
                createIntroduction(input: $data) {
                  iid
                }
              }
            `,
            variables: {
              data: {
                ...info,
                users_uid: this.$store.state.userInfo.uid
              }
            }
          })
          .then(data => {
            that.iid = data.data.createIntroduction.iid;
            this.$refs.upload.submit();
          });
      }
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
            mutation($iid: ID!, $file: Upload!) {
              introductionFileUpload(iid: $iid, file: $file)
            }
          `,
          variables: {
            iid: that.iid,
            file: file
          }
        })
        .then(data => {
          // console.log(data);
          this.fileList = [{ name: file.name, url: data.data.introductionFileUpload }];
          this.$message({
            type: "success",
            message: "上传成功"
          });
        })
        .catch(error => {
          // this.$message({
          //   type: "error",
          //   message: "图片上传失败"
          // });
        });
    },
  },
  apollo: {
    // 简单的查询，将更新 'hello' 这个 vue 属性
    introductionCount: gql`
      {
        introductionCount
      }
    `,
    introductionp: {
      // GraphQL 查询
      query: gql`
        query introductionp($page: Int!, $first: Int!) {
          introductionp(page: $page, first: $first) {
            data {
              iid
              name
              main_img
              name_en
              country
              file_src
              author
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
      }
    }
  }
}
</script>
<style scoped>
.scenic-img {
  position: relative;
  height: 150px;
  width: 100px;
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