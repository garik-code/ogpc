


  /////////////////////////////////////////////
  //                                         //
  //                                         //
  //                                         //
  //           Igor Meshcheryakov            //
  //                                         //
  //                                         //
  //  https://github.com/garik-code          //
  //  https://www.garik.site                 //
  //                                         //
  //  mail@garik.site                        //
  //                                         //
  //                                         //
  /////////////////////////////////////////////



  const express = require('express')
  const bodyParser = require('body-parser')

  const Coinmarketcap = require('./lib/coinmarketcap')
  const Mifengcha = require('./lib/mifengcha')

  const app = express()
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.get('/coinmarketcap/:token/:start/:end', urlencodedParser, (req, res) => Coinmarketcap.ohlcv(req.params.token, req.params.start, req.params.end)
  .then(data => res.send(data), err => {
    console.log(err)
    res.send('err get coinmarketcap')
  }))

  app.get('/mifengcha/:token/:start/:end', urlencodedParser, (req, res) => Mifengcha.ohlcv(req.params.token, req.params.start, req.params.end)
  .then(data => res.send(data), err => {
    console.log(err)
    res.send('err get mifengcha')
  }))

  app.listen(3123)
