# Udacity's Capstone project: Travelr

## About
This web app was designed to assist travelers plan and keep track of their trips. Users will be able to see the weather forecast for their upcoming trip, days until the trip, and a picture representation of their destination. These trips can be "saved" and be referred back to at a later time and if plans change these trips can be "deleted". This app retrieves data from 3 APIs: http://www.geonames.org/, https://darksky.net/, https://pixabay.com/

## Setup
Download or clone this project. In your terminal navigate to this project folder and run `npm install` to install dependencies.

In order to use this API you must have your own API keys from DarkSky and Pixabay. Check here to sign up to receive your creds [Pixabay signup](https://pixabay.com/api/docs/), [DarkSky signup](https://darksky.net/dev)

Once you have your creds from DarkSky and Pixabay create a `.env` file in your root directory and add your creds in the following format:
```
DARKSKY_KEY='*******************************'
PIXA_KEY='**********************************'
```


## How to use
First we have to create a `dist` folder. This can be done be running the command `npm run build-prod`. Once the `dist` folder has been created run the command `npm run start`. This app runs on localhost:8080, navigate to http://localhost:8080/ in your browser.

## UI
!['UI'](/pics/UI.PNG)
To use enter a destination and a date a click "Let's Go!" The UI will update with a "card" that shows your trip info. If you'd like to save this trip click "+ Save Trip" This trip will now be stored in the dropdown labeled "My Trips". If you would like to remove a trip click "- Remove Trip", if the trip card that is displayed is not the card you'd like to remove navigate to the trip you'd like to remove under "My Trips" and then click "- Remove Trip".
!['Trip](/pics/trip.PNG)


## Testing
All functions have been tested using `jest`.
To run your own text run the command `npm run test`
!['Tests'](/pics/tests.PNG)
