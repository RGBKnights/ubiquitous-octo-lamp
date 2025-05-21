export const sampleProject = {
  'index.html': {
    file: {
      contents: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebContainer Example</title>
    <style>
      body {
        font-family: sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      h1 { color: #42b883; }
      button {
        background-color: #42b883;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #33a06f;
      }
    </style>
  </head>
  <body>
    <h1>Hello from WebContainer!</h1>
    <p>This page is running inside a WebContainer.</p>
    <p>Counter: <span id="counter">0</span></p>
    <button id="increment">Increment</button>

    <script>
      let count = 0;
      const counterEl = document.getElementById('counter');
      const incrementBtn = document.getElementById('increment');
      
      incrementBtn.addEventListener('click', () => {
        count++;
        counterEl.textContent = count;
      });
    </script>
  </body>
</html>
      `,
    },
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "webcontainer-example",
  "version": "1.0.0",
  "description": "Example project for WebContainer",
  "main": "index.js",
  "scripts": {
    "dev": "serve ."
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
      `,
    },
  },
};