import React from 'react';

class Search extends React.Component {
    searchName(event) {
        const logos = {...this.props.logos};
        const newList = {};
        const word = event.target.value.toLowerCase();
        
        Object.keys(logos)
             .filter(key => logos[key].name.toLowerCase().search(word) !== -1 )
             .map(key => newList[key] = logos[key] );

        this.props.filterLogos(newList);
    }

    render() {
        return(
            <div className="container py-5">
                <div className="row">
                    <div className="col-8 m-auto m-0">
                        <form>
                            <div className="input-group">
                                <input id="search" type="text" className="form-control form-control-lg" name="search" placeholder="Search" onChange={(e) => this.searchName(e)}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;