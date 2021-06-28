# Asciiflix Webclient

## Development

Make sure node, npm, and yarn are installed.
Also note that all dependencies (``node_modules``) should be installed, if not, run:
```bash
npm install
```

Then to run the development server call:

```bash
npm start
```

With ``npm start`` the frontend will use your local-backend ``http://localhost:8080``. If you want to use the Production API, you have to run ``npm run build`` and all files will be generated. Now you have to run a Webserver to use the frontend.
You can do this steps:
````bash
npm install -g serve
serve -s build
````

### Development Container

To start and run the application with your newest changes and debugging capabilities, you can simply open this project in VSCode with the .devcontainer configs. <br>
Of course you have to install docker on your dev host. After installing docker you can enter the Container Mode:

1. Press `CTRL + SHIFT + P`
2. Type `Remote-Containers: Reopen in Container`, but keep in mind your current VSCode project should be the asciiflix server project
3. VSCode will download a docker image, this can take some minutes. After the download is finished, VSCode reopens the project in a docker-container. Now you can develop, debug and do some dev stuff..
