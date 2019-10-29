const express = require('express');

const hubsRouter = require('./data/hubs/hubs-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });

  server.use('/api/posts', hubsRouter);

  server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });
  