import { Op } from 'sequelize';
import { endOfDay, startOfDay, parseISO } from 'date-fns';
import User from '../models/User';
import Appointment from '../models/Appointment'; 

class ScheduleController{
  async index(req, res){

    const checkUser = await User.findOne({
      where: { id: req.userId, provider: true}
    })

    if(!checkUser){
      return res.status(400).json({ 
        message: 'Este usuário não é um colaborador'
      })
    }

    const { date } = req.query;

    const parseDate = parseISO(date)

    const appointments = await Appointment.findAll({
      where: {
        collaborator_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date']
    });

    return res.json(appointments)
  }
}

export default new ScheduleController();