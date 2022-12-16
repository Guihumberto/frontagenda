<template>
  <div class="text-center py-5">
    <v-pagination
      v-model="pagination.page"
      :length="totalPages"
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
  props:{
    pagination: {
      default:{
        page: 1
      },
      type: Object
    },
    totalPages: false
  }
}
</script>