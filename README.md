# AutoMart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type.

## Motivation
 With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

## Build status
[![Build Status](https://travis-ci.org/minega25/AutoMart.svg?branch=develop)](https://travis-ci.org/minega25/AutoMart)

[![Coverage Status](https://coveralls.io/repos/github/minega25/AutoMart/badge.svg?branch=master)](https://coveralls.io/github/minega25/AutoMart?branch=master)

[![Maintainability](https://api.codeclimate.com/v1/badges/b6eeebdf4625b8aa7a73/maintainability)](https://codeclimate.com/github/minega25/AutoMart/maintainability)

# Auto mart Front-end UI design

## UI github pages link
 * [Auto Mart](https://minega25.github.io/AutoMart/UI/)

## Technologies used
* HTML.
* CSS.
* Javascript.

# API Endpoints
## Heroku auto mart api link
 * [Auto Mart](https://automartappl.herokuapp.com/)

## API Documentation link
* [Auto Mart api documentation](https://automartappl.herokuapp.com/api-docs/#/)
## API ENDPOINTS
| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index page |
| /api/v1/auth/signup| POST | Sign up |
| /api/v1/auth/signin| POST | Sign in |
| /api/v1/users| GET | Get all users |
| /api/v1/users/:id| GET | Get specific user |
| /api/v1/users/:id| DELETE| Delete specific user |
| /api/v1/cars| GET | Get all cars advers |
| /api/v1/car| POST | Create a car advert |
| /api/v1/orders| GET | Get all  purchasing order |
| /api/v1/order| POST| Create purchasing order  |
| /api/v1/order/:order Id | PUT| Update price of purchasing order |
| /api/v1/car/:car Id/status | PUT| Update car status |
| /api/v1/car/:car Id/price | PUT| Seller Update car price |
| /api/v1/cars/available | GET| Get all available cars |
| /api/v1/cars/:advert id | DELETE | Delete a car advert |

## Technologies used

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* 
 ```
### Framework
```
 *Express* 
 ```
### Testing Framework
```
 *Jasmine*
 ```
### Style Guide
```
*Airbnb*
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```

## Prerequisites
```
 [Node Package Installer - NPM].
```

## Installation
<b>Step 1: Clone repo from github and change </b>

`git clone https://github.com/minega25/AutoMart.git`

<b>Step 2: Change directories to the new ~/AutoMart directory: </b>

`cd AutoMart/`

<b>Step 3: Install all required npm dependencies</b>

`npm install`

<b>Step 4: Start the server</b>

`npm run dev`
##Tests
###To run test run the below command
`npm test`
## Contributor
Minega Shyaka Patrick 

---

## License
ISC © [Minega Shyaka Patrick]()
 
