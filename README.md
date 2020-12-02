
 Phonebook - книга контактов
-------------------------------------------


[Перейти к приложению][1]

* [Описание](#Описание)
* [Просмотр (или развертывание) приложения](#Просмотр-(или-развертывание)-приложения)
 * [Сайт приложения][1]
 * [Требования](#Требования-для-локальной-работы-приложения)
 * [Запуск из командной строки](#Запуск-из-командной-строки)
 * [Для запуска из Intelij IDEA с помощью Tomcat](#Для-запуска-из-Intelij-IDEA-с-помощью-Tomcat)
* [Клиентский интерфейс/Rest API](#Клиентский-интерфейс/Rest-API)    
* [Используемые технологии](#Используемые-технологии)
   
### Описание

Справочник с телефонными номерами, позволяет искать, добавлять, удалять, редактировать контакты с произвольным количеством телефонных номеров, с помощью клиентского html-интерфейса или Rest-API. 

![alt-текст][phonebook-interface]

### Просмотр (или развертывание) приложения

#### Работу приложение можно испытать по адресу https://phonebook-for-naumen.herokuapp.com/

#### Требования для локальной работы приложения
* подключение к интернету (или смена адреса бд на локальную БД postgress, заполненную таблицами из скриптов "src/main/resources/db/initDb.sql" и "src/main/resources/db/populateDB.sql")
* java 11.0.7  
* Apache Maven 3.6.0
* [файлы приложения](https://github.com/TjavaistT/phonebook)

#### Для запуска из Intelij IDEA с помощью Tomcat
* разархивировать вебсервер Tomcat http://tomcat.eu.apache.org/download-90.cgi
* настроить в IDEA для проекта SDK - java 11
* в конфигурции запуска указать папку Tomkat, адрес http://localhost:8080/ и в разделе Deployment создать 2 артефакта из файлов проекта, в виде обычного и exploded (распакованного) war-архивов, доступных соответственно по адресам / и /exp 

#### Запуск из командной строки
Возможен только после сборки проекта в jar-файл (появится папка target) (сборку можно выполнить в IDE см.выше.)
Перейти в корень приложения и запустить для Linux - hr.sh, для Windows - hr.bat.

####  Клиентский интерфейс/Rest API 

    
| Операция                          | Html  «/»         :     Rest «/rest»	                       |
| ----------------------------------|:-------------------------------------------------------------:|
| получить все контакты   | contacts	                                                       |  
| поиск по телефону       | contacts/searchByNumber                                |
| поиск по имени          | contacts/searchByName                                   |
| удалить контакт         | contacts/{id}/delete : /contacts/{id} DELETE     |
| получить один контакт   | contacts/{id}                                                       |
| добавить контакт        | contacts/new POST                                          |
| обновить контакт        | contacts/{contactId} POST                                |
| добавить телефон        | contacts/{contactid}/phones/new POST            |
| удалить телефон         | contacts/{contactid}/phones/{phoneId}/delete	: contacts/{contactId}/phones/{phoneId} DELETE                 |
| обновить телефон        |  - : contacts/{contactId}/phones/{phoneId} POST |
| получить телефон        |  - :  contacts/{contactId}/phones/{phoneId}          |

Пример использования (добавить контакт):

curl -X POST https://phonebook-for-naumen.herokuapp.com/rest/contacts/new -d "{\"id\":100030,\"name\":\"Бертрам\",\"phones\":[{\"id\":100032,\"phoneNumber\":79995556688}]}" -H "Content-Type:application/json"

#### Используемые технологии
* Spring
* Maven
* Hibernate / JPA / Postgres
* Webapp-runner
* Tomcat

[1]: https://phonebook-for-naumen.herokuapp.com
[phonebook-interface]: https://github.com/TjavaistT/phonebook/blob/master/phonebook-interface.png "Интерфейс приложения"
