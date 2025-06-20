<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from './layous/BasicLayout.vue'
import {userLoginUserStore} from '@/stores/userLoginUserStore'

const loginUserStore = userLoginUserStore()
loginUserStore.fetchLoginUser()
</script>
<style>
#app {
}
</style>
