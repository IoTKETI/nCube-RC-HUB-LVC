# nCube-RC-HUB-LVC

This repo is interworking and monitoring the drone and the remote controller operated based on LTE.

***

## Project setup
```
npm install
```
If you are using Eletron with Vue.js you need to rebuild the serialport module doing something like this:

```
npm install electron-rebuild
```
after this, you can add in your package.json > section "scripts", another line saying:

```
"rebuild": "electron-rebuild -f -w serialport"
```
You can rebuild the module with terminal command

```
npm run rebuild
```
### Compiles and hot-reloads for development
```
npm run electron:serve
or
yarn electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
or
yarn electron:build
```
