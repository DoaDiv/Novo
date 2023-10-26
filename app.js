const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
const port = 8081;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let volunteerCount = 0; 

app.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    if (err) {
      res.status(500).send('Erro interno do servidor, volte a página ou entre novamente no site.');
      return;
    }

    const data = `Nome: ${fields.nome}\nTelefone: ${fields.telefone}\nEmail: ${fields.email}\nData de Nascimento: ${fields.nascimento}\nDisponibilidade: ${fields.disponibilidade}\n\n`;

    const fileName = `voluntario${++volunteerCount}.txt`;

    const filePath = path.join(__dirname, 'Voluntario', fileName);

    fs.writeFile(filePath, data, (err) => {
      if (!err) {
 
        res.redirect('/');
      } else {
        res.status(500).send('Erro interno do servidor, volte a página ou entre novamente no site.');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
