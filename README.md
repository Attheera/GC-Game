### Coding Challenge for Game Closure

## Table of Contents
1. [About the Project](#about-the-project)
2. [Technology](#technology)
3. [Setup and Run](#setup-and-run)
4. [Feature](#feature)
5. [Future Improvement](#future-improvement)
6. [Problem and Solution](#problem-and-solution)
7. [Architectural](#architectural)
8. [Debugging Shortcut](#debugging-shortcut)


# About the Project
This project is for coding challenge at Game Closure. It is idle clicker game which is a clone version from AdVenture Capitalist.


# Technology
Require Node Package Manager (npm) to run this application
* Node.js


# Setup and Run

```
$ cd ../GC-Game
$ npm install
$ npm start
```
Open game on brouser via..
```
http://localhost:2020/
```
# Feature
* Buy and upgrade businesss
* make money from a business
* Hire manager to run business automatically
* Business continue to make progress while player is away
* Upgrading business for a certain time will redice process time and multiply the revenue

# Future Improvement
* Implment database and cloud server to save data and allow user back and retore their data across devices.
* Implement socket.io for real-time syncing data between client and server
* Add multiple time upgrade
* Add more shop with more perk type such as revenue mutiplier, time reducing, upgrade price reducing, etc.
* Add more business for higher revenue

# Problem and Solution

Problem: Business continue making progress is required data storage to keep the progress

Solution: Use local storage to store and retrieve data to continue the progress

# Architectural
* Run game server with NodeJs and can be expanded for mutiple routes

# Debugging Shortcut
* Press 'ESC' to restart progress
* Press 'C' to add coin (default = 100,000)
* Press ',' to reduce coin increment for 10 times
* Press '.' to increase coin increment for 10 times

# Github Link: https://github.com/Attheera/GC-Game


### Authors

* **Attheera Racheeree**
