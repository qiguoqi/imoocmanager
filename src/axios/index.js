import JsonP from 'jsonp';
import axios from 'axios';
import Utils from '../utils/utils';

export default class Axios {
  static request(_this, url, params) {
    const data = {
      params
    };
    this.ajax({
      url,
      data
    }).then(data => {
      let list = data.result.data.map((item, index) => {
        item.key = index;
        return item;
      });
      _this.setState(() => ({
        data: list,
        pagination:Utils.pagination(data,(current)=>{
          _this.params.page = current;
          _this.request();
        })
      }));
    })
  }

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