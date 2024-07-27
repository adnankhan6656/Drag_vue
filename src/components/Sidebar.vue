<template>
  <div
    class="sidebar startSidebar h-screen overflow-y-scroll w-[20%] flex flex-col justify-center items-center text-2xl font-bold space-y-4 absolute top-0 right-0 p-3 customshadow"
  >
    <button
      class="bg-black text-white p-2 width-[250px] rounded-md"
      @click="startExecution"
    >
      Start
    </button>
    <div
      v-for="taskType in taskTypes"
      :key="taskType.category"
      class="task flex items-center space-x-3 cursor-pointer"
      @click="addTask(taskType)"
    >
      <i :class="taskType.icon"></i>
      <button>{{ taskType.label }}</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import EmailTask from "../components/models/EmailTask.vue";
import RedirectTask from "../components/models/RedirectTask.vue";
import TestCode from "../components/models/TestCode.vue";

const store = useStore();

const taskTypes = [
  {
    category: "email",
    label: "Email",
    icon: "fa-solid fa-envelope",
    component: EmailTask,
  },
  {
    category: "redirect",
    label: "Redirect",
    icon: "fa-solid fa-diamond-turn-right",
    component: RedirectTask,
  },
];

const addTask = (taskType) => {
  const taskId = `${taskType.category}Task_${Date.now()}`;
  const taskName = `${taskType.label} Task `;
  store.commit("addTask", {
    id: taskId,
    name: taskName,
    label: taskType.label,
    component: taskType.component,
    category: taskType.category,
    icon: taskType.icon,
  });

  const lastTask = store.getters.getAllTasks[store.state.tasks.length - 2];
  if (lastTask) {
    store.commit("linkTasks", { fromId: lastTask.id, toId: taskId });
  }
};

const startExecution = () => {
  const tasks = store.getters.getAllTasks;
  const startTask = store.getters.getAllTasks.filter((task) => {
    return task.category === "startTask";
  });
  tasks.forEach((task) => {
    if (task.category == "email") {
      console.log("Email Task is ", task.data.to);
      startTask[0].data.forEach((field) => {
        const placeholder = `{${field.name}}`;
        task.data.to = task.data.to.split(placeholder).join(field.value);
        task.data.title = task.data.title.split(placeholder).join(field.value);
        task.data.body = task.data.body.split(placeholder).join(field.value);
      });
    }
  });
};
</script>
