require('dotenv').config();
const sql = require('mssql');

const config = require('./config');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

// Create connection pool
// const appPool = new sql.ConnectionPool({
//     server: config.DATABASE.server,
//     user: config.DATABASE.user,
//     password: config.DATABASE.password,
//     database: config.DATABASE.database,
// });

// (async () => {
//     app.locals.db = await appPool.connect();
//     console.log('DB connection successful!');
// })();

new sql.ConnectionPool({
    server: config.DATABASE.server,
    user: config.DATABASE.user,
    password: config.DATABASE.password,
    database: config.DATABASE.database,
})
    .connect()
    .then((pool) => {
        app.locals.db = pool;
        console.log('DB connection successful!');
    });

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLER REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully!');
    server.close(() => {
        console.log('Process terminated!');
    });
});
