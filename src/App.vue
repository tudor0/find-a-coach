<template>
  <div>
    <the-head></the-head>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in"
        ><component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryLogin');
  },
};
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.4s ease-in-out;
}
</style>
