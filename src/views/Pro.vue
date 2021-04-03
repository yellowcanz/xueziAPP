<template>
  <div id="main">
    <div class="infinite-list-wrapper" style="overflow:auto">
      <div
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disable"
        infinite-scroll-distance="20"
      >
        <div id="item-box" v-for="(item, index) of res.data" :key="index">
          <div id="img-box">
            <img :src="'http://101.96.128.94:9999/' + item.pic" alt="" />
          </div>
          <div id="wrap-box">
            <div id="wrap">
              <h3 id="title">{{ item.title }}</h3>
              <span>{{ item.price }}</span>
            </div>
          </div>

          <el-button type="primary" @click="toDetail(item.lid)">
            查看详情
          </el-button>
        </div>
      </div>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1" @click.native="to()">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "2",
      res: [],
      loading: false,
      page: 1,
      pageCount: 0,
      // way:
    };
  },
  methods: {
    toDetail(ID) {
      this.$router.push({
        path: "/detail",
        query: {
          id: ID,
        },
      });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        this.axios
          .get(
            "http://101.96.128.94:9999/data/product/list.php?pno=" + this.page
          )
          .then((res) => {
            this.pageCount = res.data.pageCount;
            res.data = this.res.data.concat(res.data.data);
            this.res = res;
          });
        this.loading = false;
      }, 1000);
    },
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
  computed: {
    noMore() {
      return this.page == this.pageCount;
    },
    disable() {
      return this.loading || this.noMore;
    },
  },

  mounted() {
    const url = "http://101.96.128.94:9999/data/product/list.php?pno=1";
    this.axios.get(url).then((res) => {
      this.res = res.data;
    });
  },
};
</script>

<style scoped>
#main {
  margin-bottom: 55px;
}
h3 {
  margin: 0;
}
#item-box {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10px;
  border-bottom: 1px dashed rgb(179, 178, 178);
}
#img-box {
  max-width: 84px;
  max-height: 84px;
  margin-right: 10px;
}
#img-box img {
  width: 100%;
  height: 100%;
}

#wrap-box #wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 10px;
}
#wrap-box #wrap #title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: flex-start;
  text-align: left;
}
#wrap-box #wrap span {
  color: rgb(57, 128, 255);
  font-weight: bold;
  font-size: 18px;
  align-self: flex-start;
}
</style>
