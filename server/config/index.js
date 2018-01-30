export default {
    mongo: {
        url: process.env.MONGO_DB_URL || 'mongodb://192.168.99.100:32768/frontcamp',
    },
    server: {
        host: 'http://localhost',
        port: process.env.PORT || 3000, 
    }
}