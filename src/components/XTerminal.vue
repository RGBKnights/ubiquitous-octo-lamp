<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

const terminalRef = ref<HTMLDivElement | null>(null);
let terminal: Terminal | null = null;

const props = defineProps<{
  logs: string[];
}>();

// Initialize logs when terminal is ready
onMounted(() => {
  if (terminalRef.value) {
    terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'monospace',
      theme: {
        background: '#1a1a1a',
        foreground: '#f0f0f0'
      }
    });
    
    terminal.open(terminalRef.value);
    
    // Write initial logs if any
    if (props.logs.length > 0) {
      props.logs.forEach(log => terminal?.writeln(log));
    }
  }
});

  // Watch for changes in the logs array
watch(
  () => props.logs.length,
  (newLen, oldLen) => {
    if (!terminal) return;
    // Write only the new lines
    for (let i = oldLen; i < newLen; i++) {
      terminal.write(props.logs[i])
      // terminal.writeln(props.logs[i]);
    }
  }
);

</script>

<template>
  <div class="xterm-container">
    <div ref="terminalRef" class="terminal-wrapper"></div>
  </div>
</template>

<style scoped>
.xterm-container {
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.terminal-wrapper {
  height: 400px;
}
</style>