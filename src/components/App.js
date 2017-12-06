import React, { Component } from 'react';
//import logo from '../logo.svg';
import '../App.css';

import Header from './Header';
import Search from './Search';
import AddLogoForm from './AddLogoForm';
import logos from '../assets/data';
import Logo from './Logo';
import {base} from '../base';

class App extends Component {
    constructor() {
        super();
        this.addLogo = this.addLogo.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.removeLogo = this.removeLogo.bind(this);
        this.filterLogos = this.filterLogos.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);
        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.state = {
            logos: {},
            uid: null
        }
    }

    addLogo(logo){
        const newLogos = {...this.state.logos};
        const timestamp = Date.now();

        newLogos[`logo-${timestamp}`] = logo;
        this.setState({ logos: newLogos});
    }

    loadSamples(){
        this.setState({ logos: logos })
    }

    removeLogo(logo){
        const listLogos = {...this.state.logos};
        listLogos[logo] = null;

        this.setState({ logos: listLogos});
    }

    filterLogos(list){
        this.setState({ logos: list});
    }

    userLoggedIn(user){
        this.setState({ uid: user});
    }

    isUserLoggedIn(){
        return (this.state.uid);
    }

    componentWillMount() {
        this.ref = base.syncState('/logos', {
            context: this,
            state: 'logos'
        });

        const localStorageRef = localStorage.getItem('logos-list');

        if(localStorageRef) {
            this.setState({
                logos:  JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('logos-list', JSON.stringify(nextState.logos));
    }

    render() {

        return (
            <div className="App">
                <Header />
                <AddLogoForm addLogo={this.addLogo} loadSamples={this.loadSamples}  isUserLoggedIn={this.isUserLoggedIn} userLoggedIn={this.userLoggedIn}/>
                <Search logos={this.state.logos} filterLogos={this.filterLogos} />

                <div className="container">
                    <div className="row">
                        {Object.keys(this.state.logos).map( key => <Logo key={key} logoId={key}  isUserLoggedIn={this.isUserLoggedIn} userLoggedIn={this.userLoggedIn} removeLogo={this.removeLogo} details={this.state.logos[key]}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
