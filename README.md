# HJ.Movie

> Project Description & Applications: 

This is a movie website where the users can view overview of the recently released movies, write comments about the movies and like the movies.
The project uses TMDB, postgresql, and docker as a database, nodejs as backend, and react as frontend. This website also includes authentication process. 
Only authenticated users (registered and logged in users) can write comments and like the movies. This website is particularly useful for people who want to 
have up-to-date movie information and its review from the others. 

> Steps to Install and Run the Project
1. git clone this repository in your terminal
2. enter cd server in your terminal and run npm install to install all the necessary dependencies 
3. create .env file in client and include NEXT_PUBLIC_SERVER_BASE_URL (your server url)  
4. enter cd client in your terminal and run npm install to install all the necessary dependencies 
5. create .env file in server and include its PORT (server port), NODE_ENV=development, APP_URL (server url), and ORIGIN (client url)
6. cd server and run docker-compose up (don't close it)
7. create new terminal and cd server and run npm run dev (don't close it, wait until you see "Database Connected" in your command line)
8. create new terminal and cd client and run npm run dev 
9. Now, you can successfully run the application. 

Hope you enjoy this application 😁
