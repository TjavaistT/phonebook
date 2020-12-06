import React, {Component} from 'react'

export default class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchContent: ''
        }

        this.changeField = this.changeField.bind(this)
        this.search = this.search.bind(this)
    }

    changeField(event){
        this.setState({
            searchContent: event.target.value
        })
    }

    search(event){
        event.preventDefault();
        const searchUrl = this.props.searchUrl + "?" + this.props.queryArgument + "=" + this.state.searchContent

        console.log(' searchUrl SearchForm', searchUrl)

        this.props.updateSearchUrl(searchUrl)
    }

    render(
        changeField = this.changeField,
        search = this.search,
        placeholder = this.props.placeholder,
        title = this.props.title
    ){
        return(
            <form onSubmit={search} className="form-inline" method="get" >
                <div className="form-group mx-sm-3 mb-2">
                    <label  className="mx-sm-3">{title}
                        <input onChange={changeField}  className="form-control" placeholder={placeholder}/>
                    </label>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Найти</button>
            </form>
        )
    }
}