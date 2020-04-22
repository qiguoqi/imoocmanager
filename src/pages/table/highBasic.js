import React, { Component } from 'react';
import { Table, Card, Button, Modal, message} from 'antd';
import axios from '../../axios';
import '../../data/table1';

class Basic extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    this.request();
  }

  request = () => {
    let _this = this;
    axios.ajax({
      url: 'data.php'
    }).then(res => {
      console.log("1",res.result.data);
      this.setState(() => ({
        data: res.result.data,
      }))
    })
  }

  handleOrder = (pagination, filters, sorter) => {
    this.setState(() => ({
      sortOrder: sorter.order
    }));
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'key',
        width: "80px",
        sorter: (a, b) => {
          return a.key - b.key;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: "80px"
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: "80px"
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: "80px"
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: "80px"
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      }
    ];
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'key',
        width: "80px",
        fixed: 'left'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: "80px",
        fixed: 'left'
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: "80px"
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: "80px"
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: "80px"
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px",
        fixed: 'right'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px",
        fixed: 'right'
      },
    ];
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'key',
        width: "80px",
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: "80px"
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: "80px"
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: "80px"
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: "80px"
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: "80px"
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: "80px"
      }
    ];
    return (
      <div>
        <Card title="头部固定" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns}
            bordered
            pagination={false}
            scroll={{y:"280px"}}
          />
        </Card>
        <Card title="两侧固定" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns2}
            bordered
            pagination={false}
            scroll={{x:"1320px"}}
          />
        </Card>
        <Card title="表格排序" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns}
            bordered
            pagination={false}
            onChange={this.handleOrder}
          />
        </Card>
        <Card title="表格排序" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns3}
            bordered
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}

export default Basic;