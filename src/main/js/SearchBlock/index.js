import React, {PureComponent} from 'react'
import SearchForm from "./SearchForm";
import 'bootstrap/dist/css/bootstrap.css'

export default class SearchBlock extends PureComponent {

    render() {
        return (
            <section id="search">
                <div className="card border-dark mb-4">
                    <div className="card-body pb-0">
                        <div className="row">

                            <SearchForm
                                action="/contacts/searchByNumber"
                                title="Искать по номеру"
                                name="phoneSubstring"
                                placeholder="Например, 79780002255"
                            />

                            <SearchForm
                                action="/contacts/searchByName"
                                title="Искать по имени"
                                name="nameSubstring"
                                placeholder="Например, Герхард"
                            />

                        </div>
                    </div>
                    <div  className="card-footer text-right">
                        <a href="/contacts" className="btn btn-danger">
                            Отменить
                        </a>
                    </div>
                </div>
            </section>
        )
    }
}