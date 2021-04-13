<template>
    <h1>Cart</h1>
  <div class="grid grid-flow-col grid-rows-1 gap-4 border-2">
    <!-- {{itemsInCart}} -->
    <div
      class="border border-black border-10"
      v-for="item in itemsInCart"
      :key="item.id"
    >
      <div class="flex flex-col text-center justify-center items-center">
        <span
          ><img
            width="50"
            height="50"
            :src="item.img"
        /></span>
        <span>{{ item.name }}</span>
      </div>
        <span v-if="!item.editAmountItem">&nbsp;{{ item.amount }}</span>
        <form v-if="item.editAmountItem">
          <span><button @click.prevent="minusAmount(item)">&lt;</button></span>
          <input class="w-5" type="text" name="amountOfItem" v-model="item.amount" />
          <span><button @click.prevent="plusAmount(item)">&gt;</button></span>
          <button @click.prevent ="saveChange(item)"><img src="@/assets/save.png"></button>
        </form>
        <button v-if="!item.editAmountItem" @click="item.editAmountItem = true">
          <img src="@/assets/edit.png">
        </button>
        <span>&nbsp;<button @click="deleteItem(item)"><img src="@/assets/delete.png"></button></span>
  
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    itemsInCart: Array,
  },
  emits: ["delete-item","new-amount-item"],
  data() {
    return {
      cart: this.itemsInCart,
      amountOfItem: null,
      editAmountItem: false,
    };
  },
  methods: {
    saveChange(item) {
      if(item.amount > 50) item.amount = 50;
      item.editAmountItem = false;
      this.$emit('new-amount-item',item,item.amount);
    },
    minusAmount(item){
      if(item.amount == 0) {item.amout = 0;}
      else{
        item.amount--;
      }
    },
    plusAmount(item){
      if(item.amount > 50) {item.amount = 50;}
      else{
        item.amount++;
      }
    }
    ,
    deleteItem(item) {
      this.$emit("delete-item", item);
    },
    submitForm() {},
  },
};
</script>

