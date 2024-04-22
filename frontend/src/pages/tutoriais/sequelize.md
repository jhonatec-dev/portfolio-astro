---
layout: ../../layouts/ProjectLayout.astro
title: Sequelize sem sequela
description: Aprenda a usar o ORM Sequelize com Node + TypeScript
image: { url: /assets/images/tutorials/sequelize.png, alt: thumbnail }
date: 2024-04-21
---

[Repositório](https://github.com/jhonatec-dev/desafio-sequelize)

Neste Repositório irei demonstrar como usar o ORM Sequelize em um projeto com NodeJS (com TypeScript)
O projeto conta com duas branches para mostrar o uso com foco na lib sequelize-cli que gera migrations e tudo mais
E outra branch codando do zero mesmo a model e sincronizando com o banco de dados

### Usando sequelize-cli

Nesta branch será dado foco na geração dos arquivos de forma automática pelo console

[Clique aqui](https://github.com/jhonatec-dev/desafio-sequelize/tree/sequelize-cli)

### Usando Sequelize de forma manual

Nesta branch, criarei o arquivo de Model e usarei alguns passos para sincronizar com o banco

[Clique aqui](https://github.com/jhonatec-dev/desafio-sequelize/tree/manual)

### Em todas as branches

Criarei uma tabela de Users
E ReadBooks para compreender um relacionamento entre elas

Usarei as rotas `/users` e `/books` para enviar via POST as informações para o banco
E o mesmo para o GET em cada uma delas

Usarei a rota GET `/report` para uma lista de usuários com todos os livros lidos

---

Curtiu?
Deixe uma ⭐ no repositório para fortalecer conteúdos como esse
Acesse meu site [JhonaTec.dev](www.jhonatec.dev)


---
# Branch Sequelize com CLI

Vamos usar as migrations e configurar o ambiente com calma

# Requisitos:

- Docker 🐋 (opcional)
- Node 💚
- Não ter amor a vida pra gostar de Sequelize 😶‍🌫️
- Ter esperanças de um futuro melhor ao seguir essas dicas 😇

# Colocando o ambiente pra rodar

1. Clone o projeto

```bash
git clone git@github.com:jhonatec-dev/desafio-sequelize.git
```

2. Na pasta do projeto rode o arquivo docker-compose.yml

```bash
docker compose up -d --build
```

> Espere com paciência a subir os Containers 🥸

4. Code como se não houvesse amanhã! 🤓

---

# Como configurar o Sequelize para Migrations

## 1. Instale o CLI também (além do sequelize e mysql2)

```bash
npm i sequelize-cli
```

## 2. Crie um arquivo `.sequelizerc`

> Aqui ele vai informar pro CLI que dentro da pasta `src/database` é o local onde ele deverá gerar os arquivos
> database.json é o arquivo de configuração, daqui a pouco vamos falar dele

```js
const path = require("path");

module.exports = {
  config: path.resolve("src", "database", "config", "database.json"),
  "models-path": path.resolve("src", "database", "models"),
  "seeders-path": path.resolve("src", "database", "seeders"),
  "migrations-path": path.resolve("src", "database", "migrations"),
};
```

## 4. Inicie o Sequelize

```bash
npx sequelize-cli init
```

## 3. Atualize seu JSON de conexão com o banco

Abra o arquivo `src/database/config/database.json` e atualize as infos de conexão, por exemplo:

```json
{
  "development": {
    "username": "root",
    "password": "root_password",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## 4. Crie o banco de dados:

Rode para criar o Banco de Dados!

```bash
npx sequelize-cli db:create
```

## 5. Crie sua primeira Migration

Rode o comando de exemplo:

```bash
npx sequelize-cli model:generate --name User --attributes name:string,age:integer

```

Com isso, alguns arquivos serão criados, um na pasta `src/database/migrations` com o nome da tabela Users
Outro na pasta `src/database/models` para ser usado mais tarde na aplicação

## 5.1 Crie a Migration Book

Rode o comando:

```bash
npx sequelize-cli model:generate --name Book --attributes title:string,userId:integer

```

Agora vamos alterar os arquivos, começando com a Migration de Books na pasta `src/database/migrations/book.js`:

```js
//... RESTO DO ARQUIVO ...
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },

//... RESTO DO ARQUIVO ...
```

> Assim, o campo passa a ser obrigatório e faz referência à tabela de Users, onde o campo `Book.idUser = User.id`

### Alterando os Models

Vamos começar com a Model de Book `src/database/models/book.js`:

```js
// ... RESTO DO ARQUIVO ...
    static associate(models) {
      // define association here
      Book.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
// ... RESTO DO ARQUIVO ...
```

Por fim, o Model de User `src/database/models/user.js`:

```js
// ... RESTO DO ARQUIVO ...
       static associate(models) {
      // define association here
      User.hasMany(models.Book, {
        foreignKey: 'userId',
        as: 'books'
      });
    }
// ... RESTO DO ARQUIVO ...
```

## 6. Rode as Migrations

Comando:

```bash
npx sequelize-cli db:migrate
```

# O PULO DO GATO ⏏️ 🐈 (se der problema usando Docker 🐋)

Provavelmente seu banco estará criado agora, com a tabela(s) da pasta de migrations... Mas quando você chamar na aplicação, a coisa dá erro como se o `HOST` do arquivo `.json` estivesse errado. Mas não está!

O que acontece é que quando for executado na aplicação, a chave `host` deve ter o valor de `'mysql'` e vamos fazer isso manualmente no arquivo `src/database/models/index.js`:

```js
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.json")[env];
const db = {};

// Em caso de Docker 🐋🐋
const dotenv = require('dotenv');
dotenv.config();
// nome do serviço do banco de dados no docker-compose.yml
// ou no arquivo .env (por isso o dotenv.config())
config.host = process.env.DB_HOST; 

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// .... RESTO DO ARQUIVO ....
```

# Usando o model gerado

Agora vamos a um exemplo de código usando o model da pasta `src/database/models`:

```typescript
import { DataTypes } from "sequelize";
import db from "./database/models"; // está no arquivo src/database/models/index.js
import user from "./database/models/user"; // model gerado ao rodar o sequelize-cli model:generate
import book from "./database/models/book"; // model gerado ao rodar o sequelize-cli model:generate

// Defining the model passing the sequelize instance and the data types
const UserModel = user(db.sequelize, DataTypes);
const BooksModel = book(db.sequelize, DataTypes);
// Defining Relationship (because somehow doesn't work in associate alone)
UserModel.hasMany(BooksModel, { as: "books" });
BooksModel.belongsTo(UserModel, { as: "user" });

// método de exemplo já usando um método POST na rota /user
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  try {
    // padrão do arquivo gerado pelo CLI é receber um objeto do tipo Sequelize e um DataTypes
    const model = user(db.sequelize, DataTypes);
    // usando a instância do Model de Users para salvar no Banco
    const newPerson = await model.create({ name, age });
    res.status(201).send(newPerson);
  } catch (error) {
    res.status(500).send({
      message: "Unable to create a new user",
      error,
    });
  }
});
```

> O arquivo `src/server.ts` já contém a forma de uso com rotas definidas de forma bem simples e objetiva.
>
>Execute com `npm run dev`
>
> Fique à vontade para adaptar com sua realidade.

---

# Branch manual com TypeScript 💙

# Requisitos:

- Docker 🐋
- Node 💚
- Não ter amor a vida pra gostar de Sequelize 😶‍🌫️
- Ter esperanças de um futuro melhor ao seguir essas dicas 😇

# Colocando o ambiente pra rodar

1. Clone o projeto

```bash
git clone git@github.com:jhonatec-dev/desafio-sequelize.git
```

2. Na pasta do projeto rode o arquivo `docker-compose.yml`

> É de extrema importância lembrar de informar o nome da base de dados já no arquivo do `docker-compose.yml`

```bash
docker compose up -d --build
```

3. Espere com paciência a subir o DB e o BACK 🥸

4. Code como se não houvesse amanhã! 🤓

---

# Criando os arquivos

## 1. Crie um arquivo para servir de conexão

Criei meu arquivo em `src/config/database.ts`

## 2. Crie sua Model User `src/models/User.model.ts`

Aqui usei a documentação do Sequelize para criar os campos usando como base minha Interface já definida para uso na aplicação

```ts
// Gerar Model para Sequelize usando o type User
import { sequelize } from "../config/database";
import { User } from "../interfaces/User";

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>
  implements User
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare age: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
  }
);

export { UserModel };
```

## 3. Crie sua Model Book `src/models/Books.model.ts`

Aqui usei a documentação do Sequelize para criar os campos usando como base minha Interface já definida para uso na aplicação

## 4. Sincronize os models com o banco de dados

No arquivo `src/server.ts` por exemplo, chame a função sequelize.sync() para que os modelos sejam enviados em forma de criação de tabelas para o banco

```ts
import cors from "cors";
import dayjs from "dayjs";
import express, { Application } from "express";
import { BookModel } from "./models/Book.model";
import { UserModel } from "./models/User.model";

// Sincronizando o Sequelize com o banco de dados
import { sequelize } from "./config/database";
sequelize.sync();
UserModel.hasMany(BookModel, { as: "books", foreignKey: "userId" });
BookModel.belongsTo(UserModel, { as: "user", foreignKey: "userId" });

// ... RESTO DO ARQUIVO ...
```

> O arquivo `src/server.ts` já contém a forma de uso com rotas definidas de forma bem simples e objetiva.
>
>Execute com `npm run dev`
>
> Fique à vontade para adaptar com sua realidade.

# A P R O V E I T E

## Curtiu? Deixe uma ⭐️ no Repositório pra fortalecer mais conteúdos como esse!
[Repositório](https://github.com/jhonatec-dev/desafio-sequelize)
