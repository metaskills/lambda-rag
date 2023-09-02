<script setup>
import { ref, onMounted } from "vue";
import PromptMessage from "@/components/PromptMessage.vue";
import { useMessagesStore } from "@/stores/messages";

let text = ref("");
let cssHeight = ref("auto");
const button = ref(null);
const loading = ref(null);
const textArea = ref(null);
const messagesStore = useMessagesStore();

const handleInput = (_event) => {
  let height = textArea.value.scrollHeight;
  if (text.value === "") {
    height = 24;
  }
  cssHeight.value = `${height}px`;
};

const handleSubmit = () => {
  if (messagesStore.isLoading) {
    return;
  }
  const message = { role: "user", content: text.value };
  messagesStore.add(message);
  messagesStore.fetchResponse();
  text.value = "";
  cssHeight.value = "24px";
  textArea.value.focus();
};

onMounted(() => {
  textArea.value.focus();
});
</script>

<template>
  <div
    class="absolute bottom-0 left-0 pt-3 md:pl-2 w-[calc(100%-1rem)] bg-gradient-to-t from-base-100 via-base-100 to-transparent">
    <form @submit.prevent="handleSubmit"
      class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-[54rem] xl:max-w-[54rem]">
      <div class="relative flex h-full flex-1 items-stretch md:flex-col" role="presentation">
        <div>
          <div class="h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center">
            <div class="grow"></div>
          </div>
        </div>
        <div
          class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-lg">
          <textarea tabindex="0" rows="1" placeholder="Send a message"
            class="m-0 w-full outline-none resize-none border-0 p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
            v-model="text" @input="handleInput" @keydown.enter.exact.prevent="handleSubmit" ref="textArea"
            :style="{ 'max-height': '200px', height: cssHeight }"></textarea>
          <button :disabled="text === '' || messagesStore.isLoading"
            class="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40"
            :style="{
              backgroundColor:
                text === '' || messagesStore.isLoading
                  ? ''
                  : 'rgb(25, 195, 125)',
            }">
            <span ref="button" :class="messagesStore.isLoading ? 'hidden' : 'visible'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="h-4 w-4 m-1 md:m-0"
                stroke-width="2">
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor"></path>
              </svg>
            </span>
            <div :class="messagesStore.isLoading ? 'visible' : 'hidden'" ref="loading" class="text-2xl">
              <span class="">·</span>
              <span class="">·</span>
              <span class="">·</span>
            </div>
          </button>
        </div>
      </div>
    </form>
    <PromptMessage />
  </div>
</template>

<style scoped>
textarea::-webkit-scrollbar {
  width: 0.5em;
}

textarea::-webkit-scrollbar-track {
  background-color: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 1em;
}
</style>
