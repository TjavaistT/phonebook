import React, {Component} from 'react'
import {render} from 'react-dom'
import SearchBlock from './SearchBlock'
import AddContactForm from './AddContactForm'
import Contacts from './Contacts'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css'

class Phonebook extends Component {
    render(){
        return (
            <div>
                <div className="jumbotron">
                    <div className="container mb-4">
                        <h3 className="text-center">Телефонный справочник</h3>
                        <SearchBlock />
                        <AddContactForm />
                        <Contacts />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}


render(<Phonebook />, document.getElementById('react'))