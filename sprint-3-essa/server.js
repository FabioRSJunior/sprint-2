// Importação dos pacotes necessários
const express = require("express"); // Pacote para criar o servidor web
const path = require("path"); // Pacote para manipular caminhos de arquivo
const multer = require("multer"); // Pacote para lidar com o upload de arquivos
const { ImageAnnotatorClient } = require("@google-cloud/vision"); // Pacote para usar a API de Visão do Google Cloud

const app = express(); // Criação de uma instância do servidor Express
const port = process.env.PORT || 3000; // Porta em que o servidor irá rodar (padrão: 3000)
const upload = multer({ dest: "uploads/" }); // Configuração do middleware Multer para lidar com o upload de arquivos
const client = new ImageAnnotatorClient({
  keyFilename: "credential.json" // Configuração do cliente da API de Visão do Google Cloud usando um arquivo de credenciais
});

// Rota para análise das propriedades da imagem
app.post("/color", upload.single("file"), (req, res) => {
  // Middleware Multer processa o upload do arquivo e o armazena em "req.file"
  // O parâmetro "file" especifica o nome do campo de entrada no formulário HTML

  client
    .imageProperties(req.file.path) // Chama a função da API de Visão do Google Cloud para obter as propriedades da imagem
    .then(results => {
      res.send(results); // Envia a resposta com os resultados da análise de propriedades da imagem
    })
    .catch(err => {
      res.status(400).send(err); // Envia uma resposta de erro caso ocorra algum problema
    });
});

// Middleware para servir arquivos estáticos na pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Inicia o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${server.address().port}`); // Exibe uma mensagem quando o servidor estiver online
});