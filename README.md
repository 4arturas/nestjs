```bash
npm install -g @nestjs/cli
````

```bash
nest new server
````

```bash
cd server
npm run start
````

```bash
nest g --help
````

```bash
nest g module tasks
````

```bash
nest g controller tasks --no-spec
````

```bash
nest g service tasks --no-spec
````

```bash
npm install class-validator class-transformer
````

```bash
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=PleaseChangeMe -d postgres
````

```bash
docker container ls
````

```bash
docker container stop postgres-nest
````

```bash
docker container start postgres-nest
````

```bash
docker container rm postgres-nest
````

```bash
npm add typeorm @nestjs/typeorm pg
````

# Auth 1
```bash
nest g module auth
````

```bash
nest g service auth --no-spec
````

```bash
nest g controller auth --no-spec
````

```bash
npm install bcrypt
````

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
````

```bash
npm install @types/passport-jwt
````

# Config


```bash
MY_VARIABLE=someVariable SOMETHING=else npm run start:dev
console.log(process.env.MY_VARIABLE);
console.log(process.env.SOMETHING);
````

````
console.log(process.env.MY_VARIABLE);
console.log(process.env.SOMETHING);
````

```bash
npm install @nestjs/config
````

```bash
npm install @hapi/joi
````

```bash
npm install -D @types/hapi__joi
````

https://passwordsgenerator.net/

# Heroku

## Install
```bash
sudo snap install --classic heroku
````

## Check heroku version
```bash
heroku -v
````

## Login into heroku
```bash
heroku login
````

## Install postgres
```bash
heroku addons:create heroku-postgresql:hobby-dev -a task-manager-artu
````

## Setup heroku application
```bash
heroku git:remote -a task-manager-artu
````

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
````

```bash
heroku config:set NODE_ENV=production
````

```bash
heroku config:set STAGE=prod
````

```bash
heroku config:set DB_HOST=ec2-52-209-185-5.eu-west-1.compute.amazonaws.com
heroku config:set DB_PORT=5432
heroku config:set DB_USERNAME=akinikwhoqijeh
heroku config:set DB_PASSWORD=de72b2b8d56994cb530e944f1a4a9ee5461dd6818d56544ac0a65eb122663c2b
heroku config:set DB_DATABASE=d8vnrsfvav8gg2
heroku config:set JWT_SECRET=j4G5XaupzjxKcP2WdU9xthRuq6WucKz8qZwjFc27AZAzFGmA255FhPsLaEjCDfDK
````

