<template>
  <div class="sidebar startSidebar h-screen overflow-y-scroll w-[20%] flex flex-col justify-center items-center text-2xl font-bold space-y-4 absolute top-0 right-0 p-3 customshadow">
    <div v-for="taskType in taskTypes" :key="taskType.category" class="task flex items-center space-x-3 cursor-pointer" @click="addTask(taskType)">
      <i :class="taskType.icon"></i>
      <button>{{ taskType.label }}</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import EmailTask from '../components/models/EmailTask.vue';
import RedirectTask from "../components/models/RedirectTask.vue";
import TestCode from "../components/models/TestCode.vue";

const store = useStore();

const taskTypes = [
  {
    category: 'email',
    label: 'Email',
    icon: 'fa-solid fa-envelope',
    component: EmailTask,
  },
  {
    category: 'redirect',
    label: 'Redirect',
    icon: 'fa-solid fa-diamond-turn-right',
    component: RedirectTask,
  },
  {
    category: 'testCode',
    label: 'Test Code',
    icon: 'fa-solid fa-code',
    component: TestCode,
  },
];

const getTaskCount = (category) => {
  return store.state.tasks.filter(task => task.category === category).length;
};

const addTask = (taskType) => {
  const taskId = `${taskType.category}Task_${Date.now()}`;
  const taskName = `${taskType.label} Task ${getTaskCount(taskType.category) + 1}`;
  store.commit('addTask', {
    id: taskId,
    name: taskName,
    component: taskType.component,
    category: taskType.category,
    icon: taskType.icon
  });


};
</script>
