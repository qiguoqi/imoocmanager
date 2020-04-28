import React, { Component } from 'react';
import { Form, Select, Button, Card, Table, DatePicker, Modal, message } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import "../../data/order";
import '../../data/orderEnd';
import BaseForm from '../../components/baseForm';
import ETable from '../../components/ETable';

const Option = Select.Option;
const FormItem = Form.Item;

class Order extends Component {
  state = {
    data: [],
    orderInfo: {},
    show: false,
    selectedRowKeys: []
  }

  componentDidMount() {
    this.request();
  }

  params = {
    page: 1
  }

  handleFilter = (params) => {
    this.params = params;
    this.request();
    console.log("哈哈哈哈", params);
  }

  formList = [
    {
      type: "SELECT",
      label: "城市",
      field: 'city',
      placeholder: "全部",
      initialValue: "1",
      width: 100,
      list: [{id: "0", name: "全部"}, {id: "1", name: "北京"}, {id: "2", name: "深圳"}, {id: "3", name: "上海"}]
    },
    {
      type: "时间查询"
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: 'status',
      placeholder: "全部",
      initialValue: "1",
      width: 100,
      list: [{id: "0", name: "全部"}, {id: "1", name: "进行中"}, {id: "2", name: "结束行程"}]
    }
  ]

  request = () => {
    axios.request(this, 'data2.php');
  }

  handleOrderEnd = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.warning({
        title: "信息",
        content: "请选择一条订单"
      });
      return ;
    } 
    axios.ajax({
      url: "orderEnd.php",
    }).then(res => {
      this.setState(() => ({
        orderInfo: res.result,
        show: true
      }));
    })
  }

  handleFinish = () => {
    message.success("订单结束成功");
    this.setState(()=>({show: false}));
    this.request();
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.warning({
        title: "信息",
        content: "请选择一条订单"
      });
      return ;
    }
    window.open(`/#/common/order/detail/${item.order_sn}`, '_blank');
  }

  render() {
    const columns = [
      {
          title:'订单编号',
          dataIndex:'order_sn'
      },
      {
          title: '车辆编号',
          dataIndex: 'bike_sn'
      },
      {
          title: '用户名',
          dataIndex: 'user_name'
      },
      {
          title: '手机号',
          dataIndex: 'mobile'
      },
      {
          title: '里程',
          dataIndex: 'distance',
          render(distance){
              return distance/1000 + 'Km';
          }
      },
      {
          title: '行驶时长',
          dataIndex: 'total_time'
      },
      {
          title: '状态',
          dataIndex: 'status'
      },
      {
          title: '开始时间',
          dataIndex: 'start_time'
      },
      {
          title: '结束时间',
          dataIndex: 'end_time'
      },
      {
          title: '订单金额',
          dataIndex: 'total_fee'
      },
      {
          title: '实付金额',
          dataIndex: 'user_pay'
      }
  ];
  const formItemLayout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 10
    }
  }
  
  console.log("render",this.state.selectedRowKeys);
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" onClick={this.handleOrderEnd}>结束订单</Button>
        </Card>
        <div>
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            selectedIds={this.state.selectedIds}
            rowSelection="checkbox"
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.show}
          onCancel={()=>this.setState(()=>({show: false}))}
          onOk={this.handleFinish}
        >
          <Form>
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.batery + "%"}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Order;