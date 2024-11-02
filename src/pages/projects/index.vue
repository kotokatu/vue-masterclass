<template>
  <h1>Projects Page</h1>
  <RouterLink to="/">Home</RouterLink>
  <template v-if="projects?.length">
    <ul>
      <li v-for="project in projects" :key="project.id">
        <RouterLink
          :to="{ name: '/projects/[id]', params: { id: project.id } }"
        >
          {{ project.name }}
        </RouterLink>
      </li>
    </ul>
  </template>
</template>
<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { ref } from "vue";
import type { Tables } from "../../../database/types";

const projects = ref<Tables<"projects">[] | null>([]);

const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select();

  if (error) {
    console.log(error);
  }

  projects.value = data;
  console.log(projects.value);
};

(async () => {
  await getProjects();
})();
</script>
<style scoped></style>
