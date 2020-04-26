'use strict';

const express = require(`express`);
const app = express();

const MainRoutes = require(`./routes/main`);
const OffersRouters = require(`./routes/offers`);
const MyRoutes = require(`./routes/my`);

const DEFAULT_PORT = 8080;

app.use(`/`, MainRoutes);
app.use(`/offers`, OffersRouters);
app.use(`/my`, MyRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту ${DEFAULT_PORT}`));
