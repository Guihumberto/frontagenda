<template>
    <div class="text-center py-5">
      <v-pagination
        v-model="page"
        :length="6"
      ></v-pagination>
    </div>
  </template>
 <script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>