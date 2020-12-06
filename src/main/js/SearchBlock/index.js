import React, {Component} from 'react'
import SearchForm from "./SearchForm";
import AddContactForm from "../AddContactForm";
import Contacts from "../Contacts";

export default class SearchBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseUrl: "http://localhost:8080/rest/contacts",
            searchUrl: "http://localhost:8080/rest/contacts"
        }

        this.updateSearchUrl = this.updateSearchUrl.bind(this)
        this.cancelSearch = this.cancelSearch.bind(this)
    }

    updateSearchUrl(queryLink) {

        console.log('queryLink', queryLink)

        this.setState({
            searchUrl: queryLink
        })
    }

    cancelSearch(event){
        event.preventDefault();

        this.setState({
            searchUrl: this.state.baseUrl
        })
    }

    render(
        baseUrl=this.state.baseUrl,
        searchUrl=this.state.searchUrl,
        updateSearchUrl = this.updateSearchUrl,
        cancelSearch = this.cancelSearch
    ) {
        console.log('searchUrl', searchUrl)
        console.log('this.state.searchUrl', this.state.searchUrl)

        return (
            <>
                <section id="search">
                    <div className="card border-dark mb-4">
                        <div className="card-body pb-0">
                            <div className="row">

                                <SearchForm
                                    searchUrl={ baseUrl + "/searchByNumber"}
                                    queryArgument="phoneSubstring"
                                    title="Искать по номеру"
                                    placeholder="Например, 79780002255"
                                    updateSearchUrl={updateSearchUrl}
                                />

                                <SearchForm
                                    searchUrl={baseUrl + "/searchByName"}
                                    queryArgument="nameSubstring"
                                    title="Искать по имени"
                                    placeholder="Например, Герхард"
                                    updateSearchUrl={updateSearchUrl}
                                />

                            </div>
                        </div>
                        <div onClick={cancelSearch} className="card-footer text-right">
                            <a href="/contacts" className="btn btn-danger">
                                Отменить
                            </a>
                        </div>
                    </div>
                </section>

                <AddContactForm />

                <Contacts loadUrl={this.state.searchUrl} />
                {console.log('searchUrl end', searchUrl)}
                {console.log('this.state.searchUrl end', this.state.searchUrl)}

            </>
        )
    }
}