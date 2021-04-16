<template>
  <div class="product">
    <div class="grid grid-flow-row grid-cols-5 gap-4">
      <div v-for="item in productItem" :key="item.id">
        <div class="flex flex-col border justify-center items-center h-64 shadow-lg :focus:ring-2 overflow-x-auto">
          <div class="flex justify-center items-center h-52">
            <img
              width="150"
              height="150"
              :src="item.img"
            />
            </div>
            <div class="flex flex-row mt-2"><div>{{ item.name }} </div><div><button class="relative left-24" @click="addItemtoCart(item)"><img src="@/assets/add.png"></button></div></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ProductItem",
  emits: ["add-item-to-cart"],
  data() {
    return {
      url: "http://localhost:3000/productItems",
      productItem: [],
    };
  },
  methods: {
    addItemtoCart(item) {
      this.$emit("add-item-to-cart", item);
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

