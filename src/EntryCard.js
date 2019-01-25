import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {changeAppUser} from './actions/user.js';
import {connect} from 'react-redux';
import {
Link,
} from 'react-router-dom';



const styles = {
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
};

class EntryCard extends React.Component {

  click = (user) => {
    this.props.dispatch(changeAppUser(user));
    console.log(user);
  }

  render(){
  const { classes } = this.props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="cardcontent">
          <h4>onSchedule</h4>
          <button className="button4" style={{backgroundColor: "#9a4ef1"}} onClick={() => {this.click("student")}}><Link to="/routes" style={{ textDecoration: 'none' }}> Student </Link></button>
          <button className="button4" style={{backgroundColor: "#f14ebd"}} onClick={() => {this.click("teacher")}}><Link to="/routes" style={{ textDecoration: 'none' }}> Teacher </Link></button>
        </div>
      </CardContent>
    </Card>
  );}
}

EntryCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  appUser: state.appUser
})

export default connect(mapStateToProps)(withStyles(styles)(EntryCard));