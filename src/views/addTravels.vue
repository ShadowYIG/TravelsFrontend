<template>
  <div id="add_travel">
    <mainPicture />
    <div class="add-travel-title">
      <h3>添加游记</h3>
    </div>
    <div class="edit-travels">
      <form method=post action="#" AUTOCOMPLETE="OFF">
        <div class="detail-info">
          <p><span class="detail-label title-label">游记标题：</span><input class="travel-title" name="title" type="text" />
          </p>
          <p><span class="detail-label">出发日期：</span><input class="travel-date" name="date" type="date" /><span class="detail-label label-sec">总天数：</span><input class="travel-total" name="total" type="text" />天</p>
          <p>
            <span class="detail-label">途径城市：</span>
            <ul>
              <li class="detail-list" v-for="(item,index) in cityList" :key="index">
                <input class="travel-city" :name="('city'+index)" v-model="cityList[index]" type="text" />
              </li>
              <li v-show="cityList.length<=6">
                <svg class="icon" aria-hidden="true" v-on:click="addItem('city')">
                  <use xlink:href="#icon-wuuiconxiangjifangda"></use>
                </svg>
              </li>
              <li v-show="cityList.length>1">
                <svg class="icon" aria-hidden="true" v-on:click="subItem('city')">
                  <use xlink:href="#icon-wuuiconsuoxiao"></use>
                </svg>
              </li>
            </ul>
          </p>
          <p><span class="detail-label">行程：</span>
            <ul>
              <li class="detail-list" v-for="(item,index) in scenicList" :key="index">
                <input class="travel-scenic" :name="('scenic'+index)" v-model="scenicList[index]" type="text" />
              </li>
              <li v-show="scenicList.length<=6">
                <svg class="icon" aria-hidden="true" v-on:click="addItem('scenic')">
                  <use xlink:href="#icon-wuuiconxiangjifangda"></use>
                </svg>
              </li>
              <li v-show="scenicList.length>1">
                <svg class="icon" aria-hidden="true" v-on:click="subItem('scenic')">
                  <use xlink:href="#icon-wuuiconsuoxiao"></use>
                </svg>
              </li>
            </ul>
          </p>

        </div>
        <editor-bar v-model="detail" :isClear="isClear"></editor-bar>
        <div class="btn-bar">
          <button class="updata-btn" @click="send">提交</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import EditorBar from "../components/weditor";
import mainPicture from "../components/mainPicture";
export default {
  components: { EditorBar, mainPicture },
  data () {
    return {
      isClear: false,
      detail: "",
      cityList: [''],
      scenicList: [''],
    };
  },
  methods: {

    send () {
      //处理富文本输入
      // alert(this.detail);
      console.log(this.detail)
    },
    subItem (type) {
      if (type == "city") {//大于一才删除
        if (this.cityList.length > 1) {
          this.cityList.pop();
        }
      } else {
        if (this.scenicList.length > 1) {
          this.scenicList.pop();
        }
      }
    },
    addItem (type) {//最多7个景点
      if (type == "city") {
        if (this.cityList.length <= 6) {
          this.cityList.push("");
        }

      } else {
        if (this.scenicList.length <= 6) {
          this.scenicList.push("");
        }
      }
    },
  }
};
</script>

<style>
#add_travel {
  position: relative;
  min-height: 500px;
}

.add-travel-title {
  width: 81%;
  margin: 40px auto;
}
.add-travel-title > h3 {
  display: inline-block;
  background: url("../assets/img/pic1.png") no-repeat right bottom;
  /* border: 1px solid gray; */
  /* float: left; */
  height: 42px;
  line-height: 32px;
  font-size: 20px;
  color: #999;
  padding-right: 30px;
}
.detail-info {
  width: 100%;
  height: 160px;
  margin-bottom: 30px;
  /* border: 1px solid gray; */
}
.detail-info > p {
  margin-bottom: 10px;
  font-weight: 100;
  font-size: 16px;
  line-height: 30px;
  height: 30px;
  color: gray;
}
.detail-info > p:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  color: black;
}

.detail-info .travel-title {
  width: 80%;
  height: 30px;
  font-size: 26px;
}
.detail-info input {
  border: 1px solid gray;
  border-radius: 5px;
  height: 26px;
  width: 80px;
  outline: none;
  padding-left: 10px;
  /* margin-right: 30px; */
}
.detail-info .travel-date {
  width: 100px;
}
.detail-info input:focus {
  border: 1px solid rgb(3, 169, 244);
  box-shadow: 0 0 2px 1px rgb(3, 169, 244);
}
.detail-info .detail-label {
  display: inline-block;
  width: 100px;
}

.detail-info .title-label {
  width: 100px;
}
.detail-info .label-sec {
  margin-left: 30px;
}
.detail-info ul {
  display: inline-block;
}
.detail-info li {
  list-style: none;
  display: inline-block;
}
.detail-info .detail-list {
  margin-left: 10px;
}
.detail-info .travel-date {
  width: 120px;
}
.icon {
  color: rgb(0, 188, 212);
  margin-left: 10px;
}
.edit-travels {
  width: 60%;
  margin: 30px auto;
}
.btn-bar {
  /* width: 81%; */
  margin: 0 auto;
  position: relative;
  height: 40px;
  margin-top: 30px;
}
.updata-btn {
  position: absolute;
  height: 40px;
  width: 150px;
  border: none;
  border-radius: 20px;
  right: 50px;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  outline: none;
}
.updata-btn:hover {
  box-shadow: 0 0 20px 2px #00f2fe;
}
</style>
