import React, {Component} from 'react';
import EntryCard from './EntryCard';
import image from './images/landing.jpg';

class Landing extends Component{
    componentDidMount(){
        console.log(image);
    }
    render(){
        return(
            <div className="landing">
                <div className="card">
                    <EntryCard />
                </div>
            </div>
        );
    }
}

export default Landing;