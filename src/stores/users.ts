import { defineStore } from "pinia";
import { NewUser } from "../users";

/* this Pinia store defines a single action createUser that takes a NewUser object 
    as an argument and sends a POST request to http://localhost:8000/users to create a new user. 
    The request body contains the JSON representation of the newUser object.*/
export const useUsers = defineStore("users",{
    actions:{
        createUser(newUser:NewUser){
            // console.log(post)
            //JSON.stringify() : which converts the object to a JSON string.
            const body = JSON.stringify(newUser)
            return window.fetch("http://localhost:8000/users",{
                method : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body
            })
        }
    }
})