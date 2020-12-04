import React, {Component} from 'react'
import Phone from './Phone';

export default class PhoneList extends Component {
    constructor(props) {
        super(props);

        const {phones, contactId, gridSize, borderStyle, marginStyle, edit} = this.props;

        this.state = {
            phones: this.props.phones
        }

        this.addPhone = this.addPhone.bind(this, contactId)
    }

    deletePhone(contact_id, phoneId){
        fetch("/rest/contacts/" + contact_id + "/phones/" + phoneId, {method: 'DELETE'})
            .catch(err => console.log(err))
    }

    addPhone(contactId, newPhone, event) {
        event.preventDefault();

        fetch("/rest/contacts/" + contactId + "/phones/new", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({ "phoneNumber": newPhone })
        }).catch(err => console.log(err));

        this.setState({ addState: false })
    }

    render(
        phones = this.state.phones,
        gridSize = this.props.gridSize,

        phone,
        edit = this.props.edit,
        contactId = this.props.contactId,
        borderStyle = this.props.borderStyle,
        marginStyle = this.props.marginStyle,
        deletePhoneFn = this.deletePhone,
        addPhoneFn = this.addPhone
    ) {
        if(phones.length <= 0) { phones = [{"id":-1,"phoneNumber":0}] }

        const phoneList = phones.map(phone=>
            <Phone  key = {phone.phoneNumber}
                    contactId = {contactId}
                    phone = {phone}
                    borderStyle = {borderStyle}
                    marginStyle = {marginStyle}
                    deletePhoneFn = {this.deletePhone.bind(this, contactId, phone.id)}
                    addPhoneFn = {addPhoneFn}
                    edit = {edit}
            />)

        return  <div className={"col-" + gridSize + (edit ? " row" : " ")} >
            {phoneList}
        </div>
    }

}

