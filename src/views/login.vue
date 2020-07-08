<template>
  <div id="login">
    <div class="login-box" ref="login">
      <div class="title-box">
        <span id="title">登陆</span>
      </div>
      <div class="form-box">
        <form action="" method="POST" @submit.prevent="login">
          <ul>
            <li><input type="text" placeholder="E-mail" autocomplete="off" v-model="loginInfo.username"></li>
            <li><input type="password" placeholder="密码" autocomplete="off" v-model="loginInfo.password"></li>
            <!-- <li>
              <input id="code" type="text" placeholder="验证码">
              <img src="../assets/img/vcode.jpg" alt="验证码" width="90px" height="35px" autocomplete="off">
            </li> -->
            <li><button id="login_btn" type="submit">登陆</button><button @click="toRegister()" id="register_btn">去注册</button></li>
          </ul>
        </form>
      </div>
    </div>
    <div class="register-box" ref="register">
      <div class="title-box">
        <span id="title">注册</span>
      </div>
      <div class="form-box">
        <form action="" method="POST" @submit.prevent="register">
          <ul>
            <li><input type="text" placeholder="用户名" v-model="registerInfo.name"></li>
            <li><input type="password" placeholder="密码" v-model="registerInfo.password"></li>
            <li><input type="password" placeholder="确认密码" v-model="registerInfo.password_confirmation"></li>
            <li><input type="text" placeholder="邮箱" v-model="registerInfo.email"></li>
            <!-- <li>
              <input id="code" type="text" placeholder="验证码">
              <img src="../assets/img/vcode.jpg" alt="验证码" width="90px" height="35px">
            </li> -->
            <li><button id="register_btn">注册</button><button @click="toLogin()" id="login_btn">去登陆</button></li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import { onLogin } from '../vue-apollo'
export default {
  data () {
    return {
      loginInfo: { username: '', password: '' },
      registerInfo: { name: "", email: "", password: "", password_confirmation: "" },
      me: null,
    }
  },
  methods: {
    toRegister () {
      this.$refs.register.style.transform = "rotateY(0deg)";
      this.$refs.login.style.transform = "rotateY(180deg)";
    },
    toLogin () {
      this.$refs.register.style.transform = "rotateY(180deg)";
      this.$refs.login.style.transform = "rotateY(0deg)";
    },
    checkLogin () {
      if (this.loginInfo.username == "" || this.loginInfo.password == "") {
        return false;
      } else {
        return true;
      }
    },
    checkRegister () {
      if (this.registerInfo.name == "" || this.registerInfo.email == "" || this.registerInfo.password == "" || this.registerInfo.password_confirmation == "") {
        return false;
      } else if (this.registerInfo.password != this.registerInfo.password_confirmation) {
        this.$message({
          showClose: true,
          message: '两次密码不匹配',
          type: 'error'
        });
        return false;
      } else if (!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.registerInfo.email)) {
        this.$message({
          showClose: true,
          message: '邮箱格式错误',
          type: 'error'
        });
        return false;
      } else if (this.registerInfo.password.lenght < 8) {
        this.$message({
          showClose: true,
          message: '密码需大于8位',
          type: 'error'
        });
        return false;
      } else {
        return true;
      }
    },
    login () {
      if (!this.checkLogin()) {
        return
      }
      this.$apollo.mutate({
        mutation: gql`mutation($data: LoginInput!) {
        login(input:$data){
          access_token
        }
      }`,
        variables: {
          data: this.loginInfo
        },
      }).then((data) => {
        onLogin(this.$apollo.provider.defaultClient, data.data.login.access_token)
        this.$store.isLogin = true;
        this.$router.push('/home');
        window.location.reload();
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: '账号或密码错误',
          type: 'error'
        });
      })
    },
    register () {
      if (!this.checkRegister()) {
        return
      }
      this.$apollo.mutate({
        mutation: gql`mutation($data: RegisterInput!){
          register(input:$data){
            tokens{
              access_token
            }
          }
        }`,
        variables: {
          data: this.registerInfo,
        }
      }).then((data) => {
        onLogin(this.$apollo.provider.defaultClient, data.data.register.tokens.access_token)
        this.$store.isLogin = true;
        this.$router.push('/home');
        this.$message({
          showClose: true,
          message: '注册成功',
          type: 'success'
        });
        window.location.reload();
      }).catch((error) => {
        this.$message({
          showClose: true,
          message: '注册失败，数据异常',
          type: 'error'
        });
      })
    }
  },

}
</script>
<style>
#login {
  background-image: url("../assets/img/login-bg.jpg");
  background-repeat: no-repeat;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
.login-box,
.register-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid rgb(59, 232, 255);
  height: 500px;
  width: 450px;
  border-radius: 30px;
  background-color: #69899065;
  perspective: 10000;
  backface-visibility: hidden;
  transition: all 1s;
}
.register-box {
  transform: rotateY(180deg);
}
.title-box {
  /* border: 1px solid green; */
  border-radius: 30px 30px 0 0;
  height: 120px;
  text-align: center;
}
#title {
  color: white;
  line-height: 120px;
  font-weight: 300;
  font-size: 2.5em;
}
.form-box {
  /* border: 1px solid gray; */
  text-align: center;
  margin: 30px 0;
}
.register-box .form-box {
  margin: 0 0;
}
ul {
  list-style: none;
}
li {
  margin-top: 5px;
}
input {
  background: none;
  border: none;
  outline: none;
  border-bottom: 2px solid rgba(140, 158, 255, 0.6);
  height: 40px;
  width: 250px;
  padding: 0 5px;
  line-height: 40px;
  font-size: 20px;
  color: white;
  transition: 0.5s;
}
input:focus {
  border-bottom: 2px solid rgba(69, 97, 253, 1);
}

button {
  height: 50px;
  width: 150px;
  background: none;
  border-radius: 25px;
  margin: 0 30px;
  margin-top: 50px;
  color: white;
  font-size: 15px;
  outline: none;
}
.register-box button {
  margin-top: 30px;
}
#login_btn {
  border: 1px solid rgb(178, 255, 89);
}
#register_btn {
  border: 1px solid rgb(255, 238, 88);
}
#login_btn:hover {
  background-color: rgba(178, 255, 89, 0.445);
}
#register_btn:hover {
  background-color: rgba(255, 238, 88, 0.418);
}
/*验证码图片 */
#code {
  width: 150px;
  vertical-align: bottom;
  margin-right: 10px;
}
/**提示颜色 */
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgb(207, 207, 207);
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgb(207, 207, 207);
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(207, 207, 207);
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(207, 207, 207);
}
</style>