<template>
    <div class="spaceButton" @click='()=>{this.$emit("spacebuttonClick")}'>
        <span>
            {{text}}
        </span>
    </div>
</template>
<script>
export default {
    props:['text']
}
</script>
<style lang="css">
.spaceButton{
    text-align: center;
    padding: 2.667vw;
    font-size: 3.733vw;
    color: #505050;
    border-bottom: 0.267vw solid #eeeeee;
    background-color: #fff;
}
</style>