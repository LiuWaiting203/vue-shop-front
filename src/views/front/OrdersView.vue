<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1 訂單
    VCol(cols="12")
      VTable
        thead
          tr
            th ID
            th 日期
            th 金額
            th 商品
        tbody
          tr(v-for="order in orders" :key="order._id")
            td {{ order._id }}
            td {{ new Date(order.date).toLocaleString() }}
            td {{ order.total }}
            td
              ul
                li(v-for="item in order.cart" :key="item._id") {{ item.product.name }} * {{ item.quantity }}
</template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()

const orders = ref([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/orders')
    orders.value.push(...data.result.map(order => {
      order.total = order.cart.reduce((total, current) => total + (current.product.price * current.quantity), 0)
      return order
    }))
  } catch (error) {
    createSnackbar({
      text: error.response.data.message,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})()
</script>
