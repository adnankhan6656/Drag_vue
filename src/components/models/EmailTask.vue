<template>
  <div class="startTaskModel min-w-[900px] h-[600px] z-10 bg-white overflow-y-scroll absolute top-0 left-[10%] p-12 customshadow">
    <button class="text-2xl">
      <i class="absolute top-0 right-0 fa-solid fa-xmark cursor-pointer p-11" @click="handleClose"></i>
    </button>
    <p class="text-2xl">Email Task</p>
      <div  class="mt-4 flex flex-col space-y-3">
        <span v-if="localData.error" class="text-red-500">{{ localData.error }}</span>
        <div class="flex items-center space-x-2">
        <label for="">To</label>
        <input type="text" v-model="localData.to" class="bg-slate-200 border-2 p-3 focus:outline-none autofocus rounded-lg w-full">
       </div>
       <div class="flex items-center space-x-2">
        <label for="">From</label>
        <input type="text" v-model="localData.from" class="bg-slate-200 border-2 p-3 focus:outline-none autofocus rounded-lg w-full">
       </div>
       <div class="flex items-center space-x-2">
        <label for="">Title</label>
        <input type="text" v-model="localData.title" class="bg-slate-200 border-2 p-3 focus:outline-none autofocus rounded-lg w-full">
       </div>
       <div class="flex items-center space-x-2">
        <label for="">Body</label>
        <textarea rows="10" cols="10" v-model="localData.body" class="bg-slate-200 border-2 p-3 focus:outline-none autofocus rounded-lg w-full"/>
       </div>
       <button class="bg-black text-white self-center rounded p-3" @click="handleClose">Save</button>
       <button class="bg-black text-white self-center rounded p-3" @click="replacePlaceholders">replace</button>
      </div>
    
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
import { ref, computed } from 'vue';
const emit=defineEmits(['close'])
const props = defineProps({
  activeTaskData: Object
});

const taskId = props.activeTaskData.id;
const previousData=computed(
 ()=>{
   return  store.getters.getTaskById(taskId).data;
 }
);
const localData=ref({
  to: previousData.value?.to || '',
  from: previousData.value?.from || '',
  title: previousData.value?.title || '',
  body: previousData.value?.body || '',
  error: ''
})


const handleClose = () => {
  let isValid=true;
localData.value.error=''
  if(localData.value.to==='' || localData.value.from==='' || localData.value.body==='' ||localData.value.title===''){
    isValid=false;
    localData.value.error='* All fields are required'
  }
  if(isValid){
    store.dispatch('saveEmailData',{emaildata:localData.value,taskId});
    emit('close')
  }
    

  
};
const replacePlaceholders = async() => {
  let task=store.getters.getTaskById('startTask');
  let body = localData.value.body;
  let to=localData.value.to;
  let from=localData.value.from;
  let title=localData.value.title;
  task.data.map((field) => {
    const placeholder = `{${field.name}}`;
    localData.value.body=localData.value.body.split(placeholder).join(field.value);
    localData.value.to=localData.value.to.split(placeholder).join(field.value);
    localData.value.from=localData.value.from.split(placeholder).join(field.value);
    localData.value.title= localData.value.title.split(placeholder).join(field.value);
  });
};
</script>

<style scoped>
.customshadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>