<script setup>
import { defineProps, computed } from "vue";
const { data } = defineProps(["data"]);
const imageSrc = computed(() => {
  return `/avatar-${data.role}.png`;
});
</script>

<template>
  <div :class="{
    group: true,
    'w-full': true,
    'text-token': true,
    'text-token-text-primary': true,
    'border-b': true,
    'border-b-base-300': true,
    'bg-base-200': data.role === 'user',
    'hidden': data.hidden,
  }">
    <div class="flex p-4 gap-4 text-base md:gap-6 md:max-w-[58rem] lg:max-w-[60rem] xl:max-w-[60rem] lg:px-0 m-auto">
      <div class="flex-shrink-0 flex flex-col relative items-end">
        <div class="w-[30px]">
          <div class="relative flex">
            <img alt="User" width="38" height="38" class="rounded-sm" style="color: transparent" :src="imageSrc" />
          </div>
        </div>
      </div>
      <div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
        <div class="flex flex-grow flex-col gap-3">
          <div class="min-h-[20px] flex flex-col items-start gap-3 overflow-x-auto">
            <div class="markdown" v-html="data.contentDisplay || data.content"></div>
          </div>
        </div>
        <div class="flex justify-between lg:block"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
