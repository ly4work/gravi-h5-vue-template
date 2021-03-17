<template>
    <div class="M-Flipper" :class="[flipType, {'go': isFlipping}]">
        <div class="digital front" :data-value="frontTextFromData"></div>
        <div class="digital back" :data-value="backTextFromData"></div>
    </div>
</template>

<script>
export default {
    name: 'FlipClock',
    data() {
        return {
            isFlipping: false,
            flipType: 'down',
            frontTextFromData: 0,
            backTextFromData: 1
        };
    },
    props: {
        // 前牌文字
        frontText: {
            type: [Number, String],
            default: 0
        },
        // 后牌文字
        backText: {
            type: [Number, String],
            default: 1
        },
        // 翻牌动画时间，与CSS中设置的animation-duration保持一致
        duration: {
            type: Number,
            default: 600
        }
    },
    methods: {
        _flip(type, front, back) {
            // 如果处于翻转中，则不执行
            if (this.isFlipping) {
                return false;
            }
            this.frontTextFromData = front;
            this.backTextFromData = back;
            // 根据传递过来的type设置翻转方向
            this.flipType = type;
            // 设置翻转状态为true
            this.isFlipping = true;
            setTimeout(() => {
                // 设置翻转状态为false
                this.isFlipping = false;
                this.frontTextFromData = back;
            }, this.duration);
        },
        // 下翻牌
        flipDown(front, back) {
            this._flip('down', front, back);
        },
        // 上翻牌
        flipUp(front, back) {
            this._flip('up', front, back);
        },
        // 设置前牌文字
        setFront(text) {
            this.frontTextFromData = text;
        },
        // 设置后牌文字
        setBack(text) {
            this.backTextFromData = text;
        }
    },
    created() {
        this.frontTextFromData = this.frontText;
        this.backTextFromData = this.backText;
    }
};
</script>

<style lang="less">
    .M-Flipper {
        display: inline-block;
        position: relative;
        width: 22px;
        height: 36px;
        line-height: 36px;
        border-radius: 2px;
        font-weight: 700;
        background: #fff;
        font-size: 18px;
        color: #495666;
        box-shadow: 0px 2px 3px rgba(171, 185, 192, 0.35);
        text-align: center;
        font-family: 'Helvetica Neue';
    }
    
    .M-Flipper .digital:before,
    .M-Flipper .digital:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        background: white;
        overflow: hidden;
        box-sizing: border-box;
    }
    
    .M-Flipper .digital:before {
        top: 0;
        bottom: 50%;
        border-radius: 10px 10px 0 0;
        box-shadow: 0 .5px 0 0 #E5E5E5;
    }
    
    .M-Flipper .digital:after {
        top: 50%;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        line-height: 0;
    }
    /*向下翻*/
    
    .M-Flipper.down .front:before {
        z-index: 3;
    }
    
    .M-Flipper.down .back:after {
        z-index: 2;
        transform-origin: 50% 0%;
        transform: perspective(160px) rotateX(180deg);
    }
    
    .M-Flipper.down .front:after,
    .M-Flipper.down .back:before {
        z-index: 1;
    }
    
    .M-Flipper.down.go .front:before {
        transform-origin: 50% 100%;
        animation: frontFlipDown 0.6s ease-in-out both;
        box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
        backface-visibility: hidden;
    }
    
    .M-Flipper.down.go .back:after {
        animation: backFlipDown 0.6s ease-in-out both;
    }
    /*向上翻*/
    
    .M-Flipper.up .front:after {
        z-index: 3;
    }
    
    .M-Flipper.up .back:before {
        z-index: 2;
        transform-origin: 50% 100%;
        transform: perspective(160px) rotateX(-180deg);
    }
    
    .M-Flipper.up .front:before,
    .M-Flipper.up .back:after {
        z-index: 1;
    }
    
    .M-Flipper.up.go .front:after {
        transform-origin: 50% 0;
        animation: frontFlipUp 0.6s ease-in-out both;
        box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
        backface-visibility: hidden;
    }
    
    .M-Flipper.up.go .back:before {
        animation: backFlipUp 0.6s ease-in-out both;
    }
    
    @keyframes frontFlipDown {
        0% {
            transform: perspective(160px) rotateX(0deg);
        }
        100% {
            transform: perspective(160px) rotateX(-180deg);
        }
    }
    
    @keyframes backFlipDown {
        0% {
            transform: perspective(160px) rotateX(180deg);
        }
        100% {
            transform: perspective(160px) rotateX(0deg);
        }
    }
    
    @keyframes frontFlipUp {
        0% {
            transform: perspective(160px) rotateX(0deg);
        }
        100% {
            transform: perspective(160px) rotateX(180deg);
        }
    }
    
    @keyframes backFlipUp {
        0% {
            transform: perspective(160px) rotateX(-180deg);
        }
        100% {
            transform: perspective(160px) rotateX(0deg);
        }
    }
    
    .M-Flipper .digital:before,
    .M-Flipper .digital:after {
        content: attr(data-value);
    }
</style>