<script setup lang="ts">
// import TimeLine from './components/TimeLine.vue'
import { useModal } from "../composable/modal";
import SignupForm from './SignupForm.vue'

const modal = useModal()

</script>

<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons">

                <button class="button" @click="modal.showModal()">Sign Up</button>
                <!-- <a href="/posts/new" class="button">New Post</a> -->

                <!-- Client-side routing: No page reloads, faster navigation -->
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>
            </div>
        </div>
    </div>
    <Teleport  to="#modal">
        <SignupForm/>
    </Teleport>
</template>