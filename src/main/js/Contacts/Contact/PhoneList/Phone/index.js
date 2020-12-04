import React, {Component} from 'react'
import DeletePhone from "./DeletePhone";
import AddPhoneForm from "./AddPhoneForm";
import 'bootstrap/dist/css/bootstrap.css'

export default class Phone extends Component {
    constructor(props) {
        super(props);

        const {contactId, phone, borderStyle, marginStyle, deletePhoneFn, addPhoneFn, edit} = props

    }

    render(
        edit = this.props.edit
    ) {
        if(edit){
            return this.renderEdit();
        } else {
            return this.renderNorm();
        }
    }

    renderEdit(
        contactId = this.props.contactId,
        phoneId = this.props.phone.id,
        phoneNumber = this.props.phone.phoneNumber,
        borderStyle = this.props.borderStyle,
        marginStyle = this.props.marginStyle,
        deletePhoneFn = this.props.deletePhoneFn
    ){
        return (
            <div className={"row col-12" + borderStyle + marginStyle}>

                <div className="col-6 ">
                    <input type="text" className="w-100" defaultValue={phoneNumber}/>
                </div>

                <DeletePhone gridSize="6"  deletePhoneFn = {deletePhoneFn} />

            </div>
        )
    }

    renderNorm(
        contactId = this.props.contactId,
        phoneId = this.props.phone.id,
        phoneNumber = this.props.phone.phoneNumber,
        borderStyle  = this.props.borderStyle,
        marginStyle  = this.props.marginStyle,
        deletePhoneFn = this.props.deletePhoneFn,
        addPhoneFn = this.props.addPhoneFn
    ) {
        return (
                <div className={"row" + borderStyle + marginStyle}>

                    <div className="col-5"> {phoneNumber} </div>

                    <DeletePhone
                        gridSize="3"
                        deletePhoneFn={deletePhoneFn} />

                    <AddPhoneForm
                        gridSize="4"
                        phoneNumber={phoneNumber}
                        contactId={contactId}
                        addPhoneFn={addPhoneFn}
                    />

                </div>
            )
    }
}