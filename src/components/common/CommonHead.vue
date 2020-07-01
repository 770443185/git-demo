<template>
  <div class="head">
    <span>
      {{ title }}
    </span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style>
.head {
  height: 46px;
  text-align: center;
  line-height: 46px;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
}
</style>
