<template>
  <Header/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, reactive, effect } from 'vue'
import Header from './components/Header/Header.vue'
import {reactive as reactiveX} from '../../packages/core/src/reactive'

let windowAge = 1
export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const lang = localStorage.getItem('lang') || 'en'
    const target = reactive({
      lang
    })
    if (!lang) {
      localStorage.setItem('lang', 'en')
    }

    function toggleLang() {
      target.lang = target.lang === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', target.lang)
    }

    return {
      toggleLang,
      target
    }
  },
  provide() {
    return {
      bus: this
    }
  },
  mounted() {
    // const target = {
    //   name: 'target',
    //   child1: {
    //     name: 'child1',
    //     age: 1,
    //     toys: ['cat', {name: 'ps5',price: 9999}],
    //     child2: {
    //       name: 'name2',
    //       child3: {
    //         name: 'child3'
    //       }
    //     }
    //   }
    // }
    // const state = reactive(target)
    // effect(() => {
    //   String(state.child1.toys[1].price)
    //   console.log(1123)
    // })
    // setInterval(()=> {
    //   state.child1.toys[1].price ++
    // },2000)
  }
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

#nprogress .bar {
  background: rgb(198, 37, 36);
  position: fixed;
  top: 0;
  z-index: 9999;
  left: 0;
  height: 3px;
  width: 100%;
}

#app {

}
</style>
