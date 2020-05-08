# My Express Way
## Frontend

My [Udacity](https://www.udacity.com/) Full Statck Developer Nanodegree program final project. The My Express Way frontend used to connect to the MyExpressWay server that is used by an imaginary delivery company. They have drivers who need to login and mark if they are available and they have managers who need to login and see available drivers and deliveries. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Backend Heroku App: [MyExpressWay](https://myexpressway.herokuapp.com/)

## To Run

### Server configuration

To tell the frontend app which server to use: in the project directory open axios_services.tsx and export either the production or development constants. Set the prodction and/or development urls to your desired MyExpressWay servers.

### AUTH0 Permissions and Roles
There are two primary roles in the application: the manager and the driver. The manager can access all aspects of the deliveries while the driver need only see available deliveries and update deliveries to mark them delivered.

Manager Permissions:
-get:deliveries
-post:deliveries
-patch:deliveries
-delete:deliveries

Driver Permissions:
-get:deliveries
-patch:deliveries

After creating your Auth0 app and roles (you should have already done this for the server) place the generated driver and manager tokens in the App.tsx file or cut an paste them into the appropriate input boxes when the app is running.

## NPM start

In the project directory, you can run: `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.