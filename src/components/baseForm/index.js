import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd';
import Utils from '../../utils/utils';
const Option = Select.Option;
const FormItem = Form.Item;

class FilterForm extends Component {

  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  }

  initialFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const { formList } = this.props;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let { label, field, placeholder, width, list, type } = item;
        let initialValue = item.initialValue || '';
        if (type === "时间查询") {
          const begin_time = <FormItem label="订单时间">
            {
              getFieldDecorator("begin_time")(
                <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"></DatePicker>
              )
            }
          </FormItem>
          formItemList.push(begin_time);
          const end_time = <FormItem label="~" colon={false}>
            {
              getFieldDecorator("end_time")(
                <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间"></DatePicker>
              )
            }
          </FormItem>
          formItemList.push(end_time);
        }else if (type === "SELECT") {
          const SELECT = <FormItem label={label} key={item.field}>
            {
              getFieldDecorator([field],{
                initialValue
              })(
                <Select
                  placeholder={placeholder}
                  style={{width}}
                >
                  { Utils.getOptionList(list) }
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT);
        } else if (type === 'INPUT') {
          const INPUT = <FormItem label={label}>
            {
              getFieldDecorator([field],{
                initialValue
              })(
                <Input type="text" placeholder={placeholder} style={{width: width}} />
              )
            }
          </FormItem>
          formItemList.push(INPUT);
        } else if (type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label}>
            {
              getFieldDecorator([field],{
                valuePropName: 'checked',
                initialValue
              })(
                <Checkbox>{label}</Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX);
        }
      })
    }
    return formItemList;
  }

  render() {
    return (
      <Form layout="inline">
        {this.initialFormList()}
        <FormItem>
          <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }

  reset = () => {
    this.props.form.resetFields();
  }
}

export default Form.create({})(FilterForm);