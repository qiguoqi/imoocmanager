import Mock from 'mockjs';

Mock.mock("orderEnd.php", 'get', function() {
  return Mock.mock({
    "result": {
      "id": 27296,
      "bike_sn": "8001166662",
      "batery": 100,
      "start_time": "@datetime",
      "location": "北京市海淀区奥林匹克公园"
    }
  });
});