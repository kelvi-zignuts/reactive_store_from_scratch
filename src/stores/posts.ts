
import { defineStore } from "pinia";
import { Period } from "../constants";
import { Post, today, thisWeek, thisMonth, TimelinePost } from "../posts";
import { DateTime } from "luxon";

interface PostsState {
    // foo:string
    ids: string[] //["1","2"]
    all: Map<string, Post>
    selectedPeriod: Period
}


export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        // foo:"foo"
        ids: [today.id, thisWeek.id, thisMonth.id],
       
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth],
        ]),
        selectedPeriod: "Today"

    }),
    actions: {
        // updateFoo(foo:string){
        //     this.foo = foo
        // }

        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
        },

        
    },
    getters: {
        filteredPosts: (state): TimelinePost[] => {
            return state.ids
                .map(id => {
                    const post = state.all.get(id)
                    if (!post) {
                        throw Error(`Post with id of ${id} was expected but not found.`)
                    }
                    return {
                        ...post,
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