<template>
    <div>
        <search-head @addHis='addHis' />
        <search-hot @hotClick='addHis' />
        <search-history :historys='historys' @clearHis='clearHis' />
    </div>
</template>
<script>
import SearchHead from '@/components/search/SearchHead'
import SearchHot from '@/components/search/SearchHot'
import SearchHistory from '@/components/search/SearchHistory'
export default {
    data(){
        return {
            historys:[]
        }
    },
    components:{
        SearchHead,
        SearchHot,
        SearchHistory,
    },
    methods: {
        clearHis(){
            this.historys=[];
        },
        addHis(val){
            this.historys.push(val)
        }
    },
    created() {
        if(sessionStorage.getItem('historys')){
            this.historys=JSON.parse(sessionStorage.historys)
        }else{
            sessionStorage.setItem('historys','[]');
        }
    },
    watch: {
        historys(val){
            sessionStorage.historys=JSON.stringify(val)
        }
    },
}
</script>