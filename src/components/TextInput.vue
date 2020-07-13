<template>
  <div class="form__group field">
    <input v-model="inputValue" v-bind="$attrs" :type="inputType" class="form__field" placeholder="Name" name="name" :autocomplete="hide ? 'new-password' : 'off'" required />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    inputType() {
      if (this.hide) {
        return 'password';
      }
      return 'text';
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

$primary: #11998e;
$secondary: #38ef7d;
$gray: #9b9b9b;
.form__group {
  position: relative;
  width: 100%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 3px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }
}

.form__field:focus {
  // font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $main-orange,#e2897a);
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
