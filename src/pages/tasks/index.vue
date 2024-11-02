<template>
  <h1>Tasks Page</h1>
  <RouterLink to="/">Home</RouterLink>
  <template v-if="tasks?.length">
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <RouterLink :to="{ name: '/tasks/[id]', params: { id: task.id } }">
          {{ task.name }}
        </RouterLink>
      </li>
    </ul>
  </template>
</template>
<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { ref } from "vue";
import type { Tables } from "../../../database/types";

const tasks = ref<Tables<"tasks">[] | null>([]);

const getTasks = async () => {
  const { data, error } = await supabase.from("tasks").select();

  if (error) {
    console.log(error);
  }

  tasks.value = data;
};

(async () => {
  await getTasks();
})();
</script>
<style scoped></style>
