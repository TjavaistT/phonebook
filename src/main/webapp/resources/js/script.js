$(function () {

    $("div.contact").on("click", ".editContact", function (e) {
        stopLinkAndEvent(e);
        createEditForm(e.target.closest("div.contact"));
    });

    $("button.addContact").on("click", function (e) {
        stopLinkAndEvent(e);
        addContact();
    });

    $("a.addPhone").on("click", function (e) {
        stopLinkAndEvent(e);
        createAddPhoneForm(e.target);
    });
});

function stopLinkAndEvent(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
}

function createEditForm(contact) {

    let field_names = $("div[data-type=field][data-name=name]", contact);

    $(field_names).each(function (indx, field_name){
        $(field_name).replaceWith(
            '<input type="text" class="col-2" name="' + $(field_name).data("name") + '" value="' + $.trim($(field_name).text()) + '"/>'
        );
    });

    var field_numbers = $("div[data-type=field][data-name=phoneNumber]", contact);

    $(field_numbers).each(function (indx, field_number)
    {
        $(field_number).replaceWith(
            '<input type="text" class="col-9" name="' + $(field_number).data("name") + '" value="' + $.trim($(field_number).text()) + '"/>'
        );
    });

    toEditContactForm(contact);

    replaceToSaveEditedButton(contact);
}

function createAddPhoneForm(addLink) {
    var newPhoneClass = $(addLink).data('name');

    var contactId = $(addLink).closest("div.contact").data("contactid");

    var form = $('<form class="addPhoneForm" name="addPhone" method="post"  action="phone/save" >'
                + '<input type="text"   name="' + newPhoneClass + '" class="newPhoneClass col-12 mb-2" />'
                + '<input type="hidden" name="contactid" value="' + contactId + '" />'
                + '<button class="btn btn-primary" name="savePhone" type="submit"> Сохранить </button>'
            + '</form>');

    $(addLink).before(form);
}

function toEditContactForm(contact) {
    var contactid = $(contact).data("contactid");
    $(contact).wrap('<form name="editContact" method="post" class="editContactForm col-12" action="contact/' + $.trim(contactid) + '/save" />');
}

function replaceToSaveEditedButton(contact) {
    $("a.editContact", contact).replaceWith('<button name="saveContact" type="submit" class="btn btn-primary"> Сохранить </button>');
}

function addContact() {
    $("#addRow .modal-title").html('Добавить контакт');
    $('#addRow #addForm').find(":input").val("");
    $("#addRow").modal();
}