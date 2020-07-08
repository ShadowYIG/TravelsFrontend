<template>
  <div id="about">
    <div class="box">
      <h1 align="center">关于本站</h1>
      <p class="division">----------------------</p>
      <div class="desc">
        <p>2019学年第二学期WEB大作业</p>
        <p>本站仅作交流学习使用</p>
        <p>部分接口，以及资源源于网络</p>
        <p>侵权请联系</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'about'
}
</script>
<style scoped>
.box {
  width: 600px;
  height: 500px;
  border: 2px solid rgb(3, 169, 244);
  margin: 80px auto;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0 0 100px 20px rgba(3, 169, 244, 0.5);
}
.box > h1 {
  height: 80px;
  line-height: 80px;
}
.division {
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 10px;
  font-weight: 500;
  font-size: 30px;
}
.desc {
  /* border: 1px solid gray; */
  margin-top: 60px;
}
.desc > p {
  text-align: center;
  font-size: 26px;
  line-height: 50px;
}
</style>