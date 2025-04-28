# Wasp

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![EJS](https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=fff)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/)
[![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)](https://code.visualstudio.com/)

## Indice

<img src="./content/iconapp.png">

## Objectiu breu del projecte

Desenvolupar una aplicació web per registrar, gestionar i fer seguiment d’incidències informàtiques dins de l'institut. El sistema permet la comunicació entre usuaris, tècnics i responsables informàtics, així com la generació d’informes i estadístiques.

## Diagrama casos d'us

<img src="./content/diagcasus.png">


## Guia d'instal·lació Node.js
### Què és Node.js?

Node.js és un entorn d'execució que permet fer servir JavaScript fora del navegador, habitualment per crear aplicacions de servidor, scripts o APIs.

### Què és npm?

Quan instal·les Node.js, també tens accés a npm (Node Package Manager), el gestor de dependències. Et permet instal·lar paquets (llibreries o eines de codi que altres han escrit) perquè els puguis utilitzar al teu projecte.

### 1. Instala nvm

Obre un terminal i executa:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Després, tanca i torna a obrir el terminal, o carrega manualment nvm amb:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && echo "$HOME/.nvm" || echo "$XDG_CONFIG_HOME/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 2. Comprova que nvm funciona

```bash
nvm --version
```

### 3. Instal·la Node.js (versió estable LTS)

```bash
nvm install --lts
```

### 4. Comprova que npm i Node.js funcionen

```bash
node -v
npm -v
```


## Què són les dependències?

Les dependències són paquets de codi (com llibreries, eines o frameworks) que el teu projecte necessita per funcionar. Per exemple:

· express → servidor web

· mongoose → connexió amb MongoDB

· dotenv → gestió de variables d'entorn

### 1. Crea un projecte Node.js

```bash
mkdir el-meu-projecte
cd el-meu-projecte
npm init -y
```

Això crearà un fitxer package.json que descriu el projecte i les seves dependències.

### 2. Instal·lar les dependències

Per exemple, per instal·lar express:

```bash
npm install express
```

Això farà tres coses:

· Baixar el codi del paquet a una carpeta node_modules/

· Afegir express a la secció dependencies del teu package.json

· Crear un fitxer package-lock.json que registra exactament quina versió s’ha instal·lat

### 3. Exemple d'ús d'una dependència en el codi

```bash
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola món!');
});

app.listen(3000, () => {
  console.log('Servidor escoltant al port 3000');
});
```

### 4. Instal·lar totes les dependències

Si t'envien el projecte noms amb el fitxer package.json, pots reconstruir totes les dependncies amb: 

```bash
npm install
```