<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from "vue";
import { TimelinePost } from '../posts';
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from 'lodash/debounce';
import { usePosts } from '../stores/posts';
import { useRouter } from "vue-router";

const props = defineProps<{
  post: TimelinePost
}>()

//creating a reactive refrence to the title property, the component can react to changes to the title value.
const title = ref(props.post.title)

//reactive variable that will store the markdown content of the post
const content = ref(props.post.markdown)

//html variable is initially set to an empty string . 
//later, when the markdown content is parsed, the resulting HTML string will be stord in the html variable
const html = ref('')

//used to store a refrence to the content editable element in the template.
//HTMLDivElement : type of object that rpresents a <div> element in an HTML document.
const contentEditable = ref<HTMLDivElement>()

//posts is a instance of the usePosts function , which provides access to the posts data and functionality.
const posts = usePosts()

//router is an instance of the useRouter function, which allows the component to navigate between routes.
const router = useRouter();

async function parseResult(content: string, _options: {
  //gfm : github flavored markdown, breaks : allow line breaks in the markdown content
  gfm: boolean; breaks: boolean; highlight: (
    //code can be a string, number,object, an array pr even a function. by using any type checker won't compalin if you assign a value of any type to code.
    code:
      any
  ) =>
    any;
}) {
  //calls the marked.parse() function to parse the markdown content. marked is a popular markdown parser library
  //if the result of the parsing is a promise(ex: an asynchromous operation). if it is , the function uses the await keyword to waitfor the promise to resolve.
  //if the rsult is not promise, the function returns the result directly.
  const result = marked.parse(content)
  if (result instanceof Promise) {
    return await result
  } else {
    return result
  }
}

function parseHtml (markdown: string) {
  parseResult(markdown,{
    gfm : true,
    breaks:true,
    highlight : (code)=>{
      return highlightjs.highlightAuto(code).value
    }
  }).then(parseResult => {
    html.value = parseResult
    // console.log(parseResult)
  })
}

// watchEffect(()=>{
//   parseResult(content.value).then(parseResult => {
//     html.value = parseResult
//     // console.log(parseResult)
//   })
// })


//it's used yo observe changes to a reactive property content and execute a callabck function when thw property changes.
//debounce function returns a new function that, when called, will execute the original callback function after a delay of 2.5 second this is known as debouncing.
watch(content, debounce((newContent) => {
  parseHtml(newContent)
},2500),{
  immediate : true
})

//onMounted : when th component has been rendered and the DOM nodes are avaiable.
onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})
//the handleInput function is called when the use interacts with the editable DOM node (e.g., tyoes or pastes text)
function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerText
}

//this function is an asynchronous function that is likely  called when a user clicks a button or a link.
async function handleClick(){
  const newPost:TimelinePost = {
    ...props.post, // using spread operator to clone the props.post object and then adding three new properties
    title:title.value,
    markdown:content.value,
    html:html.value
  }
// we are calling the createPost method of the posts object passing the newpost object as an argument.
//await keyword indicates that we are waiting for the promise returned by createPost to resolve.
  await posts.createPost(newPost)
// redirects the user to the root route after the post has been created successfully.
  router.push("/")
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>