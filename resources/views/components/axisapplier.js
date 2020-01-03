import React, {Component} from 'react';

class AxisApplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      X: '',
      Y: '',
    }
  }

  change = (event) => {
    let id = event.target.id
    switch (id) {
      case 'xaxis':
        this.setState({
          X:[event.target.value, event.target.selectedIndex -1]
        })
        break;
      case 'yaxis':
        this.setState({
          Y:[event.target.value, event.target.selectedIndex -1]
        })
        break;
    }
  }

  updateParent = () => {
    this.setState({
      notification: 'X Axis is set to: ' + this.state.X[0] + ' and Y Axis is set to ' +this.state.Y[0]
    })
    setTimeout(() => { //to make sure state is updated
      this.props.updateState(this.state)
    }, 1);
    
  }

  render() {
    return (
      <div className="columns">
        <label className="column" htmlFor="X Axis">
          <h2 className="title is-5">X Axis</h2>
          <div className="select">
            <select onChange={this.change} id="xaxis">
              <option value="">No value</option>
              {this
                .props
                .options
                .map((option, i) => {
                  return (
                    <option key={i} value={option}>{option}</option>
                  )
                })
}
            </select>
          </div>
        </label>
        <label className="column" htmlFor="Y Axis">
          <h2 className="title is-5">Y Axis</h2>
          <div className="select">
            <select onChange={this.change} name="" id="yaxis">
              <option value="">No value</option>
              {this
                .props
                .options
                .map((option, i) => {
                  return (
                    <option key={i} value={option}>{option}</option>
                  )
                })
}
            </select>
          </div>
        </label>
        <label className="column" htmlFor="Apply">
          <h2 className="title is-5">U ready?</h2>
          <a href="#" onClick={this.updateParent} className="button is-primary">Apply</a>
        </label>
      </div>
    );
  }
}

export default AxisApplier;