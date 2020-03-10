import express from 'express';
 
const server = express();

server.use(express.json());

const projects = [
  { id: '1', title: 'Novo projeto', tasks: [] }
];


server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req,res) => {
  
  const {id, title, tasks} = req.body;

  projects.push({id, title, tasks});

  return res.json(projects)
})

server.put('/projects/:index', (req,res) => {

  const {index} = req.params;
  const {title} = req.body;
  const project = projects.find(item => item.id === index);
  
  project.title = title;

  return res.json(projects)
})


server.delete('/projects/:index', (req,res) => {

  const {index} = req.params;
  const project = projects.find(item => item.id === index);

  projects.splice(project,1)

  return res.json(projects)
})


server.post('/projects/:index/tasks', (req,res) => {
   
  const {title} = req.body;

  const {index} = req.params;
  const project = projects.find(item => item.id === index);

  project.tasks.push(title);

  return res.json(projects)
})



server.listen(3000)
