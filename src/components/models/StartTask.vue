<template>
  <div class="startTaskModel min-w-[900px] h-[600px] z-10 bg-white overflow-y-scroll absolute top-0 left-[10%] p-12 customshadow">
    <button class="text-2xl">
      <i class="absolute top-0 right-0 fa-solid fa-xmark cursor-pointer p-11" @click="handleClose"></i>
    </button>
    <p class="text-2xl">Add Field</p>

    <div class="flex flex-col">
      <button @click="addDynamicField" class="w-[50px] self-center p-4 bg-black text-white rounded-[50%]">
        +
      </button>
    </div>
    <div v-if="localDynamicFields.length > 0">
      <div v-for="(field, index) in localDynamicFields" :key="index" class="mt-4 flex items-center  space-x-3">
        <span class="text-red-500" v-if="field.error">{{ field.error }}</span>
        <div class="flex flex-col  ">
         <select v-model="field.type" class="border border-gray-300 p-2 rounded ml-2">
          <option value="" disabled selected>Select Field Type</option> 
          <option value="text">Text</option>
           <option value="number">Number</option>
         </select>
       </div>
        <input v-model="field.name" class="border border-gray-300 p-2 rounded" placeholder="Field Name">
        <input v-model="field.value" class="border border-gray-300 p-2 rounded ml-2" placeholder="Value">
        <button @click="removeDynamicField(index)" class="ml-2 text-red-500">Remove</button>
      </div>
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

const dynamicFields=computed(
 ()=>{
   return  store.getters.getTaskById(taskId).data;
 }
);

const localDynamicFields = ref([...dynamicFields.value])
const addDynamicField = () => {
  localDynamicFields.value.push({ type: '', name: '', value: '',error:''});
};

const removeDynamicField = (index) => {
  localDynamicFields.value.splice(index, 1);
};

const handleClose = () => {
  let isValid=true;
  localDynamicFields.value.forEach((field)=>{
    field.error=''
    if(field.type === ''){
      field.error="* Field Type is required";
      isValid=false
      return
    }
    if(field.name===''){
       field.error="*Name is required"
       isValid=false;
       return
    }
    if(field.value===''){
      field.error="*Value is required";
      isValid=false
      return
    }
    
  });
  if(isValid){
    store.dispatch('updateDynamicFields',{localDynamicFields:localDynamicFields.value,taskId})
    emit('close')
  }

  
};
</script>

<style scoped>
.customshadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>