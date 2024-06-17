<script setup lang="ts">
import {ref} from 'vue'

const periods = ["Today", "This Week", "This Month"];

let selectedPeriod = ref("Today");

function selectPeriod(period: string) {
  console.log(period);
  selectedPeriod.value = period;
}
</script>

<template>
  <nav class="is-primary panel">
    {{ selectedPeriod }}
    <span class="panel-tabs">
      <!-- <a>Today</a>
            <a>This Week</a>
            <a>This Month</a> -->
      <a
        v-for="period in periods"
        :key="period"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
  </nav>
</template>
