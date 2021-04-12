<template>
  <div class="cart">
    <h1>Cart</h1>
    <!-- {{itemsInCart}} -->
    <ul class="border border-black border-10" v-for="item in itemsInCart" :key="item.id">
        <li class="flex text-center justify-center items-center">
            <span><img width="200" height="200" src="https://www.myskinrecipes.com/shop/1446-thickbox/banana-flavor-%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2.jpg" /></span>
            <span>{{ item.name }}</span>
            <span>&nbsp;{{ item.amount }}</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
      itemsInCart : Array
  },
  data(){
      return{
          cart : this.itemsInCart
      }
  }
};
</script>

