import React, { Component } from 'react';
import { Button, Card, Form, Select, Input, Modal, Tree, Transfer } from 'antd';
import ETable from '../../components/ETable';
import Utils from '../../utils/utils';
import axios from '../../axios';
import '../../data/permissionList';
import menuConfig from '../../config/menuConfig';
import "../../data/userList";

const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const FormItem = Form.Item;

class PermissionUser extends Component {

  state = {
    isRoleVisible: false,
    isPermissionVisible: false
  }

  componentDidMount() {
    axios.request(this, "permissionList.php");
  }

  handleRole = () => {
    this.setState(() => ({
      isRoleVisible: true
    }))
  }

  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    this.setState(() => ({
      isRoleVisible: false
    }));
    axios.request(this, "permissionList.php");
    this.roleForm.props.form.resetFields();
  }

  handlePermission = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.warning({title: "提示",content:"请选择一个角色"});
      return ;
    }
    this.setState(() => ({
      isPermissionVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    }));
  }

  handlePermissionSubmit = () => {
    let data = this.permissionForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    this.setState(() => ({isPermissionVisible: false}));
    axios.request(this, "permissionList.php");
  }

  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.warning({title: "提示",content:"请选择一个角色"});
      return ;
    }
    this.setState(() => ({
      isUserVisible: true,
      detailInfo: item
    }));
    this.getRoleUserList();
    console.log("handleUserAuth");
  }

  getRoleUserList = () => {
    axios.ajax({
      url: "userList.php"
    }).then(res => {
      if (res) {
        console.log("res.result.data", res.result.data);
        this.getAuthUserList(res.result.data);
        
      }
    })
  }

  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    console.log("getAuthUserList", dataSource);
    if (dataSource && dataSource.length > 0) {
      console.log("if");
      for (let i=0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      console.log("mockData",mockData,targetKeys);
      this.setState(() => ({
        mockData,
        targetKeys
      }));
    }
  }

  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url: "userList.php",
      params: {
        ...data
      }
    }).then(res => {
      this.setState(() => ({isUserVisible: false}));
      axios.request(this, "userList.php");
    })
  }

  render() {
    const columns = [
      {
          title: '角色ID',
          dataIndex: 'id'
      }, {
          title: '角色名称',
          dataIndex: 'role_name'
      },{
          title: '创建时间',
          dataIndex: 'create_time',
          render: Utils.formatTime
      }, {
          title: '使用状态',
          dataIndex: 'status',
          render(status){
              if (status === 1) {
                  return "启用"
              } else {
                  return "停用"
              }
          }
      }, {
          title: '授权时间',
          dataIndex: 'authorize_time',
          render: Utils.formatTime
      }, {
          title: '授权人',
          dataIndex: 'authorize_user_name',
      }
    ]
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
          <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div>
          <ETable
            dataSource={this.state.data}
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            rowSelection="radio"
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields();
            this.setState(()=>({isRoleVisible: false}))
          }}
        >
          <RoleForm wrappedComponentRef={inst => this.roleForm = inst}></RoleForm>
        </Modal>
        <Modal
          title="权限设置"
          visible={this.state.isPermissionVisible}
          width={600}
          onOk={this.handlePermissionSubmit}
          onCancel={() => {
            this.setState(() => ({isPermissionVisible: false}))
          }}
        >
          <PermissionForm
            detailInfo={this.state.detailInfo}
            pathMenuInfo={(checkedKeys) => {
              this.setState(()=> ({menuInfo: checkedKeys}))
            }}
            menuInfo={this.state.menuInfo}
            wrappedComponentRef = {inst => this.permissionForm = inst}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState(() => ({isUserVisible: false}))
          }}
        >
          <RoleAuthForm
            detailInfo={this.state.detailInfo}
            wrappedComponentRef = {inst => this.userAuthForm = inst}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            pathUserInfo={(targetKeys) => {
              this.setState(() => ({targetKeys}))
            }}
          />
        </Modal>
      </div>
    );
  }
}

class RoleForm extends Component {
  render() {
    const formLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }
    const {getFieldDecorator} = this.props.form;
    const type = this.props.type;
    const userInfo = this.props.userInfo || [];
    console.log("userInfo", userInfo);
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formLayout}>
          {
            getFieldDecorator("role_name")(
              <Input type="text" placeholder="请输入用户名"></Input>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formLayout}>
          {
            getFieldDecorator("state")(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={2}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create({})(RoleForm);

class PermissionForm extends Component {

  formLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15}
  }

  renderTreeNode = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode {...item} />
      }
    });
  }

  onCheck = (checkedKeys) => {
    this.props.pathMenuInfo(checkedKeys);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="horizontal">
          <FormItem label="角色名称" {...this.formLayout}>
            <Input disabled placeholder={this.props.detailInfo.role_name} />
          </FormItem>
          <FormItem label="状态" {...this.formLayout}>
            {
              getFieldDecorator("status",{
                initialValue: "1"
              })(
                <Select>
                  <Option value="1">启用</Option>
                  <Option value="2">停用</Option>
                </Select>
              )
            }
          </FormItem>
          <Tree
            checkable
            defaultExpandAll
            onCheck={(checkedKeys) => {
              this.onCheck(checkedKeys)
            }}
            checkedKeys={this.props.menuInfo}
          >
            <TreeNode title="平台权限" key="platform_all">
              {this.renderTreeNode(menuConfig)}
            </TreeNode>
          </Tree>
        </Form>
      </div>
    )
  }
}
PermissionForm = Form.create({})(PermissionForm);

class RoleAuthForm extends Component {

  formLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15}
  }

  onCheck = (checkedKeys) => {
    this.props.pathMenuInfo(checkedKeys);
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  }

  handleChange = (targetKeys) => {
    this.props.pathUserInfo(targetKeys)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form layout="horizontal">
          <FormItem label="角色名称" {...this.formLayout}>
            <Input disabled placeholder={this.props.detailInfo.role_name} />
          </FormItem>
          <FormItem label="选择用户" {...this.formLayout}>
            <Transfer
              listStyle={{width: 200, height: 400}}
              dataSource={this.props.mockData}
              titles={["已选用户", "待选用户"]}
              showSearch
              searchPlaceholder="请输入用户名"
              filterOption={this.filterOption}
              targetKeys={this.props.targetKeys}
              render={item=>item.title}
              onChange={this.handleChange}
            />
          </FormItem>
          
        </Form>
      </div>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm);

export default PermissionUser;