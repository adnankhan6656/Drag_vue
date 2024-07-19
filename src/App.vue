<template>
  <div class="h-screen w-full flex items-center justify-center relative">
    <!-- Start Task div -->
    <div class="draggable relative cursor-pointer text-2xl customshadow p-9 rounded-[50%] flex flex-col space-y-2 items-center justify-between"
         >
      <i class="fa-solid fa-play"></i>
    
      <p>Start</p>
      <div class="flex items-center space-x-2">
        <i class="fa-solid fa-edit cursor-pointer" @click="openTaskModel('startTask')" ></i>
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>

  <!-- Email Task Section -->
    <div v-for="task in emailTasks" :key="task.id" class="task draggable relative cursor-pointer text-2xl customshadow p-9 rounded-[50%] flex flex-col space-y-2 items-center justify-between">
      <i class="fa-solid fa-envelope"></i>
      <p>{{ task.name}}</p>
      <div class="flex items-center space-x-2">
        <i class="fa-solid fa-edit cursor-pointer" @click="openTaskModel(task.category,task.id)"></i>
        <i class="fa-solid fa-trash" @click.stop="removeTask(task.category,task.id)"></i>
      </div>
    </div>

    <!-- Redirect Tasks Section -->
    <div v-for="task in redirectTasks" :key="task.id" class="task draggable relative cursor-pointer text-2xl customshadow p-9 rounded-[50%] flex flex-col space-y-2 items-center justify-between">
      <i class="fa-solid fa-diamond-turn-right"></i>
      <p>{{ task.name }}</p>
      <div class="flex items-center space-x-2">
        <i class="fa-solid fa-edit cursor-pointer" @click="openTaskModel(task.category,task.id)"></i>
        <i class="fa-solid fa-trash" @click.stop="removeTask(task.category,task.id)"></i>
      </div>
    </div>


    <Sidebar />

   
    <component v-if="activeTask" :is="activeTask.component" @close="activeTask = null" :activeTaskData="activeTask"/>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed,onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';

const store = useStore();


const emailTasks = computed(() => store.getters.getAllTasks.emailTasks);


const redirectTasks=computed(()=>{
  return store.getters.getAllTasks.redirectTasks
})


let activeTask = ref(null);
const openTaskModel = (category,taskId) => {
  const task = store.getters.getTaskById(category,taskId);
  if (task) {
    activeTask.value = task;
  }
};


const removeTask = (category,taskId) => {
  store.commit('removeTask', {category,taskId});
  if (activeTask.value && activeTask.value.id === taskId) {
    activeTask.value = null;
  }
};

import interact from 'interactjs';
onMounted(() => {
  interact('.draggable')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
      autoScroll: true,
      onmove: (event) => {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
    });
});

</script>

<style scoped>
.customshadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.task {
  /* Styling for task divs */
}
</style>
