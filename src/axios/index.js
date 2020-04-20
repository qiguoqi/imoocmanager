import JsonP from 'jsonp';
import axios from 'axios';

export default class Axios {
  static jsonp(options) {
      return new Promise((resolve, reject) => {
          JsonP(options.url, {
              param: 'callback'
          }, function (err, response) {
            console.log(response);
            console.log(err);
              // if (response.status === 'success') {
              //     resolve(response);
              // } else {
              //     reject(response.messsage);
              // }
          })
      })
  }
  static ajax(options) {
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      })
    })
  }
}