import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR'
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

import Notifications from '../schema/Notifications'

class AppointentController{

  async index(req, res){
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null},
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'collaborator',
          attributes: [ 'id', 'name'],
          include: [
            {
              model: File,
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

    const isCollaborator = await User.findOne({
      where: { id: collaborator_id, provider: true }
    })

    if (!isCollaborator){
      return res.status(401).json({ 
        error: 'Colaborador não localizado' 
      })
    }

    const startHour = startOfHour(parseISO(date));

    if ( isBefore(startHour, new Date()) ){
      return res.status(400).json({
        erro: 'Horário não disponível'
      })
    }

    const checkAvaialability = await Appointment.findOne({
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

    const appointment = await Appointment.create({
      user_id: req.userId,
      collaborator_id,
      date: startHour
    })


    const user = await User.findByPk(req.userId);
    const formatDate = format(
      startHour,
      "'dia' dd 'de' MMMM', às' H:mm'h' ",
      { locale: pt }
    )

    await Notifications.create({
      content: `Novo agendamento de ${user.name} para ${formatDate}`,
      user: collaborator_id
    })


    return res.json(appointment)
  }
}

export default new AppointentController();