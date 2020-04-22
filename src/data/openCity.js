import Mock from 'mockjs';

Mock.mock("data1.php", "get", function(options){
  return Mock.mock({
    result:{
      page_size: 10,
      "page|1": [1,2,3,4,5,6,7,8,9,10],
      total: 100,
      "data|10":[{
        "id|+1": 1,
        "name|1": "@cname",
        "mode|1": ["1", "2"],
        "op_mode|1": ["1", "2"],
        "franchisee_name": "坚果自营",
        "city_admins|2": [{
          "admin_name": "@cname",
          "admin_number|+1": 1001,
        }],
        "open_time": "@datetime",
        "sys_user_name": "@cname",
        "update_time": "@datetime"
      }]
    }
  })
});