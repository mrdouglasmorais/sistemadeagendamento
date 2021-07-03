"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _datefns = require('date-fns');
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Appointment = require('../models/Appointment'); var _Appointment2 = _interopRequireDefault(_Appointment); 

class ScheduleController{
  async index(req, res){

    const checkUser = await _User2.default.findOne({
      where: { id: req.userId, provider: true}
    })

    if(!checkUser){
      return res.status(400).json({ 
        message: 'Este usuário não é um colaborador'
      })
    }

    const { date } = req.query;

    const parseDate = _datefns.parseISO.call(void 0, date)

    const appointments = await _Appointment2.default.findAll({
      where: {
        collaborator_id: req.userId,
        canceled_at: null,
        date: {
          [_sequelize.Op.between]: [_datefns.startOfDay.call(void 0, parseDate), _datefns.endOfDay.call(void 0, parseDate)],
        },
      },
      order: ['date']
    });

    return res.json(appointments)
  }
}

exports. default = new ScheduleController();