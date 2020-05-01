import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
export default {
  formateDate(time) {
    if (!time) return;
    let date = new Date(time);
    let hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0"+date.getMinutes():date.getMinutes();
    let seconds = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hours  + ':' + minutes + ':' + seconds; 
  },
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.total}条数据`
      },
      showQuickJumper: true
    }
  },
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = [<Option value="0" key="all_key">全部</Option>];
    data.map(item => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
    });
    return options;
  },
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState(()=>({
        selectedRowKeys,
        selectedItem: selectedRows,
        selectedIds
      }))
    } else {
      this.setState(()=>({
        selectedRowKeys,
        selectedItem: selectedRows
      }))
    }
  }
}