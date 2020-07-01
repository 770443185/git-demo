<template>
  <div id="app">
    <keep-alive include='Space,IndexHead,Home'>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {

}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    min-height: 100vh;
    overflow: hidden;
  }
  body{
    background-color: #F4F4F4;
  }
</style>
