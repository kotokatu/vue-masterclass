<template>
  <h1>Home Page</h1>
  <RouterLink :to="{ name: '/projects/' }">Projects</RouterLink>
  <RouterLink :to="{ name: '/tasks/' }">Tasks</RouterLink>
</template>

<script setup lang="ts"></script>
<style scoped></style>
