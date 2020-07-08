<template>
  <div id="change_pwd">
    <table>
      <tr>
        <td>当前密码：</td>
        <td><input type="password" name="prePwd" v-model="prePwd" ref="prePwd" @change="VerPwd"></td>
      </tr>
      <tr>
        <td>修改密码：</td>
        <td><input type="password" name="Pwd" v-model="Pwd" ref="Pwd" @change="VerPwd"></td>
      </tr>
      <tr>
        <td>确认密码：</td>
        <td><input type="password" name="surePwd" v-model="surePwd" ref="surePwd" @change="VerPwd"></td>
      </tr>
      <tr>
        <td colspan="2"><button @click="SubmitPwd">确认修改</button></td>
      </tr>
    </table>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  data () {
    return {
      prePwd: "",
      Pwd: "",
      surePwd: "",
    }
  },
  methods: {
    SubmitPwd () {
      if (this.CheckPwd()) {
        this.$apollo.mutate({
          mutation: gql`mutation($data: UpdatePassword!) {
            updatePassword(input:$data){
              status
              message
            }
          }`,
          variables: {
            data: {
              old_password: this.prePwd,
              password: this.Pwd,
              password_confirmation: this.surePwd
            }

          },
        }).then((data) => {
          this.$message({
            showClose: true,
            message: data.updatePassword.message,
            type: 'success'
          });
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: '原密码不正确',
            type: 'error'
          });
        })
      }
    },
    VerPwd (e) {
      if (e.path[0].name == 'prePwd') {
        if (this.prePwd == "") {
          e.path[0].style.border = "1px solid red";
          this.$message.error('密码不允许为空！');
        } else {
          e.path[0].style.border = "1px solid gray";
        }


      } else if (e.path[0].name == 'Pwd') {
        if (this.Pwd == "") {
          e.path[0].style.border = "1px solid red";
          this.$message.error('密码不允许为空！');
        } else if (this.Pwd.length < 8) {
          e.path[0].style.border = "1px solid red";
          this.$message.error('密码不得小于8位');
        } else {
          e.path[0].style.border = "1px solid gray";
        }


      } else if (e.path[0].name == 'surePwd') {
        if (this.surePwd != this.Pwd) {
          e.path[0].style.border = "1px solid red";
          this.$message.error('确认密码不匹配！');
        } else {
          e.path[0].style.border = "1px solid gray";
        }

      }
    },
    CheckPwd () {
      if (this.prePwd == "") {
        this.$message.error('密码不允许为空！');
        return false;
      } else if (this.Pwd == "" || this.Pwd.length < 6) {
        this.$message.error('修改密码需大于6位！');
        return false;
      } else if (this.surePwd != this.Pwd) {
        this.$message.error('确认密码不匹配！');
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>
<style scoped>
#change_pwd {
  margin-left: 200px;
}
#change_pwd tr {
  height: 40px;
}
#change_pwd tr td:nth-child(1) {
  font-size: 18px;
}
#change_pwd tr input {
  height: 25px;
  width: 200px;
  line-height: 25px;
  font-size: 18px;
  border: 1px solid gray;
  border-radius: 5px;
  padding-left: 5px;
}
#change_pwd input:focus {
  box-shadow: 0 0 2px 2px rgb(3, 169, 244);
}
#change_pwd button {
  width: 120px;
  height: 40px;
  margin-left: 40px;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 10px;
  outline: none;
}
</style>