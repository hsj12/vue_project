<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="handlerChecked($event,cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handlerGoodNum('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handlerGoodNum('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handlerGoodNum('plus',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="handlerDelete(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllCheck' @change="handlerAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted(){
     this.getData()
    },
    methods:{
      getData(){
        this.$store.dispatch("getCartList")
      },
      // 修改某一个产品的个数
      handlerGoodNum:throttle(async function(type,num,cart){
        switch(type){
          case 'plus':
            num = num
            break
          case 'minus':
            // 产品个数不得小于1
            num = cart.skuNum > 1 ? -1 : 0
            break
          case 'change':
            // 剔除用户输入为字符串或小于1的数
            if(isNaN(num) || num < 1){
              num = 0
              event.target.value = cart.skuNum
              // 整理小数
            } else{
              num = parseInt(num) - cart.skuNum  
            }
            break        
        }
        if(num == 0) return
         try{
          //  成功
           await this.$store.dispatch('getAddOrUpdateShopCart',
           {skuId:cart.skuId,
           skuNum:num
           })
          //  再一次获取服务器最新的数据进行展示
          this.getData()
         }catch(error){
          //  失败  
           alert(error.message)
         }
      },1000),
      // 删除购物车产品
      async handlerDelete(cart){
         try{
          //  成功
           await this.$store.dispatch('DeleteGood',cart.skuId)
          //  再一次获取服务器最新的数据进行展示
          this.getData()
         }catch(error){
          //  失败  
           alert(error.message)
         }
      },
      // 修改选中状态
      async handlerChecked(event,cart){
        let isChecked
        if(event.target.checked){
          isChecked = 1
        }else{
          isChecked = 0
        }
         // 加入购物车的回调函数
         try{
          //  成功
          await this.$store.dispatch('changeChecked',{
            skuId:cart.skuId,
            isChecked
          })
          //  再一次获取服务器最新的数据进行展示
          this.getData()
         }catch(error){
          //  失败
           event.target.checked =! event.target.checked
           alert(error.message)
         }
      },
      // 删除全部选中的产品 
     async deleteAllChecked(){
       try {
         await this.$store.dispatch('deleteAllChecked')
         this.getData()
       } catch (error) {
          //  失败  
           alert(error.message)
       }
      },
      // 全选或全不选
    async handlerAllChecked(){
      let isChecked = event.target.checked ? "1" : "0"
       try {
         await this.$store.dispatch('handlerAllChecked',isChecked)
         this.getData()
       } catch (error) {
          //  失败  
           alert(error.message)
       }
      },
    },
    computed:{
      ...mapGetters(['cartList']),
      cartInfoList(){
          return this.cartList.cartInfoList || []
      },
      // 计算总价
      totalPrice(){
        return this.cartInfoList.filter(item=>item.isChecked == 1).reduce((pre,item)=>(pre+=item.skuNum*item.skuPrice),0)
      },
      // 判断底部复选框是否勾选
      isAllCheck(){
        // 列表为空时不勾选
        return this.cartInfoList.every(item=>item.isChecked==1) && this.cartInfoList.length > 0
      },
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>