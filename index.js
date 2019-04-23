


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

  app.get('/:token/:start/:end', urlencodedParser, (req, res) => Coinmarketcap.ohlcv(req.params.token, req.params.start, req.params.end)
  .then(data => res.send(data), err => {
    console.log(err)
    res.send('err get coinmarketcap')
  }))

  app.get('/mifengcha/history/:token/:end', urlencodedParser, (req, res) => {
    let proxy = proxyGet()
    console.log(`proxy: ${proxy}`);
    console.log(`https://data.mifengcha.com/api/v2/price/history?symbol_name=${req.params.token}&start=&end=${req.params.end}`);
    console.log(`https://data.mifengcha.com/api/v2/price/history?symbol_name=${req.params.token}&start=&end=${req.params.end}`)
    request.get({
        url: `https://data.mifengcha.com/api/v2/price/history?symbol_name=${req.params.token}&start=${req.params.start}&end=${req.params.end}`,
        // proxy: `socks5://${proxy}`
    }, (err, page) => {
        if (err) {
            res.send(err)
        } else {
            let table = ''
            let arr = JSON.parse(page.body)
            for (let i = 0; i <= arr.length; i++) {
              if(i == arr.length){
                res.send(`<table>${table}</table>`)
              }else{
                table += `<tr><td>${arr[i][1]}</td><td>${arr[i][2]}</td><td>${arr[i][3]}</td><td>${arr[i][4]}</td></tr>`
              }
            }
        }
    })
  })

  app.listen(3123)
