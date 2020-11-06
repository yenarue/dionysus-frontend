const config = {};

config.development = {
  serverBaseUrl: process.env.VUE_APP_SERVER_BASE_URL || "http://localhost:8080",
  port: process.env.VUE_APP_PORT || 3000
};

config.staging = config.development;

config.production = {
  serverBaseUrl: config.development.serverBaseUrl,
  port: config.development.port
};

module.exports = config[process.env.NODE_ENV];
