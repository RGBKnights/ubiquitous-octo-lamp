<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  logs: string[];
}>();

const terminalRef = ref<HTMLDivElement | null>(null);

// Auto-scroll to bottom when logs update
watch(() => props.logs, () => {
  setTimeout(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }
  }, 0);
}, { deep: true });
</script>

<template>
  <div class="terminal" ref="terminalRef">
    <div v-for="(log, index) in logs" :key="index" class="log-line">
      {{ log }}
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: monospace;
  padding: 1rem;
  border-radius: 6px;
  height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  word-break: break-all;
}

.log-line {
  line-height: 1.4;
}
</style>