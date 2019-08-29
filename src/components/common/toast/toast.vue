
<!-- 
    * @param {button数据} butData
    * @param {获取当前点击数据并传送给父级方法} onQuery
-->
<template>
    <div class="toast_box" ref="toast" :style='{"margin-left":`-${width}px`,position:position}' v-if="show">
            <div class="opacity"></div>
            <div class="content"> {{text}}</div>  
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name: "toast",
    props: {
        position:{
            type:String,
            default:'fixed'
        },
        text: {
            type: String,
            default: ""
        },
        time:{
            type:Number,
            default:1000
        }
    },
    data() {
        return {
            show: true,
            width:0,
        };
    },
    mounted(){
        let width=this.$refs.toast.offsetWidth;
        this.width=width/2

            setTimeout(()=>{
                    this.show=false;
                    this.$emit('hide',false)
            },this.time)
    },
    methods: {
        
     
    }
};
</script>
<style lang="less" scoped>
    .toast_box{
        
        top:50%;
        left:50%;
        // margin-left:-20px;
        margin-top:-10px;
        text-align: center;
        z-index: 200;
        div{
            width:100%;
            padding:10px;
            color:#fff;
            box-sizing: border-box;
        }
    }
    .opacity{
        background:#000;
        opacity: 0.7;
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:201;
        // padding:10px;
        width:100%;
    }
    .content{
        position:relative;
        z-index:202;
    }
</style>

