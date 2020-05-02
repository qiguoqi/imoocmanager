import Mock from 'mockjs';

Mock.mock("userList.php", "get", function() {
  return Mock.mock({
    "result": {
      "data|20": [{
        "status|0-1": 0,
        "user_id|+1": 1,
        "user_name": "@cname"
      }]
    }
  });
});