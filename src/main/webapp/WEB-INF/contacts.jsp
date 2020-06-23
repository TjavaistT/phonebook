<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;"  pageEncoding="UTF-8" %>
<%@ page import="com.phonebook.web.ControllerHtml" %>
<%@ page import="com.phonebook.web.ControllerRest" %>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html><head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Телефонный справочник</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" defer></script>

    <script type="text/javascript" src="../resources/js/script.js" defer></script>

</head>
<body>

<div class="jumbotron">
    <div class="container mb-4">
        <h3 class="text-center">Телефонный справочник</h3>
        <section id="search">
        <div class="card border-dark mb-4">
            <div class="card-body pb-0">
                <div class="row">
                    <form class="form-inline" method="get" action="/contacts/searchByNumber">
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="searchNumber" class="mx-sm-3">Искать по номеру</label>
                            <input type="text" id="searchNumber" name="phoneSubstring" class="form-control" placeholder="Например, 79780002255">
                        </div>
                        <button type="submit" class="btn btn-primary mb-2">Найти</button>
                    </form>

                    <form class="form-inline" method="get" action="/contacts/searchByName">
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="searchName2" class="mx-sm-3">Искать по имени</label>
                            <input type="text" name="nameSubstring" class="form-control" id="searchName2" placeholder="Например, Герхард">
                        </div>
                        <button type="submit" class="btn btn-primary mb-2">Найти</button>
                    </form>

                </div>
            </div>
            <div class="card-footer text-right">
                <button class="btn btn-danger" onclick="window.history.back()">
                    Отменить
                </button>
            </div>
        </div>
        </section>

        <button class="btn btn-primary addContact">
            Добавить контакт
        </button>

        <section id="contactsList" class="container pt-3 ">
            <div class="row border-bottom border-dark">
                <div class="col-2 ">Имя</div>
                <div class="col-2 ">Номер</div>

                <div class="col-2"></div>
                <div class="col-2"></div>
            </div>

                <c:forEach items="${contacts}" var = "contact">
                <jsp:useBean id="contact" type="com.phonebook.model.Contact"/>

            <div class="contact row " data-contactId="${contact.id}">
                <div class="col-2 border-bottom border-dark py-3" data-name="name" data-type="field">
                     ${contact.name}
                </div>
                <div class="col-4 phones" <% if(contact.getNumbers().size() <= 1){ %> style="display: flex;" <% } %> >
                    <c:forEach items="${contact.numbers}" var="phone">
                    <jsp:useBean id="phone"  type="com.phonebook.model.Phone"/>

                    <div class="row phone  border-bottom border-dark py-3" data-phoneId="${phone.id()}"
                            <% if(contact.getNumbers().size() <= 1){ %> style="flex-grow: 3;" <% } %> >

                        <div class="col-8" data-name="phoneNumber" data-type="field">
                                ${phone.phoneNumber}
                        </div>
                        <div class="col-4">
                            <a href="/phone/${phone.id()}" class="deletePhone  py-3" >Удалить номер</a>
                        </div>

                    </div>

                </c:forEach>
                </div>
                <div class="col-3 border-bottom border-dark  py-3">
                    <a href="#" class="addPhone" data-name="${ControllerHtml.NEW_NUMBER_NAME}">Добавить номер</a>
                </div>
                <div class="col-2 border-bottom border-dark  py-3">
                    <a href="#" class="editContact ">Редактировать контакт</a>
                </div>
                <div class="col-1 border-bottom border-dark  py-3">
                    <a class="deleteContact" href="/contacts/${contact.id()}">Удалить контакт</a>
                </div>
            </div>

            </c:forEach>
        </section>
    </div>

    <footer class="text-center">
        <div class="container">
            Код на github <a href="" target="_blank">Телефонная книга(Java)</a>
        </div>
    </footer>

</div>

<div id="addRow" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <form class="modal-content modal-form" action="${ControllerRest.CONTACTS}${ControllerRest.ADD_CONTACT}" >
            <div class="modal-header">
                <h4 class="modal-title" ></h4>
                <button type="button" class="close" data-dismiss="modal" onclick="closeNoty()">×</button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="id" name="id">

                <div class="form-group">
                    <label for="${ControllerHtml.CONTACT_NAME}" class="col-form-label">Имя</label>
                    <input type="text" id="${ControllerHtml.CONTACT_NAME}" class="form-control" name="${ControllerHtml.CONTACT_NAME}" placeholder="Имя">
                </div>

                <div class="form-group">
                    <label for="${ControllerHtml.PHONE_NUMBER_NAME}" class="col-form-label">Номера</label>
                    <input type="text" class="form-control mb-2" name="${ControllerHtml.PHONE_NUMBER_NAME}">
                    <input type="text" class="form-control mb-2" name="${ControllerHtml.PHONE_NUMBER_NAME}">
                    <input type="text" class="form-control mb-2" name="${ControllerHtml.PHONE_NUMBER_NAME}">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Отменить
                </button>
                <button type="submit" class="btn btn-primary">
                    Сохранить
                </button>
            </div>
        </form>
    </div>
</div>
</body></html>