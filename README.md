# Nodecopter Dashboard

![Nodecopter Dashboard Screenshot](https://github.com/hughrawlinson/Nodecopter-Dashboard/raw/master/screenshot.jpg "Screenshot")

A web-based nodecopter dashboard I made at Nodecopter Manchester on 27 July 2013. Uses Socket.IO to communicate between the client and the drone via the node server, ractive.js to display live data from the drone, and the new Bootstrap 3 release candidate for visuals. I haven't yet got dronestream working on it, but it would display a video from the drone's front-facing camera if I had. Controls include forward, backward, left, right, up, down, rotate in both directions, set all movement values to 0, take off and land. On the webpage, it displays pitch, roll, yaw, altitude, and battery percentage.

## Setup

To set this up, make sure you've got node installed on your machine, cd to the directory you wish to install it in, run ```git@github.com:hughrawlinson/Nodecopter-Dashboard.git```, cd to Nodecopter-Dashboard, and run ```npm install``` to install dependencies. To run the server, run ```node server.js```. Also, you'll need to be connected to the wifi network of a Parrot AR 2.0 drone. Almost forgot that last bit. Then you'll need to open your browser and go to http://localhost:1025/ and start controlling your drone.

If you get the video working, please let me know what I did wrong and submit a pull request.

Enjoy!
