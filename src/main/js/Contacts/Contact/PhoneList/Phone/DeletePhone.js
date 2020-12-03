import React, {Component} from "react";

export default class DeletePhone extends Component{
    constructor(props) {
        super (props);

        const {contactId, phone, gridSize} = props;

        this.deleteNumber = this.deleteNumber.bind(this);
    }

    deleteNumber(event,
                 contactId = this.props.contactId,
                 phoneId = this.props.phone.id
    ){

        fetch("/rest/contacts/" + contactId + "/phones/" + phoneId,
            {method: 'DELETE'})
            .catch(err => console.log(err))
    }

    render(
        delNumFn = this.deleteNumber,
        gridSize = this.props.gridSize
    ){
        return (
            <div className={"col-" + gridSize + " btn btn-link"}
                 onClick={delNumFn}>
                Удалить номер
            </div>
        )
    }
}