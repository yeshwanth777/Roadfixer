# Roadfixer
Roadfixer
Detects potholes on the road using accelerometer. Features including google maps, dashboard, camera, notes and settings. Works both on iOS and android
A hybrid application developed for IBM Hackathon using ionic which is a framework based on Angularjs

Setting the environment

First, create a directory to download the app source code in, then run:

npm install -g ionic
npm install -g cordova
This will install the ionic and Cordova CLI globally on your system. We need Cordova because the Ionic CLI is built on top of Cordova.

Next,

cd into your folder
ionic start TestApp blank
The last argument used in the above command is the app template we want to use; it varies from an app with tabs, one with a side menu, even one with geolocation (google maps).

After the start command is done and the folder has been created, cd into your TestApp folder and run npm install. This will install all node modules specified in the package.json (more about this later)

