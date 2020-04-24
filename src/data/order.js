import Mock from 'mockjs';

Mock.mock("data2.php", 'get', function() {
  return Mock.mock({
    "result": {
      "page|1-10": 1,
      "page_size": 10,
      "total": 85,
      "data|10": [{
        "id": 95,
        "order_sn": /T180[0-9]{6}/,
        "bike_sn": "800116",
        "user_id": 908362,
        "user_name": "@cname",
        "mobile": /1[0-9]{10}/,
        "distance": 2000,
        "total_time": 4000,
        "status|1-2": 1,
        "start_time": "@datetime",
        "end_time": "@datetime",
        "total_fee": 1000,
        "user_pay": 300
      }]
    }
  });
});