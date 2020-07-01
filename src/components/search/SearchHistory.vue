<template>
    <div class="searchHistory">
        <h2 class="title">历史搜索</h2>
        <ul class="historyList">
            <li v-for='(historyItem,index) in historys' :key='index' class="historyItem">
                <van-icon name="browsing-history-o" />
                <span>
                    {{historyItem}}
                </span>
            </li>
        </ul>
        <p v-if='historys.length' @click='$emit("clearHis")' class="clearHistory">清除历史记录</p>
    </div>
</template>
<script>
export default {
    props:['historys'],
}
</script>
<style>
.searchHistory{
    margin-top: 12px;
    background-color: #fff;
}
.searchHistory .title{
    height: 12.26667vw;
    padding-left: 3.2vw;
    line-height: 12.26667vw;
    font-weight: 400;
    color: #999;
    font-size: 3.73333vw;
}
.searchHistory .historyList{
    padding: 0 3.2vw;
    background-color: #fff;
}
.historyList .historyItem{
    display: flex;
    align-items: center;
    height: 11.73333vw;
    line-height: 11.73333vw;
    border-bottom: 1px solid #CCCCCC;
    color: #CCCCCC;
    font-size: 20px;
}
.historyItem span{
    font-size: 14px;
    color: #505050;
    margin-left: 12px;
}
.searchHistory .clearHistory{
    padding-top: 12px;
    padding-bottom: 20px;
    font-size: 14px;
    color: #999;
    text-align: center;
    background-color: #fff;
}
</style>