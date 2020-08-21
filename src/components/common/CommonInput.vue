<template>
  <div>
    <van-field
      v-model="value"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      :rule="rule"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      rule:null
    };
  },
  props: ["type", "label", "placeholder", "arule"],

  created() {
    this.rule=new RegExp(this.arule);
  },
  watch: {
    value(val){
      if(this.rule.test(val)){
        this.$emit('inputSuccess',val);
      }else{
        this.$emit('inputSuccess','  ')
      }
    }
  },
};
</script>
