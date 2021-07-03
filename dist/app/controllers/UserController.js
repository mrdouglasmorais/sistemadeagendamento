"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController{
    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })
        
        if (!(await schema.isValid(req.body))){
            return res.status(400).json({
                message: 'Falha na validação'
            })
        }


        const userExists = await _User2.default.findOne({ where: { email: req.body.email }})

        if (userExists){
            return res.status(400).json({ error: 'Usuário já cadastrado' })
        }
        const { id, name, email, provider } = await _User2.default.create(req.body)

        return res.json({
            id,
            name,
            email,
            provider
        })
    }

    async update(req, res){

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when(
                'oldPassword', (oldPassword, field) => 
              oldPassword ? field.required() : field   
            ),
            confirmPassword: Yup.string().when( 'password', 
            (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        })
        
        if (!(await schema.isValid(req.body))){
            return res.status(400).json({
                message: 'Falha na validação'
            })
        }


        const { email, oldPassword } = req.body;

        const user = await _User2.default.findByPk(req.userId)

        if ( email && email !== user.email){
            const userExists = await _User2.default.findOne({ where: { email }})

            if (userExists){
                return res.status(400).json({ error: 'Usuário já cadastrado' })
            }
        }

        if ( oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({
                message : 'Senha não confere'
            })
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        })
    }
}

exports. default = new UserController();