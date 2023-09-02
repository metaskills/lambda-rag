<script setup>
import { ref, watch } from "vue";
import { useMessagesStore } from "@/stores/messages";
import Welcome from "@/components/Welcome.vue";
import Message from "@/components/Message.vue";

const messagesContainer = ref(null);
const messagesStore = useMessagesStore();

watch(
  () => messagesStore.loadingState,
  () => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  },
);
</script>

<template>
  <div ref="messagesContainer" class="flex-1 overflow-auto">
    <div class="h-full">
      <Welcome v-if="messagesStore.isEmpty" />
      <Message v-else v-for="(message, index) in messagesStore.messages" :key="`${index}-${message.role}`"
        :data="message" />
      <div class="h-32 md:h-36 flex-shrink-0"></div>
    </div>
  </div>
</template>

<style scoped>
</style>
