<script setup lang="ts">
import WebContainerDemo from './components/WebContainerDemo.vue';
</script>

<template>
  <div class="app">
    <header>
      <h1>WebContainer API Demo</h1>
      <p class="subtitle">Run Node.js in your browser with the WebContainer API</p>
    </header>
    
    <main>
      <WebContainerDemo />
      
      <div class="info-section">
        <h2>About WebContainer API</h2>
        <p>
          The WebContainer API allows you to run Node.js directly in your browser.
          This enables you to create interactive coding environments, sandboxed demos, 
          and more, all without any server-side infrastructure.
        </p>
        
        <h3>Key Features:</h3>
        <ul>
          <li>Run npm install and other Node.js commands</li>
          <li>Mount and write files to a virtual file system</li>
          <li>Start development servers and preview the results</li>
          <li>Execute Node.js code directly in the browser</li>
        </ul>
        
        <div class="note">
          <h4>Important Note:</h4>
          <p>
            WebContainers require SharedArrayBuffer, which needs cross-origin isolation.
            In production, make sure your site is served with the following headers:
          </p>
          <pre>Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin</pre>
        </div>
        
        <p class="learn-more">
          <a href="https://webcontainers.io" target="_blank">Learn more about WebContainer API</a>
        </p>
      </div>
    </main>
    
    <footer>
      <p>Created with Vue 3 and WebContainer API v1.6.1</p>
    </footer>
  </div>
</template>

<style>
/* Global styles */
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
}

#app {
  width: 100%;
}

.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  color: #42b883;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

main {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

h2 {
  color: #35495e;
  margin-bottom: 1rem;
}

h3 {
  color: #35495e;
  margin: 1.5rem 0 1rem;
}

h4 {
  color: #35495e;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

ul {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

a {
  color: #42b883;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.note {
  background-color: #f8f8f8;
  border-left: 4px solid #42b883;
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 0 4px 4px 0;
}

pre {
  background-color: #f1f1f1;
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  margin-top: 0.5rem;
}

.learn-more {
  margin-top: 1.5rem;
}

footer {
  margin-top: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  padding: 1rem 0;
}

/* Responsive styles */
@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  main {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>