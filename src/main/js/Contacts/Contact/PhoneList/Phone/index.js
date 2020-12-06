import React, {Component} from 'react'
import DeletePhone from "./DeletePhone";
import AddPhoneForm from "./AddPhoneForm";
import 'bootstrap/dist/css/bootstrap.css'

export default class Phone extends Component {
    constructor(props) {
        super(props);

        const {phone, borderStyle, marginStyle, deletePhoneFn, addPhoneFn, /*changePhoneNumerFn,*/ edit} = props

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
        phoneId = this.props.phone.id,
        phoneNumber = this.props.phone.phoneNumber,
        styles  = this.props.borderStyle + this.props.marginStyle,
        deletePhoneFn = this.props.deletePhoneFn,
        changePhNumFn = this.props.changePhoneNumerFn
    ){
        return (
            <div className={"row col-12" + styles}>

                <div className="col-6 ">
                    <input type="text" onChange={(e) => changePhNumFn(e, phoneId)} className="w-100" defaultValue={phoneNumber}/>
                </div>

                <DeletePhone gridSize="6"  deletePhoneFn = {deletePhoneFn} />

            </div>
        )
    }

    renderNorm(
        phoneNumber = this.props.phone.phoneNumber,
        styles  = this.props.borderStyle + this.props.marginStyle,
        deletePhoneFn = this.props.deletePhoneFn,
        addPhoneFn = this.props.addPhoneFn
    ) {
        return (
                <div className={"row" + styles}>

                    <div className="col-5"> {phoneNumber} </div>

                    <DeletePhone gridSize="3" deletePhoneFn={deletePhoneFn} />

                    <AddPhoneForm gridSize="4" addPhoneFn={addPhoneFn}
                    />

                </div>
            )
    }
}