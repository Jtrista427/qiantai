<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 在home和search才显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style lang='less'>
</style>