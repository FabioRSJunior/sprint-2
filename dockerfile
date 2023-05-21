FROM node:10-alpine 

#Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src

#Copie o arquivo package.json e package-lock.json
COPY package*.json ./

RUN npm install
# # Copie todo o código-fonte da aplicação
COPY . .

#Expõe a porta que a aplicação irá escutar
EXPOSE 3000

#Comando padrão para executar a aplicação
CMD [ "node", "server.js" ]

#DOCKER COMPOSE vai ignorar o EXPOSE e o CMD

#Antiga (funciona)
# # Use uma imagem Node.js como base
# FROM node:14

# # Crie e defina o diretório de trabalho dentro do contêiner
# WORKDIR /src

# # Copie o arquivo package.json e package-lock.json (se existir)
# COPY package*.json ./

# # Instale as dependências
# RUN npm install

# # Copie todo o código-fonte da aplicação
# COPY . .

# # Expõe a porta que a aplicação irá escutar
# EXPOSE 3000

# # Comando padrão para executar a aplicação
# CMD [ "node", "server.js" ]
