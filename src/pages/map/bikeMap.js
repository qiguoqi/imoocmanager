import React, { Component } from 'react';
import { Card, Form } from 'antd';
import axios from '../../axios/';
import BaseForm from '../../components/baseForm';
import "../../data/bikeMap";

class BikeMap extends Component {

  state = {}

  formList = [
    {
      type: "时间查询"
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "请选择",
      initialValue: "0",
      list: [{id: "0", name: "全部"},{id: "1", name: "进行中"},{id: "2", name: "结束订单"}]
    }
  ];

  params = {};

  handleFilterSubmit = (filterParams) => {
    this.params = filterParams;
    this.request();
  }

  request = () => {
    axios.ajax({
      url: "bikeMap.php",
    }).then(res => {
      console.log("res",res);
      this.setState(()=>({
        total_count: res.result.data.total_count
      }));
      this.renderMap(res.result.data);
    })
  }

  renderMap = (data) => {
    let list = data.route_list;
    this.map = new window.BMapGL.Map("container");
    let gps1 = list[0].split(",");
    let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(",");
    let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
    this.map.centerAndZoom(endPoint, 11);

    let startPointIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
      imageSize: new window.BMapGL.Size(36, 42),
      anchor: new window.BMapGL.Size(18, 42)
    });
    let startPointMarker = new window.BMapGL.Marker(startPoint, { icon: startPointIcon });
    this.map.addOverlay(startPointMarker);
    let endPointIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
      imageSize: new window.BMapGL.Size(36, 42),
      anchor: new window.BMapGL.Size(18, 42)
    });
    let endPointMarker = new window.BMapGL.Marker(endPoint, { icon: endPointIcon });
    this.map.addOverlay(endPointMarker);

    //绘制车辆行驶路线
    let route_list = [];
    list.map(item => {
      let p = item.split(",");
      route_list.push(new window.BMapGL.Point(p[0], p[1]));
    });
    let polyline = new window.BMapGL.Polyline(route_list, {
      strokeColor: "#ef4136",
      strokeWeight: 2,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyline);

    //绘制服务区
    let servicePointList = [];
    let serviceList = data.service_list;
    serviceList.map(item => {
      servicePointList.push(new window.BMapGL.Point(item.lon, item.lat));
    });
    let servicePolyline = new window.BMapGL.Polyline(servicePointList, {
      strokeColor: "#ef4136",
      strokeWeight: 2,
      strokeOpacity: 1
    });
    this.map.addOverlay(servicePolyline);

    let bikeList = data.bike_list;
    let bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg', new window.BMapGL.Size(36, 42),{
      imageSize: new window.BMapGL.Size(36, 42),
      anchor: new window.BMapGL.Size(18, 42)
    });
    bikeList.map(item => {
      let p = item.split(",");
      let point = new window.BMapGL.Point(p[0], p[1]);
      let pointMarker = new window.BMapGL.Marker(point, { icon: bikeIcon});
      this.map.addOverlay(pointMarker);
    })
  }

  componentDidMount() {
    this.request();
  }

  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
        </Card>
        <Card style={{marginTop: 10}}>
          <div>共{this.state.total_count}辆单车</div>
          <div id="container" style={{height: 500}}></div>
        </Card>
      </div>
    );
  }
}

export default BikeMap;