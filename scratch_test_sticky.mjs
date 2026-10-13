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
  
  // Navigate to localhost:3000
  await send('Page.navigate', { url: 'http://localhost:3000' });
  
  // Wait 3 seconds for Next.js to render
  await new Promise(r => setTimeout(r, 4000));

  const initialEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('header');
      const rect = header ? header.getBoundingClientRect() : null;
      const htmlStyle = window.getComputedStyle(document.documentElement);
      const bodyStyle = window.getComputedStyle(document.body);
      const parentStyle = header && header.parentElement ? window.getComputedStyle(header.parentElement) : null;
      return {
        scrollY: window.scrollY,
        headerRect: rect ? { top: rect.top, bottom: rect.bottom, height: rect.height } : null,
        htmlOverflowX: htmlStyle.overflowX,
        htmlOverflowY: htmlStyle.overflowY,
        bodyOverflowX: bodyStyle.overflowX,
        bodyOverflowY: bodyStyle.overflowY,
        parentOverflowX: parentStyle ? parentStyle.overflowX : null,
        parentOverflowY: parentStyle ? parentStyle.overflowY : null,
        headerPosition: header ? window.getComputedStyle(header).position : null,
        headerTop: header ? window.getComputedStyle(header).top : null,
        headerClasses: header ? header.className : null,
      };
    })()`,
    returnByValue: true
  });

  console.log('INITIAL:', JSON.stringify(initialEval.result.value, null, 2));

  // Scroll down 600px
  await send('Runtime.evaluate', {
    expression: `window.scrollTo(0, 600);`,
  });

  await new Promise(r => setTimeout(r, 1000));

  const scrolledEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const header = document.querySelector('header');
      const rect = header ? header.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        headerRect: rect ? { top: rect.top, bottom: rect.bottom, height: rect.height } : null,
        headerClasses: header ? header.className : null,
      };
    })()`,
    returnByValue: true
  });

  console.log('AFTER SCROLL:', JSON.stringify(scrolledEval.result.value, null, 2));

  ws.close();
} catch (err) {
  console.error(err);
} finally {
  chrome.kill();
}
