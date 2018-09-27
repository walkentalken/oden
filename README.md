# oden-sample

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


### Notes and Outstanding TODOs
```
1. This is a config-driven interface, so any other metric can be added to /config/config.js and it will appear instantly
2. The next step would be to add the type of graph as an item in the config and then create a separate component for that type of graph. Right now this only works with line graphs that use the same data set.
3. There is a .env file where environment variables or keys/tokens can be stored and re-used throughout the app. Right now, it just contains the API endpoint, but if there were different endpoints for dev/stage/prod/etc, they could be stored in various .env files: https://cli.vuejs.org/guide/mode-and-env.html
4. I used vuex to manage the 'active' state of the buttons/graphs...this could be updated so that it gets information from a url hash or any other toggle
```