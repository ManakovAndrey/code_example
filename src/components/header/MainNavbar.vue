<template>
  <nav id="main-navbar">
    <ul>
      <li><router-link to="/choose-type" class="link">Make design</router-link></li>
      <li><router-link to="/archief-page" class="link">Archief</router-link></li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'MainNavbar',
};

</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

#main-navbar {
  ul {
    list-style: none;
    display: flex;
    width: 400px;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    li {
      .link {
        color: white;
        font-weight: bold;
        display: block;
        padding: 10px 20px 10px 20px;
        box-sizing: border-box;
        &:hover {
          border-radius: 50px 50px;
          background-color: $main-orange;
        }
      }
    }
  }
}
</style>
