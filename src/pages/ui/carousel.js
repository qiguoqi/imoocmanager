import React, { Component } from 'react';
import { Carousel, Card } from 'antd';
import './index.less';

class Carousels extends Component {
  render() {
    return (
      <div>
        <Card title="图片背景轮播" className="Card">
          <Carousel>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}

export default Carousels;