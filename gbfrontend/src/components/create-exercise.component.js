// Allows us to add exercises to the database

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        // In JavaScript you must always call super when defining the constuctor of a sub class
        super(props);

        // Ensures that 'this' is always refering to the class
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // How you create variables in react
        // Always using state
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // Like vue's 'Mounted' method
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                })
            }
        })
    }

    onChangeUsername(event) {
        // this.state.username = "new name" WRONG
        this.setState({
            // target will be a text box
            // value will be the entered text
            username: event.target.value
        });
    }

    onChangeDuration(event) {
        this.setState({
            duration: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    onChangeDate(event) {
        this.setState({
            date: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        // Connect frontend to backend eventually
        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))

        // Redirects webapp
        // window.location = "/";
    }

    render () {
        return (
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className = "form-group">
                    <label>Username: </label>
                    <select ref = "userInput"
                    required
                    className = "form-control"
                    value = {this.state.username}
                    onChange = {this.onChangeUsername}>
                    {
                        this.state.users.map(function(user) {
                            return <option
                            key = {user}
                            value = {user}>{user}
                            </option>;
                        })
                    }
                    </select>
                </div>
                <div className = "form-group">
                    <label>Description: </label>
                    <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.description}
                        onChange = {this.onChangeDescription}
                        />
                </div>
                <div className = "form-group">
                    <label>Duration in Minutes: </label>
                    <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.duration}
                        onChange = {this.onChangeDuration}
                        />
                </div>
                <div className = "form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected = {this.state.date}
                            onChange = {this.state.onChangeDate}
                        />
                    </div>
                </div>

                <div className = "form-group">
                    <input type = "submit"
                        value = "Create Exercise Log" 
                        className = "btn btn-primary"
                    />
                </div>

            </form>
            </div>
        );
    }
}