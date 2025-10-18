1-make sure these are installed :
node -v
npm -v
npm i -g @nestjs/cli


2- creat nest project
nest new auth-microservice
code .


3- turn on the developer mode
npm run start:dev

4- create (module, controller, service ) for a specific service (auth)
nest generate module auth        or  nest g mo auth 
nest generate controller auth
nest generate service auth

5- write the codes in auth.service.ts, auth.controller.ts, auth.module.ts, app.module.ts ,and  main.ts

auth.service.ts → Business logic (functions like registerUser, validateUser). No HTTP here.

auth.controller.ts → Defines routes (/login, /register) and uses the service. Handles request & response.

auth.module.ts → Connects controller + service for the Auth part (specify the providers(service) and controllers.

app.module.ts → Root module. Imports all feature modules (like AuthModule).

main.ts → Entry point. Boots the app and starts the server on a port 3000.

📌 Flow:
main.ts → app.module.ts → auth.module.ts → auth.controller.ts → auth.service.ts

main.ts → starts the AppModule.

AppModule → sees that it imports the AuthModule also specifiy the appcontroller as controller and services as provider.

AuthModule → connects the AuthController and the AuthService and specifiy the provider(can be injectable) and contrller.

AuthController → defines the routes like /auth/....

Every route → calls functions inside the AuthService.


The src Directory: The Heart of Your App ❤️ This is where you'll write almost all of your application's code.

main.ts (The Entry Point 🚀)
This is the first file that runs when your application starts. Its primary job is to create an instance of your NestJS application using NestFactory.create() and start a web server that listens for incoming requests on a specific port (usually 3000). Think of it as the ignition key for your entire app.

app.module.ts (The Central Hub 🧠)
This is the root module of your application. NestJS organizes code into modules. This file acts as the central hub that connects all the different pieces of your application—like controllers and services—together. You'll register all your major components here in the @Module() decorator.

app.controller.ts (The Traffic Director 🚦)
A controller is responsible for handling incoming HTTP requests and returning responses to the client. It defines the application's routes (e.g., /users, /products). It uses decorators like @Controller() to define a base route and methods like @Get(), @Post(), etc., to handle specific HTTP verbs. It receives the request but typically delegates the complex work to a service.

app.service.ts (The Business Logic 💪)
A service is where the actual business logic lives. It's responsible for tasks like fetching data from a database, performing calculations, or calling external APIs. The controller calls methods from the service to do the heavy lifting. This separation keeps your code clean and organized. Services are marked with the @Injectable() decorator so they can be provided and injected into controllers or other services.


*.spec.ts (The Safety Net 🧪)
These are files for testing. For every controller or service, you'll often have a corresponding .spec.ts file for writing unit tests to ensure your code works as expected


6-run
npm run start  
npm run start:dev   #This command will watch your files, automatically recompiling and reloading the server.


7- test on postman
for service1
POST http://localhost:3000/auth/register
Body → raw → JSON:
{ "username":"testuser", "password":"1234" }

POST http://localhost:3000/auth/login
{ "username":"testuser", "password":"1234" }

make sure the server is working on what port ( eg.3000)

/////////////////////
for service2:

POST http://localhost:3000/auth/login
Body → raw → JSON:
{
  "username": "john",
  "password": "changeme"
}
expected result:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWI"
}

******************************************
Get http://localhost:3000/auth/profile
Headers:
key: Authorization
value: Bearer tokenfromtheloginpost (there is a space)
example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6....etc
expected result:
{
    "sub": 1,
    "username": "john",
    "iat": 1759395729,
    "exp": 1759395789
}


