# Lunch Near Me

A web app for giving suggestions on the best crowdsourced lunch places near your location.

![alt text](/assets/screenshot_for_readme.png?raw=true "Main view")

## Demo

Live demo at [lunch-near-me.herokuapp.com](https://lunch-near-me.herokuapp.com/)

The database doesn't have a lot of data yet, so if you don't see any restaurant suggestions, change your location to e.g. Kasarmitori, Helsinki (60.16592, 24.94801). To mock your location with Chrome, click the three dots in dev-tools, select _More tools_ and _Sensors_.

## Features

- Show up to three random restaurants near your location

**To Do:**

- Filter the suggested restaurants based on weather and tags
- Let user add new restaurants to the database
- Implement user management and favorites lists

## Background

Choosing a place for lunch is always a difficult task. Especially for an IT consultant. The team sizes vary, locations change and people have different preferences. Sometimes you're in a hurry, or then it's a rainy day and you'd prefer something closer to the office. I hope that this app could cater my (and others') needs for finding a good place for lunch.

## Built with

- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/), [Redux](https://redux.js.org/)
- [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [MaterialUI](https://material-ui.com/)
- [Jest](https://jestjs.io/), [Puppeteer](https://pptr.dev/)
- [Leaflet](https://leafletjs.com/)

The technologies are chosen based on their popularity and on my interest in learning the most _commonly_ used web technologies.

## Build and run

Clone the repo

    $ git clone https://github.com/saarikt1/local-lunch.git

Install dependencies and run the server locally

    $ cd local-lunch
    $ npm install
    $ npm start

Run the client locally on localhost:3000

    $ cd client
    $ npm install
    $ npm start

To get the map tiles to work, you need an [access token to Mapbox](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). The access token is used in the API call in the component RestaurantMap.

## Full Stack -web development project at the University of Helsinki

This project is done for a course at the [University of Helsinki](https://www.helsinki.fi/en) as an individual web development exercise. The course gives a lot of freedom to implement a web application using a React & NodeJS stack taught in [Full Stack Open MOOC](https://fullstackopen.com/en/). The amount of course credits depends on the hours used for the project. In my case I've fulfilled the 175+ hours needed for the maximum of 10 ECTS credits.

My timekeeping: [download pdf](https://docs.google.com/spreadsheets/d/e/2PACX-1vRb-PwVgv3Fks8DDKxFA7A6wksru8mZOmHYCb9VlgfmoGrDDn-Iu6czRuVpahWLuzhMdG076ZUxYSUD/pub?gid=0&single=true&output=pdf)
