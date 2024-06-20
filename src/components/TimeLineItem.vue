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

//function that defines the props of component.
//<> : is a type parameter that specifies the shape of the props object.
/* <{post:TimelinePost}> : is a type annotation that specifies the shape of the props object. 
in this case props object will have a single property called post which will be of type TimelinePost */
//() : function call operator
defineProps<{
    // post : Post
    post: TimelinePost
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