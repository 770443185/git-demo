<template>
  <div class="editButton" @click="()=>this.$emit('editButtonClick')">
    <span>
      {{ text }} </span
    ><span>
      {{ value }}
      <slot></slot>
    </span>
    <slot name="uploadImg"></slot>
  </div>
</template>
<script>
export default {
  props: ["text", "value"],
};
</script>
<style>
.editButton {
  padding: 2.667vw 3.2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 0.267vw solid #eeeeee;
}
.editButton span:nth-child(1) {
  font-size: 4.8vw;
  color: #505050;
}
.editButton span:nth-child(2) {
  font-size: 4.2vw;
  color: #999;
}
.editButton span:nth-child(2) img {
  width: 12.267vw;
  height: 12.267vw;
  border-radius: 50%;
}
</style>
