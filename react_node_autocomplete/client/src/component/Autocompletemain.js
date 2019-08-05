import React from 'react';

export default class Autocompletemain extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            suggestion: [],
            text: '',
        }
    }

    ontextchange=(event)=>{
        const svalue = event.target.value;
        if (svalue.length > 0){
            var url = 'http://localhost:5000/api/items/autosearch/'+svalue;
            fetch(url).then( result => result.json())
                .then(resdata => {
                    this.setState({suggestion: resdata});
                    //console.log(this.state.suggestion);
                    //console.log(resdata);
                    //return resdata;
                });
        }
    }

    suggSeleted(value){
        this.setState(()=>({
            text: value,
            suggestion: [],
            })
        );
    }

    rendersuggs=()=>{
        const mapdata = this.state.suggestion;
        if (mapdata.length === 0){
            return null;
        }
        return (
            <ul>
                {mapdata.map((item)=> <li onClick={() => this.suggSeleted(item.name)}>{item.name}</li>)}
            </ul>
        );
    }

    render() {
        return(
            <div>
                <input onChange={this.ontextchange} type="text" value={this.state.text}/>
                {this.rendersuggs()}
            </div>
        );
    }

}