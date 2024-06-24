
import { defineStore } from "pinia";
import { Period } from "../constants";
import { Post, today, thisWeek, thisMonth, TimelinePost } from "../posts";
import { DateTime } from "luxon";

interface PostsState {
    // foo:string
    ids: string[] //["1","2"]
    all: Map<string, Post> //map is a generic type that represents a collection of key-value pairs.
    selectedPeriod: Period //a proprty that representts the currently selected time period(example : today, thisWeek, thisMonth)
}

//when refresh the page ..data not show directly bcz set the settimeout
function delay() {
    return new Promise<void>(res => setTimeout(res, 1500))
}

//creating a stor called usePosts using the defineStore function
//the store has three parts: state, actions and getters
export const usePosts = defineStore("posts", {

    //state used to define the intial state of the store.
    state: (): PostsState => ({
        // foo:"foo"
        // ids: [today.id, thisWeek.id, thisMonth.id],
        ids: [], //intialize the ids property with an empty array.
        all: new Map(), //all property with a new empty Map 
        // all: new Map([
        //     [today.id, today],
        //     [thisWeek.id, thisWeek],
        //     [thisMonth.id, thisMonth],
        // ]),
        selectedPeriod: "Today" //initialize the selectedPeriod property with the string value today
    }),

    //the actions object is a part of the store that defines functions that can be used to modify the state of the store.
    actions: {
        // updateFoo(foo:string){
        //     this.foo = foo
        // }

        // below action setSelectedPeriod purpose of this action is to allow to the store's state to be updated with a new selected period
        //(today,thisWeek,thisMonth)
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
        },

        async fetchPosts() {
            //sends a GET request to "http://localhost:8000/posts" using window.fetch API. await keyword is used to wait for the promise to resolve.
            const res = await window.fetch("http://localhost:8000/posts")

            //await res.json() : sends an HTTP request to the specific URL and wait for the response.
            //await keyword is used to wait for the promise retuned by res.json() to resolve
            //as Post[] : used to cast the parsed JSON data to an array of POst objects.
            const data = (await res.json()) as Post[]

            //simulate delay in fetching data
            await delay()

            //empty array ids to store the IDs of the fetched posts.
            let ids: string[] = []

            //empty map all to store the fetched posts with their ids as keys.
            let all = new Map<string, Post>()

            //This loop goes through each post object in the data array.
            for (const post of data) {
                //add the  id property of each post object to an array called ids
                ids.push(post.id)
                //adds each post object to a Map called all using the id property as the key.
                all.set(post.id, post)
            }
            //update the ids and all property of the store's state with the new ids array and all map.
            this.ids = ids
            this.all = all
        },
        createPost(post:TimelinePost){
            // console.log(post)
            //JSON.stringify() : which converts the object to a JSON string.
            const body = JSON.stringify({...post, created: post.created.toISO()})
            return window.fetch("http://localhost:8000/posts",{
                method : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body
            })
        }
    },
    getters: {
        //state: this is a function signature. it takes a single argument state , which is an object that represents the current state of the application
        //timelinepost: this is the return type of the function . it returns an array of timelinepost object.
        filteredPosts: (state): TimelinePost[] => {
            //state.ids: this accesses the ids property of the state object.ids is likey an array of ids that correspond to posts
            return state.ids
                //.map : this is a methid that creates a new array by applying a function to each element of the original array. n this case the original array is ids array.
                .map(id => {
                    //this accesses the all property of the state object which is likey an object that stores all posts.
                    //the get method is called on all with the id argument , which retrives the post object associated with the given id
                    const post = state.all.get(id)
                    if (!post) {
                        throw Error(`Post with id of ${id} was expected but not found.`)
                    }
                    return {
                        ...post, //this spreads the post object into a new object, which means it copies all the properties of post into the new object.
                        created: DateTime.fromISO(post.created)
                    }
                })
                .filter(post => {
                    if (state.selectedPeriod === "Today") {
                        return post.created >= DateTime.now().minus({ day: 1 })
                    }
                    if (state.selectedPeriod === "This Week") {
                        return post.created >= DateTime.now().minus({ week: 1 })
                    }
                    return post
                })
        }
    }
})


/* When the selected period is "Today", the code checks if each post's created
date is within the last 24 hours. If the post was created within the last 24 hours,
it is included in the filtered array.*/

/* When the selected period is "This Week",
the code checks if each post's created date is within the last 7 days.
If the post was created within the last 7 days, it is included in
the filtered array.*/

















// import {reactive, readonly} from "vue"

//ref -> number,string
//computed -> directives
//reactive -> complex object map, set

// interface PostsState {
//     foo:string
// }

// export class PostsStore{
//     #state:PostsState

//     constructor(){
//         this.#state = reactive<PostsState>({
//             foo:'foo'
//         })
//     }

//     getState (){
//         return readonly(this.#state)
//     }

//     updateFoo(foo: string){
//         this.#state.foo = foo
//     }
// }

// const store = new PostsStore()

// export function usePosts(){
//     return store
// }