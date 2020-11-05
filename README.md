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

### How To Use
(Work in progress but will clean this up)
Ensure you have npm and docker installed.
Run 'npm install' inside backend folder.
Run 'docker build -t eg_postgresql . ' to build the psql image.
Run 'docker run --rm -P -p 5301:5432 --name pg_test eg_postgresql' to start the container.
Inside of database.ts, the host has to be the result of running 'docker-machine ip' if you're on docker toolbox, 
otherwise localhost should work fine (untested).
Finally, run 'npm start', and the basic api should be functional and connected to the database.