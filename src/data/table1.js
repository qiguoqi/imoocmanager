import Mock from 'mockjs';

Mock.mock("data.php", "get", function(options){
  return Mock.mock({
    result:{
      page_size: 10,
      "page|1": [0,1,2,3,4,5,6,7,8,9],
      total: 100,
      "data|10":[{
        "key|+1": 0,
        "userName|1": "@cname",
        "gender|1": ["男", "女"],
        "status|1-5": 1,
        "interest|1": ["游泳", "跑步", "书法", "篮球"],
        "birthday": "2000-1-1",
        "address|1": "@city",
        "time": "7:00"
      }]
    }
  })
});

