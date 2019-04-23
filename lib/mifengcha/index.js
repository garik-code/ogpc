


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
      console.log(`https://data.mifengcha.com/api/v2/price/history?symbol_name=${token}&start=${start}&end=${end}`)
      request.get({
          url: `https://data.mifengcha.com/api/v2/price/history?symbol_name=${token}&start=${start}&end=${end}`,
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
              let arr = page.body
              for (let i = 0; i <= arr.length; i++) {
                if(i == arr.length){
                  resolve(`<table>${table}</table>`)
                }else{
                  table += `<tr><td>${arr[i][1]}</td><td>${arr[i][2]}</td><td>${arr[i][3]}</td><td>${arr[i][4]}</td></tr>`
                }
              }
          }
      })
    })
  }
