// const cCert = require('../../ca-certificate.cer');

module.exports = {
  host: 'db-postgresql-nyc1-66881-do-user-6675228-0.b.db.ondigitalocean.com',
  username: 'doadmin',
  password: 'jec6v2uhrsdwjpeo',
  database: 'defaultdb',
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