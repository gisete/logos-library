import React from 'react';
import firebase from 'firebase';
import { app } from '../base';
import PropTypes from 'prop-types';

class AddLogoForm extends React.Component {
    constructor() {
        super();
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logOut = this.logOut.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    componentDidMount() {
        const that = this;
        app.auth().onAuthStateChanged(function(user, error) {
            if(user) {
                that.authHandler( {user});
            }
        });
    }

    createLogo(event) {
        event.preventDefault();
        
        const logo = {
            name: this.nameInput.value,
            imgUrl: this.urlInput.value
        }

        this.props.addLogo(logo);
        this.logoform.reset();
    }

    authenticate(provider) {
        app.auth().signInWithPopup(provider)
        .then(this.authHandler)
        .catch(this.erroHandler);
    }

    logOut() {
        const that = this;

        app.auth().signOut().then(() => {
            this.props.userLoggedIn({ uid: null})
        });
    }

    authHandler(authData) {
        this.props.userLoggedIn({uid: authData.user.uid});
    }

    errorHandler(error) {
        console.error(error.message);
    }

    renderLogin() {
        return(
           <div className="container-fluid py-5 login-nav">
                <h5>Sign in to edit logos</h5>
                <div className="row login-bar mx-auto mt-4">
                    <div className="col-12 mb-2">
                        <button className="btn button-github" onClick={() => this.authenticate(new firebase.auth.GithubAuthProvider())}>Login In with Github</button>
                    </div>
                    
                    <div className="col-12">
                        <button className="btn button-facebook" onClick={() => this.authenticate(new firebase.auth.FacebookAuthProvider())}>Login In with Facebook</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const logout = <button onClick={this.logOut}>Log Out!</button>

        if(!this.props.isUserLoggedIn()) {
            return <div>{this.renderLogin()}</div>
        }

        return(
            <div className="container-fluid py-5 bg-dark">
                <div className="w-75 mx-auto">
                    <form onSubmit={(e) => this.createLogo(e)} ref={(form) => this.logoform = form}>
                        <div className="form-row">
                            <div className="col-3">
                                <input ref={(input) => this.nameInput = input} id="name" type="text" className="form-control" placeholder="Name" />
                            </div>
                            <div className="col-7">
                                <input ref={(input) => this.urlInput = input } id="imgurl" type="text" className="form-control" placeholder="Image URL" />
                            </div>
                            <div className="col-2">
                               <button className="btn w-100" type="submit">Add logo</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="pt-3 w-75 mx-auto col">
                    <div className="row">
                        <small><a href="#" className="button-load-samples text-light" onClick={this.props.loadSamples}>+ load sample logos</a></small>
                    </div>
                </div>

                <div className="pt-3 w-75 mx-auto col">
                    <div className="row">
                         {logout}
                    </div>
                </div>
            </div>
        )
    }
}

AddLogoForm.propTypes =  {
    AddLogoForm: PropTypes.func,
    isUserLoggedIn: PropTypes.func,
    addLogo: PropTypes.func,
    userLoggedIn: PropTypes.func
}

export default AddLogoForm;