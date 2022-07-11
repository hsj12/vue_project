<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="skuImageList[currentIndex].imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: {
      skuImageList:{
        // 确保传进来的数据为空时不报警告，[]保证skuImageList为空数组，{}保证skuImageList第0项为空对象，否则空数组第0项为undefined，undefined.imgUrl会报警告
        default:()=>[{}]
      }
    },
    data() {
      return {
        // 默认显示第一章图片
        currentIndex : 0
      }
    },
    mounted(){
      // 根据点击轮播图图片修改显示的图片
      this.$bus.$on("getIndex",(index)=>{this.currentIndex = index})
    },
    methods:{
      handler(event){
        let big = this.$refs.big
        let mask = this.$refs.mask
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        // 约束范围
        if(left<0) left=0
        if(left>mask.offsetWidth) left = mask.offsetWidth
        if(top<0) top=0
        if(top>mask.offsetHeight) top = mask.offsetHeight
        
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        big.style.left = -2*left + 'px'
        big.style.top = -2*top + 'px'
        
      }
    }

  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>