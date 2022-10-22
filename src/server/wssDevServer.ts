import fetch from 'node-fetch';
import ws from 'ws';

if (!global.fetch) {
  (global as any).fetch = fetch;
}
const wss = new ws.Server({
  port: 3001,
});

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  wss.close();
});
