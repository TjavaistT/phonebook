import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class Footer extends Component {
    render() {
        return (
            <footer className="text-center">
                <div className="container">
                    Код на github
                    <a href="https://github.com/TjavaistT/phonebook" target="_blank"> Телефонная книга(Java)</a>
                </div>
            </footer>
        )
    }
}