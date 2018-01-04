import React from 'react';
import icon from '../assets/icon-trash.svg';
import { app } from '../base';

class Logo extends React.Component {

    removeLogo(event){
        event.preventDefault();
        this.props.removeLogo(this.props.logoId);
    }

    render() {
        let editLogo = <p><a href="#" onClick={(e) => this.removeLogo(e)}><img className="delete-button" src={icon} width="20" alt=""/></a></p>

        if(!this.props.isUserLoggedIn()) {
            editLogo = ''
        }

        return(
            <div className="col-6 col-md-3 mt-4">
                <div className="card text-center">
                    
                    <div className="card-body">
                        <img className="card-img-top pt-3" src={this.props.details.imgUrl} alt="Logo" />
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">{this.props.details.name}</small>

                        {/* IF user is logged in show delete button*/}
                        {editLogo}
                    </div>
                </div>
            </div>
        )
    }
}

export default Logo;