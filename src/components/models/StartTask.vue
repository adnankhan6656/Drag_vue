<template>
  <div class="startTaskModel  min-w-[500px] mx-auto  h-[600px] z-10 bg-white overflow-y-scroll  absolute top-0 left-[30%] p-12  customshadow">
    <button class="text-2xl">
      <i class="absolute top-0 right-0 fa-solid fa-xmark cursor-pointer p-11" @click="$emit('close')"></i>
    </button>
    <p class="text-2xl">Add Field</p>
    <!-- <select @change="generateFieldDynamic($event)"  class="p-3 rounded-lg my-3">
      <option value="" disabled selected>Select Field</option>
      <option value="textField">Text Field</option>
      <option value="numberField">Number Field</option>
    </select>
    <div v-for="(dynamicField,index) in dynamicFields" class="mt-4" :key="index">
      <p>Label :</p>
      <input class="bg-slate-200 p-3 focus:outline-none text-lg rounded-lg" type="text" v-model="dynamicField.label" :placeholder="dynamicField.label" >
      <p v-if="dynamicField.labelError" class="text-red-500">Label is required</p>
      <p>Value</p>
      <input class="bg-slate-200 p-3 focus:outline-none text-lg rounded-lg" :type="dynamicField.type" v-model="dynamicField.value"  :placeholder="dynamicField.label" >
      <p v-if="dynamicField.valueError" class="text-red-500">Value is required</p>
      <i class="fa-solid fa-minus text-xl cursor-pointer" @click="removeFromDyanmics(index)" ></i>
    </div> -->
  </div>
</template>

<script setup>
import {useStore} from "vuex"
const store=useStore()
import { ref,computed } from 'vue';

const closeTaskModel = taskId => {
    store.commit('toggleTaskModel', { taskId, isOpen: false })
}



</script>

<style scoped>

</style>

