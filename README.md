# MU Open-air Museum Map
_For MU MTL's 15th anniversary_ 🎉

A cross-platform mobile app for Montrealers and visitors to explore murals and follow pre-determined routes.

### Developers
- Lin Xiao Zhang
- Tony Ou
- Gabriel Paquette
- Jacek Dziewonski
- Sibo Yang
- Yi Fang Yuan
- Sophearah Suy-Puth
- Pauline Swen
- Blanche
- Xin Rui Li
- Ted Spare

### How To Set Up Backend
- Ensure you have npm and docker installed.
- Run 'npm install' inside backend folder.
- Run 'docker build -t eg_postgresql . ' to build the psql image.
- Run 'docker run --rm -P -p 5301:5432 --name pg_dev eg_postgresql' to start the container.
- Create a file called '.env' in the backend root and copy the contents of '.sample-env' in it. NOTE: if you are running the (deprecated) docker
toolbox instead of docker desktop, type 'docker-machine ip' into your command line, and paste the output into your DB_HOST .env variable.

### How To Run Backend
- Make sure docker is running and the postgres container exists (which was created in the previous section).
- Run "npm start". You should see some output about the database tables being created. You are ready to work with the API.
