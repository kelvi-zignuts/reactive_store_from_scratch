<script setup lang="ts">
import { computed, ref } from "vue";
import FormInput from "./FormInput.vue";
import { validate, length, required } from '../validation';
import { NewUser } from "../users";
import { useUsers } from "../stores/users";
import { useModal } from "../composable/modal";

//username is a reactive variable that can be used to store and update a username value
const username = ref('')

//computed property is a value that is deried from other values, in this case, the username value. whenever username changes, the computation will be re-run to update the value of usernameStatus
//The validate function will return an object indicating whether the username is valid or not, based on these rules. The usernameStatus computed property will then hold this validation result.
const usernameStatus = computed(() => {
    return validate(username.value, [required, length({ min: 5, max: 10 })])
})

const password = ref('')

const passwordStatus = computed(() => {
    return validate(password.value, [required, length({ min: 8, max: 10 })])
})

//If both usernameStatus.value.valid and passwordStatus.value.valid are true, then isInvalid will be false, indicating that the form is valid.
const isInvalid = computed(() => {
    return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const usersStore = useUsers()

const modal = useModal()

/* checks if the form is invalid and if so, returns immediately
   creates a new user object with the current username and password values
   Calls the createUser method on the usersStore instance to create a new user, waiting for the operation to complete.
   hides the modal after the new user has been created successfully*/
async function handleSubmit() {
    if (isInvalid.value) {
        return
    }
    const newUser: NewUser = {
        username: username.value,
        password: password.value,
    }
    // console.log(newUser);

    await usersStore.createUser(newUser)
    modal.hideModal()
}
</script>

<template>
    <!-- <form class="form" @submit.prevent="handleSubmit">
        <FormInput name="UserName" v-model="username" :status="usernameStatus" type="text"/>
        <FormInput name="Password" v-model="password" :status="passwordStatus" type="password"/>
        <button class="button" :disabled="isInvalid">Submit</button>
    </form> -->

    <form class="ui form" @submit.prevent="handleSubmit">
        <div class="field">
            <FormInput name="UserName" v-model="username" :status="usernameStatus" type="text" />
        </div>
        <div class="field">
            <FormInput name="Password" v-model="password" :status="passwordStatus" type="password" />
        </div>
        <button class="ui button" :disabled="isInvalid">Submit</button>
    </form>
</template>

<style scoped>
.form {
    background: rgb(115, 111, 111);
    padding: 30px;
    margin-top: 50px;
}
</style>