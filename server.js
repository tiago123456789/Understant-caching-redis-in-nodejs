const express = require("express");
const redis = require("redis");
const axios = require("axios");
const app = express();
const CONSTANTES = require("./config/Constantes");
const clientRedis = redis.createClient({ host: CONSTANTES.REDIS.HOST, port: CONSTANTES.REDIS.PORT });
const Github = require("./service/ApiGithub")({ clientHTTP: axios, clientRedis: clientRedis });

app.get("/api/:username", async (request, response) => {
    const username = request.params.username;
    const totalStars = await Github.getQuantityStartAllRepositoryUser(username);
    response.status(200).json({ totalStars });
});

app.listen(CONSTANTES.PORT, () => console.log("Server ready!"));