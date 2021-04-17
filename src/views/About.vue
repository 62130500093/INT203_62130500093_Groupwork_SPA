<template>
  <div class="about">
    <contact></contact>
  </div>
  <bottom><copyright-component></copyright-component></bottom>
</template>
<script>
// @ is an alias to /src
import Contact from '@/components/Contact.vue'

export default {
  name: 'Home',
  components: {
    Contact
  }
}
</script>

    Copyright