module.exports = ({
    PORT: process.env.PORT || 3000,
    REDIS: {
        HOST: "172.17.0.2",
        PORT: 6379,
        TIME_EXPIRED_CACHE_IN_SECONDS: 60
    },
    API: {
        GITHUB: "https://api.github.com/users/"
    }
});