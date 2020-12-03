import React, {Component} from 'react'
import DeletePhone from "./DeletePhone";
import AddPhoneForm from "./AddPhoneForm";
import 'bootstrap/dist/css/bootstrap.css'

export default class Phone extends Component {
    constructor(props) {
        super(props);

        const {contactId, phone, borderStyle, marginStyle} = props
    }

    render({contactId, phone, borderStyle, marginStyle} = this.props) {
        const phoneNumber = phone.phoneNumber;

        return (
            <div className={"row " + borderStyle + marginStyle}>

                <div className="col-6"> {phoneNumber} </div>

                <DeletePhone gridSize="3"  contactId={contactId} phone={phone} />

                <AddPhoneForm gridSize="3" phoneNumber={phoneNumber} contactId={contactId} />

            </div>
        )
    }
}