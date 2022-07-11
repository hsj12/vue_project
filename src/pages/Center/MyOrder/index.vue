<template>
<div class="order-right">
    <div class="order-content">
    <div class="title">
        <h3>我的订单</h3>
    </div>
    <div class="chosetype">
        <table>
        <thead>
            <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
            </tr>
        </thead>
        </table>
    </div>
    <div class="orders">
         <!-- 订单显示 -->
        <table class="order-item" v-for="(order) in myOrderList.records" :key="order.id">
        <thead>
            <tr>
            <th colspan="5">
                <span class="ordertitle">{{order.createTime}}  订单编号：{{order.outTradeNo}} <span
                    class="pull-right delete"><img src="../images/delete.png"></span>
                </span>
            </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(orderDetail,index) in order.orderDetailList" :key="orderDetail.id">
            <td width="60%">
                <div class="typographic">
                <img :src="orderDetail.imgUrl" style="height:100px;width:100px">
                <a href="#" class="block-text">{{orderDetail.skuName}}</a>
                <span>x{{orderDetail.skuNum}}</span>
                <a href="#" class="service">售后申请</a>
                </div>
            </td>
            <td v-if="index==0" :rowspan="order.orderDetailList.length" width="8%" class="center">{{order.consignee}}</td>
            <td v-if="index==0" :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                <li>总金额¥{{order.totalAmount}}.00</li>
                <li>在线支付</li>

                </ul>
            </td>
            <td v-if="index==0" :rowspan="order.orderDetailList.length" width="8%" class="center">
                <a href="#" class="btn">{{order.orderStatusName}} </a>
            </td>
            <td v-if="index==0" :rowspan="order.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                </li>

                </ul>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    <div class="choose-order">
         <!-- 分页 -->
          <Pagination  
          :pageNo="page" 
          :pageSize="limit" 
          :total="myOrderList.total" 
          :continues="5"
          @changePageNo="changePageNo"
          />
    </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
    <h4 class="kt">猜你喜欢</h4>
    <ul class="like-list">
        <li class="likeItem">
        <div class="p-img">
            <img src="../images/itemlike01.png" />
        </div>
        <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
        </div>
        <div class="price">
            <em>¥</em>
            <i>3699.00</i>
        </div>
        <div class="commit">已有6人评价
        </div>
        </li>
        <li class="likeItem">
        <div class="p-img">
            <img src="../images/itemlike02.png" />
        </div>
        <div class="attr">
            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
        </div>
        <div class="price">
            <em>¥</em>
            <i>4388.00</i>
        </div>
        <div class="commit">已有700人评价
        </div>
        </li>
        <li class="likeItem">
        <div class="p-img">
            <img src="../images/itemlike03.png" />
        </div>
        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
        </div>
        <div class="price">
            <em>¥</em>
            <i>4088.00</i>
        </div>
        <div class="commit">已有700人评价
        </div>
        </li>
        <li class="likeItem">
        <div class="p-img">
            <img src="../images/itemlike04.png" />
        </div>
        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
        </div>
        <div class="price">
            <em>¥</em>
            <i>4088.00</i>
        </div>
        <div class="commit">已有700人评价
        </div>
        </li>
    </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 默认参数
            // 当前第几页
            page:1,
            // 每页展示数据个数
            limit:3,
            // 订单信息
            myOrderList:{}
        }
    },
    methods: {
       async getOrderList(){
        const{page,limit} = this
          let result = await this.$API.reqOrderList(page,limit)
          if(result.code==200){
            this.myOrderList = result.data
          }
        },
      //  页面跳转
      changePageNo(page){
        this.page = page
        this.getOrderList()
      }
    },
    mounted() {
        this.getOrderList()
    },
}
</script>

<style>
</style>
       
       
