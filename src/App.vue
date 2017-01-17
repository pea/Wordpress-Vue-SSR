<template>
  <div id="app">
     <ul>
       <li><router-link to="/archive">Archive</router-link></li>
       <li><router-link to="/category/news">News Category</router-link></li>
       <li><router-link to="/page/sample-page">Sample Page</router-link></li>
       <li><router-link to="/post/sample-bost">Post 404</router-link></li>
       <li><router-link to="/page/sample-bage">Page 404</router-link></li>
     </ul>
     <router-view class="view"></router-view>
  </div>
</template>
