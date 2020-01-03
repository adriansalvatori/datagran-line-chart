import React, {Component} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Notification from '../components/notification'
import CSVInputter from '../components/csvinputter'

class App extends Component {

  state = {
    notification:'This sort of app has been developed as an exercise needed for the interview process at Datagran',
    data: [],
    headers: [],
    options: {
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        title: {
          text: 'X Axis'
        }
      },
      yAxis: {
        title: {
          text: 'Y Axis'
        }
      },
      tooltip: {
        formatter: function () {
          return 'The value for<br><b>' + this.x + '</b> is <b>' + this.y + '<br>in series ' + this.series.name;
        }
      },
      series: [
        {
          name: 'This will change when you process and apply your own data.',
          data: [1, 5, 3]
        }
      ]
    }
  }

  updateState = (x, y, data, headers) => {
    /**
     * Here's something tricky. Now data needs to fit the X and Y axis rules.
     * We want to set X values as categories to X Axis.
     * We're gonna do the following: We're getting the csv header index of the option selected, so we're gonna use it to loop between data.
     * Example: if out X Axis option index is 3, then we're gonna loop trough every row in data and get the value of every 3rd item.
     *
     * Then, were gonna push new rows to data array with only Y and X values.
     */
    let categories = []
    let xref = x[1] //second parameter in x

    data.forEach(row => {
      row
        .forEach(function (item, index) {
          if (index === xref) {
            categories.push(item)
          }
        })
    });

    let finaldata = []
    let yref = y[1] //second parameter in y

    data.forEach(row => {
      row
        .forEach(function (item, index) {
          if (index === yref) {
            finaldata.push(item)
          }
        })
    });

    /**
     * Now here we're setting the data we got from CSV intoto the chart.
     */
    this.setState({
      data: data,
      headers: headers,
      options: {
        xAxis: {
          title: {
            text: x[0]
          },
          categories: categories
        },
        yAxis: {
          title: {
            text: y[0]
          }
        },
        series: {
          name: y[0] + ' per ' + x[0], //Y value per X value.
          data: finaldata
        }
      }
    })
  }

  updateNotification = (text) =>{
    console.log(text)
    this.setState({
      notification:text
    })
  }

  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              <Notification text={this.state.notification}/>
              <div className="columns is-multiline">
                <div className="column controls-holder">
                  <CSVInputter notification={this.updateNotification} updateState={this.updateState}/>
                </div>
                <div className="column chart-holder">
                  <HighchartsReact highcharts={Highcharts} options={this.state.options}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App