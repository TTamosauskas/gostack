import express from 'express';   // Importa as rotas do Express
 
const server = express();

server.get('/', (req, res) => {
  return res.json({ message: 'Hello World? '});
});

server.listen(3000)
