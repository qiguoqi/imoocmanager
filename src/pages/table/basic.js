import React, { Component } from 'react';
import { Table, Card } from 'antd';
import axios from '../../axios';
import '../../data/table1';

class Basic extends Component {

  state = {
    selectedRowKeys: [],
    selectedItem: {}
  };

  componentDidMount() {
    axios.ajax({
      url: 'data.php'
    }).then(res => {
      console.log("1",res.data);
      this.setState(() => ({
        data: res.data
      }))
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    console.log("7", record.userName, index);
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    }, () => {
      console.log(this.state.selectedRowKeys)
    });
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'key',
        // key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '爱好',
        dataIndex: 'interest',
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      }
    ];
    let { seletedRowKeys } = this.state;
    const rowSelection = {
      type: "radio",
      seletedRowKeys
    }
    return (
      <div>
        <Card title="动态数据渲染表格-mock" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="mock-单选" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns}
            bordered
            pagination={false}
            rowSelection={rowSelection}
            onRow={(record,index) => {
              return {
                onChange: () => {this.onRowClick(record, index)},
                onClick: () => {this.onRowClick(record, index)},
              };
            }}
          />
        </Card>
      </div>
    );
  }
}

export default Basic;