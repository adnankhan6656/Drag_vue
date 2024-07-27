<template>
  <div class="h-screen w-full flex items-center justify-center relative">
    <div class="left w-[80%] dropzone height-full">
      <div v-for="(task,index) in allTasks" :key="task.id" >
        <div class="task p-9 draggable customshadow w-[200px] rounded-[50%] flex flex-col space-y-2 items-center justify-center" :id="task.id">
          <p>{{ index +1 }}</p>
          <i :class="task.icon"></i>
          <p class="text-sm">{{ task.name }}</p>
          <div class="flex items-center space-x-2">
            <i class="fa-solid fa-edit cursor-pointer" @click="openTaskModel(task.id)"></i>
            <i class="fa-solid fa-trash cursor-pointer" v-if="task.id !== 'startTask'" @click="removeTask(task.id)"></i>
          </div>
        </div>
      </div>
      
      <component v-if="activeTask" :is="activeTask.component" @close="activeTask = null" :activeTaskData="activeTask" />
    </div>
    <div class="right w-[20%]">
      <Sidebar />
    </div>
    
  </div>
</template>

<script setup>
import interact from 'interactjs';
import { useStore } from 'vuex';
import { ref, computed, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';

const store = useStore();

const allTasks = computed(() => store.getters.getAllTasks);


let activeTask = ref(null);

const openTaskModel = (taskId) => {
  const task = store.getters.getTaskById(taskId);
  if (task) {
    activeTask.value = task;
  }
};

const removeTask = (taskId) => {
  store.commit('removeTask', taskId);
  store.commit('unlinkTasks', taskId);
  if (activeTask.value && activeTask.value.id === taskId) {
    activeTask.value = null;
  }
};

onMounted(() => {
  interact('.draggable').draggable({
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
.links-svg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}


</style>