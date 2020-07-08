<template>
  <div id="introduction_card">
    <img :src="cardInfo.main_img" alt="" />
    <div class="con">
      <span class="con-title">{{cardInfo.name}}</span>
      <span class="desc">
        <img class="avatar" :src="cardInfo.avatar_src?cardInfo.avatar_src:this.GLOBAL.default_avator" alt="">
        <div class="introduction-info">
          <p>
            <span class="user-name">{{cardInfo.user_name}}</span>
            <span>|</span>
            <span class="date">{{cardInfo.start_date}}</span>
          </p>
          <p>
            <span class="total-day">共{{cardInfo.play_time}}天</span>
            <span>|</span>
            <span class="total-photo">{{cardInfo.img_count}}张照片</span>
          </p>
        </div>
      </span>
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
#introduction_card {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;
  transition: 0.5s;
  object-fit: fill;
}

#introduction_card:hover img {
  transform: scale(1.02);
}
#introduction_card .con {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -60px;
  height: 80px;
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
#introduction_card:hover .con {
  bottom: 0px;
}
.con-title {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  color: white;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300;
}
.con .desc {
  display: flex;
}
.con .desc > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid white;
}
.introduction-info {
  margin-left: 10px;
}

.con .desc > .introduction-info span {
  color: rgb(224, 224, 224);
  font-weight: 300;
  display: inline-block;
  *display: inline;
  *zoom: 1;
  vertical-align: middle;
}
.con .desc > .introduction-info .user-name {
  color: white;
  font-weight: 500;
}
.con .desc > .introduction-info .user-name,
.con .desc > .introduction-info .total-day {
  width: 70px;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.con .desc > .introduction-info .date {
  font-weight: 300;
}
</style>