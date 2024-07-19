// store/index.js

import { createStore } from 'vuex';
import StartTask from '../components/models/StartTask.vue';
import EmailTask from '../components/models/EmailTask.vue';

const store = createStore({
  state: {
    tasks: [
      {
        startTask: {
          id: 'startTask',
          category:'startTask',
          name: 'Start',
          component: StartTask,
          data:{}
        }
      }
      
    ]
  },
  mutations: {
    addTask(state, { id, name, component, initData,category }) {
        state.tasks.push({ id, name, component, data: initData,category:'email' });
    },
    removeTask(state, task) {
        const index = state.tasks.findIndex(task => task.id === task.taskId);
          state.tasks.splice(index, 1);
    },
    
  },
  actions: {
    
  },
  getters: {
    getTaskById: (state) => (category,taskId) => {
          return state.tasks.find(task => task.id === taskId)
    },
    getAllTasks: (state) => {
      return {
       tasks: state.tasks
      };
    },
  },
});

export default store;
