# MU Open-air Museum Map
_For MU MTL's 15th anniversary_ 🎉

A cross-platform mobile app for Montrealers and visitors to explore murals and follow pre-determined routes.

### Developers
- Lin Xiao Zheng
- Tony Ou
- Gabriel Paquette
- Jacek Dziewonski
- Sibo Yang
- Yi Fang Yuan
- Sophearah Suy-Puth
- Pauline Swen
- Blanche Francheterre
- Xin Rui Li
- Ted Spare

## Backend
### Setup
- Ensure you have npm and docker installed.
- Run `npm install` inside backend folder.
- Run `docker pull kartoza/postgis:latest` to pull a ready-to-go postgres image with postgis.
- Run `docker run --rm --name my_postgis -P -p 5301:5432 kartoza/postgis` to start the container.
- Create a file called **.env** in the backend root and copy the contents of **.sample-env** in it. NOTE: if you are running the (deprecated) docker
toolbox instead of docker desktop, type `docker-machine ip` into your command line, and paste the output into your DB_HOST .env variable.
- You can remove the old database image and container to free up space on your machine.

### Running
- Make sure docker is running and the postgres container exists (which was created in the previous section).
- Run `npm start`. You should see some output about the database tables being created. You are ready to work with the API.
- Run `npm run start-migrate` to add some data to the database
- Run `npm t` to run unit tests. Unit tests should pass.

## Frontend

- `cd` into **frontend/**
- Add a file called **.env** with the appropriate keys from Slack. See **.sample-env** for reference.
- `yarn install` to install dependencies from npm (yarn is the same as npm but newer)
- `yarn start` and open the browser to **localhost:3000** or go to **192.168.2.20:3000** on your phone on wifi! :rocket:
- In Google Chrome or Firefox, open Developer Tools by `right click` > `inspect` or cmd/ctrl+shift+c
