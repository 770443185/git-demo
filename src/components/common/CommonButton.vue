<template>
    <div class="buttonbox">
        <button class="common-button" @click='toParent'>
            {{value}}
        </button>
    </div>
</template>
<script>
export default {
    props:['value'],
    methods: {
        toParent(){
            this.$emit('buttonClick')
        }
    },
}
</script>
<style>
    .buttonbox{
        width: 44.8vw;
    }
    .common-button{
        height: 11.733vw;
        font-size: 3.733vw;
        background-color: #FF9DB5;
        color: #fff;
        text-align: center;
        line-height: 3.733vw;
        border-radius: 5.333vw;
        border: none;
        width: 100%;
    }
</style>