const config = {
    // SERVER_PATH: 'http://localhost:3001/',
    SERVER_PATH: process.env.SERVER_PATH,
    storageKeys: {
        ACCESS_KEY: 'token',
        ACCOUNT_KEY: 'account',
    },
};

export default config;
