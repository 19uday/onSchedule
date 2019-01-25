import React, {Component} from 'react';
import LoginCard from './LoginCard';

class Login extends Component{


    render(){
        return(
            <div className="landing">
                <div className="card">
                    <LoginCard />
                </div>
            </div>
        );
    }
}

export default Login;