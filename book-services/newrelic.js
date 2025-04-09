'use strict';

require('dotenv').config();

exports.config = {
  APP_NAME: [process.env.NEW_RELIC_APP_NAME],
  LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info',
  },
  host: 'collector.newrelic.com',
  DISTRIBUTED_TRACING: {
    enabled: true,
  },
  SLOW_SQL: {
    enabled: true,
  },
  TRANSACTION_TRACER: {
    enabled: true,
  },
};
