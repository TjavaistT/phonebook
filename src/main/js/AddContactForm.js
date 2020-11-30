import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default class AddContactForm extends Component {

    addContact(){
        // $("#addRow .modal-title").html('Добавить контакт');
        // $('#addRow #addForm').find(":input").val("");
        $("#addRow").modal();
    }

    // closeWindow = {
    //     closeNoty()
    // }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.addContact.bind(this)}>
                    Добавить контакт
                </button>

                <div id="addRow" className="modal fade" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <form className="modal-content modal-form" action="/contacts/new">
                            <div className="modal-header">
                                <h4 className="modal-title">Добавить контакт</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" id="id" name="id" />

                                    <div className="form-group">
                                        <label htmlFor="name" className="col-form-label">Имя</label>
                                        <input type="text" id="name" className="form-control" name="name"
                                               placeholder="Имя"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber" className="col-form-label">Номера</label>
                                        <input type="text" className="form-control mb-2" name="phoneNumber" />
                                        <input type="text" className="form-control mb-2" name="phoneNumber" />
                                        <input type="text" className="form-control mb-2" name="phoneNumber" />
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Отменить
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}