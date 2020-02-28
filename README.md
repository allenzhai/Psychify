### Setup
Before you start development, setting up right development environment is critical. The first step is to install all dependencies by running
```
npm install
```

Dependencies include normal dependencies (refer to the section of `dependencies` section in package.json) and development dependencies(`devDependencies` section in package.json). `devDependencies` are used for development purpose only. They will not be deployed to production server.


#### For Server Development
1. To work on server side, run the following command
```
npm run server
```

2. When you finish one api and want to check the result, you can type the url in the browser to see whether you get the desired result (normally, it would a json string).
```
hostname:port/api/listDisorders
```

3. If you want to check whether the client side is making correct api requests, you would use a pre-built(bundled version) to do so. Run the command to build front end (bundling).
```
npm run build
```
The command will create a `dist` folder with all html files, js files, and other assets in it. The express is using that folder as the static folder (root folder).

4. `nodemon` is a nice tool as it monitors the changes of the files you specify and execute some action on the change. In our case, we want to watch server side files and restart the server automatically (no typing `npm run server` in command line). Be aware of that, there's limit on how many files the OS can watch. (I ran into the error that there are too many files to watch). Other than that, enjoy.

#### For Client Development
We are using `webpack` as our bundling tool and `webpack-dev-server` as development tool. Normally we don't need to bundle the client js and html files (that's for deployment and server side development). We will be using `webpack-dev-server` to serve web pages.
```
npm run client
```
+ There is a nice feature of `webpack-dev-server` called `Hot Reload`. With this feature, we don't have to restart `webpack-dev-server` every time we make changes in our code. You can read more on `Hot Reload` from [Here](https://webpack.js.org/concepts/hot-module-replacement/)


#### References
+ [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack)
+ [webpack documentation](https://webpack.js.org/)
+ [Client Side Routing](https://reacttraining.com/react-router/web/guides/primary-components)
+ [webpack.historyApiFallback](https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback)