import React, { Component } from 'react';
import { Form, Select, Button, Card, Table, DatePicker, Modal, message } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import "../../data/order";
import '../../data/orderEnd';

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

  request = () => {
    let _this = this;
    axios.ajax({
      url: "data2.php"
    }).then(res => {
      console.log("1",res);
      let list = res.result.data.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState(() => ({
        data: list,
        pagination:Utils.pagination(res,(current)=>{
          _this.params.page = current;
          _this.request();
        })
      }));
    });
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

  onRowClick = (record, index) => {
    let selectKey = [index];
    console.log("7", record.bike_sn, index);
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    }, () => {
      console.log("888", this.state.selectedRowKeys);
    });
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
  const rowSelection = {
    type: 'checkbox', 
    selectedRowKeys: this.state.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState(()=>({
        selectedRowKeys,
        selectedRows
      }))
    }
  }
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary">订单详情</Button>
          <Button type="primary" onClick={this.handleOrderEnd}>结束订单</Button>
        </Card>
        <div>
        <Table
          bordered
          columns={columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          rowSelection={rowSelection}
          onRow={(record,index) => {
            return {
              onChange: () => {this.onRowClick(record, index)},
              onClick: () => {this.onRowClick(record, index)},
            };
          }}
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

class FilterForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator("city_id")(
              <Select
                placeholder="全部"
                style={{width: 100}}
              >
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">深圳市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="订单时间">
          {
            getFieldDecorator("start_time")(
              <DatePicker showTime placeholder="请选择时间"/>
            )
          }
        </FormItem>
        <FormItem label=" ~ ">
          {
            getFieldDecorator("end_time")(
              <DatePicker showTime placeholder="请选择时间"/>
            )
          }
        </FormItem>
        <FormItem label="订单状态">
          {
            getFieldDecorator("order_status")(
              <Select
                placeholder="全部"
                style={{width: 100}}
              >
                <Option value="">全部</Option>
                <Option value="1">进行中</Option>
                <Option value="2">结束行程</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm);

export default Order;