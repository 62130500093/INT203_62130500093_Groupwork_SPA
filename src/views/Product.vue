<template>
  <div class="cart">
    <p v-if="errorCart"> {{messageCart}} </p>
    <cart-item
      @new-amount-item="editCartItem"
      @delete-item="deleteCartItem"
      :itemsInCart="cartItem"
      @cart-error-msg="showCartErrorMessage"
    />
  </div>
  <div class="product">
    <p v-if="errorProduct"> {{messageProduct}} </p>
    <product-item @add-item-to-cart="showItemtoCart" />
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
      messageProduct : null,
      messageCart : null,
      errorCart : false,
      errorProduct : false
    };
  },
  methods: {
    showCartErrorMessage(msg){
      this.errorCart = true;
      this.messageCart = msg;
    },
    showItemtoCart(additem) {
      let checkItem = 0;
      this.cartItem.map((item) => (item.id == additem.id ? checkItem++ : item));
      if (checkItem > 0) {
        this.errorProduct = true;
        this.messageProduct = additem.name + " is already in cart.";
      } else {
        this.item = { id: additem.id, name: additem.name, img: additem.img,amount: 1 };
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
            img : newItem.img,
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