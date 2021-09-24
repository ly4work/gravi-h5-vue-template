<template>
  <div class="pg-login">
    <div class="plogin-header">
      <div class="bg-pop">
        <div class="cir-l-b"></div>
        <div class="cir-r-t"></div>
      </div>
      <div>
        <!-- 手机号 header -->
        <div
          v-if="status === StatusEnum.PhoneInputing"
          class="plh-module plh-phone"
        >
          <div class="logo">
            <img src="@/assets/gravi.svg" alt="gravi-cli" />
          </div>
          <div class="title">请先登录</div>
          <div class="sub-title">输入您的手机号码</div>
        </div>
        <!-- 密码 header -->
        <div
          v-if="status === StatusEnum.PasswordInputing"
          class="plh-module plh-pwd"
        >
          <div class="logo"></div>
          <div class="title">请输入密码</div>
          <div class="sub-title"></div>
        </div>
        <!-- 验证码 header -->
        <div
          v-if="status === StatusEnum.SMSCodeInputing"
          class="plh-module plh-smscode"
        >
          <div class="logo"></div>
          <div class="title">请输入验证码</div>
          <div class="sub-title">
            验证码已发送至{{ mobile.replace(/\s+\d{4}\s+/g, " **** ") }}
          </div>
        </div>
      </div>
    </div>
    <div class="body-card">
      <div class="plogin-form-content" :class="`offest_${status}`">
        <!-- 输入手机号 -->
        <div
          class="plfc-module plfc-phone"
          v-if="true || status === StatusEnum.PhoneInputing"
        >
          <div class="ipt-box">
            <div class="code">+86</div>
            <input
              class="ipt"
              v-model="mobile"
              type="tel"
              ref="mobile"
              maxlength="13"
              @keyup="handlePhoneIptChange"
              @paste="handlePhoneIptChange"
            />
          </div>
          <md-button class="ope-btn" type="primary" @click="handleNext">
            下一步
          </md-button>
          <div class="mini-t">
            登录遇到问题
          </div>
        </div>
        <!-- 输入密码 -->
        <div
          class="plfc-module plfc-phone"
          v-if="true || status === StatusEnum.PasswordInputing"
        >
          <div class="ipt-box">
            <input
              class="ipt"
              v-model="password"
              :type="pwdHideStatus ? 'password' : 'text'"
              ref="mobile"
              minlength="6"
              maxlength="18"
              placeholder="6-18位密码"
            />
            <div class="pwd-fix" @click="handleCheckpwdHideStatus">
              <md-icon
                :name="pwdHideStatus ? 'invisible' : 'visible'"
                size="lg"
              />
            </div>
          </div>

          <div class="btn-group">
            <md-button
              :loading="isSubmiting"
              class="ok ope-btn"
              type="primary"
              @click="handleSubmit"
            >
              确定
            </md-button>
          </div>
          <div class="mini-t">
            <span>忘记密码</span>
            <span class="dlv">|</span>
            <span @click="handleNext">验证码登录</span>
            <span class="dlv">|</span>
            <span @click="handlePrev">返回</span>
          </div>
        </div>
        <!-- 验证码登录 -->
        <div
          class="plfc-module plfc-phone"
          v-if="true || status === StatusEnum.SMSCodeInputing"
        >
          <div class="code-box">
            <md-codebox v-model="code" :maxlength="6" />
          </div>
          <div class="btn-group">
            <md-button class="ok ope-btn" type="primary" @click="handleNext">
              确定
            </md-button>
          </div>
          <div class="mini-t flx">
            <span>收不到验证码？</span>
            <div>
              <span @click="handleNext">重新获取</span>
              <span class="dlv">|</span>
              <span @click="handlePrev">返回</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="plogin-oauth-box">
        <div class="tips">其他登录方式</div>
        <div class="ob">
          <div class="cell" v-for="item in [1, 4]" :key="item">
            <div class="o-title">微信</div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Button, Icon, Codebox } from "mand-mobile";

const StatusEnum = {
  PhoneInputing: 0,
  PasswordInputing: 1,
  SMSCodeInputing: 2,
};
export default {
  name: "Login",
  data() {
    return {
      status: StatusEnum.PhoneInputing,
      StatusEnum,
      mobile: "",
      password: "",
      code: "",
      pwdHideStatus: true,
      isSubmiting: false,
    };
  },
  components: {
    "md-button": Button,
    "md-icon": Icon,
    "md-codebox": Codebox,
  },
  methods: {
    handlePhoneIptChange() {
      let value = this.mobile.replace(/\D/g, "").substr(0, 11); // 不允许输入非数字字符，超过11位数字截取前11位
      let len = value.length;
      if (len > 3 && len < 8) {
        value = value.replace(/^(\d{3})/g, "$1 ");
      } else if (len >= 8) {
        value = value.replace(/^(\d{3})(\d{4})/g, "$1 $2 ");
      }
      this.mobile = value;
    },
    handleNext() {
      this.status = this.status + 1;
    },
    handlePrev() {
      this.status = this.status - 1;
    },
    handleSubmit() {
      this.isSubmiting = true;
      setTimeout(() => {
        this.isSubmiting = false;
        this.$router.push("/index/home");
      }, 2000);
    },
    handleCheckpwdHideStatus() {
      this.pwdHideStatus = !this.pwdHideStatus;
    },
  },
};
</script>
<style lang="less" scoped>
@import "./../../styles/define.less";
.pg-login {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.plogin-header {
  padding: 80px 60px 60px;
  position: relative;
}
.plh-module {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .title {
    font-size: 56px;
    font-weight: bold;
  }
  .sub-title {
    font-size: 32px;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
  }
  .logo {
    height: 100px;
    img {
      width: 100px;
      transform: rotate(180deg);
    }
    margin-bottom: 20px;
  }
}
.plogin-form-content {
  display: flex;
  transition: all 0.2s ease-in-out;
}

.generate-columns(2);
.generate-columns(@n, @i: 1) when (@i =< @n) {
  .offest_@{i} {
    transform: translateX(-(@i) * 100%);
    // width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}

.plfc-module {
  padding: 0 50px;
  width: 100%;
  flex: none;
}
.body-card {
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  box-shadow: 0px 0 15px 10px rgb(212 212 212 / 30%);
  flex: 1;
  position: relative;
  z-index: 2;
  background: #fff;
  padding-top: 20px;
  overflow-x: hidden;
}
.mini-t {
  font-size: 28px;
  color: #666;
  margin-top: 30px;
  &.tl {
    text-align: left;
  }
  .dlv {
    margin: 0 16px;
  }
  &.flx {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
}
.code-box {
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-top: 60px;
}
.ipt-box {
  display: flex;
  // box-shadow: 0px 0px 20px rgb(212 212 212 / 30%);
  border-radius: 10px;
  height: 108px;
  width: 100%;
  margin-top: 60px;
  align-items: center;
  border: 1px solid rgb(195 195 195 / 33%);
  padding: 0 20px;
  .code {
    font-size: 36px;
    color: #666;
    border-right: 1px solid rgba(184, 184, 184, 0.591);
    padding-right: 20px;
  }
  .pwd-fix {
    height: 1008px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100px;
  }
  .ipt {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    background: transparent;
    font-size: 42px;
    padding-left: 30px;
    color: #333;
    font-weight: bold;
  }
}
.btn-group {
  display: flex;
  .prev {
    margin-right: 30px;
    flex: 2;
  }
  .ok {
    flex: 8;
  }
}
.ope-btn {
  margin-top: 60px;
  font-size: 40px;
}
.bg-pop {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  overflow-x: hidden;
  .cir-l-b {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: @main;
    opacity: 0.07;
    position: absolute;
    left: -40px;
    bottom: -30px;
  }
  .cir-r-t {
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: @main;
    opacity: 0.05;
    position: absolute;
    right: -80px;
    top: -160px;
  }
}
</style>
