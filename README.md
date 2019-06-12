# AutoMart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type.

## Motivation
 With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

## Build status
[![Build Status](https://travis-ci.org/minega25/AutoMart.svg?branch=develop)](https://travis-ci.org/minega25/AutoMart)

[![Coverage Status](https://coveralls.io/repos/github/minega25/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/minega25/AutoMart?branch=develop)

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

## Open Endpoints

Open endpoints require no Authentication.

`POST /api/v1/auth/signup`: User can register with Automart 

`POST /api/v1/auth/signin` : A registered user can login

`GET /api/v1/car?status=available` : A user can view all available cars

`GET /api/v1/car?status=available&&min_price=xxx&&max_price=xxx` : A user can view all available cars


## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the sign up and sign in response headers.

### Car related enpoints

Each endpoint manipulates or displays information related to the Car whose
Token is provided with the request:

*  `POST /api/v1/car` : Post a car sale advert

*  `PATCH /api/v1/car/{car_id}/status` : Update status of a car sale advert from available to sold

*  `PATCH /api/v1/car/{car_id}/price` : Update price of a car sale advert

*  `DELETE /api/v1/car/{car_id}` : Admin can delete a specific car sale advert.


### Order related enpoints
Each endpoint manipulates or displays information related to the Order whose
Token is provided with the request:

*  `POST /api/v1/order` : Post an order

*  `PATCH /api/v1/order/{order_id}/price` : Update order price offer

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

## Contributor
Minega Shyaka Patrick 

---

## License
ISC © [Minega Shyaka Patrick]()
 