<template>
  <div id="scenic_card">
    <img :src="cardInfo.img" alt="" />
    <div class="con">
      <span class="con-title">{{cardInfo.city}}</span>
      <span class="desc">{{cardInfo.desc}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cardInfo: Object
  }
}
</script>
<style scoped>
#scenic_card {
  position: relative;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
img {
  height: 100%;
  width: 100%;
  transition: 0.5s;
}

#scenic_card:hover .con {
  bottom: 0px;
}
#scenic_card:hover img {
  transform: scale(1.05);
}
#scenic_card .con {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -80px;
  /* width: 95%; */
  height: 100px;
  padding: 10px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, transparent),
    color-stop(1, rgba(0, 0, 0, 0.9))
  );
  /* background-color: rgba(250, 250, 250, 0.2);
  box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.5); */
  z-index: 3;
  transition: 0.5s;
}
.con-title {
  color: white;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
}
.con .desc {
  display: -webkit-box;
  font-weight: 300;
  color: white;
  word-wrap: break-word;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>