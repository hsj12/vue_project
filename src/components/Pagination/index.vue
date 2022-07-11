<template>
    <div class="pagination">
        <!-- 上 -->
        <button :disabled='pageNo==1'  @click="$emit('changePageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start >1" @click="$emit('changePageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="startNumAndEndNum.start>2">···</button>
        <!-- 中 -->
        <button v-for="(n,index) in continues" :key="index" 
        @click="$emit('changePageNo',startNumAndEndNum.start+n-1)"
        :class="{active:pageNo==startNumAndEndNum.start+n-1}">
        {{startNumAndEndNum.start+n-1}}
        </button>
        <!-- 下 -->
        <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
        <button v-if="startNumAndEndNum.end<totalPage" 
        @click="$emit('changePageNo',totalPage)"
        :class="{active:pageNo==totalPage}">
        {{totalPage}}
        </button>
        <button  :disabled='pageNo==totalPage' @click="$emit('changePageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','pageSize','total','continues'],
        computed:{
            // 计算总共多少页
            totalPage(){
                return Math.ceil(this.total/this.pageSize)
            },
            // 计算出连续页面的起始页和终止页
            startNumAndEndNum(){
               const{pageNo,totalPage,continues} = this
            // 定义变量存储起始值和终止值
               let start = 0
               let end = 0
            //  判断总页数是否大于连续页数 
               if(totalPage<continues){
                   start = 1
                   end = continues
               }else{
                   start = pageNo - parseInt(continues/2)
                   end = pageNo + parseInt(continues/2)
                //    处理前几页特殊情况
                   if(start < 1){
                       start = 1
                       end = continues
                   }
                //    处理后几页特殊情况
                   if(end > totalPage){
                       end = totalPage
                       start = totalPage - continues + 1
                   }
               }
               return{start,end}
               
            }

        },
        methods:{
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: pink;
                color: #fff;
            }
        }
    }
    .active{
        background-color: pink;
    }
</style>