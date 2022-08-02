<!-- ABOUT THE PROJECT -->
## About The Project
A RESTful API for Primanet Payment Application, this API provide payment using Midtrans Payment Gateway

### Built With


* [![Express][Express.js]][Express-url]
* [![Sequelize][Sequelize]][Sequelize-url]
* [![Mysql][Mysql]][Mysql-url]

<p align="right">(<a href="#top">back to top</a>)</p>

### API

| URL                     | Method | Authorization | Data                                                                                   | Description                      |
|-------------------------|--------|---------------|----------------------------------------------------------------------------------------|----------------------------------|
| /api/auth/signin        | POST   | None          | - phone<br/>- password                                                                 | Login user                       |
| /api/admin/register     | POST   | None          | - phone<br/>- email<br/>- name<br/>- password<br/>- code                               | Register new admininstrator      |
| /api/admin/packages     | POST   | Admin         | - name<br/>- price                                                                     | Create new internet package      |
| /api/admin/packages     | GET    | Admin         | None                                                                                   | Get all packages                 |
| /api/admin/packages/:id | GET    | Admin         | None                                                                                   | Get specific package by ID       |
| /api/admin/packages/:id | PUT    | Admin         | - name<br/>- price                                                                     | Update package by ID             |
| /api/admin/packages/:id | DELETE | Admin         | None                                                                                   | Delete package by ID             |
| /api/admin/users        | POST   | Admin         | - phone<br/>- email<br/>- name<br/>- password<br/>- code<br/>- address<br/>- packageId | Create new user                  |
| /api/admin/users        | GET    | Admin         | None                                                                                   | Get all users                    |
| /api/admin/users/:id    | GET    | Admin         | None                                                                                   | Get specific user by ID          |
| /api/admin/users/:id    | PUT    | Admin         | - phone<br/>- email<br/>- name<br/>- password<br/>- code<br/>- address<br/>- packageId | Update package by ID             |
| /api/admin/users/:id    | DELETE | Admin         | None                                                                                   | Delete package by ID             |
| /api/user/profile       | GET    | User          | None                                                                                   | Get profile data                 |
| /api/user/payments/     | GET    | User          | None                                                                                   | Get package which belong to user |
| /api/user/payments/:id  | GET    | User          | None                                                                                   | Get payment token                |

<p align="right">(<a href="#top">back to top</a>)</p>


[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
[Mysql]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[Mysql-url]: https://www.mysql.com/
