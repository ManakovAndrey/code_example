<template>
  <div class="hello">
    <div class="testData">testData: {{testData}}</div>
    <button @click="loadTestData()">loadTestData</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MainPage',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    ...mapState({
      testData: state => state.main.testData,
    }),
  },
  methods: {
    loadTestData() {
      this.$store.dispatch('main/getTestData');
    },
  },
};
</script>

<style lang="scss" scoped>
.testData {
  color: red;
}
</style>
