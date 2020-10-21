import React, {Component} from 'react';
import CardList from './CardList';
//import {robots} from './robots';
import SearchBox from './SearchBox';
import './App.css';



class App extends Component{
    constructor(){
        super() // To call the parent constructor (Component)
        this.state = {
                robots: [],
                searchfield: ''
            }
            //console.log('constructor')
        }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({robots: users}));
        
        //this.setState({ robots: robots});
        //console.log('componentDidMount')
    }
    
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
        // console.log(event.target.value); // event must have target.value to return input text in console
    }
    
    render(){
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        //console.log('render');
        if (this.state.robots.length === 0){   // if the fetch take a long time to read the users
            return (
            <div className='tc'>
                <h1>Loading</h1>
            </div>
            )
        }
        else{
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <CardList robots={filteredRobots}/>
                </div>
            );
        }
    }
}

export default App;

// Console runs with constructor > render > componentDidMount > render
// Q: why it renders again? because in componenetDidMount, the empty array get the robots so it renders again