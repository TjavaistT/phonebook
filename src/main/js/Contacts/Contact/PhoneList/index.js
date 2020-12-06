import React, {Component} from 'react'
import Phone from './Phone';

export default class PhoneList extends Component {
    constructor(props) {
        super(props);

        const {phones, contactId, gridSize, borderStyle, marginStyle, edit, changePhoneNumerFn} = this.props;

        this.state = {
            phones: this.props.phones
        }

        this.addPhone = this.addPhone.bind(this, contactId)
        //this.deletePhone
    }

    deletePhone(contactId, phoneId){
        fetch("/rest/contacts/" + contactId + "/phones/" + phoneId, {method: 'DELETE'})
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

        edit = this.props.edit,
        contactId = this.props.contactId,
        borderStyle = this.props.borderStyle,
        marginStyle = this.props.marginStyle,
        deletePhoneFn = this.deletePhone,
        addPhoneFn = this.addPhone,
        changePhoneNumerFn = this.props.changePhoneNumerFn
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
                    changePhoneNumerFn ={changePhoneNumerFn}
                    edit = {edit}
            />)

        return  <div className={"col-" + gridSize + (edit ? " row" : " ")} >
            {phoneList}
        </div>
    }

}

