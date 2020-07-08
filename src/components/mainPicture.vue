<template>
  <div>

    <div class="default-img">
      <img v-if="imageUrl" :src="imageUrl" class="main-img" @click="selectImg()">
      <div v-else class="main-img-btn" @click="selectImg()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wuuiconxiangjifangda"></use>
        </svg>
        <span>上传主图</span>
        <input id="fileupload" name="mainImg" ref="file" type="file" accept="image/jpeg,image/png" multiple="multiple"
          @change="showImg" style="display:none;" />

      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      imgList: ""
    };
  },
  methods: {
    showImg: function (e) {
      if (e.target.files) {
        this.imageUrl = URL.createObjectURL(e.target.files[0]);
        this.imgList = e.target.files[0];
      }

    },
    selectImg: function () {
      this.$refs.file.click();
    }
  }
}
</script>
<style  scoped>
.default-img {
  position: relative;
  height: 500px;
  margin: 0 auto;
  /* border: 1px solid gray; */
  background-image: url("../assets/img/addTravelsBg.jpg");
}
.main-img-btn {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 60px;
  width: 200px;
  margin: auto;
  border: 1px dashed gray;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.main-img {
  /* position: absolute; */
  /* left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  height: 100%;
  width: 100%;
}
.icon {
  margin: 0 20px;
  color: rgb(0, 188, 212);
  font-size: 50px;
}
</style>