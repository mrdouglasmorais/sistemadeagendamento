"use strict";// const cCert = require('../../ca-certificate.cer');

module.exports = {
  host: 'app-acee9c45-4763-4e06-a998-beee59596269-do-user-6675228-0.b.db.ondigitalocean.com',
  username: 'db',
  password: 'hssu5zvmnx6jro7k',
  database: 'db',
  port: 25060,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      required: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}