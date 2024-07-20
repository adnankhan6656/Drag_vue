
import { createStore } from 'vuex';
import StartTask from '../components/models/StartTask.vue';


const store = createStore({
  state: {
    tasks: [
      {
        id: 'startTask',
        category: 'startTask',
        name: 'Start',
        component: StartTask,
        data: {
          dynamicFields: [],
        },
        icon: 'fa-solid fa-play',
      },
    ]
  },
  mutations: {
    addTask(state, { id, name, component, category, icon }) {
      state.tasks.push({ id, name, component, data: {}, category, icon });
    },
    removeTask(state, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId);
      state.tasks.splice(index, 1);
    },
   
  },
  getters:{
    getTaskById: (state) => (taskId) => {
      return state.tasks.find(task => task.id === taskId)
},
getAllTasks: (state) => {
  return state.tasks
}
  }
 
});


export default store;


