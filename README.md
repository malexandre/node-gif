# What is this?

Just a little project to show off Node.js and ReactJS. Simple server with listing of Gif from Giphy and Emojis from [emojilib](https://github.com/muan/emojilib), with favorites management.

GUI has been made with bootstrap (nothing fancy, just basic components). Test with Jest & Enzyme.


# How to test the project

You need to have [Node.js](https://nodejs.org/en/) & Yarn (`sudo npm install -g yarn`).

1. `yarn`
1. `yarn start`
1. Create the file `app/server/config.js` exporting an object with your Giphy Api Key as `GIPHY_API_KEY`
1. Access the project in your browser at `http://localhost:8000`
