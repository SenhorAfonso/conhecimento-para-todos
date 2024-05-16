import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.send(`Login realizado com sucesso! Usuário: ${username}`);
});

app.post('/register', (req, res) => {
  const { newUsername, newPassword } = req.body;
  res.send(`Cadastro realizado com sucesso! Novo usuário: ${newUsername}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
