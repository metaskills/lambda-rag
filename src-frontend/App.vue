<script setup>
import Messages from "@/components/Messages.vue";
import Prompt from "@/components/Prompt.vue";
</script>

<template>
  <div class="overflow-hidden w-full h-full relative flex z-0">
    <div class="relative flex h-full max-w-full flex-1 overflow-hidden">
      <div class="flex h-full max-w-full flex-1 flex-col">
        <main class="relative h-full w-full transition-width flex flex-col overflow-auto items-stretch flex-1">
          <Messages />
          <Prompt />
        </main>
      </div>
    </div>
  </div>
  <div class="absolute left-0 right-0 top-0 z-[2]"></div>
</template>

<style>
@import "./App.css";
</style>
