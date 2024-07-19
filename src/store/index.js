// store/index.js

import { createStore } from 'vuex';
import StartTask from '../components/models/StartTask.vue';
import EmailTask from '../components/models/EmailTask.vue';

const store = createStore({
  state: {
    tasks: {
      startTask: {
        id: 'startTask',
        category:'startTask',
        name: 'Start',
        component: StartTask,
        data:{}
      },
      emailTasks: [],
      redirectTasks:[]
    }
  },
  mutations: {
    addTask(state, { id, name, component, initData,category }) {
      if (category==='email'){
        state.tasks.emailTasks.push({ id, name, component, data: initData,category:'email' });
      }
      if(category==='redirect'){
        state.tasks.redirectTasks.push({ id, name, component, data: initData ,category:'redirect'});
      }
    },
    removeTask(state, task) {
      console.log("Task is",task);
      if(task.category==='email'){
        const index = state.tasks.emailTasks.findIndex(task => task.id === task.taskId);
          state.tasks.emailTasks.splice(index, 1);
      }
      if(task.category==='redirect'){
        const index = state.tasks.redirectTasks.findIndex(task => task.id === task.taskId);
          state.tasks.redirectTasks.splice(index, 1);
      }
   
    },
    
  },
  actions: {
    
  },
  getters: {
    getTaskById: (state) => (category,taskId) => {
      if(category==='startTask'){
        return state.tasks.startTask;
      }
      if(category==='email'){
          return state.tasks.emailTasks.find(task => task.id === taskId);
      }
      if(category==='redirect'){
        return state.tasks.redirectTasks.find(task => task.id === taskId);
      }
    },
    getAllTasks: (state) => {
      return {
        startTask: state.tasks.startTask,
        emailTasks: state.tasks.emailTasks,
        redirectTasks: state.tasks.redirectTasks,
      };
    },
  },
});

export default store;
