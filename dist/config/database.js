"use strict";module.exports = {
  dialect: 'postgres',
  host: 'ziggy.db.elephantsql.com',
  username: 'nvltissw',
  password: 'azpLqK6zm7H3bjN6HGD8YpxIar3T_VT3',
  database: 'nvltissw',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  sslmode: "required",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}