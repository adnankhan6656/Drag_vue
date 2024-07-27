
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
        label:'Start Task',
        data: [],
        icon: 'fa-solid fa-play',
      },
    ],
    links: []
  },
  actions:{
   
    updateDynamicFields({commit},data){
      commit('updateDynamicFields',data)
    },
    saveEmailData({commit},data){
      commit('saveEmailData',data)
    }
    
  },
  mutations: {
    addTask(state, { id, name, component, category, icon,label }) {
      state.tasks.push({ id, name, component, data: {}, category, icon ,label});
    },
    removeTask(state, taskId) {
    
      const index = state.tasks.findIndex(task => task.id === taskId);
      state.tasks.splice(index, 1);
      
    },
    linkTasks(state, { fromId, toId }) {
      state.links.push({ from: fromId, to: toId });
    },
    unlinkTasks(state, taskId) {
      const previousTasks = state.links.filter(link => link.to === taskId);
      const nextTasks = state.links.filter(link => link.from === taskId);
// here we will do like if its next task will null so we wil empty mean there is single object in links
  if(nextTasks.length==0){
    const needstobedelted=state.links.filter(link => link.to === taskId);
    state.links=state.links.filter((link)=>{
      return !(link.to==taskId);
    })
    return
  }  
      state.links.forEach(link => {
        if (link.to === taskId) {                   
          link.to = nextTasks[0].to;         
        }
      });
      state.links=state.links.filter((link)=>{
        return !(link.from==taskId);
      });
    },
   
      updateDynamicFields(state,data){
        const{localDynamicFields,taskId}=data;
        console.log("Task ID is",taskId)
        const task=state.tasks.find((task)=>{
          return task.id==taskId
          });
          task.data=localDynamicFields;
         
        },
        saveEmailData(state,data){
          const{emaildata,taskId}=data;
          const task=state.tasks.find((task)=>{
            return task.id==taskId
          });
          task.data=emaildata;

        }
  },
  getters: {
    getTaskById: (state) => (taskId) => {
      return state.tasks.find(task => task.id === taskId);
    },
    getAllTasks: (state) => {
      return state.tasks;
    },
    // Your other getters
  }
});



export default store;


