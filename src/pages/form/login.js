import React, { Component } from 'react';
import { Card, Form } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  render() {
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem></FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;