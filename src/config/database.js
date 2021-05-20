module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'sistema',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}