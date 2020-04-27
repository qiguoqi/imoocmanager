import { Card } from 'antd';
import axios from '../../axios/index';
import "../../data/order";
import '../../data/orderEnd';
import React, { Component } from 'react';
import './detail.less';
import '../../data/orderDetail';

class Detail extends Component {

  state = {
    orderInfo: {}
  }

  map = {}

  componentDidMount() {
    let orderId = this.props.match.params.order_sn;
    this.getDetailInfo(orderId);
  }

  getDetailInfo(orderId) {
    axios.ajax({
      url: 'orderDetail.php',
      data: {
        params: {
          orderId: orderId
        }
      }
    }).then(res => {
      this.setState(() => ({
        orderInfo: res.result.data
      }))
      this.renderMap(res.result.data);
    })
  }

  renderMap = (result) => {
    this.map = new window.BMapGL.Map("orderDetailMap");
    this.addMapControl(result);
    this.drawBike(result.position_list);
    this.drawServiceArea(result.area);
  }

  addMapControl = (result) => {
    let map = this.map;
    map.enableScrollWheelZoom(true);
    map.addControl(new window.BMapGL.ScaleControl());
    map.addControl(new window.BMapGL.ZoomControl());
  }

  drawBike = (positionList) => {
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if (positionList.length > 0) {
      let arr = positionList[0];
      let last = positionList[positionList.length-1];
      let startPoint = new window.BMapGL.Point(arr.lon, arr.lat);
      let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42),{
        imageSize:new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(36, 42),
      });
      let startMarker = new window.BMapGL.Marker(startPoint, {icon: startIcon});
      this.map.addOverlay(startMarker);

      let endPoint = new window.BMapGL.Point(last.lon, last.lat);
      let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42),{
        imageSize:new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(36, 42),
      });
      let endMarker = new window.BMapGL.Marker(endPoint, {icon: endIcon});
      this.map.addOverlay(endMarker);

      let trackPoint = [];
      for (let i = 0; i < positionList.length; i ++) {
        let point = positionList[i];
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
      }
      let polyline = new window.BMapGL.Polyline(trackPoint, {
        strokeColor: "#09f",
        strokeWeight: 3,
        strokeOpacity: 1
      });
      this.map.addOverlay(polyline);
      this.map.centerAndZoom(endPoint, 11);
    }
  }

  drawServiceArea = (positionList) => {
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i ++) {
      let point = positionList[i];
      trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }
    let polygon = new window.BMapGL.Polygon(trackPoint, {
      strokeColor: "#CE0000",
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: "#ff8605"
    });
    this.map.addOverlay(polygon);
  }

  render() {
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{this.state.orderInfo.mode === 1 ? "服务区" : "停车点"}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{this.state.orderInfo.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{this.state.orderInfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{this.state.orderInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{this.state.orderInfo.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{this.state.orderInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{this.state.orderInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{this.state.orderInfo.distance/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

export default Detail;

