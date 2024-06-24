<script lang="ts" setup>
import { ref , onMounted} from "vue";
// import { ref } from "vue";
import { TimelinePost } from '../posts';
import { marked } from "marked";
// import highlightjs from 'highlight.js';
// import debounce from 'lodash/debounce'
// import hljs from "highlight.js";

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)

const content = ref(props.post.markdown)

// const html = ref('')

const contentEditable = ref<HTMLDivElement>()

// marked.parse(content.value,(err,parseResult) => {
//   console.log(parseResult)
// })
async function parseResult(content: string) {
  const result = marked.parse(content)
  if (result instanceof Promise) {
    return await result
  } else {
    return result
  }
}

parseResult(content.value).then(parseResult => {
  // html.value = parsedContent
  console.log(parseResult)
}) 
/* not working */
// watch(content, (newContent)=>{
//   marked.parse(newContent, (err, parseResult) => {
//   html.value = parseResult
//   // console.log(parseResult)
// })
// })

// watch(content, async (newContent) => {
//   try {
//     const parseResult = await marked.parse(newContent, {
//       gfm: true,
//       breaks: true,
//       highlight: (code: string, lang: string) => {
//         return highlightjs.highlightAuto(code).value;
//       }
//     });
//     html.value = parseResult;
//   } catch (err) {
//     console.error(err);
//   }
// });


// watch(content,(newContent) => {
//   marked.parse(newContent,{
//     gfm: true,
//       breaks: true,
//       highlight: (code: string, lang: string) => {
//         return highlightjs.highlightAuto(code).value;
//       }
//   },(err,parseResult)=>{
//     html.value = parseResult
//   })
// },{
//   immediate : true,
// });

onMounted(()=>{
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})
// onMounted(() => {
//   // console.log('Mounted')
//   console.log(contentEditable.value?.innerText)

//   // if (!contentEditable.value) {
//   //   throw Error('ContentEditable DOM node was not found')
//   // }
//   // contentEditable.value.innerText = content.value

// })

function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerText
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <!-- <input type="text" class="input" :value="title" @input ="event => title.value = event.target.value"> -->
        <input type="text" class="input" v-model="title">
        <!-- {{ title }} -->
      </div>

    </div>
  </div>

  <div class="columns">
    <div class="column">
      <!-- <div contenteditable ref="contentEditable" @input="handleInput" /> -->
      <div contenteditable ref="contentEditable" @input="handleInput" />
      <!-- This is a Post. -->
      <!-- {{ content }} -->
      <!-- </div> -->
    </div>
    <div class="column">
      <!-- Preview -->
      {{ content }}
      <!-- {{ html }} -->
      <!-- <div v-html="html" /> -->
    </div>
  </div>
</template>