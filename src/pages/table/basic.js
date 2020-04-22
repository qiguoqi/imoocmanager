import React, { Component } from 'react';
import { Table, Card, Button, Modal, message} from 'antd';
import axios from '../../axios';
import '../../data/table1';
import utils from '../../utils/utils';

class Basic extends Component {

  state = {
    selectedRowKeys: [],
    selectedItem: {},
  };

  params = {
    page: 1
  }

  componentDidMount() {
    this.request();
  }

  request = () => {
    let _this = this;
    axios.ajax({
      url: 'data.php',
      params: {
        page: this.params.page
      }
    }).then(res => {
      console.log("1",res.result.data);
      this.setState(() => ({
        data: res.result.data,
        pagination: utils.pagination(res, (current) => {
          _this.params.page = current;
          this.request();
        })
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
      console.log("888", this.state.selectedRowKeys);
    });
  }

  handleDelete = () => {
    console.log("handleDelete",this.state.selectedRowKeys);
    Modal.confirm({
      title: "删除确认",
      content: "您确定要删除这些数据吗？",
      onOk: () => {
        message.success("删除成功");
      }
    })
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
    console.log("pagination",this.state.pagination);
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
          <div>
            <Button onClick={this.handleDelete}>删除选中数据</Button>
          </div>
          <Table
            dataSource={this.state.data}
            columns={columns}
            bordered
            pagination={false}
            rowSelection={{type: 'checkbox', 
                           selectedRowKeys: this.state.selectedRowKeys,
                           onChange: (selectedRowKeys, selectedRows) => {
                             this.setState(()=>({
                               selectedRowKeys,
                               selectedRows
                             }))
                           }
                         }}
            onRow={(record,index) => {
              return {
                // onChange: () => {this.onRowClick(record, index)},
                onClick: () => {this.onRowClick(record, index)},
              };
            }}
          />
        </Card>
        <Card title="mock-分页" className="Card">
          <Table
            dataSource={this.state.data}
            columns={columns}
            bordered
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}

export default Basic;