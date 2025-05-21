<script setup lang="ts">
import { ref } from 'vue';

const iframeUrl = ref('');

defineExpose({
  setUrl(url: string) {
    iframeUrl.value = url;
  }
});
</script>

<template>
  <div class="preview-container">
    <div v-if="!iframeUrl" class="placeholder">
      <div class="message">Preview will appear here once the server is ready</div>
    </div>
    <iframe v-else :src="iframeUrl" class="preview-iframe"></iframe>
  </div>
</template>

<style scoped>
.preview-container {
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 400px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f9f9f9;
  color: #666;
}

.message {
  font-style: italic;
  padding: 1rem;
  text-align: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>