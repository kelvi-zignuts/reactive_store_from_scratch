<script setup lang="ts">
// import TimeLine from './components/TimeLine.vue'
import { computed } from "vue";
import Navbar from "./components/Navbar.vue";
import { useModal } from "./composable/modal";

const modal = useModal()

const modalStyle = computed(()=>{
  return{
    display:modal.show.value? 'block' : 'none'
  }
})

</script>

<template>
  <div class="modal" style="color: white;" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>
  <div class="section">
    <div class="container">
      <Navbar/>
      <RouterView />
      <!-- <Suspense> -->
      <!-- <template #default>
          <TimeLine />
        </template>

<template #fallback> -->
      <!-- Loading... -->
      <!-- <progress class="progress is-primary is-small"/> -->
      <!-- <div class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </template> -->

      <!-- </Suspense> -->
    </div>
  </div>
</template>

<style v-highlight="'javascript'">
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";
@import "../node_modules/highlight.js/styles/atom-one-dark.css";
/* @import '~highlight.js/styles/atom-one-dark.css'; */

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1, h2, h3, h4, h5, h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}

/* .loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #333;
  margin: 0 5px;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
} */
</style>