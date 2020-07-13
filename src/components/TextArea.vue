<template>
  <div class="form__group field">
    <textarea v-model="inputValue" v-bind="$attrs" type="input" class="form__field" placeholder="Name" rows="4" name="name" id='name' autocomplete="off" required />
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    value: {
      type: String,
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
  border: 2px solid $gray;
  border-radius: 10px;
  outline: 0;
  font-size: 1.3rem;
  color: black;
  padding: 3px 0;
  background: transparent;
  transition: border-color 0.2s;
  padding: 10px;
  box-sizing: border-box;

  &::placeholder {
    color: transparent;
  }
}

.form__field:focus {
  // font-weight: 700;
  border-width: 3px;
  border-color: $main-orange;
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}
</style>
