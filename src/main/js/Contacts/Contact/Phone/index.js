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
    }

    render() {
        return (
            <div className="row phone  border-bottom border-dark py-3">
                <div className="col-8">
                    {this.state.phone.phoneNumber}
                </div>
                <div className="col-4">
                    <a href = {"/contacts/" + this.state.contact_id + "/phones/" + this.state.phone.id + "/delete"} className="deletePhone  py-3" >
                        Удалить номер
                    </a>
                </div>
            </div>
        )
    }
}