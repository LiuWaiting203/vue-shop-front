<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1 購物車
    VCol(cols="12")
      VTable
        thead
          tr
            th 圖片
            th 名稱
            th 單價
            th 數量
            th 小計
            th 操作
        tbody
          tr(v-for="item in cart" :key="item._id" :class="{ 'bg-red-lighten-5': !item.product.sell }")
            td
              VImg(:src="item.product.image" cover width="200" aspect-ratio="1")
            td {{ item.product.name }}
            td {{ item.product.price }}
            td
              VBtn(color="primary" variant="text" icon="mdi-plus" @click="updateCart(item.product._id, 1)")
              | {{ item.quantity }}
              VBtn(color="primary" variant="text" icon="mdi-minus" @click="updateCart(item.product._id, -1)")
            td {{ item.quantity * item.product.price }}
            td
              VBtn(color="red" variant="text" icon="mdi-delete" @click="updateCart(item.product._id, item.quantity * -1)")
          tr(v-if="cart.length === 0")
            td(colspan="6" class="text-center") 沒有商品
    VCol(cols="12" class="text-center")
      p 總金額: {{ total }}
      VBtn(color="green" @click="submit" :disabled="!canCheckout") 結帳
</template>

<script setup>
import { ref, computed } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const createSnackbar = useSnackbar()
const user = useUserStore()
const router = useRouter()

const cart = ref([])

const updateCart = async (product, quantity) => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product,
      quantity
    })
    const idx = cart.value.findIndex(item => item.product._id === product)
    cart.value[idx].quantity += quantity
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
    user.cart = data.result
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
}

const total = computed(() => {
  return cart.value.reduce((total, current) => total + (current.quantity * current.product.price), 0)
})

const canCheckout = computed(() => {
  return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
})

const submit = async (req, res) => {
  try {
    await apiAuth.post('/orders')
    user.cart = 0
    router.push('/orders')
  } catch (error) {
    console.log(error)
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
}

(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
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
