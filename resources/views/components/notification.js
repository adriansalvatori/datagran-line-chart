import React, { Component } from 'react';

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="notification has-text-centered">
       <div className="title is-5">{this.props.text}</div> 
        <br/>
        Remember you can see the source code at: <a href="https://github.com/adriansalvatori/datagran-line-chart" target="_blank"><b> https://github.com/adriansalvatori/datagran-line-chart</b></a>
      </div>
    );
  }
}

export default Notification;