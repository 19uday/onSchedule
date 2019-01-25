import React,{Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import Swipable from './Swipable';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 100,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
 
class Calendar extends Component{

    state = {
        open: false,
        eventss:  this.dummyEvents,
        selectedDate: null,
        set: false,
        start: false,
      };
    
      handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
        this.setState({ set: false });
      };
    
    handleSelectEvent = (event) => {
        console.log(event);
    }

    drill = ({ start, end }) => {
        console.log("ffbadf");
        this.setState({open: true});
        console.log(start.toLocaleDateString());
        this.setState({selectedDate: start.toLocaleDateString()});
        this.setState({set: true});
      }

      events = [];

      componentDidMount(){

        var assignments = this.props.assignments;
        var tests = this.props.tests;
        var eventObject = {
          title: "",
          start: new Date(),
          end: new Date(),
        };

        for(var i=0 ; i < assignments.length ; i++)
        {
          eventObject = {
            title: "Assignment",
            startDate: new Date(assignments[i].submissionDateAndTime),
            endDate: new Date(assignments[i].submissionDateAndTime),
          }
          this.events.push(eventObject);
          console.log(eventObject);
        }

        for(i=0 ; i < tests.length ; i++)
        {
          eventObject = {
            title: "Test",
            startDate: new Date(tests[i].testDate),
            endDate: new Date(tests[i].testDate),
          }
          this.events.push(eventObject);
          console.log(eventObject);
        }

        this.setState({start: true});
        console.log(this.events);

      }

    render(){
        const { classes } = this.props;
        const localizer = BigCalendar.momentLocalizer(moment); 
          
        return(
          <div>
            {this.state.start === true &&
              <div style={{height: "90vh"}}>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.events}
                    startAccessor='startDate'
                    endAccessor='endDate'
                    onSelectSlot={this.drill}
                    defaultDate={moment().toDate()}
                    eventPropGetter={
                      (event, start, end, isSelected) => {
                        console.log(event);
                        if(event.title === "Assignment")
                        {
                          var style = {
                            backgroundColor: "grey",
                            borderRadius: '5px',
                            width: '40%',
                            opacity: 0.8,
                            float: 'right',
                            marginRight: '5px',
                            border: '2px',
                            display: 'block'
                          };
                
                          return {
                              style: style
                          };
                        }
                
                      else
                      {
                          var style = {
                            backgroundColor: "brown",
                            borderRadius: '5px',
                            width: '40%',
                            opacity: 0.8,
                            float: 'right',
                            marginRight: '5px',
                            border: '2px',
                            display: 'block'
                          };
                          
                          return {
                            style: style
                          };
                      }
                      }
                    }
                />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                        <div style={getModalStyle()} className={classes.paper}>
                        {this.state.set === true &&
                        <div style={{maxWidth: '100%'}}>
                            <Swipable selDate={this.state.selectedDate}/>
                        </div>
                        }
                        </div>
                </Modal>
              </div>
            }
          </div>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    schedule: state.schedule,
    assignments: state.assignments,
    tests: state.tests,
  })
  
  export default connect(mapStateToProps)(withStyles(styles)(Calendar));