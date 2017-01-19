<template>
  <div id="app">
     <ul>
       <li><router-link to="/">Home</router-link></li>
       <li><router-link to="/archive">Archive</router-link></li>
       <li><router-link to="/category/product-design">Product Design Category</router-link></li>
     </ul>
     <keep-alive>
      <router-view class="view"></router-view>
     </keep-alive>
  </div>
</template>

<style lang="sass">
  @import 'app.scss';
</style>