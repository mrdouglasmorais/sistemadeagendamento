"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _datefns = require('date-fns');
var _ptBR = require('date-fns/locale/pt-BR'); var _ptBR2 = _interopRequireDefault(_ptBR);
var _Appointment = require('../models/Appointment'); var _Appointment2 = _interopRequireDefault(_Appointment);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

var _Notifications = require('../schema/Notifications'); var _Notifications2 = _interopRequireDefault(_Notifications);

class AppointentController{

  async index(req, res){
    const { page = 1 } = req.query;

    const appointments = await _Appointment2.default.findAll({
      where: { user_id: req.userId, canceled_at: null},
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: _User2.default,
          as: 'collaborator',
          attributes: [ 'id', 'name'],
          include: [
            {
              model: _File2.default,
              as: 'photo',
              attributes: ['id', 'path', 'url']  
            }
          ]
        }
      ]
    })
    return res.json(appointments)
  }


  async store(req, res){

    const schema = Yup.object().shape({
      collaborator_id: Yup.number().required(),
      date: Yup.date().required()
    })

    if (!(await schema.isValid(req.body))){
      return res.status(400).json({ err: 'Inválido'})
    }

    const { collaborator_id, date } = req.body;

    const isCollaborator = await _User2.default.findOne({
      where: { id: collaborator_id, provider: true }
    })

    if (!isCollaborator){
      return res.status(401).json({ 
        error: 'Colaborador não localizado' 
      })
    }

    const startHour = _datefns.startOfHour.call(void 0, _datefns.parseISO.call(void 0, date));

    if ( _datefns.isBefore.call(void 0, startHour, new Date()) ){
      return res.status(400).json({
        erro: 'Horário não disponível'
      })
    }

    const checkAvaialability = await _Appointment2.default.findOne({
      where: {
        collaborator_id,
        canceled_at: null,
        date: startHour
      }
    })

    if (checkAvaialability){
      return res.status(400).json({
        erro: 'Horário não disponível, para este colaborador'
      })
    }

    const appointment = await _Appointment2.default.create({
      user_id: req.userId,
      collaborator_id,
      date: startHour
    })


    const user = await _User2.default.findByPk(req.userId);
    const formatDate = _datefns.format.call(void 0, 
      startHour,
      "'dia' dd 'de' MMMM', às' H:mm'h' ",
      { locale: _ptBR2.default }
    )

    await _Notifications2.default.create({
      content: `Novo agendamento de ${user.name} para ${formatDate}`,
      user: collaborator_id
    })


    return res.json(appointment)
  }
}

exports. default = new AppointentController();