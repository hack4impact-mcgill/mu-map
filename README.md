# MU MTL Open-air Museum Map

![Main CI](https://github.com/hack4impact-mcgill/mu-map/actions/workflows/main.yml/badge.svg)
![Backend CI](https://github.com/hack4impact-mcgill/mu-map/actions/workflows/deploy_backend.yml/badge.svg)

_For [MU MTL](https://mumtl.org/)'s 15th anniversary_ 🎉

A Progressive Web App for Montrealers and visitors to explore murals.

### Developers
- [Lin Xiao Zheng](https://github.com/zhenglinxiao)
- [Tony Ou](https://github.com/Tony9984)
- [Gabriel Paquette](https://github.com/Gabriel-Paquette)
- [Jacek Dziewonski](https://github.com/JDziewonski98)
- [Sibo Yang](https://github.com/SiboYang)
- [Yi Fang Yuan](https://github.com/yi-fang-yuan)
- [Blanche Francheterre](https://github.com/BlancheFrancheterre)

### UI/UX Designers
- [Sophearah Suy-Puth](https://github.com/sophearahsp)
- Pauline Swen

### Project Manager
- [Ted Spare](https://github.com/tedspare)

## Backend

### Setup
- Ensure you have [npm](https://www.npmjs.com/get-npm) and [Docker](https://www.docker.com/products/docker-desktop) installed.
- Run `npm install` inside the **backend** folder.
- Run `docker pull kartoza/postgis:latest` to pull a ready-to-go PostgreSQL image with PostGIS.
- Run `docker run --rm --name my_postgis -P -p 5301:5432 kartoza/postgis` to start the container.
- Create a file called **.env** in the backend root and copy the contents of **.sample-env** in it. NOTE: if you are running the (deprecated) Docker
Toolbox instead of Docker Desktop, type `docker-machine ip` into your command line, and paste the output into your DB_HOST **.env** variable.
- You can remove the old database image and container to free up space on your machine.

### Running 
- Make sure docker is running and the Postgres container exists (which was created in the previous section).
- Run `npm start`. You should see some output about the database tables being created. You are ready to work with the API.
- Run `npm run start-migrate` to populate the DB with some sample data.
- Run `npm t` to run unit tests. Unit tests should pass.

## Frontend

- `cd` into **frontend**
- Add a file called **.env** with the appropriate keys from Slack. See **.sample-env** for reference.
- `yarn install` to install dependencies from npm ([yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) is the same as npm but newer)
- `yarn start` and open the browser to **localhost:3000** or go to **192.168.2.20:3000** on your phone on wifi! :rocket:
- To debug, open Developer Tools in Chrome or Firefox via right click > inspect or `cmd`/`ctrl`+`shift`+`c`.
