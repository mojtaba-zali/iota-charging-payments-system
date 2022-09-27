<template>
  <div class="home">
    <Wallet />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Wallet from "@/components/Wallet.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    Wallet,
  },
});
</script>
