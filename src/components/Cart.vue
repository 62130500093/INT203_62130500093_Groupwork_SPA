<template>
  <div
    class="flex flex-wrap border-2 overflow-scroll"
    :class="{ 'h-36': 'h-32' }"
  >
    <div
      class="flex flex-row items-center justify-center mx-auto"
      v-if="!checkItem()"
    >
    <div class="flex flex-row">
      <div class="text-center">Empty Cart &nbsp;</div>
      <div>
        <img
          width="30"
          height="30"
          src="https://www.pinclipart.com/picdir/middle/139-1395741_shopping-cart-sign-comments-free-icon-empty-cart.png"
        />
      </div>
      <div> &nbsp; Please add item to this cart. &nbsp;</div>
      <div><img class="animate-bounce" src="@/assets/arrow_down.png" /></div>
    </div>
      
    </div>
    <!-- {{itemsInCart}} -->
    <div
      class="transition duration-150 ease-in-out hover:scale-100 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-xl mr-5 mb-5 border border-black border-10 w-80"
      v-for="item in itemsInCart"
      :key="item.id"
    >
      <div>
        <div class="flex justify-center items-center h-20">
          <img width="50" height="50" :src="item.img" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <div>{{ item.name }}</div>
        <div class="w-12" v-if="!item.editAmountItem">&nbsp;{{ item.amount }}</div>
        <div
          class="flex flex-row items-center justify-center w-20"
          v-if="item.editAmountItem"
        >
          <div>
            <button @click.prevent="minusAmount(item)">&lt;</button>
          </div>
          <div>
            <input
              class="w-5 text-center"
              type="text"
              name="amountOfItem"
              v-model="item.amount"
            />
          </div>
          <div>
            <button @click.prevent="plusAmount(item)">&gt;</button>
          </div>
          <div>
            <button @click.prevent="saveChange(item)">
              <img src="@/assets/save.png" />
            </button>
          </div>
        </div>
        <div>
          <button
            v-if="!item.editAmountItem"
            @click="item.editAmountItem = true"
          >
            <img src="@/assets/edit.png" />
          </button>
          &nbsp;<button @click="deleteItem(item)">
            <img src="@/assets/delete.png" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    itemsInCart: Array,
  },
  emits: ["delete-item", "new-amount-item", "cart-error-msg"],
  data() {
    return {
      cart: this.itemsInCart,
      amountOfItem: null,
      hasItem: true,
    };
  },
  methods: {
    checkItem() {
      let num = 0;
      this.itemsInCart.forEach(function (item) {
        if (item != null) num++;
      });
      if (num > 0) return true;
      return false;
    },
    sendErrorMessage(msg) {
      this.$emit("cart-error-msg", msg);
    },
    saveChange(item) {
      if (item.amount > 50) {
        this.sendErrorMessage(" the maximum amount per order is 50 ! ");
        return;
      }
      if (item.amount < 0) {
        this.sendErrorMessage(" the minimum amount per order is 1 [0 it's mean you don't want " + item.name + " anymore].");
        return;
      }
      if (item.amount == 0) {
        this.deleteItem(item);
        item.editAmountItem = false;
        return;
      }
      item.editAmountItem = false;
      this.$emit("new-amount-item", item, item.amount);
    },
    minusAmount(item) {
      if (item.amount == 0) {
        this.sendErrorMessage(" minimum amount ! (0) ");
        return;
      } else {
        item.amount--;
      }
    },
    plusAmount(item) {
      if (item.amount == 50) {
        this.sendErrorMessage(" maximum amount ! (50) ");
        return;
      } else {
        item.amount++;
      }
    },
    deleteItem(item) {
      this.$emit("delete-item", item);
    },
  },
};
</script>

