<template lang="pug">
VCard
  VImg(:src="image" cover height="200")
  VCardTitle
    RouterLink(:to="'/products/' + _id" class="text-primary text-decoration-none") {{ name }}
  VCardSubtitle ${{ price }}
  VCardText
    pre {{ description }}
  VCardActions
    VBtn(color="primary" prepend-icon="mdi-cart" @click="addCart") 加入購物車
</template>

<script setup>
// import { defineProps } from 'vue' // defineProps 不必要 import
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()

const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  category: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  image: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  price: {
    type: Number,
    default: () => 0
  },
  sell: {
    type: Boolean,
    default: () => true
  }
})

const user = useUserStore()

const addCart = async () => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product: props._id,
      quantity: 1
    })
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
</script>
