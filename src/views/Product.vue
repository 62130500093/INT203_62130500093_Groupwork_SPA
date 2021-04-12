<template>
  <div class="cart">
    <cart-item :itemsInCart="cartItem" />
  </div>
  <div class="product">
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
    };
  },
  methods: {
    showItemtoCart(additem) {
      let checkItem = 0;
      this.cartItem.map((item) => (item.id == additem.id ? checkItem++ : item));
      if (checkItem > 0) {
        this.cartItem.map((item) =>
          item.id == additem.id ? this.editCartItem({id: item.id, name:item.name, amount:item.amount}) : item
        );
      } else {
        this.item = { id: additem.id, name: additem.name, amount: 1 };
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
            amount: newItem.amount,
          }),
        });

        const data = await res.json();
        this.cartItem = [...this.cartItem, data];
      } catch (error) {
        console.log(`Could not save ! ${error}`);
      }
    },
    async editCartItem(editingItem){
    editingItem.amount++;
      try {
        const res = await fetch(`${this.cartUrl}/${editingItem.id}`, {
          method: "PUT",
          headers:{
            'content-type' : 'application/json'
          },
          body: JSON.stringify({id: editingItem.id,name: editingItem.name, amount: editingItem.amount})
        });
        const data = await res.json();
        console.log(data);
        this.cartItem = this.cartItem.map(item => item.id == editingItem.id ? {...item,amount:data.amount} : item);
    }
    catch (error) {
        console.log(`Could not edit ! ${error}`);
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