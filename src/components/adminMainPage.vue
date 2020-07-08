<template>
  <div id="MainPage">
    <h1>主页轮播图设置</h1>
    <el-upload class="uploader" ref="upload" action="" :on-remove="handleRemove" :file-list="fileList" :auto-upload="true" list-type="picture-card" accept="image/jpeg,image/png" :limit="8" :on-exceed="handleCountOverflow" :http-request="handleUpload">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <!-- <el-button
        class="upload-btn"
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器
      </el-button> -->
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过4M
      </div>
    </el-upload>
    <!-- <input type="file" id="fileMutiply" name="files" multiple="multiple"> -->
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  created: function () {
    this.getFileList(this);
  },
  data () {
    return {
      fileList: [],
      tempList: [],
    };
  },
  methods: {
    handleUpload ({ file }) {
      console.log(file);
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($file: Upload!, $type: String) {
              createGlobalImg(file: $file, type: $type) {
                img_id
                img_src
                name
              }
            }
          `,
          variables: {
            file: file,
            type: "main"
          }
        })
        .then(data => {
          let fileSrc = data.data.createGlobalImg;
          this.fileList.push({
            name: fileSrc.img_id,
            url: this.GLOBAL.api_url + fileSrc.img_src
          });
          // window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleRemove (file, fileList) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($imgId: ID!) {
              deleteGlobalImg(imgId: $imgId)
            }
          `,
          variables: {
            imgId: parseInt(file.name)
          }
        })
        .then(data => {
          if (data.data.deleteGlobalImg == true) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error"
          });
        });
      this.getFileList(this);
    },
    handleCountOverflow (file, fileList) {
      this.$message({
        showClose: true,
        message: "最多上传8张图哦！",
        type: "error"
      });
    },
    getFileList (that) {
      this.$apollo.addSmartQuery("tempList", {
        query: gql`
          query PublicImgByType($type: String!) {
            PublicImgByType(type: $type) {
              url: img_src
              img_id
            }
          }
        `,
        // 静态参数
        variables: {
          type: "main"
        },
        update: data => data.PublicImgByType,
        result (response) {
          let tmp = [];
          for (let d in response.data.PublicImgByType) {
            tmp.push({
              name: response.data.PublicImgByType[d].img_id,
              url: that.GLOBAL.api_url + response.data.PublicImgByType[d].url
            });
          }
          that.fileList = tmp;
        }
      });
    }
  },

};
</script>
<style scoped>
#MainPage {
  margin: 50px;
}
.uploader {
  margin: 100px;
}
.upload-btn {
  display: block;
}
</style>
