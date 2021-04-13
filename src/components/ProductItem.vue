<template>
  <div class="product">
    <h1>product</h1>
    <div class="grid grid-flow-row grid-cols-2 gap-4">
      <div v-for="item in productItem" :key="item.id">
        <div class="flex border justify-center items-center">
          <div>
            <img
              width="150"
              height="150"
              :src="item.img"
            />
            <div>{{ item.name }} <span><button @click="addItemtoCart(item)"><img src="@/assets/add.png"></button></span></div>
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

