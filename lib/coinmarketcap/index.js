


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



  const request = require('request')
  const Proxy = require('../proxy')

  exports.ohlcv = (token, start, end) => {
    return new Promise((resolve, reject) => {
      // let proxy = Proxy.get()
      // console.log(`proxy: ${proxy}`);
      console.log(`https://coinmarketcap.com/currencies/${token}/historical-data/?start=${start}&end=${end}`)
      request.get({
          url: `https://coinmarketcap.com/currencies/${token}/historical-data/?start=${start}&end=${end}`,
          // proxy: `socks5://${proxy}`
      }, (err, page) => {
          if (err) {
              reject(err)
          } else {
              resolve(page.body)
          }
      })
    })
  }
