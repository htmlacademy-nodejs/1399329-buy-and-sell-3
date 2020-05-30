'use strict';

const path = require(`path`);
const express = require(`express`);
const app = express();

const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;

const mainRoutes = require(`./routes/main`);
const offersRouters = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);

const DEFAULT_PORT = 8080;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(`/`, mainRoutes);
app.use(`/offers`, offersRouters);
app.use(`/my`, myRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту ${DEFAULT_PORT}`));
