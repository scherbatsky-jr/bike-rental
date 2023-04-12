# BikeRental Application

A bike rental website where customer and signup to rent a bike on fixed hourly rate for a day.

## Database Connection
The project is using MongoDB to store all the user and rental data.

Create a collection in your MongoDB server and acquire the collection URL.

## Backend
The backend is written in Express js with Mongoose as model class. To run the backend, follow the steps below:

`Install node version greater 16`

Go inside the backend folder

Copy the .env.example as .env

`cd .env.example .env`

Set your mongodb cluster url into MONGODB_URL in .env

`MONGODB_URL=<mongodb_url>`

Install dependencies

`yarn install`

Start the server:

`yarn start`

The server will be run on `http://localhost:3000`


## Frontend
The frontend is written on React JS.

Go inside the frontend folder and install dependecies

`yarn install`

Start the server:

`yarn start`

The server will be run on `http://localhost:5000`