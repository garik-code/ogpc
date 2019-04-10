


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



const fs = require('fs')
const csv = require('fast-csv')
const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let app = express()
let proxy_public = []
let proxy_public_last = 0

fs.createReadStream('/proxy_public.csv')
.pipe(csv())
.on('data', (data) => {
  proxy_public.push(data)
})
.on('end', () => {
  console.log('update proxy_public list')
})

const proxyGet = () => {
  proxy_public_last = proxy_public_last + 1
  if(typeof proxy_public[proxy_public_last] == 'undefined'){
    proxy_public_last = 0
  }
  return proxy_public[proxy_public_last][0]
}

app.get('/:token/:start/:end', urlencodedParser, (req, res) => {
  let proxy = proxyGet()
  console.log(`proxy: ${proxy}`);
  console.log(`https://coinmarketcap.com/currencies/${req.params.token}/historical-data/?start=${req.params.start}&end=${req.params.end}`)
  request.get({
      url: `https://coinmarketcap.com/currencies/${req.params.token}/historical-data/?start=${req.params.start}&end=${req.params.end}`,
      proxy: `socks5://${proxy}`
  }, (err, page) => {
      if (err) {
          res.send(err)
      } else {
          res.send(page.body)
      }
  })
})

app.listen(3123)
