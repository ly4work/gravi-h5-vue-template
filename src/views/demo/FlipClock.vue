<template>
  <div class="FlipClock">
    <div class="clock">
      <Flipper ref="Days1" />
      <Flipper ref="Days2" />
      <Flipper ref="Hrs1" />
      <Flipper ref="Hrs2" />
      <Flipper ref="Min1" />
      <Flipper ref="Min2" />
      <Flipper ref="Secs1" />
      <Flipper ref="Secs2" />
    </div>
    <!--TODO-->
    <!--<div class="clock">
            <Flipper v-for="(item, index) in flipArr" :id="item" :key="index" :ref="flipArr[index]" />
        </div>-->
    <div class="description">
      <span v-for="(i, k) in titleArr" :key="k">{{ i }}</span>
    </div>
  </div>
</template>

<script>
import Flipper from "./Flipper";
export default {
  name: "FlipClock",
  data() {
    return {
      timer: null,
      flipObjs: [],
      flipArr: [],
      titleArr: ["Days", "Hrs", "Min", "Secs"],
    };
  },
  props: {
    flipStr: {
      type: String,
    },
  },
  components: { Flipper },
  mounted() {
    // TODO
    // this.formartString();
    this.flipObjs = [
      this.$refs.Days1,
      this.$refs.Days2,
      this.$refs.Hrs1,
      this.$refs.Hrs2,
      this.$refs.Min1,
      this.$refs.Min2,
      this.$refs.Secs1,
      this.$refs.Secs2,
    ];
    this.init();
  },
  methods: {
    // 初始化数字
    init() {
      const now = new Date();
      const nowTimeStr = this.formatDate(new Date(now.getTime()), "ddhhiiss");
      for (let i = 0; i < this.flipObjs.length; i++) {
        this.flipObjs[i].setFront(nowTimeStr[i]);
      }
      // TODO
      //          this.$nextTick(function() {
      //              this.flipArr.map((item, index) => {
      //                  this.$refs[item][0].setFront(nowTimeStr[index]);
      //              })
      //          })
      this.run();
    },
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        const now = new Date();
        const nowTimeStr = this.formatDate(
          new Date(now.getTime() - 1000),
          "ddhhiiss"
        );
        const nextTimeStr = this.formatDate(
          new Date(now.getTime()),
          "ddhhiiss"
        );
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue;
          }

          console.log(nowTimeStr[i], nextTimeStr[i]);

          this.flipObjs[i].flipDown(nextTimeStr[i], nowTimeStr[i]);
        }
        // TODO
        //              for (let i = 0; i < this.flipArr.length; i++) {
        //                  if (nowTimeStr[i] === nextTimeStr[i]) {
        //                      continue;
        //                  }
        //                  this.$refs[this.flipArr[i]].flipDown(
        //                      nowTimeStr[i],
        //                      nextTimeStr[i]
        //                  );
        //              }
      }, 1000);
    },
    formartString() {
      switch (this.flipStr) {
        case "ddhhiiss":
          this.flipArr = ["d1", "d2", "h1", "h2", "m1", "m2", "s1", "s2"];
          break;
        case "hhiiss":
          this.flipArr = ["h1", "h2", "m1", "m2", "s1", "s2"];
          break;
        default:
          this.flipArr = [
            "y1",
            "y2",
            "d1",
            "d2",
            "h1",
            "h2",
            "m1",
            "m2",
            "s1",
            "s2",
          ];
          break;
      }
    },
    // 正则格式化日期
    formatDate(date, dateFormat) {
      /* 单独格式化年份，根据y的字符数量输出年份
             * 例如：yyyy => 2019
                    yy => 19
                    y => 9
             */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      // 格式化月、日、时、分、秒
      const o = {
        "m+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "i+": date.getMinutes(),
        "s+": date.getSeconds(),
      };
      for (const k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          const str = o[k] + "";
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return dateFormat;
    },
    // 日期时间补零
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    },
  },
};
</script>

<style lang="less">
.FlipClock {
  margin-top: 8px;
  .clock {
    .M-Flipper {
      &:nth-child(even) {
        margin-left: 2px;
        margin-right: 10px;
      }
    }
  }
  .description {
    position: relative;
    span {
      width: 44px;
      margin-right: 12px;
      display: inline-block;
      color: #495666;
      font-size: 12px;
      line-height: 14px;
      left: 2px;
    }
  }
}
</style>
