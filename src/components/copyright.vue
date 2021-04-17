<template>
  <div class="copyright">
    <span class="inline-block text-sm absolute bottom-0 left-0">
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  name: "copyright",
  data() {
    return {
      message: `
      Copyright (c) 2021 62130500093 Sahachai Senarak` + "\n" + `
      This web page is for assignment only do not copy or use completely / partially for your benefit.
      `,
    };
  },
};
</script>

