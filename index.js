import express from 'express';
 
const server = express();

server.use(express.json());

// Variaveis

const projects = [
  { id: '1', title: 'Novo projeto', tasks: [] }
];

let requisicoes = 0;

let project = null;

// Midlewares

function contagem(req, res, next) {
  console.log("Requisição " + requisicoes);
  requisicoes = requisicoes + 1;
  return next();
 }

function verificaId(req, res, next) {

 const {index} = req.params;
 
 project = projects.find(item => item.id === index);

  if (!project){
    return res.status(400).json({error:"ID Inexistente"});
  }

return next();
}

// Rotas


server.get('/projects', contagem, (req, res) => {
  return res.json(projects)
})

server.post('/projects', contagem, (req,res) => {
  
  const {id, title, tasks} = req.body;

  projects.push({id, title, tasks});

  return res.json(projects)
})

server.put('/projects/:index', contagem, verificaId, (req,res) => {

  const {title} = req.body;
   
  project.title = title;

  return res.json(projects)
})


server.delete('/projects/:index', contagem, verificaId, (req,res) => {

  projects.splice(project,1)

  return res.json(projects)
})


server.post('/projects/:index/tasks', contagem, verificaId, (req,res) => {
   
  const {title} = req.body;

  project.tasks.push(title);

  return res.json(projects)
})


server.listen(3000)
