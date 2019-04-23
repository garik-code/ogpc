


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

  let proxy_public = []
  let proxy_public_last = 0

  fs.createReadStream('proxy.csv')
  .pipe(csv())
  .on('data', (data) => {
    proxy_public.push(data)
  })
  .on('end', () => {
    console.log('update proxy list')
  })

  exports.get = () => {
    proxy_public_last = proxy_public_last + 1
    if(typeof proxy_public[proxy_public_last] == 'undefined'){
      proxy_public_last = 0
    }
    return proxy_public[proxy_public_last][0]
  }
