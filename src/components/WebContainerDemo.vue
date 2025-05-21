<script setup lang="ts">
import { ref } from 'vue';
import { getWebContainer } from '../webcontainer/webcontainer';
import { sampleProject } from '../webcontainer/sampleProject';
import Terminal from './Terminal.vue';
import Preview from './Preview.vue';

const logs = ref<string[]>([]);
const preview = ref<InstanceType<typeof Preview> | null>(null);
const isLoading = ref(false);
const isServerRunning = ref(false);

function addLog(message: string) {
  logs.value.push(message);
}

async function startWebContainer() {
  if (isLoading.value || isServerRunning.value) return;
  
  isLoading.value = true;
  logs.value = [];
  
  try {
    addLog('📦 Booting WebContainer...');
    const webcontainer = await getWebContainer();
    
    addLog('📄 Mounting project files...');
    await webcontainer.mount(sampleProject);
    
    addLog('📥 Installing dependencies...');
    const installProcess = await webcontainer.spawn('npm', ['install']);
    
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          addLog(data);
        },
      })
    );
    
    const installExitCode = await installProcess.exit;
    
    if (installExitCode !== 0) {
      throw new Error(`Installation failed with code ${installExitCode}`);
    }
    
    addLog('🚀 Starting dev server...');
    const devProcess = await webcontainer.spawn('npm', ['run', 'dev']);
    
    devProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          addLog(data);
        },
      })
    );
    
    // Listen for server-ready event
    webcontainer.on('server-ready', (port, url) => {
      addLog(`🌐 Server ready at ${url}:${port}`);
      if (preview.value) {
        preview.value.setUrl(url);
      }
      isServerRunning.value = true;
      isLoading.value = false;
    });
    
  } catch (error) {
    addLog(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="webcontainer-demo">
    <h2>WebContainer Demo</h2>
    
    <p class="description">
      This demo shows how to use WebContainer API to run a Node.js server directly in your browser.
      Click the button below to start a development server inside WebContainer.
    </p>
    
    <button 
      @click="startWebContainer" 
      class="start-button"
      :disabled="isLoading || isServerRunning"
    >
      <span v-if="isLoading" class="loading">
        Starting server
        <span class="dots"><span>.</span><span>.</span><span>.</span></span>
      </span>
      <span v-else-if="isServerRunning">Server Running ✓</span>
      <span v-else>Start WebContainer</span>
    </button>
    
    <h3>Terminal Output</h3>
    <Terminal :logs="logs" />
    
    <h3>Preview</h3>
    <Preview ref="preview" />
  </div>
</template>

<style scoped>
.webcontainer-demo {
  margin: 2rem 0;
}

h2 {
  margin-bottom: 1rem;
  color: #35495e;
}

h3 {
  margin: 1.5rem 0 0.5rem;
  color: #35495e;
}

.description {
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: #666;
}

.start-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s, transform 0.1s;
  min-width: 180px;
  height: 40px;
}

.start-button:hover:not(:disabled) {
  background-color: #33a06f;
  transform: translateY(-1px);
}

.start-button:active:not(:disabled) {
  transform: translateY(1px);
}

.start-button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.loading {
  display: inline-flex;
  align-items: center;
}

.dots span {
  animation: dots 1.5s infinite;
  animation-fill-mode: both;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dots {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>