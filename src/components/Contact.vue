<template>
  <div class="contact">
      <div class="flex flex-col items-center justify-center">
    <h1>This is the web page assignment created for temporary not for long-term using. </h1>
    <img class="mt-3" :src="profile" />
    <h1 class="mt-5">Developed by 62130500093</h1>
    <h1>Name : Sahachai Senarak</h1>
    <h1>Email : sahachai.kmutt@mail.kmutt.ac.th</h1>
    <h1>phone (for work) : +66 81 9445197 </h1>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data(){
      return{
          profile : require("@/assets/profilekmutt.jpg")
      }
  }
}
</script>

