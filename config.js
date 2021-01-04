const config = {};

config.development = {
  useDummyData: true,
  serverBaseUrl: process.env.VUE_APP_SERVER_BASE_URL || "http://localhost:8080",
  port: process.env.VUE_APP_PORT || 3000,
  defaultImageUrl:
    "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa2e307ac-9743-45c9-aea5-20ef7344c51a%2F-.jpg?table=block&id=1642c5bb-3350-4116-8b6d-5879fa75eb3c&width=250&userId=da18117b-c7bf-404f-898c-09e7ae5a6ccc&cache=v2"
};

config.staging = config.development;

config.production = {
  serverBaseUrl: config.development.serverBaseUrl,
  port: config.development.port,
  defaultImageUrl:
    "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa2e307ac-9743-45c9-aea5-20ef7344c51a%2F-.jpg?table=block&id=1642c5bb-3350-4116-8b6d-5879fa75eb3c&width=250&userId=da18117b-c7bf-404f-898c-09e7ae5a6ccc&cache=v2"
};

module.exports = config[process.env.NODE_ENV];
