import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            action: props.action,
            title: props.title,
            name: props.name,
            placeholder: props.placeholder
        }
    }

    render(){
        return(
            <form className="form-inline" method="get" action={this.state.action}>
                <div className="form-group mx-sm-3 mb-2">
                    <label  className="mx-sm-3">{this.state.title}
                        <input type="text"  name={this.state.name} className="form-control" placeholder={this.state.placeholder}/>
                    </label>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Найти</button>
            </form>
        )
    }
}