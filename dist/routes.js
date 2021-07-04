"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _CollaboratorController = require('./app/controllers/CollaboratorController'); var _CollaboratorController2 = _interopRequireDefault(_CollaboratorController);
var _AppointmentController = require('./app/controllers/AppointmentController'); var _AppointmentController2 = _interopRequireDefault(_AppointmentController);
var _ScheduleController = require('./app/controllers/ScheduleController'); var _ScheduleController2 = _interopRequireDefault(_ScheduleController);
var _NotificationsController = require('./app/controllers/NotificationsController'); var _NotificationsController2 = _interopRequireDefault(_NotificationsController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default)


routes.get('/', (req, res) => {
  res.json({message: 'Okay'})
})

routes.post('/users', _UserController2.default.store)
routes.post('/session', _SessionController2.default.store)

// Rotas autenticadas
routes.use(_auth2.default)
routes.put('/users',  _UserController2.default.update)

// Rota de agendamento
routes.post('/appointments', _AppointmentController2.default.store)

// Listagem de agendamento
routes.get('/appointments', _AppointmentController2.default.index)

// Lista todos os colaboradores
routes.get('/collaborator', _CollaboratorController2.default.index)

// Listagem de agendamentos colaborador
routes.get('/schedule', _ScheduleController2.default.index)

// Listagem de notificações
routes.get('/notifications', _NotificationsController2.default.index)

// Marcar como lida
routes.put('/notifications/:id', _NotificationsController2.default.update)

// Upload de arquivos
routes.post('/files', upload.single('file'), _FileController2.default.store);

exports. default = routes;
