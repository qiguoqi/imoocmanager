import React, { Component } from 'react';
import { Card, Button, Modal, Form, Radio, DatePicker, Input, Select } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/baseForm';
import '../../data/user';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
class User extends Component {

  state = {
    isVisible: false
  }

  handleClick = (type) => {
    let item = this.state.selectedItem;
    if (type === "create") {
      this.setState(()=>({
        type,
        isVisible: true,
        title: "添加员工"
      }));
    } else if (type === 'edit') {
      if (!item) {
        Modal.info({
          title: "提示",
          content: "请选择一个用户"
        });
        return ;
      }
      this.setState(()=>({
        type,
        isVisible: true,
        title: "编辑员工",
        userInfo: item
      }));
    }
  }

  handleSubmit = (params) => {
    this.params = params;
    this.request();
  }

  componentDidMount() {
    this.request();
  }

  request = () => {
    axios.request(this, 'user.php')
  }

  handleSubmit = () => {
    let { type } = this.state;
    let data = this.userForm.props.form.getFieldsValue();
    console.log(data);
    this.setState(()=>({isVisible: false}));
    this.userForm.props.form.resetFields();
    this.request();
  }

  render() {
    const formList = [
      {
        type: "INPUT",
        label: "用户名",
        field: "user_name",
        placeholder: "请输入用户名",
        width: 150
      },
      {
        type: "INPUT",
        label: "手机号",
        field: "user_mobile",
        placeholder: "请输入手机号",
        width: 150
      }
    ];
    const columns = [{
      title: 'id',
      dataIndex: 'id'
    }, {
      title: '用户名',
      dataIndex: 'username'
    }, {
      title: '性别',
      dataIndex: 'sex',
      render(sex){
          return sex === 1 ?'男':'女'
      }
    }, {
      title: '状态',
      dataIndex: 'state',
      render(state){
          let config = {
              1:'咸鱼一条',
              2:'风华浪子',
              3:'北大才子一枚',
              4:'百度FE',
              5:'创业者'
          }
          return config[state];
      }
    },{
      title: '爱好',
      dataIndex: 'interest',
      render(interest){
          let config = {
              '1':'游泳',
              '2':'打篮球',
              '3':'踢足球',
              '4':'跑步',
              '5':'爬山',
              '6':'骑行',
              '7':'桌球',
              '8':'麦霸'
          }
          return config[interest];
      }
    },{
      title: '爱好',
      dataIndex: 'isMarried',
      render(isMarried){
          return isMarried?'已婚':'未婚'
      }
    },{
      title: '生日',
      dataIndex: 'birthday'
    },{
      title: '联系地址',
      dataIndex: 'address'
    },{
      title: '早起时间',
      dataIndex: 'time'
    }
  ];
    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={this.handleSubmit}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" icon="plus" onClick={()=>this.handleClick("create")}>添加员工</Button>
          <Button type="primary" icon="edit" onClick={()=>this.handleClick("edit")}>编辑员工</Button>
          <Button type="primary" onClick={()=>this.handleClick("detail")}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={()=>this.handleClick("delete")}>删除员工</Button>
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
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={()=>{
            this.userForm.props.form.resetFields();
            this.setState(()=>({isVisible: false}));
          }}
          width={600}
        >
          <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={inst => this.userForm=inst}></UserForm>
        </Modal>
      </div>
    );
  }
}

class UserForm extends Component {
  render() {
    const formLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }
    const {getFieldDecorator} = this.props.form;
    const type = this.props.type;
    const userInfo = this.props.userInfo || {};
    console.log("userInfo", userInfo);
    return (
      <Form layout="horizontal">
        <FormItem label="用户名" {...formLayout}>
          {
            console.log("22222",userInfo.username),
            getFieldDecorator("user_name",{
              initialValue: userInfo[0].username
            })(
              <Input type="text" placeholder="请输入用户名"></Input>
            )
          }
        </FormItem>
        <FormItem label="性别" {...formLayout}>
          {
            getFieldDecorator("sex",{
              initialValue: userInfo[0].sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio vlaue={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formLayout}>
          {
            getFieldDecorator("state",{
              initialValue: userInfo[0].state
            })(
              <Select>
                <Option value={1}>打篮球</Option>
                <Option value={2}>踢足球</Option>
                <Option value={3}>游泳</Option>
                <Option value={4}>跑步</Option>
                <Option value={5}>打羽毛球</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...formLayout}>
          {
            getFieldDecorator("birthday",{
              initialValue: moment(userInfo[0].birthday)
            })(
              <DatePicker></DatePicker>
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...formLayout}>
          {
            getFieldDecorator("address",{
              initialValue: userInfo[0].address
            })(
              <TextArea rows={3} placeholder="请输入联系地址"></TextArea>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create({})(UserForm);

export default User;