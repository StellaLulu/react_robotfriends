import React, {Component} from 'react';
import CardList from '../components/CardList';
//import {robots} from './robots';
import SearchBox from '../components//SearchBox';
import Scroll from '../components//Scroll';
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
        const{robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        //console.log('render');
        return !robots.length?   // if the fetch take a long time to read the users, if (robots.length === 0)(
        (
            <div className='tc'>
                <h1>Loading</h1>
            </div>
        ):
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
        );
        }
    }

export default App;

// Console runs with constructor > render > componentDidMount > render
// Q: why it renders again? because in componenetDidMount, the empty array get the robots so it renders again