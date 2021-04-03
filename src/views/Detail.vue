<template>
  <div>
    <div class="icon-box">
      <span @click="black"><i class="el-icon-back"></i></span>
      <strong>商品详情</strong>
      <span @click="toCart"><i class="el-icon-shopping-cart-full"></i></span>
    </div>
    <span class="fixbox item-center">
      <strong>产品型号：</strong><span>{{ detailData.lname }}</span>
    </span>
    <el-divider></el-divider>
    <el-carousel
      trigger="click"
      height="250pz"
      indicator-position="none"
      arrow="nerver"
    >
      <el-carousel-item
        v-for="(item, index) of detailData.picList"
        :key="index"
      >
        <img
          id="box-img"
          :src="'http://101.96.128.94:9999/' + item.md"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
    <el-divider></el-divider>

    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '10px' }">
          <h3 style="text-align:left">{{ detailData.title }}</h3>
          <div style="padding: 5px;">
            <span style="text-align:left">{{ detailData.subtitle }}</span>
            <div class="bottom clearfix">
              <time class="time">￥{{ detailData.price }}</time>
              <el-button type="primary" round @click="addCart()"
                >加入购物车</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <span class="fixbox">
      <strong>CPU：</strong><span>{{ detailData.cpu }}</span>
    </span>
    <el-divider></el-divider>

    <span class="fixbox">
      <strong>内存：</strong><span>{{ detailData.memory }}</span></span
    >

    <el-divider></el-divider>
    <span class="fixbox"
      ><strong>硬盘：</strong><span>{{ detailData.disk }}</span></span
    >
    <el-divider></el-divider>
    <span class="fixbox"
      ><strong>系统：</strong><span>{{ detailData.os }}</span></span
    >
    <el-divider></el-divider>
    <span class="fixbox"
      ><strong class="promise-item">承诺：</strong
      ><span class="promise">{{ detailData.promise }}</span></span
    >
    <el-divider></el-divider>
    <span class="fixbox"
      ><strong>显卡：</strong><span>{{ detailData.video_card }}</span></span
    >
    <el-divider></el-divider>
    <span class="fixbox"
      ><strong>显存：</strong><span>{{ detailData.video_memory }}</span></span
    >
    <el-divider></el-divider>
    <span class="fixbox"
      ><strong>上市时间：</strong
      ><span>{{
        this.$moment(parseInt(detailData.shelf_time)).format("YYYY-MM")
      }}</span></span
    >
    <el-divider></el-divider>
    <p id="desc" v-html="detailData.details">{{ detailData.details }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailData: [],
      currentDate: new Date(),
    };
  },
  methods: {
    addCart() {
      const url = `/api/data/cart/add.php?buyCount=1&lid=${this.$route.query.id}`;
      console.log(url);
      this.axios.get(url, { withCredentials: true }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$alert("添加成功", "提示", {
            confirmButtonText: "确定",
            callback: () => {
              this.$message({
                type: "success ",
                message: `成功加入购物车`,
              });
            },
          });
        }
      });
    },
    black() {
      this.$router.go(-1);
    },
    toCart() {
      this.$router.push("/cart");
    },
  },
  created() {
    const url = `http://101.96.128.94:9999/data/product/details.php?lid=${this.$route.query.id}`;
    this.axios.get(url).then((res) => {
      // console.log(res);
      this.detailData = res.data.details;
      this.detailData.details = res.data.details.details.replace(
        /src="img/g,
        'src="http://101.96.128.94:9999/img'
      );
      this.detailData.details = res.data.details.details.replace(
        /src="\/\/img20/g,
        'src="https://img20'
      );
    });
  },
};
</script>

<style scoped>
#box-img {
  width: 100%;
  height: 100%;
}
#box-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.time {
  font-size: 22px;
  color: rgb(57, 128, 255);
  font-weight: bold;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fixbox {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
}
.promise {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.promise-item {
  white-space: nowrap;
}
.item-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-weight: bold;
  font-size: 18px;
}
.icon-box {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 22px;
  box-shadow: 0px 1px 5px #888888;
  background-color: #fff;
  z-index: 20;
}
.icon-box span {
  font-size: 32px;
}
</style>
<style>
#desc img {
  width: 100%;
}
.el-message-box {
  width: 50% !important;
}
</style>
