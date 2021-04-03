<template>
  <div>
    <div class="icon-box">
      <span @click="black"><i class="el-icon-back"></i></span>
      <strong>商品详情</strong>
    </div>
    <div class="box-card">
      <el-card>
        <div class="text item" v-for="(item, index) of cartList" :key="index">
          <div class="box-L">
            <div class="msg-L">
              <span class="title">{{ item.title }}</span>
              <span class="desc">{{ item.spec }}</span>
            </div>
          </div>
          <div class="prcie">￥{{ item.price }}</div>
          <div class="box-btn">
            <div class="btn-R">
              <el-button
                type=""
                icon="el-icon-minus"
                circle
                @click="updateCount(index, -1)"
              ></el-button>
              <span>{{ item.count }}</span>
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                @click="updateCount(index, 1)"
              ></el-button>
            </div>
          </div>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="doDel(index)"
          ></el-button>
        </div>
      </el-card>

      <el-card class="card-box">
        <div class="settlement">
          <div>
            <strong>总计：</strong
            ><span v-if="total">￥{{ total.toFixed(2) }}</span>
          </div>
          <el-button type="primary">去结算</el-button>
        </div>
      </el-card>
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
      selected: "3",
      cartList: [],
    };
  },
  methods: {
    updateCount(index, aas) {
      //快速解包写法  获取iid 和 count
      const { iid, count } = this.cartList[index];
      // count 返回的是字符串类型
      const url = `/api/data/cart/update_count.php?iid=${iid}&count=${1 *
        count +
        aas}`;
      this.axios.get(url).then((res) => {
        if (res.data.code == 200) {
          this.cartList[index].count = 1 * count + aas + "";
        }
        console.log(res.data);
      });
    },
    doDel(index) {
      const iid = this.cartList[index].iid;
      console.log(iid);
      const url = "/api/data/cart/del.php?iid=" + iid;
      console.log(index);
      this.axios.get(url, { withCredentials: true }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$confirm("确定删除此商品吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.cartList.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        }
      });
    },
    black() {
      this.$router.go(-1);
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
    total() {
      let sum = 0;
      for (var money of this.cartList) {
        sum += money.price * money.count;
      }
      return sum;
    },
  },
  created() {
    const url = "/api/data/cart/list.php";
    this.axios.get(url, { withCredentials: true }).then((res) => {
      this.cartList = res.data.data;
      console.log(this.cartList);
    });
  },
};
</script>

<style scoped>
.el-button.is-circle {
  padding: 8px;
}
.card-box {
  width: 100%;
}
.settlement {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.settlement > div > strong {
  font-size: 22px;
}
.settlement > div > span {
  font-size: 18px;
  font-weight: bold;
  color: rgb(57, 128, 255);
}
.title {
  font-size: 18px;
  font-weight: bold;
}

.prcie {
  font-weight: bold;
  font-size: 18px;
  color: rgb(57, 128, 255);
  flex: 1;
  margin: 0 5px;
}
.btn-R {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.btn-R span {
  width: 20px;
}
.box-L > .msg-L > span {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.msg-L {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
  margin-right: 5px;
}

.text {
  font-size: 14px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px dotted #c9c6c6;
}

.box-card {
  width: 100%;
  margin: 56px 0;
}
.icon-box {
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  font-size: 22px;
  box-shadow: 0px 1px 5px #888888;
  background-color: #fff;
  z-index: 20;
}
.icon-box span {
  font-size: 32px;
  margin-right: 35px;
}
</style>
