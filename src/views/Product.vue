<template>
  <div class="mx-10">
    <div class="cart">
      <div class="flex flex-row items-center">
        <div><img src="@/assets/shoppingCart.png" /></div>
        <div class="text-xl font-bold text-indigo-800">Cart</div>
        <div
          class="animate-pulse relative left-96 text-l text-red-600 font-semibold"
          v-if="errorCart"
        >
          Warning ! : <span class="font-medium">{{ messageCart }}</span>
        </div>
      </div>
      <cart-item
        @new-amount-item="editCartItem"
        @delete-item="deleteCartItem"
        :itemsInCart="cartItem"
        @cart-error-msg="showCartErrorMessage"
      />
    </div>
    <div class="relative top-10">
      <h1 class="text-xl font-bold text-indigo-900">Our Products</h1>
      <div
        class="animate-pulse text-l text-red-600 font-semibold"
        v-if="errorProduct"
      >
        Warning ! :
        <span class="font-medium">{{ messageProduct.message }}</span>
      </div>
      <product-item @add-item-to-cart="showItemtoCart" />
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/Cart.vue";
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "Product",
  components: {
    CartItem,
    ProductItem,
  },
  data() {
    return {
      cartUrl: "http://localhost:3000/cartItems",
      cartItem: [],
      item: null,
      messageProduct: { message: "", product: null },
      messageCart: null,
      errorCart: false,
      errorProduct: false,
    };
  },
  methods: {
    showCartErrorMessage(msg) {
      this.errorCart = true;
      this.messageCart = msg;
    },
    showItemtoCart(additem) {
      let checkItem = 0;
      this.cartItem.map((item) => (item.id == additem.id ? checkItem++ : item));
      if (checkItem > 0) {
        this.errorProduct = true;
        this.messageProduct.message = additem.name + " is already in cart. Please, edit amount for more quantity.";
        this.messageProduct.product = additem;
      } else {
        this.item = {
          id: additem.id,
          name: additem.name,
          img: additem.img,
          amount: 1,
        };
        this.addItemtoCart(this.item);
      }
    },
    async addItemtoCart(newItem) {
      try {
        const res = await fetch(this.cartUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: newItem.id,
            name: newItem.name,
            img: newItem.img,
            amount: newItem.amount,
          }),
        });

        const data = await res.json();
        this.cartItem = [...this.cartItem, data];
      } catch (error) {
        console.log(`Could not save ! ${error}`);
      }
      this.errorCart = false;
      this.errorProduct = false;
    },
    async editCartItem(editingItem, newAmount) {
      if (newAmount > 50) {
        this.messageCart = "maximun amount ! (50)";
        return;
      }
      console.log(newAmount);
      try {
        const res = await fetch(`${this.cartUrl}/${editingItem.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: editingItem.id,
            name: editingItem.name,
            img: editingItem.img,
            amount: newAmount,
          }),
        });
        const data = await res.json();
        console.log(data);
        this.cartItem = this.cartItem.map((item) =>
          item.id == editingItem.id ? { ...item, amount: data.amount } : item
        );
      } catch (error) {
        console.log(`Could not edit ! ${error}`);
      }
      this.errorCart = false;
    },
    async deleteCartItem(deleteItem) {
      try {
        await fetch(`${this.cartUrl}/${deleteItem.id}`, {
          method: "DELETE",
        });
        this.cartItem = this.cartItem.filter(
          (item) => item.id !== deleteItem.id
        );
      } catch (error) {
        console.log(`Could not save ! ${error}`);
      }
      this.errorCart = false;
      if (this.messageProduct.product != null) {
        if (deleteItem.id == this.messageProduct.product.id) {
          this.messageProduct.message = "";
          this.messageProduct.product = null;
          this.errorProduct = false;
        }
      }
    },
    async getCartItems() {
      const res = await fetch(this.cartUrl);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.cartItem = await this.getCartItems();
  },
};
</script>