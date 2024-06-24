<script lang="ts" setup>
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import {TimelinePost} from '../posts';

const post: TimelinePost = {
    id: "-1",
    title: "Title",
    created: DateTime.now(),
    markdown : '## Title', //allows users to create formatted text using plain text
    html: '<h2>Title</h2>'
}
</script>

<template>
    <div>
        New Post
        <PostWriter :post="post" />
    </div>
</template>