# Coding Challenge for Game Closure

## Table of Contents
1. [About the Project](#about-the-project)
2. [Technology](#technology)
3. [Setup and Run](#setup-and-run)
4. [Architecture](#architecture)
5. [Features](#features)
6. [Future Improvement](#future-improvement)
7. [Problem and Solution](#problem-and-solution)
8. [Debugging Shortcut](#debugging-shortcut)

### About the Project
This project is an Idle Clicker game for coding challenge at Game Closure which is a clone version from AdVenture Capitalist.

[[Play Online](https://idle-game-for-gc.herokuapp.com)]

### Technology
* Front-end: HTML5, CSS, Javascript
* Back-end: Node.js
* Cloud service CI/CD: Heroku

### Setup and Run

# Run locally
```
$ cd ../GC-Game
$ npm install
$ npm start

http://localhost:2020/
```
# Run on cloud service
```
Open Heroku dashboard: https://dashboard.heroku.com/apps
Connect with github project and deploy selected commit

https://idle-game-for-gc.herokuapp.com
```

### Architecture
* update - update time, calculate revenue and process game event
* draw - draw text, image and render animation
* input - detect mouse position and check collision with button rectangle

### Features
* Buy and upgrade businesss
* make money from a business
* Hire manager to run business automatically
* Business continue to make progress while player is away
* Upgrading business for a certain time will redice process time and multiply the revenue

### Future Improvement
* Implment database and cloud service to save data and allow user backup and retore their data across devices.
* Implement socket.io for real-time syncing data between client and server
* Implement more animation to make game more lively
* Add multiple upgrades: x1 x10 x50 Max
* Add more shop type with more perk such as revenue mutiplier, time reducing, upgrade price reducing, instant profit, etc.
* Add more business type
* Add achievements/quests to make the game has goal and more challenging
* Add welcome back mini game: user will get extra money from falling coin for a period of time that make game more fun
* Add advertisement to monitize and give temporary perk to user such as double/tripple profit, speed-up businesses, etc.

### Problem and Solution
# Save progress and continue
* Problem: Game data got reset when reload window. To continue making progress is required data storage to keep the progress.
* Solution 1: Save data to local storage and retrieve data when get back to continue the progress
* Solution 2: Save data to cloud storage and retrieve data when get back to continue the progress (future improvement)
# Audio Delay
* Problem: Sound delay on click when click fast
* Solution: Reload audio before playing

### Debugging Shortcut
* Press 'S' to restart progress
* Press 'C' to add coin (default = 100,000)
* Press ',' to reduce coin increment for 10 times
* Press '.' to increase coin increment for 10 times

### Github Link: https://github.com/Attheera/GC-Game


### Authors

* **Attheera Racheeree**
