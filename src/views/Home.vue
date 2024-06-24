<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue'
</script>

<template>
    <Suspense>
        <template #default>
            <TimeLine />
        </template>

        <template #fallback>
            <!-- Loading... -->
            <!-- <progress class="progress is-primary is-small"/> -->
            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </template>
    </Suspense>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";

.loading-dots {
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
}
</style>