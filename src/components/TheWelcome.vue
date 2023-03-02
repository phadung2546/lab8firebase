<script setup>
import { ref } from "vue";

const items = ref([
  {
    src: "https://th.bing.com/th/id/OIP.Vj4tA_hiKF6ztfgjk3vE3gHaEg?pid=ImgDet&rs=1",
  },
  {
    src:
      "https://64.media.tumblr.com/e038b19944c113b704f8b73837143ca0/tumblr_obom2fcDj61vt2b6do1_1280.png",
  },
  {
    src:
      "https://em.wattpad.com/3f89dd857aa89019f5eb416b730d9ddffb5d0872/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f666e4c6d482d4f735258375270513d3d2d3837363430393239312e313630623130653132323661666634653338333934303233363437352e6a7067?s=fit&w=720&h=720",
  },
  {
    src:
      "https://png.pngtree.com/element_our/png_detail/20181114/thai-food-vector-design-illustration-png_236173.jpg",
  },
]);
</script>

<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
