<template>
  <div class="sidebar startSidebar h-screen overflow-y-scroll w-[20%] flex flex-col justify-center items-center text-2xl font-bold space-y-4 absolute top-0 right-0 p-3 customshadow">
    <!-- Add Email Task Button -->
    <div class="task flex items-center space-x-3 cursor-pointer" @click="addEmailTask">
      <i class="fa-solid fa-envelope"></i>
      <button>Email</button>
    </div>
    <div class="task flex items-center space-x-3 cursor-pointer" @click="addRedirectTask">
      <i class="fa-solid fa-diamond-turn-right"></i>
      <button>Redirect</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import EmailTask from '../components/models/EmailTask.vue';
import RedirectTask from "../components/models/RedirectTask.vue"
const store = useStore();


const addEmailTask = () => {
  const emailTaskId = 'emailTask_' + Date.now(); 
  const emailTaskName = `Email Task ${store.state.tasks.emailTasks.length + 1}`; 
  store.commit('addTask', { id: emailTaskId, name: emailTaskName, component: EmailTask, initData: {},category:'email' });
};

const addRedirectTask=()=>{
  const redirectTaskId = 'redirectTask_' + Date.now();
  const redirectTaskName = `Redirect Task ${store.state.tasks.redirectTasks.length + 1}`;
  store.commit('addTask',{id:redirectTaskId,name:redirectTaskName,component:RedirectTask,initData:{},category:'redirect'})
}
</script>

<style scoped>

</style>
