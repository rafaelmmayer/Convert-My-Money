const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb') 

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', async(req, res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            cotacao: 0,
            quantidade: 0,
            conversao
        })
    }
})

app.listen(3000, err => {
    if (err) {
        console.log('nao foi possivel iniciar')
    } else {
        console.log("ConvertMyMoney is online")
    }
})