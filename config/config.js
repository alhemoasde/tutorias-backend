module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    pluginData: "mysql_native_password",
    dialectOptions: {
      authPlugins: {
        caching_sha2_password: false,
        mysql_native_password: true,
      },
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    pluginData: "mysql_native_password",
    dialectOptions: {
      authPlugins: {
        caching_sha2_password: false,
        mysql_native_password: true,
      },
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    pluginData: "mysql_native_password",
    dialectOptions: {
      authPlugins: {
        caching_sha2_password: false,
        mysql_native_password: true,
      },
    },
  },
};
