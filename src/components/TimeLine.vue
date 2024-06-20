<script setup lang="ts">
// import { DateTime } from "luxon";
// import { ref, computed } from "vue";
// import { TimelinePost, today, thisWeek, thisMonth } from "../posts";
import TimeLineItem from "./TimeLineItem.vue";
import { usePosts } from "../stores/posts";
import { periods } from "../constants";

//calling the function usePosts()
const postsStore = usePosts();

//calling method fetchPosts
//postsStore.fetchPosts();

await postsStore.fetchPosts();


// const periods = ["Today", "This Week", "This Month"] as const;

// type Period = typeof periods[number];

// const selectedPeriod = ref<Period>("Today");

// function selectPeriod(period: Period) {
//     //   console.log(period);
//     selectedPeriod.value = period;
// }

// const posts = computed<TimelinePost[]>(() => {
//     // return [today, thisWeek, thisMonth]
//     return postsStore.ids
//         // .map(post => {
//         //     return {
//         //         ...post,
//         //         created: DateTime.fromISO(post.created)
//         //     }
//         // })

//         .map(id => {
//             const post = postsStore.all.get(id)
//             if(!post){
//                 throw Error(`Post with id of ${id} was expected but not found.`)
//             }
//             return {
//                 ...post,
//                 created: DateTime.fromISO(post.created)
//             }
//         })
//         .filter(post => {
//             // if (selectedPeriod.value === "Today") {
//             //     return post.created >= DateTime.now().minus({ day: 1 })
//             // }
//             if (postsStore.selectedPeriod === "Today") {
//                 return post.created >= DateTime.now().minus({ day: 1 })
//             }
//             // if (selectedPeriod.value === "This Week") {
//             //     return post.created >= DateTime.now().minus({ week: 1 })
//             // }
//             if (postsStore.selectedPeriod === "This Week") {
//                 return post.created >= DateTime.now().minus({ week: 1 })
//             }
//             return post
//         })
// })

</script>

<template>
    <!-- {{ postsStore.foo }}
    <button @click="postsStore.updateFoo('bar')">Update</button> -->
    <nav class="is-primary panel">
        <!-- {{ selectedPeriod }} -->
        <span class="panel-tabs">
            <!-- <a>Today</a>
            <a>This Week</a>
            <a>This Month</a> -->
            <a v-for="period in periods" :key="period" :class="{ 'is-active': period === postsStore.selectedPeriod }"
                @click="postsStore.setSelectedPeriod(period)">
                {{ period }}
            </a>
        </span>

        <!-- <a v-for="post of posts" :key="post.id" class="panel-block">
            <a>{{ post.title }}</a>
            <div>{{ post.created.toFormat("d MMM") }}</div>
        </a> -->

        <!-- <TimeLineItem v-for="post of posts" :key="post.id" :post="post" /> -->

        <TimeLineItem v-for="post of postsStore.filteredPosts" :key="post.id" :post="post" />
    </nav>
</template>
