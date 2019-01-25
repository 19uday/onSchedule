import React, {Component} from 'react';
import HomeStudent from './HomeStudent';
import HomeTeacher from './HomeTeacher';
import Login from './Login';
import {connect} from 'react-redux';

class Routes extends Component{
    render(){
        if(this.props.isloggedin === false)
        {
            return(
                <Login />
            );
        }

        if(this.props.isloggedin === true && this.props.appUser === "student")
        {
            return(
                <HomeStudent />
            );
        }

        if(this.props.isloggedin === true && this.props.appUser === "teacher")
        {
            return(
                <HomeTeacher />
            );
        }
    }
}

const mapStateToProps = state => ({
    appUser: state.appUser,
    isloggedin: state.isloggedin
  })
  
export default connect(mapStateToProps)(Routes);