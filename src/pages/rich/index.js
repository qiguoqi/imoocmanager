import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Bar extends Component {

  state = {
    showRich: false,
    editorState: ''
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleClearContent = () => {
    this.setState(()=>({editorState:''}));
  }

  handleGetText = () => {
    this.setState(() => ({
      showRich: true
    }));
  }

  onEditorChange = (contentState) => {
    this.setState(()=>({
      contentState
    }));
  }

  render() {
    return (
      <div>
        <Card>
          <Button onClick={this.handleClearContent} type="primary">清空</Button>
          <Button onClick={this.handleGetText} type="primary">获取HTML内容</Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRich}
          onCancel={() => {
            this.setState(() => ({showRich: false}));
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}

export default Bar;