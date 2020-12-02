import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class Phone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact_id: this.props.contact_id,
            phone: this.props.phone,
            phone_counts: this.props.phone_counts
        }

        this.deleteNumber = this.deleteNumber.bind(this)
    }

    deleteNumber(event){
        fetch("/rest/contacts/" + this.state.contact_id + "/phones/" + this.state.phone.id, {
                    method: 'DELETE'
            }).catch(err => console.log(err))

        event.preventDefault()
    }

    render() {
        return (
            <div>
                <div className="col-8">
                    {this.state.phone.phoneNumber}
                </div>
                <div className="col-4">
                    <a href="#" onClick={this.deleteNumber} >
                        Удалить номер
                    </a>
                </div>
            </div>
        )
    }
}