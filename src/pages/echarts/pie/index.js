import React, { Component } from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import echartTheme from '../themeLight';
import ReactEcharts from 'echarts-for-react';

class Bar extends Component {

  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme);
  }

  getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: 'center'
      },
      legend: {
        data: ["周一","周二","周三","周四","周五","周六","周日"],
        orient: 'vertical',
        top: 10,
        right: 10
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)"
      },
      series: {
        name: "订单量",
        type: "pie",
        data: [
          {
            name: '周一',
            value: 1000
          },
          {
            name: '周二',
            value: 1200
          },
          {
            name: '周三',
            value: 2000
          },
          {
            name: '周四',
            value: 3000
          },
          {
            name: '周五',
            value: 2500
          },
          {
            name: '周六',
            value: 1800
          },
          {
            name: '周日',
            value: 2700
          }
        ]
      }
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: 'center'
      },
      legend: {
        data: ["周一","周二","周三","周四","周五","周六","周日"],
        orient: 'vertical',
        top: 10,
        right: 10
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)"
      },
      series: {
        name: "订单量",
        type: "pie",
        radius: ["50%", "80%"],
        data: [
          {
            name: '周一',
            value: 1000
          },
          {
            name: '周二',
            value: 1200
          },
          {
            name: '周三',
            value: 2000
          },
          {
            name: '周四',
            value: 3000
          },
          {
            name: '周五',
            value: 2500
          },
          {
            name: '周六',
            value: 1800
          },
          {
            name: '周日',
            value: 2700
          }
        ]
      }
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: 'center'
      },
      legend: {
        data: ["周一","周二","周三","周四","周五","周六","周日"],
        orient: 'vertical',
        top: 10,
        right: 10
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)"
      },
      series: {
        name: "订单量",
        type: "pie",
        data: [
          {
            name: '周一',
            value: 1000
          },
          {
            name: '周二',
            value: 1200
          },
          {
            name: '周三',
            value: 2000
          },
          {
            name: '周四',
            value: 3000
          },
          {
            name: '周五',
            value: 2500
          },
          {
            name: '周六',
            value: 1800
          },
          {
            name: '周日',
            value: 2700
          }
        ].sort((a, b) => {
          return a.value - b.value;
        }),
        roseType: "radius"
      }
    }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="饼形图表" style={{marginBottom: 20}}>
          <ReactEcharts option={this.getOption()} theme={"Imooc"} style={{height: 500}}></ReactEcharts>
        </Card>
        <Card title="饼形图表">
          <ReactEcharts option={this.getOption2()} theme={"Imooc"} style={{height: 500}}></ReactEcharts>
        </Card>
        <Card title="饼形图表">
          <ReactEcharts option={this.getOption3()} theme={"Imooc"} style={{height: 500}}></ReactEcharts>
        </Card>
      </div>
    );
  }
}

export default Bar;