# slackretro
A slack bot to make retros in Slack easier

Uses https://github.com/slackapi/node-slack-sdk


## Docker
Retro-bot can be run in Docker. 
There is a Docker-file for production and one for development. 
There is also a docker-compose file for development. 

### docker-compose for development
#### Setup
 ```
    > docker-compose up # creates all the docker stuff
    > docker-compose down # cleans up afterward
   ```
#### use
This sets up a shell with a dev environment.
 ``` 
    > docker-compose run --rm -p 3000:3000 retrobot_dev 
```

If you need to change the Dockerfile compose can rebuild it using.
```
    > docker-compse build

```