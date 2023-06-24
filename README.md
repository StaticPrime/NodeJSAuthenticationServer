# Node.js Backend Architecture Typescript Project
### A complete project to use as a foundation to build a any REST based API

<br>

# Project Highlights 
1. Node.js
2. Express.js
3. Typescript
4. Mongoose
5. Redis
6. PostGRES
7. Joi
8. Unit Tests & Integration Tests
9. Docker
10. JWT

# About The Project
This project is designed for a production ready environment. It can handle the scale and complexity of a very demanding application.

It is suitable for Web Apps, Mobile Apps, and other API services.

# About The Author
[Jason Breault](https://www.linkedin.com/in/jason-breault-b23a1a10m) created this project using his 15 years of experience in tech industry working for top companies. In order to help people learn and to challenge himself during some of his down time, he decided to create a robust API platform to demonstrate basic coding best practices. Accompanied with this project will be several youtube tutorials that will walk you through the creation of this application. 

# Project Instructions
We will learn and build the backend application for an authentication microservice. The main focus will be to create a maintainable and highly testable architecture.
<br>
Following are the features of this project:
* **This backend is written in Typescript**: The type safety at build time and having intellisense for it in the IDE like vscode is unparalleled to productivity. I have found production bug reduced to a significant amount since most of the code vulnerabilities are identified during the build phase itself.
* **Separation of concern principle**: Each component has been given a particular role. The role of the components is mutually exclusive. This makes the project easy to be unit tested.
* **Feature encapsulation**: The files or components that are related to a particular feature have been grouped unless those components are required in multiple features. This enhances the ability to share code across projects.
* **Centralised Error handling**: I have created a framework where all the errors are handled centrally. This reduces the ambiguity in the development when the project grows larger.
* **Centralised Response handling**: Similar to Error handling we have a response handling framework. This makes it very convenient to apply a common API response pattern.
* **PostGRES**: PostGRES fits very well to the node.js application. It is fast, and scalable makes it ideal for modern web applications.
* **Redis**: I have used the redis server for caching the items which does not change frequently. It will boost the performance of our system.
* **Async execution**: I have used async/await for the promises and made sure to use the non-blocking version of all the functions with few exceptions.
* **Docker compose has been configured**: I have created the Dockerfile to provide the easy deployability without any setup and configurations. 
* **Unit test is favored**: The tests have been written to test the functions and routes without the need of the database server. Integration tests has also been done but the unit test is favored.
* **A pure backend project**: I have experienced that when a backend is developed clubbed with a frontend then in the future it becomes really difficult to scale. We would want to create a separate backend project that servers many websites and mobile apps.

## 3RE Architecture: Router, RouteHandler, ResponseHandler, ErrorHandler
<p align="center">
    <img src="https://github.com/StaticPrime/NodeJSAuthenticationServer/blob/main/3RE.png">
</p>
<br>

## How to build and run this project

* Install using Docker Compose [**Recommended Method**] 
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
    * Execute `docker-compose up` in terminal from the repo directory.
    * You will be able to access the api from http://localhost:3000
 * Run The Tests
    * Install node.js and npm on your local machine.
    * From the root of the project executes in terminal `npm install`.
    * *Use the latest version of node on the local machine if the build fails*.
    * To run the tests execute `npm test`.

### Find this project useful ? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:

### License
```
   Copyright (C) 2023 Jason Breault

   Permission is hereby granted, free of charge, to any person obtaining a copy 
   of this software and associated documentation files (the “Software”), to deal 
   in the Software without restriction, including without limitation the rights 
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
   copies of the Software, and to permit persons to whom the Software is 
   furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
     
 