<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
import Recommend from "@/pages/Home/Recommend/Recommend.vue";
import Rank from "@/pages/Home/Rank/Rank.vue";
import Like from "@/pages/Home/Like/Like.vue";
import Floor from "@/pages/Home/Floor/Floor.vue";
import Brand from "@/pages/Home/Brand/Brand.vue";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 获取floor组件的数据
    this.$store.dispatch("home/getFloorList");
    // 获取用户信息在首页展示
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.FloorList;
      },
    }),
  },
};
</script>

<style lang='less'>
</style>