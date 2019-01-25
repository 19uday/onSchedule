import React, {Component} from 'react';
import AppBarr from './AppBarr';
import SpaceOccupier from './SpaceOccupier';
import {connect} from 'react-redux';
import {setSchedule} from './actions/set.js';
import {setAssignments} from './actions/set.js';
import {setTests} from './actions/set.js';

class HomeStudent extends Component{

    state = {
        start1: false,
        start2: false,
        start3: false,
    }

    componentDidMount(){
        var htt = new XMLHttpRequest();
        var urll = "http://localhost:6050/schedule";
        htt.open('GET', urll, true);
        htt.setRequestHeader('Content-type', 'application/json');
        htt.setRequestHeader('Access-Control-Allow-Origin', '*');
        htt.setRequestHeader('Authorization', this.props.accessToken);
        htt.send();
        var func = this;
        var jso = {};
        var jsoo = {};
        var jsooo = {};
        htt.onreadystatechange = function() {//Call a function when the state changes.
            if(htt.readyState === 4 && htt.status === 200) {
                console.log(htt.responseText);
                jso = JSON.parse(htt.responseText);
                console.log(jso.results);
                func.props.dispatch(setSchedule(jso.results));
                func.setState({start3: true});
            }
        }
        var httt = new XMLHttpRequest();
        var url = "http://localhost:6050/assignments";
        httt.open('GET', url, true);
        httt.setRequestHeader('Content-type', 'application/json');
        httt.setRequestHeader('Access-Control-Allow-Origin', '*');
        httt.setRequestHeader('Authorization', this.props.accessToken);
        httt.send();
 
        
        httt.onreadystatechange = function() {//Call a function when the state changes.
            if(httt.readyState === 4 && httt.status === 200) {
                console.log(httt.responseText);
                jsoo = JSON.parse(httt.responseText);
                func.props.dispatch(setAssignments(jsoo.results));
                func.setState({start2: true});
            }
        }
        var htttt = new XMLHttpRequest();
        var ur = "http://localhost:6050/tests";
        htttt.open('GET', ur, true);
        htttt.setRequestHeader('Content-type', 'application/json');
        htttt.setRequestHeader('Access-Control-Allow-Origin', '*');
        htttt.setRequestHeader('Authorization', this.props.accessToken);
        htttt.send();

        htttt.onreadystatechange = function() {//Call a function when the state changes.
            if(htttt.readyState === 4 && htttt.status === 200) {
                console.log(htttt.responseText);
                jsooo = JSON.parse(htttt.responseText);
                func.props.dispatch(setTests(jsooo.results));
                func.setState({start1: true});
            }
        }

        
    }

    render(){
        return(
            <div>
                {this.state.start1 === true && this.state.start2 && this.state.start3 &&
                    <div>
                        <div>
                            <AppBarr />
                        </div>
                        <div>
                            <SpaceOccupier /> 
                        </div>
                </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.accessToken
  })
  
  export default connect(mapStateToProps)(HomeStudent);