const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql');

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'deneka-strapi-db.cecaf200ttl7.ap-southeast-2.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'admin'),
        password: env('DATABASE_PASSWORD', 'UxQvcepDzh2dIcwOqOJS'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
