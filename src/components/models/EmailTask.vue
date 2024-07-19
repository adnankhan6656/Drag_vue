<template>
  <div class="startTaskModel  min-w-[500px] mx-auto  h-[600px] z-10 bg-white overflow-y-scroll  absolute top-0 left-[30%] p-12  customshadow">
    <button class="text-2xl">
      <i class="absolute top-0 right-0 fa-solid fa-xmark cursor-pointer p-11" @click="$emit('close')"></i>
    </button>
    <p class="text-2xl">Email Task</p>
    
  </div>
</template>

<script setup>
import {useStore} from "vuex"
const store=useStore()
import { ref,computed } from 'vue';
const dynamicFields=computed(()=>{
  return store.getters["getDynamicFields"]
})

const closeStartTaskModel=()=>{
  dynamicFields.value.forEach((field)=>{
    field.labelError=false;
    field.valueError=false;
  })
  if(validateForm()){
    store.dispatch("toggleStartTaskModel")
  } 

}
const closeTaskModel = taskId => {
  if(validateForm()){
    store.commit('toggleTaskModel', { taskId, isOpen: false })
  }

}

const generateFieldDynamic=(event)=>{
  const fieldType = event.target.value;
  let newField = {
    label: '',
    value: '',
    type: fieldType,
    labelError: false,
    valueError: false
  };
  store.dispatch("addDynamicField", newField);
}

const removeFromDyanmics=(index)=>{
  store.dispatch("removeDynamicField", index);
}

const validateForm=()=>{
  let isvalidate=true;
  dynamicFields.value.forEach((field)=>{
    if(!field.label){
      field.labelError=true;
      isvalidate=false;
      }
      if(!field.value){
        field.valueError=true;
        isvalidate=false;
        }
        });
        return isvalidate;
}

</script>

<style scoped>

</style>

