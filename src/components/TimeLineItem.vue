<script setup lang="ts">
// import { Post } from "../posts";
import { TimelinePost } from "../posts.ts";

// const props = defineProps<{
//     // post : Post
//     post : TimelinePost
// }>()
// defineProps<{
//   post: TimelinePost
// }>()
defineProps<{
    // post : Post
    post : TimelinePost
}>()
</script>

<template>
    <div>
        <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
            <a>{{ post.title }}</a>
            <div>{{ post.created.toFormat("d MMM") }}</div>
        </a>
    </div>
</template>