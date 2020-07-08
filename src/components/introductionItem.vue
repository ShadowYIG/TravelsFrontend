<template>
  <div>
    <div class="intro-pic">
      <img :src="introInfo.main_img" alt="">
    </div>
    <h5 class="city-name">{{introInfo.name}}&nbsp;|&nbsp;{{introInfo.name_en}}</h5>

  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  props: {
    introInfo: Object
  },
  methods: {

  }
}
</script>
<style scoped>
.intro-pic {
  border: 1px solid rgb(180, 180, 180);
  height: 250px;
  width: 180px;
  cursor: pointer;
}
.intro-pic > img {
  height: 240px;
  width: 170px;
  padding: 5px;
}
.city-name {
  color: gray;
  font-weight: 200;
  margin: 5px 0;
}
</style>