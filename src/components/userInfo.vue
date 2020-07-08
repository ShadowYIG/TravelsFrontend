<template>
  <div id="user_info" v-if="isLogin">
    <!-- <img id="avatar" :src="userInfo.avatar_src?userInfo.avatar_src:this.$store.state.default_avater" alt="头像"
      v-if="!isChange"> -->
    <el-upload class="avatar-uploader" action="" :auto-upload="true" :http-request="handleAvatarUpload"
      :multiple="false" :show-file-list="false">
      <!-- :before-upload="beforeAvatarUpload" -->
      <img id="avatar"
        :src="this.$store.state.userInfo.avatar?this.GLOBAL.api_url+userInfo.avatar:this.GLOBAL.default_avator">
      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
    </el-upload>
    <form action="" method="post" @submit.prevent="ChangeInfo">
      <table>
        <tr>
          <td>UID:</td>
          <td>{{userInfo.uid}}</td>
        </tr>
        <tr>
          <td>昵称:</td>
          <td>
            <span v-if="!isChange">{{userInfo.userName}}</span>
            <input v-else type="text" name="userName" v-model="tempUserInfo.userName"
              @change="VerificationInfo($event,'userName')" autocomplete="off">
          </td>
        </tr>
        <tr>
          <td>邮箱:</td>
          <td>
            <span v-if="!isChange">{{userInfo.email}}</span>
            <input v-else type="text" name="email" v-model="tempUserInfo.email"
              @change="VerificationInfo($event,'email')" autocomplete="off">
          </td>
        </tr>
        <tr>
          <td>手机号码:</td>
          <td>
            <span v-if="!isChange">{{!userInfo.phone?'暂未填写':userInfo.phone}}</span>
            <input v-else type="text" name="phone" v-model="tempUserInfo.phone"
              @change="VerificationInfo($event,'phone')" autocomplete="off">
          </td>

        </tr>
        <tr>
          <td>注册时间:</td>
          <td>{{regtime}}</td>
        </tr>
        <tr>
          <td>注册天数:</td>
          <td>{{regday}}天</td>
        </tr>
        <tr>
          <td colspan="2"><button class="change-btn" type="submit">{{isChange?'保存':'修改'}}</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  data () {
    return {
      isChange: false,
      tempUserInfo: { 'userName': '', 'phone': '', 'email': '' },
      imageUrl: ''
    }
  },
  methods: {
    ChangeInfo () {
      if (this.isChange) {//修改当中，需要保存
        let playload = {}
        if (this.tempUserInfo.userName != this.$store.state.userInfo.userName) {
          playload.name = this.tempUserInfo.userName
        }
        if (this.tempUserInfo.phone != this.$store.state.userInfo.phone) {
          playload.phone = this.tempUserInfo.phone
        }
        if (this.tempUserInfo.email != this.$store.state.userInfo.email) {
          playload.email = this.tempUserInfo.email
        }
        console.log(playload)
        if (this.CheckForm()) {
          this.$apollo.mutate({
            mutation: gql`mutation($data: UpdateUserInfoInput!){
              updateUserInfo(input:$data){
                name
                email
                phone
              }
            }`,
            variables: {
              data: {
                uid: this.$store.state.userInfo.uid,
                ...playload
              }
            },
          }).then((data) => {
            console.log(data)
            this.$store.state.userInfo.email = data.data.updateUserInfo.email;
            this.$store.state.userInfo.userName = data.data.updateUserInfo.name;
            this.$store.state.userInfo.phone = data.data.updateUserInfo.phone;
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.isChange = false;
            window.location.reload();
          }).catch((error) => {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            });
            console.log(error);
          })

        }
      } else {
        this.tempUserInfo.userName = this.$store.state.userInfo.userName;
        this.tempUserInfo.phone = this.$store.state.userInfo.phone;
        this.tempUserInfo.email = this.$store.state.userInfo.email;
        this.isChange = true;
      }
    },
    VerificationInfo (e, type) {
      let reg = '';
      console.log(e.path[0].value)
      if (type == "email") {
        reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      } else if (type == "phone") {
        reg = new RegExp("^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$");
      } else if (type == "userName") {
        reg = new RegExp("^[a-zA-Z\u4E00-\u9FA5]+$");
      }
      if (e.path[0].value === "") {
        e.path[0].style.border = "1px solid red";
        this.$message.error('不允许为空！');
        return false
      } else if (!reg.test(e.path[0].value)) {
        e.path[0].style.border = "1px solid red";
        this.$message.error('输入非法！');
        return false
      } else if (type == "userName" && e.path[0].value.length >= 6) {
        e.path[0].style.border = "1px solid red";
        this.$message.error('昵称不允许超过6个字符');
        return false
      } else {
        e.path[0].style.border = "1px solid gray";
        return true
      }

    },
    CheckForm () {
      if (!(this.tempUserInfo.userName && this.tempUserInfo.phone && this.tempUserInfo.email)) {
        this.$message.error('不允许为空！');
        return false;
      } else {
        if (!RegExp("^[a-zA-Z_-\u4E00-\u9FA5]+$").test(this.tempUserInfo.userName) && this.tempUserInfo.userName.length > 6) {
          this.$message.error('昵称不允许超过6个字符,且不能存在非法字符');
          return false;
        } else if (!RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(this.tempUserInfo.email)) {
          this.$message.error('邮箱错误');
          return false;
        } else if (!RegExp("^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$").test(this.tempUserInfo.phone)) {
          this.$message.error('手机号错误');
          return false;
        } else {
          return true;
        }
      }

    },
    handleAvatarUpload ({ file }) {
      // this.imageUrl = URL.createObjectURL(file);
      this.$apollo.mutate({
        mutation: gql`mutation($uid: ID!, $file: Upload!) {
            ChangeAvator(uid: $uid,file:$file) 
          }
        `,
        variables: {
          uid: this.$store.state.userInfo.uid,
          file: file
        }
      }).then((data) => {
        let fileList = data.data.upload;
        console.log(data)
        this.$store.state.userInfo.avatar = fileList
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin;
    },
    userInfo () {
      return this.$store.state.userInfo;
    },
    regday () {
      return parseInt((Date.parse(new Date()) - new Date(this.$store.state.userInfo.regtime).getTime()) / (1000 * 24 * 60 * 60));
    },
    regtime () {
      console.log(new Date(this.$store.state.userInfo.regtime).getTime())
      return new Date(new Date(this.$store.state.userInfo.regtime).getTime()).format("yyyy年MM月dd日");
    }
  },
}
</script>
<style scoped>
#user_info {
  margin-left: 200px;
  /* border: 1px solid gray; */
}
#user_info #avatar {
  display: block;
  /* margin: 0 auto; */
  height: 160px;
  width: 160px;
  border-radius: 50%;
  border: 1px solid gray;
}
#user_info table {
  /* width: 400px; */
  margin-top: 40px;
}
table tr td {
  height: 30px;
}
table tr td:nth-child(1) {
  width: 120px;
  font-weight: bold;
}
#user_info .change-btn {
  width: 120px;
  height: 40px;
  margin-left: 40px;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 10px;
  outline: none;
}
#user_info input {
  height: 22px;
  outline: none;
  border: 1px solid gray;
}
#user_info input:focus {
  box-shadow: 0 0 2px 2px rgb(3, 169, 244);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
</style>