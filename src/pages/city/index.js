import React, { Component } from 'react';
import { Form, Select, Button, Card, Table } from 'antd';
import axios from '../../axios';
import '../../data/openCity';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class City extends Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.request();
  }

  request = () => {
    let _this = this;
    axios.ajax({
      url: "data1.php"
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
          _this.requestList();
        })
      }));
    });
  }

  render() {
    const columns = [
      {
          title:'城市ID',
          dataIndex:'id'
      }, {
          title: '城市名称',
          dataIndex: 'name'
      }, {
          title: '用车模式',
          dataIndex: 'mode',
          render(mode){
              return mode === 1 ?'停车点':'禁停区';
          }
      }, {
          title: '营运模式',
          dataIndex: 'op_mode',
          render(op_mode) {
              return op_mode === 1 ? '自营' : '加盟';
          }
      }, {
          title: '授权加盟商',
          dataIndex: 'franchisee_name'
      }, {
          title: '城市管理员',
          dataIndex: 'city_admins',
          render(arr) {
            return arr.map(item => {
              return item.admin_name;
            }).join(",");
          }
      }, {
          title: '城市开通时间',
          dataIndex: 'open_time'
      }, {
          title: '操作时间',
          dataIndex: 'update_time',
      }, {
          title: '操作人',
          dataIndex: 'sys_user_name'
      }
  ];
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button onClick={this.handleOpenCity} type="primary">开通城市</Button>
        </Card>
        <div>
        <Table
            bordered
            columns={columns}
            dataSource={this.state.data}
            pagination={this.state.pagination}
          />
        </div>
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
        <FormItem label="用车模式">
          {
            getFieldDecorator("mode")(
              <Select
                placeholder="全部"
                style={{width: 150}}
              >
                <Option value="">全部</Option>
                <Option value="1">指定停车点模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="营运模式">
          {
            getFieldDecorator("op_mode")(
              <Select
                placeholder="全部"
                style={{width: 80}}
              >
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="加盟商授权状态">
          {
            getFieldDecorator("auth_status")(
              <Select
                placeholder="全部"
                style={{width: 100}}
              >
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
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

export default City;