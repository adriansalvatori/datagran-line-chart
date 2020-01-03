import React, {Component} from 'react' 
import AxisApplier from './axisapplier'
class CSVInputter extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      data: [],
      headers:[]
    }
  }

  CSVInput = () => {
    let data  =  document.getElementById('csv')
    let csvheaders = []
    let array = []
    //Sending rows to array
    let rows = data.value.split("\n") //Each line of csv is a row. 
    rows.forEach(function(row, index) {
      //Trouble 1: Array got not just the actual data, but headers too. We need to separate headers.
      if(index === 0){ // index 0 is equal to first line. First line is equal to headers. So...
        row = row.split(",") 
        csvheaders = row
      }
      else{ //If out index is NOT 0, it means we're already seing our real data rows, so...
        //Trouble 2: Highcharts needs data in number format. 
        row = row.split(",") 
        let introw = [] //we won't modify the 'row' array. It's easier to just dump new values in a new array. 
        row.forEach(item=>{
          if(!isNaN(item)){
            item = parseFloat(item)
          }
          introw.push(item)
        })
        array.push(introw)
      }
    });
    this.setState({headers:csvheaders })
    this.setState({data:array})
    this.props.notification('Now please select the X and Y axes.')
  }

  updateState = (state) => {
    this.props.updateState(state.X, state.Y, this.state.data, this.state.headers)
    this.props.notification(state.notification)
  }

  render() {
    return (
      <div>
        <textarea className="textarea" name="" id="csv" cols="30" rows="5"></textarea>
        <br/>
        <div className="block">
          <a onClick={this.CSVInput} className="button is-primary">Process</a>
        </div>
        <hr/> 
        <AxisApplier updateState={this.updateState} options={this.state.headers}/>
      </div>
    ) 
  }
}

export default CSVInputter 