import React, { Component } from 'react';
import { Table } from 'antd';
import Utils from '../../utils/utils';

class ETable extends Component {

  onRowClick = (record, index) => {
    let { rowSelection } = this.props;
    if (rowSelection === 'radio') {
      let rowSelectedKeys = [index];
      let selectedItem = record;
      this.props.updateSelectedItem(rowSelectedKeys, selectedItem);
    } else if (rowSelection === "checkbox"){
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem;
      let selectedIds = this.props.selectedIds;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i === -1) {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
    }
  }

  tableInit = () => {
    let row_selection = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type: "checkbox",
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    if (row_selection === false || row_selection === undefined) {
      row_selection = false;
    } else if (row_selection === 'radio') {
      rowSelection.type = 'radio';
    }
    return <Table
      bordered
      {...this.props}
      rowSelection={row_selection?rowSelection:null}
      onRow={(record,index) => {
        if (!row_selection) {
          return ;
        }
        return {
          onChange: () => {this.onRowClick(record, index)},
          onClick: () => {this.onRowClick(record, index)},
        };
      }}
    />
  }
  render() {
    return (
      <div>
        {this.tableInit()}
      </div>
    );
  }
}

export default ETable;