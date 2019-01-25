import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {loggedin} from './actions/user.js';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {setRefreshToken, setAccessToken} from './actions/set.js';
import GoogleLogin from 'react-google-login';



const styles = theme => ({
  card: {
    minWidth: 350,
    maxWidth: 500,
    minHeight: 350,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class LoginCard extends Component {

  state = {
      email:"",
      password:""
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log([event.target.name], event.target.value);
}
componentDidMount(){
  console.log(this.props.appUser);
}

login = () => {
  var htt = new XMLHttpRequest();
  var urll = ("http://localhost:6050/loginEmail/" + this.props.appUser);
  console.log(urll,this.props.appUser);
  var params = JSON.stringify({"email": this.state.email, "password": this.state.password});
  htt.open('POST', urll, true);
  htt.setRequestHeader('Content-type', 'application/json');
  htt.setRequestHeader('Access-Control-Allow-Origin', '*');
  htt.send(params);
  var func = this;
  htt.onreadystatechange = function() {//Call a function when the state changes.
    if(htt.readyState === 4 && htt.status === 200) {
        console.log(htt.responseText);
        func.props.dispatch(setRefreshToken(htt.responseText));
        var httt = new XMLHttpRequest();
        var url = ("http://localhost:6050/getAccessToken");
        var paramss = JSON.stringify({"refreshToken": htt.responseText});
        httt.open('POST', url, true);
        httt.setRequestHeader('Content-type', 'application/json');
        httt.setRequestHeader('Access-Control-Allow-Origin', '*');
        httt.send(paramss);
        httt.onreadystatechange = function() {//Call a function when the state changes.
          if(httt.readyState === 4 && httt.status === 200) {
              console.log(httt.responseText);
              func.props.dispatch(setAccessToken(httt.responseText));
          }
        } 
    }
  } 
}

    render() {
  const { classes } = this.props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="cardcontent">
        <h4>onSchedule</h4>
                <label>
                
                <TextField
                    id="outlined-name"
                    label="Email"
                    className={classes.textField}
                    name="email"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    />
                </label>
               
                <label>
                
                <TextField
                    id="outlined-name"
                    name="password"
                    className={classes.textField}
                    label="Name"
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                    />
                </label>
                <br />

                <Button variant="contained" className={classes.button} type="submit" value="submit" onClick={this.login}>
                    Login
                </Button>
        </div>
      </CardContent>
    </Card>
  );}
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  appUser: state.appUser,
  isloggedin: state.isloggedin
})

export default connect(mapStateToProps)(withStyles(styles)(LoginCard));