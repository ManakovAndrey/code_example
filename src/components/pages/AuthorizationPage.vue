<template>
  <div class="authorization-page">
    <div class="title">Authorization</div>
    <div class="username">
      <span>User name: </span>
      <Text-Input class="auth-input" v-model="userName" />
    </div>
    <div class="password">
      <span>Password: </span>
      <Text-Input class="auth-input" v-model="password" :hide="true" />
    </div>
    <div class="button" @click="auth()">Sign in</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TextInput from '../TextInput';

export default {
  name: 'AuthorizationPage',
  components: {
    TextInput,
  },
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  computed: {
  },
  methods: {
    ...mapActions({
      tryAuth: 'main/tryAuth',
    }),
    async auth() {
      const res = await this.tryAuth({ username: this.userName, password: this.password });
      if (res === 'success') {
        this.$router.push({
          name: 'home',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.authorization-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: calc(100% - 210px);
  color: white;
  .title {
    margin-bottom: 25px;
  }
  .auth-input {
    width: 300px;
  }
  .button {
    background-color: $main-orange;
    padding: 10px 22px;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 25px;
  }
}
</style>
