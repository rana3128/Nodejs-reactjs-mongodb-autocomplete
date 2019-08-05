import React from 'react';

export default class Example extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            suggestion:[]
        }
    }

    onclicksubmit= ()=>{
        console.log("fetching data from 5000")
        var arryres = [];
        var url = 'http://localhost:5000/api/items/autosearch/'+'f';
        fetch(url).then( result => result.json())
                    .then(resdata => {
                        this.setState({suggestion: resdata});
                        //console.log(this.state.suggestion);
                        console.log(resdata);
                        return resdata;
                    });

    }

    render() {
        return(
            <div>
                <button onClick={this.onclicksubmit} >Fetch data from 5000 : </button>
                {this.state.suggestion.map((user, i) => <div key={i}>{user.name}</div>)}
            </div>
        );
    }

}