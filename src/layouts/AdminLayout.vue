<template lang="pug">
VNavigationDrawer(permanent)
  VList
    VListItem(:prepend-avatar="avatar" :title="account")
  VDivider
  VList
    VListItem(v-for="navItem in navItems" :key="navItem.to"
    :to="navItem.to" :title="navItem.title" :prepend-icon="navItem.icon"
    )
VMain
  RouterView
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const user = useUserStore()
const { avatar, account } = storeToRefs(user)

const navItems = [
  { to: '/admin/products', title: '商品管理', icon: 'mdi-shopping' },
  { to: '/admin/orders', title: '訂單管理', icon: 'mdi-format-list-numbered' },
  { to: '/', title: '回首頁', icon: 'mdi-home' }
]

</script>
