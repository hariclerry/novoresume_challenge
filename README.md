# Novorésumé Challenge

### Dependencies/Technologies
The app is built using the following technologies:

Backend
- Node.js, MongoDb, Express, wkhtmltopdf, Docker, Jest

Frontend
- React.js, Sass/Css, Jest, Enzymes.

### The stack you need to have installed on your machine:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Docker](https://docs.docker.com/get-docker/)
- [Wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)

`NB:` Incase you are having issues with browser secure connections issues, You might want to generate new certificates/keys and replace the keys and certs in the backend with the new ones. 

### App setup and installation:
- Clone the repository [here](https://github.com/hariclerry/novoresume_challenge/tree/novoresume-fullstack-challenge) 
- Cd into the `novoresume_challenge`

#### *To run the app locally without Docker:*

In [backend/database/mongodb.js](backend/database/mongodb.js), comment the line for *Uri for the Docker setup*, and uncomment the line for *Uri for the localhost setup*.

Change directory into backend folder, run:

```
npm install
```

```
nodemon app.js
```

Change directory into frontend folder, run:

```
npm install
```

```
npm start
```

The app now should be running on https://localhost:3000. 

#### *To run the app with Docker:*

Make sure you are using the *Uri for Docker setup* in [backend/database/mongodb.js](backend/database/mongodb.js).

In the project folder, run:
```
docker-compose build
```

Then, again in the project folder, run:
```
docker-compose up
```

For other useful Docker commands, see [this](https://docs.docker.com/engine/reference/commandline/docker/).

The app now should be running on https://localhost:3000.

#### To run tests:

```
npm run test
```

### Discussion

#### Implementations/Requirements
1. Write unit test for the login function in backend
   - I installed and setup jest as the testing library, added unit test for the login functionality. See above command on how to run tests.
2. Implement login functionality for backend 
   - I implemented the login functionality as per the requirements and added authentication using JSON Web Tokens.
3. Implemented the functionality to generate the HTML for the PDF of the offer in front-end
    - I implemented the PDF generation functionality whereby after a user has selected and saved products with their billing information, they are able to generate offers converted to PDF formate. I would like to point out here that, I have not yet managed to add footer to the PDF. I have tried implementing it using the --html-footer flag in the application but run into some issues with Wkhtmltopdf and because of time constraint, I have left the footer blank for now.
4. Implemented the landing page in front-end
   - I have implemented the landing page as per the requirement from the given mockup.

#### Changes made

Backend
- Setup testing using Jest test runner
- Added Validator middleware for validating inputs

Frontend
 - Setup testing using Jest test runner and Enzymes testing utility
 - Wrote tests for the implemented components and functionalities
 - Added type checking using Proptypes library
 - Setup configuration for absolute imports in jsconfig.json file. This is just for better code readability and easy Refactoring

 #### Bonus
 1. Making the page responsive
    - The landing page is implemented to be responsive.
2. Adding the images to the PDF 
    - I tried adding the images to the PDF but as mentioned, this is a bit more complicated. The solution that was hoping to implement woulb be possible if the images were hosted/stored remotely for example on Cloudinary or AWS S3 buckets, perhaps this can still be done with the current implementation, I hope to find out! As per the current implementation, the PDF is generated without the product images.
