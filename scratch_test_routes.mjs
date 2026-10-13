import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9222;

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--no-first-run',
  'about:blank'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await listRes.json();
  const page = pages.find(p => p.type === 'page');

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.onopen = resolve);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  const routes = [
    '/',
    '/destinations',
    '/packages',
    '/ayurveda',
    '/flights',
    '/services',
    '/services/doorstep-transit',
    '/how-it-works',
    '/about'
  ];

  for (const route of routes) {
    await send('Page.navigate', { url: `http://localhost:3000${route}` });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll down 400px
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 400);` });
    await new Promise(r => setTimeout(r, 300));

    const result = await send('Runtime.evaluate', {
      expression: `(() => {
        const header = document.querySelector('header');
        const rect = header ? header.getBoundingClientRect() : null;
        return {
          route: '${route}',
          scrollY: window.scrollY,
          headerTop: rect ? rect.top : null,
          isSticky: rect && Math.abs(rect.top) < 1
        };
      })()`,
      returnByValue: true
    });

    console.log(result.result.value);
  }

  ws.close();
} catch (err) {
  console.error(err);
} finally {
  chrome.kill();
}
