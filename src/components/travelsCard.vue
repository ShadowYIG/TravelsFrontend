<template>
  <div id="introduction_card">
    <img :src="cardInfo.main_img" alt="" />
    <div class="con">
      <span class="con-title">{{cardInfo.name}}</span>
      <span class="con-title-en">{{cardInfo.name_en}}</span>
      <div class="desc">
        <span class="author">作者：{{cardInfo.author}}</span>
        <span class="time">更新时间：{{cardInfo.created_at}}</span>
      </div>

      <button class="download" @click.stop="handleDownload">下 载</button>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  props: {
    cardInfo: Object
  },
  methods: {
    handleDownload () {
      console.log(1)
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($iid: ID!) {
              downloadIntroduction(iid: $iid)
            }
          `,
          variables: {
            iid: this.cardInfo.id,
          }
        })
        .then(data => {
          // console.log(data);
          window.open(this.GLOBAL.api_url + data.data.downloadIntroduction)
        }).catch(error => {
          this.$message({
            showClose: true,
            message: '未登录，无法下载',
            type: 'error'
          });
        });
    }
  },
}
</script>
<style scoped>
#introduction_card {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
img {
  /* width: 200px;
  height: 300px; */
  width: 100%;
  height: 100%;
  transition: 0.5s;
  transform: scale(1.02);
}

#introduction_card:hover .con {
  bottom: 0px;
}
#introduction_card:hover img {
  transform: scale(1.05);
}
.con {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -350px;
  /* bottom: 0px; */
  /* width: 90%; */
  height: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  /* transition: 0.5s; */
}
.con-title,
.con-title-en {
  position: absolute;
  top: 40px;
  left: 20px;
  color: white;
  /* font-weight: 600; */
  font-size: 32px;
  margin-bottom: 10px;
  display: block;
}
.con-title-en {
  top: 80px;
  color: white;
  font-size: 26px;
  display: block;
}
.con-title-en::after {
  content: "";
  display: block;
  width: 40px;
  margin-top: 10px;
  border-bottom: 2px solid white;
}
.con .desc {
  /* border: 1px solid gray; */
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 150px;
  left: 20px;
  width: 150px;
  height: 60px;
}
.con .desc > .author,
.con .desc > .time {
  color: white;
  margin-bottom: 3px;
  font-weight: 300;
}
.con .download {
  position: absolute;
  bottom: 30px;
  left: 20px;
  border: none;
  display: block;
  width: 100px;
  height: 40px;
  font-size: 18px;
  color: white;
  border: 1px solid white;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}
.con .download:hover {
  transform: scale(1.1);
}
</style>