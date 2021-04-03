<template>
  <div>
    <!-- //banner轮播图 -->
    <div class="block">
      <el-carousel trigger="click" height="200px">
        <el-carousel-item v-for="(item, index) of banner" :key="index">
          <img
            id="banner"
            :src="'http://101.96.128.94:9999/' + item.img"
            alt=""
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- banner轮播图结束 -->

    <!-- //main内容 -->
    <div id="main">
      <el-row :gutter="18">
        <el-col
          :span="12"
          v-for="(item, index) of newArrivalItems"
          :key="index"
          type="flex"
          justify="space-around"
          ><div class="grid-content bg-purple">
            <img
              id="main-img"
              :src="'http://101.96.128.94:9999/' + item.pic"
              alt=""
            />
            <h3>{{ item.title }}</h3>
            <span id="details">{{ item.details }}</span>
            <span id="price">{{ item.price }}</span
            ><br />
            <el-button type="primary">查看详情</el-button>
          </div></el-col
        >
      </el-row>
    </div>
    <!-- //main内容结束 -->

    <!-- //底部导航 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1">
        <img
          src="../assets/xuangou-xuanzhong.png"
          slot="icon"
          v-if="selected == '1'"
        />
        <img src="../assets/xuangou-moren.png" slot="icon" v-else />选购
      </mt-tab-item>
      <mt-tab-item id="2" @click.native="to()">
        <img
          src="../assets/fenlei-xuanzhong.png"
          slot="icon"
          v-if="selected == '2'"
        />
        <img src="../assets/fenlei-moren.png" slot="icon" v-else />分类
      </mt-tab-item>
      <mt-tab-item id="3" @click.native="to()" class="tabItem3">
        <div class="detailCount"></div>
        <img
          src="../assets/gouwuche-xuanzhong.png"
          slot="icon"
          v-if="selected == '3'"
        />
        <img src="../assets/gouwuche-moren.png" slot="icon" v-else />购物车
      </mt-tab-item>
      <mt-tab-item id="4" @click.native="to()">
        <img
          src="../assets/wo-xuanzhong.png"
          slot="icon"
          v-if="selected == '4'"
        />
        <img src="../assets/wo-moren.png" slot="icon" v-else />我的
      </mt-tab-item>
    </mt-tabbar>
    <!-- //底部导航结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商品数据接收
      prolist: [],
      banner: [],
      //一楼数据
      newArrivalItems: [],
      selected: "1",
    };
  },
  methods: {
    to() {
      if (this.selected == "1") {
        this.$router.push("/");
      } else if (this.selected == "2") {
        this.$router.push("/pro");
      } else if (this.selected == "3") {
        this.$router.push("/cart");
      } else {
        this.$router.push("/my");
      }
    },
  },

  mounted() {
    this.axios
      .get("http://101.96.128.94:9999/data/product/index.php")
      .then((res) => {
        this.prolist = res.data;
        this.banner = this.prolist.carouselItems;
        this.newArrivalItems = this.prolist.newArrivalItems;
      });
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-row {
  margin-bottom: 20px;
  margin: 20px 0 !important;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
#main {
  margin-bottom: 55px;
}
#main-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  transform: scale(0.8);
}
h3 {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#details {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
#price {
  display: inline-block;
  color: rgb(57, 128, 255);
  font-size: 18px;
  margin: 10px 0;
}
.grid-content[data-v-23543608] {
  margin-bottom: 20px;
}
.el-button {
  margin: 0 0 10px 0;
}
</style>
