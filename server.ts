const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: any, res: any) => {
    handle(req, res);
  }).listen(3000, (err: any) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});
