import React, { Component } from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
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
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: {
        name: "订单量",
        type: "line",
        data: [
          1000, 2000, 1500, 3000, 2400, 3600, 800
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
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["OFO订单量", "MOBIKE订单量"],
        orient: "vertical",
        top: 20,
        right: 20,
        bottom: 20
      }, 
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      
      series: [
        {
          name: "OFO订单量",
          type: "line",
          data: [
            1000, 2000, 1500, 3000, 2400, 3600, 800
          ]
        },
        {
          name: "MOBIKE订单量",
          type: "line",
          data: [
            800, 1500, 2000, 3000, 2900, 3300, 900
          ]
        }
      ]
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: 'center'
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: "value"
      },
      series: {
        name: "订单量",
        type: "line",
        data: [
          1000, 2000, 1500, 3000, 2400, 3600, 800
        ],
        areaStyle: {}
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