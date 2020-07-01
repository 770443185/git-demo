<template>
    <div class="videoplay">
        <video controls>
            <source v-if='videourl.content' type="video/mp4" :src="videourl.content">
            <source v-else type="video/mp4" src="https://node.12380ch.com/upload/qwertyuiop.mp4"
            >
        </video>
    </div>
</template>
<script>
export default {
    props : ['videourl'],
}
</script>
<style>
.videoplay{
    width: 100%;
    height: 56.533vw;
}
.videoplay video{
    width: 100%;
    height: 100%;
}
</style>