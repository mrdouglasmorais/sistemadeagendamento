"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class FileController{
  async store( req, res ) {
    const { originalname: name, filename: path } = req.file;

    const file = await _File2.default.create({
      name,
      path
    })

    return res.json(file)
  }
}

exports. default = new FileController()