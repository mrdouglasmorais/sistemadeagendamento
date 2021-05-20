export default (req, res, next) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders){
        return res.status(401).json({ message: 'Para acessar este serviço é necessário estar logado'})
    }

    const [bearer, token] = authHeaders.slice(' ')

    console.log('barer', bearer, 'token', token)

    

    next()

}