import Mock from 'mockjs';

Mock.mock("user.php", "get", function() {
  return Mock.mock({
    "result": {
      total: 100,
      "data|10": [{
        "id|+1": 1,
        "username": "@cname",
        "sex|1-2": 1,
        "state|1-5": 1,
        "interest|1-6": 1,
        "isMarried|1-2": 1,
        "birthday": "@datetime",
        "address": "@city",
        "time": "@datetime"
      }]
    }
  })
});