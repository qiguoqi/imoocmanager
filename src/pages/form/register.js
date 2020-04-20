import React, { Component } from 'react';
import { Card, Form, Icon, Input, Radio, Button, InputNumber, Checkbox, Select, Switch, DatePicker, TimePicker, Upload, message } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class Register extends Component {
  
  state = {

  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        message.success(`${userInfo.username}:恭喜你通过表单内容学习，密码为：${userInfo.userPwd}`);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <div>
        <Card className="Card" title="注册组件">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="用户名" {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item label="密码" {...formItemLayout}>
              {getFieldDecorator('userPwd', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item label="性别" {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <RadioGroup>
                  <Radio value='1'>男</Radio>
                  <Radio value='2'>女</Radio>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: 18
              })(
                <InputNumber />
              )}
            </Form.Item>
            <Form.Item label="当前状态" {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: "1"
              })(
                <Select>
                  <Option value="1">衡山</Option>
                  <Option value="2">嵩山</Option>
                  <Option value="3">泰山</Option>
                  <Option value="4">华山</Option>
                  <Option value="5">昆仑山</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="国籍" {...formItemLayout}>
              {getFieldDecorator('homeLand', {
                initialValue: ["china", "usa"]
              })(
                <Select
                  mode="multiple"
                  placeholder="select one country"
                  optionLabelProp="label"
                >
                  <Option value="china" label="China">
                    <span role="img" aria-label="China">
                      🇨🇳
                    </span>
                    China (中国)
                  </Option>
                  <Option value="usa" label="USA">
                    <span role="img" aria-label="USA">
                      🇺🇸
                    </span>
                    USA (美国)
                  </Option>
                  <Option value="japan" label="Japan">
                    <span role="img" aria-label="Japan">
                      🇯🇵
                    </span>
                    Japan (日本)
                  </Option>
                  <Option value="korea" label="Korea">
                    <span role="img" aria-label="Korea">
                      🇰🇷
                    </span>
                    Korea (韩国)
                  </Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="是否已婚" {...formItemLayout}>
              {getFieldDecorator('isMarryed', {
                valuePropName: 'checked',
                initialValue: false
              })(
                <Switch />
              )}
            </Form.Item>
            <Form.Item label="你的生日" {...formItemLayout}>
              {getFieldDecorator('birthday', {
                initialValue: moment('2018-08-08 08:08:08')
              })(
                <DatePicker
                  showTime
                  format='YYYY/MM/DD HH:mm:ss'
                />
              )}
            </Form.Item>
            <Form.Item label="输入资料" {...formItemLayout}>
              {getFieldDecorator('details', {
                initialValue: ""
              })(
                <TextArea placeholder="textarea with clear icon" allowClear />
              )}
            </Form.Item>
            <Form.Item label="早起时间" {...formItemLayout}>
              {getFieldDecorator('morning', {
                initialValue: moment('08:00:00', 'HH:mm:ss')
              })(
                <TimePicker />
              )}
            </Form.Item>
            <Form.Item label="头像" {...formItemLayout}>
              {getFieldDecorator('jpg', {
                
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 4 },
              }}
            >
              <Checkbox>我已阅读慕课协议</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 4 },
              }}
            >
              <Button type="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form.Item>
            
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Register);