import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import moment from 'moment';
import Timestamp from 'react-timestamp';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: theme.spacing.unit * 90,
    margin: 'auto',
  },
});

class Swipable extends React.Component {
  state = {
    value: 0,
    start: false,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  todaySchedule = [];
  todayAsssignments = [];
  todayTests = [];

  componentDidMount(){
    var allSchedule = this.props.schedule;
    var allAssignments = this.props.assignments;
    var allTests = this.props.tests;
    var selDate = this.props.selDate;
    console.log(allSchedule, allTests);
    var t = new Date(1370001284000);
    console.log(t.toLocaleDateString())
    for(var i=0; i<allSchedule.length ; i++)
    {
      t = new Date(allSchedule[i].dateAndTime);
      console.log(t.toLocaleDateString());
      if(t.toLocaleDateString() === selDate){
        allSchedule[i].time = t.toLocaleTimeString();
      this.todaySchedule.push(allSchedule[i]);
      }
    }

    for(var i=0; i<allAssignments.length ; i++)
    {
      t = new Date(allAssignments[i].submissionDateAndTime);
      console.log(t.toLocaleDateString());
      if(t.toLocaleDateString() === selDate){
        allAssignments[i].time = t.toLocaleTimeString();
      this.todayAsssignments.push(allAssignments[i]);
      }
    }

    for(var i=0; i<allTests.length ; i++)
    {
      t = new Date(allTests[i].testDate);
      console.log(t.toLocaleDateString());
      if(t.toLocaleDateString() === selDate){
        allTests[i].time = t.toLocaleTimeString();
      this.todayTests.push(allTests[i]);
      }
    }



    console.log(this.todaySchedule, this.todayAsssignments, this.todayTests);

    this.setState({start: true});

  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
      {this.state.start === true &&
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="TimeTable" />
            <Tab label="Assignments" />
            <Tab label="Tests" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
              <table border={5}>
              {this.todaySchedule.map(row => {
                  return (
                    <tr>
                      <th>{row.time}</th> 
                      <td>{row.course}</td>
                    </tr>
                  );
                  })}
              </table>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <table border={5}>
                {this.todayAsssignments.map(row => {
                    return (
                      <tr>
                        <th>{row.time}</th>
                        <td>{row.course}</td>
                        <td>{row.title}</td>
                      </tr>
                    );
                    })}
            </table>
          </TabContainer>
          <TabContainer dir={theme.direction}>
              <table border={5}>
                    {this.todayTests.map(row => {
                        return (
                          <tr>
                            <th>{row.time}</th>
                            <td>{row.course}</td>
                            <td>{row.title}</td>
                          </tr>
                        );
                        })}
              </table>
          </TabContainer>
        </SwipeableViews>
        </div>
      }
      </div>
    );
  }
}

Swipable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  schedule: state.schedule,
  assignments: state.assignments,
  tests: state.tests,
})

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Swipable));