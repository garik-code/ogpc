


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

  exports.ohlcv = (fsym, tsym, limit) => {
    return new Promise((resolve, reject) => {
      // let proxy = Proxy.get()
      // console.log(`proxy: ${proxy}`);
      console.log(`https://min-api.cryptocompare.com/data/histoday?fsym=${fsym.toUpperCase()}&tsym=${tsym.toUpperCase()}&limit=${limit}`)
      request.get({
          url: `https://min-api.cryptocompare.com/data/histoday?fsym=${fsym.toUpperCase()}&tsym=${tsym.toUpperCase()}&limit=${limit}`,
          // proxy: `socks5://${proxy}`
      }, (err, page) => {
          if (err) {
              reject(err)
          } else {
              let table = ''
              try {
                page.body = JSON.parse(page.body)
              } catch (e) {
                reject(`error JSON parse: ${page.body}`)
              }
              let arr = page.body.Data
              for (let i = 0; i <= arr.length; i++) {
                if(i == arr.length){
                  resolve(`<table>${table}</table>`)
                }else{
                  table += `<tr><td>${arr[i]['time']}</td><td>${arr[i]['open']}</td><td>${arr[i]['high']}</td><td>${arr[i]['low']}</td><td>${arr[i]['close']}</td><td>${arr[i]['volumefrom']}</td></tr>`
                }
              }
          }
      })
    })
  }
