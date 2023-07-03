# Skrey Customers Reviews Plataform

## Table of contents
* [Admin](#admin)
* [Dummies](#dummies)
* [Service](#service)

## Admin
This layer is the Backoffice of the application, in it, you can access, consult and update the data realted to reviews, products, stores ad widgets preferences.
This layer should only be accessed or by a Admin or by a Store Owner. 

## Dummies
This Layer consists of a Next.js app that includes forms as a way to submit data in the DB.
This data should be provided by many different sources, but because the app is still in Development it is used this app instead.

## Service
This Layer is responsible for receiving all the information and to process it so it can be stored in the MongoDB database.
All of the information is stored using GraphQL language as Querys and Mutations.


## Setup
To run this project, first is needed to run all the diferent layers.

#### Admin
```
$ cd skrey-app/skrey-admin
$ npm install
$ npm run dev
```
#### Dummies
```
$ cd skrey-app/skrey-dummies
$ npm install
$ npm run dev
```
#### Service
```
$ cd skrey-app/skrey-service
$ npm install
$ npm run start
```

#### Service - Tests
```
$ cd skrey-app/skrey-service
$ npm install
$ npm run test
```