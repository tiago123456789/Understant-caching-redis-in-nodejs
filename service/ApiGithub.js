const MathematicOperation = require("./../lib/MathematicOperation");
const CONSTANTES = require("./../config/Constantes");

module.exports = function ({ clientHTTP, clientRedis }) {

    const getRepositories = async (username) => {
        return await clientHTTP.get(`${CONSTANTES.API.GITHUB}${username}/repos`);
    };

    const getQuantityStartAllRepositoryUser = (username) => {
        return new Promise((resolve, reject) => {
            try {
                clientRedis.get(username, async (err, data) => {
                    if (err || !data) {
                        const response = await getRepositories(username);
                        const totalStars = MathematicOperation.getCount(response.data, "stargazers_count");
                        clientRedis.setex(username, CONSTANTES.REDIS.TIME_EXPIRED_CACHE_IN_SECONDS, totalStars);
                        resolve(totalStars);
                    } else {
                        resolve(data);
                    }
                })
            } catch(error) {
                reject(error);
            }
        });
    };

    return {
        getRepositories,
        getQuantityStartAllRepositoryUser
    }
}