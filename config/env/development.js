'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  port: process.env.PORT || 80,
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ''
  },
  bnet: {
    clientID: process.env.BNET_ID || 'rt2p32bk667x3yzy2r9ufe7f2s42xqde',
    clientSecret: process.env.BNET_SECRET || '8WT6sEMWRPHQS8mAnxJmnGxutJjbhmY3',
    callbackURL: '/api/auth/bnet/callback'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '168001473598120',
    clientSecret: process.env.FACEBOOK_SECRET || '20ba1a54f49b6c0690f39e45b4b784f8',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'shjv6mtpoZSdacTffvZ1N4ilR',
    clientSecret: process.env.TWITTER_SECRET || 'OqfOAfAu3AIknQabl59EXYCUN8cJsTZwLz3uySsA6rp2cmd4vX',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '781088748918-cinaflst04inglo3gtqb6b6t418ejtj0.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || '9tJ96Tai0F0ihQIXeUbHgJav',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || '77wh3u6uzyq5nz',
    clientSecret: process.env.LINKEDIN_SECRET || 'VRhv2cNr5Xw5082p',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'c3c691f90207ed42101c',
    clientSecret: process.env.GITHUB_SECRET || 'b55daa5db001426532cc379280ec496783ad93c9',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'ASz_lMGnw1sSJEG0NOkxELwR2MUBuA-2VsUPeJJfji-N8DrZiMckp2navDC8U21teEN86Xgzrhd9nDii',
    clientSecret: process.env.PAYPAL_SECRET || ' EEdXXCNc5UX3ykJWRsG65ZWXVr6wgSBZeZ5CrosuTk2nXmpE55kJyRf7exYmTB7UdfjOukU_sys5uyfd',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: process.env.MONGO_SEED === 'true',
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false',
      seedUser: {
        username: process.env.MONGO_SEED_USER_USERNAME || 'user',
        provider: 'local',
        email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
        firstName: 'User',
        lastName: 'Local',
        displayName: 'User Local',
        roles: ['user']
      },
      seedAdmin: {
        username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
        provider: 'local',
        email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        displayName: 'Admin Local',
        roles: ['user', 'admin']
      }
    }
  }
};



