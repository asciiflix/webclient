# Asciiflix Webserver

## Development

Make sure node, npm, and yarn are installed.
Then to run the development server call:

```bash
npm start
```

### Development Container

To start and run the application with your newest changes and debugging capabilities, you can simply open this project in VSCode with the .devcontainer configs. <br>
Of course you have to install docker on your dev host. After installing docker you can enter the Container Mode:

1. Press `CTRL + SHIFT + P`
2. Type `Remote-Containers: Reopen in Container`, but keep in mind your current VSCode project should be the asciiflix server project
3. VSCode will download a docker image, this can take some minutes. After the download is finished, VSCode reopens the project in a docker-container. Now you can develop, debug and do some dev stuff..
