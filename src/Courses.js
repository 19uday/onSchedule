import React, {Component} from 'react';
import {setCourses} from './actions/set';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    grid: {
        padding: '2%',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
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

  

class Courses extends Component{

    state = {
        start: false,
        courses: [],
        open: false,
        course: {},
    };

      handleOpen = (course) => {
        this.setState({course: course});
        this.setState({ open: true });
        console.log(course);
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    componentDidMount(){
        var htt = new XMLHttpRequest();
        var urll = "http://localhost:6050/courses";
        htt.open('GET', urll, true);
        htt.setRequestHeader('Content-type', 'application/json');
        htt.setRequestHeader('Access-Control-Allow-Origin', '*');
        htt.setRequestHeader('Authorization', this.props.accessToken);
        htt.send();
        var func = this;
        var jso = {};
        htt.onreadystatechange = function() {//Call a function when the state changes.
            if(htt.readyState === 4 && htt.status === 200) {
                console.log(htt.responseText);
                jso = JSON.parse(htt.responseText);
                console.log(jso.results);
                func.props.dispatch(setCourses(jso.results));
                func.setState({courses: jso.results});
                func.setState({start: true});
            }
        }
    }

    render(){

        const { classes } = this.props;

        return(
            <div>
                {this.state.start === true &&
                    <div>
                        <Grid container spacing={24} className={classes.grid}>
                            {this.state.courses.map(course => {
                                return(
                                    <Grid item xs={4} md={3} >
                                        <Paper className={classes.root} elevation={1} onClick={() => {this.handleOpen(course)}}>
                                            <Typography variant="h5" component="h3">
                                                {course.name}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <h1>{this.state.course.name}</h1>
                                    <Typography variant="h6" id="modal-title">
                                        {this.state.course.description}
                                    </Typography>
                                    <h3>SEMS:</h3>
                                </div>
                            </Modal>
                    </div>
                }
            </div>
        );
    }
}

Courses.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  
  const mapStateToProps = state => ({
    courses: state.courses,
    accessToken: state.accessToken,
  })
  
  export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Courses));