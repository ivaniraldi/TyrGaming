//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const { api_key } = process.env
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {

  axios.get(`https://api.rawg.io/api/genres?key=${api_key}`) //de esta manera al iniciar trae todos los generos
    .then(resp => {
      return resp.data.results.forEach(e => Genre.findOrCreate({
        where: {
          id: e.id,
          name: e.name
        }
      }))
    })

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
