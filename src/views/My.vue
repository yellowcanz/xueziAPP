<template>
  <div>
    <div class="icon-box">
      <span @click="black"><i class="el-icon-back"></i></span>
      <strong>用户登录</strong>
    </div>

    <el-card class="box-card">
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="uname"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input type="password" v-model="upwd"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" @click="login">登录</el-button>
      </el-form>
    </el-card>

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
      selected: "4",
      labelPosition: "left",
      uname: "",
      upwd: "",
    };
  },
  methods: {
    login() {
      const url = "/api/data/user/login.php";
      const params = {
        uname: this.uname,
        upwd: this.upwd,
      };
      const options = {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      };
      // const cookies = {};
      this.axios
        .post(
          url,
          this.qs.stringify(params),
          { withCredentials: true },
          options
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$alert("登录成功", "提示", {
              confirmButtonText: "确定",
            }).then(() => {
              this.$router.push("/");
            });
          } else {
            this.$alert("用户名或密码失败", "提示", {
              confirmButtonText: "确定",
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
};
</script>

<style scoped>
.el-form-item {
  margin-top: 20px;
}
.el-button--medium {
  width: 100%;
  margin: 20px 0;
}
.box-card {
  margin: 60px 0;
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
