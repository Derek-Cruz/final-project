# Link

A full stack JavaScript solo project that lets people know you’re free and down to do something without having to directly reach out to anyone.

## Technologies Used

- React.js
- HTML5
- CSS3
- Node.js
- Webpack
- Express
- React Router DOM
- PostgreSQL
- Bootstrap
- Heroku

## Live Demo

Try it out at https://dereks-link-app.herokuapp.com/

## Features

- User can post they're available to hang out.
- User can see who is available to hang out.
- User can send a hang out request.
- User can approve a hang out request. 
- User can deny a hang out request. 
- User can update the hang out request.

## Stretch Features

- User can add/delete a friend.
- Sending a request will be sent to Google Calender. 
- User can direct message eachother.

## Preview

![APP-Preview](https://user-images.githubusercontent.com/78568982/145882590-6de9e6ad-9305-45a5-ae4a-d9ecc285e271.gif)


## Development 

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 12.6 or higher

### Getting Started

1. Clone the repository.
```
git clone git@github.com:user-name/lets-link.git
cd final-project
```
2. Install all dependencies with NPM.
```
npm install
```
3. Make a copy of the provided .env.example file. Name your copy .env. switch all config variables to your project's variables.
```
cp .env.example .env
```
4. Import the database schema and test data using the provided "db:import" script in package.json.
```
pgweb --db=yourDatabase
```
5. Once started, you can view the application by opening http://localhost:3000 in your browser.
```
npm run dev
```
