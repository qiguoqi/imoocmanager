import React, { Component } from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import echartTheme from '../echartTheme';
import ReactEcharts from 'echarts-for-react';

class Bar extends Component {

  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme);
  }

  getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis:{
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 2000, 1500, 3000, 200, 2600, 4000]
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["OFO", "MOBIKE", "HALO"]
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [1000, 2000, 3500, 5000, 8000, 12000, 20000]
        },
        {
          name: 'MOBIKE',
          type: 'bar',
          data: [1000, 1500, 2500, 4000, 6000, 8000, 15000]
        },
        {
          name: 'HALO',
          type: 'bar',
          data: [500, 1000, 1500, 3000, 4500, 7000, 10000]
        }
      ]
    }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="柱形图表" style={{marginBottom: 20}}>
          <ReactEcharts option={this.getOption()} theme={"Imooc"} style={{height: 500}}></ReactEcharts>
        </Card>
        <Card title="柱形图表">
          <ReactEcharts option={this.getOption2()} theme={"Imooc"} style={{height: 500}}></ReactEcharts>
        </Card>
      </div>
    );
  }
}

export default Bar;