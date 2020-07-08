<template>
  <div id="index">
    <img src="../assets/img/title1.png" alt="">
    <img src="../assets/img/title2.png" alt="">
    <button @click="gotolink">GO→</button>
  </div>
</template>
<script>
export default {

  methods: {
    gotolink () {
      this.$router.replace('/home')
    }
  }

}
</script>
<style scoped>
#index {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background: url("../assets/img/index.jpg");
}

img:nth-child(1) {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
}
img:nth-child(2) {
  position: absolute;
  left: 60%;
  top: 30%;
  transform: translate(-50%, -50%);
}
button {
  position: absolute;
  height: 50px;
  width: 150px;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 25px;
  font-family: "Lato", sans-serif;
  background-image: linear-gradient(to left, #5ee7df 0%, #b490ca 100%);
  transition: box-shadow 0.2s;
  outline: none;
}
button:hover {
  box-shadow: 0 0 30px 0 #b490ca;
}
</style>