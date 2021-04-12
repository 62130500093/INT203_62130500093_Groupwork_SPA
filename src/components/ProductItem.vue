<template>
  <div class="product">
    <h1>product</h1>
    <div class="grid grid-flow-row grid-cols-2 gap-4">
      <div v-for="item in productItem" :key="item.id">
        <div class="flex border">
          <div>
            <img
              width="200"
              height="200"
              src="https://www.myskinrecipes.com/shop/1446-thickbox/banana-flavor-%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A2.jpg"
            />
            <p>{{ item.name }} <span><button @click="addItemtoCart(item)"> + </button></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  emits: ['add-item-to-cart'],
  data() {
    return {
      url: "http://localhost:3000/productItems",
      productItem: [],
    };
  },
  methods: {
      addItemtoCart(item){
          this.$emit('add-item-to-cart',item);
      },
    async getProductItems() {
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.productItem = await this.getProductItems();
  },
};
</script>

