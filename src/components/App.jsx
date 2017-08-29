import React, { Component } from "react";
import ReactDOM from "react-dom";
import Profile from "./github/Profile.jsx";
import Search from "./github/Search.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "tiagox9",
            userData: [],
            userRepos: [],
            perPage: 10
        }
    }

    //get userData from github
    getUserData() {
        $.ajax({
            url: 'http://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ userData: data });
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ username: null});
                alert(err);
            }.bind(this)
        });
    }

    //get userRepos from github
    getUserRepos() {
        $.ajax({
            url: 'http://api.github.com/users/' + this.state.username + '/repos?per_page='+this.state.perPage+'client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret+'&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ userRepos: data });
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ username: null});
                alert(err);
            }.bind(this)
        });
    }

    handleFormSubmit(username) {
        this.setState({ username: username}, function() {
                this.getUserData();
                this.getUserRepos();
             
        });
    }


    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }

    render() {
        return(
            <div>
            <Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
            <Profile {...this.state}/>
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};
App.defaultProps = {
    clientId: '7ff881c77816870240ea',
    clientSecret: 'f8226cee80b5753a4a275c11274d4c649b11b61e'
}

export default App 