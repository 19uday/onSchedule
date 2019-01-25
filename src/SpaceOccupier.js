import React ,{Component} from 'react';
import Calendar from './Calendar';
import Attendance from './Attendance';
import Courses from './Courses';
import {connect} from 'react-redux';

class SpaceOccupier extends Component{
    
    componentDidMount(){
        console.log(this.props.spaceOccupier);
    }

    render() {

        if(this.props.spaceOccupier === 'calendar')
        {
            return(
                <Calendar />
            );
        }



        if(this.props.spaceOccupier === 'attendance')
        {
            return(
                <Attendance />
            );
        }

        if(this.props.spaceOccupier === 'courses')
        {
            return(
                <Courses />
            );
        }
    }
}

const mapStateToProps = state => ({
    spaceOccupier: state.spaceOccupier,
  })
  
  export default connect(mapStateToProps)(SpaceOccupier);