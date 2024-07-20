<template>
  <div class="startTaskModel  min-w-[500px] mx-auto  h-[600px] z-10 bg-white overflow-y-scroll  absolute top-0 left-[30%] p-12  customshadow">
    <button class="text-2xl">
      <i class="absolute top-0 right-0 fa-solid fa-xmark cursor-pointer p-11" @click="$emit('close')"></i>
    </button>
    <p class="text-2xl">Add Field</p>
    <div v-for="(field, index) in dynamicFields" :key="index">
      <label>{{ field.name }}</label>
      <input type="text" v-model="field.value" />
      <button @click="removeField(index)">Remove</button>
    </div>
    <div>
      <input type="text" v-model="newFieldName" placeholder="Field Name" />
      <input type="text" v-model="newFieldValue" placeholder="Field Value" />
      <button @click="addField">Add Field</button>
    </div>
  </div>

</template>

<script setup>
import {useStore} from "vuex"
const store=useStore()
import { ref,computed } from 'vue';

const closeTaskModel = taskId => {
    store.commit('toggleTaskModel', { taskId, isOpen: false })
}
const taskId = 'startTask';

// Retrieve dynamic fields from Vuex store
const dynamicFields = computed(() => store.getters.getTaskById(taskId).data.dynamicFields);

// Update dynamic field data in Vuex store
const updateField = (index, newValue) => {
  store.commit('updateDynamicField', {
    taskId,
    index,
    fieldData: {
      ...dynamicFields.value[index],
      value: newValue,
    },
  });
};

// Add a new dynamic field
const addField = (type) => {
  const newField = {
    name: `Field ${dynamicFields.value.length + 1}`,
    value: '',
    type: type // Add type property for differentiating field types
  };
  store.commit('addDynamicField', { taskId, field: newField });
};

// Remove a dynamic field
const removeField = (index) => {
  store.commit('removeDynamicField', { taskId, index });
};

</script>

<style scoped>

</style>

