# BlogApp Backend : Pre-MEST Assignment
# TODOs 
- Create Basic Express Server
- Create Connection with MongoDb 
- Setup POST, routes in Controller
- Setup  POST, USER Schema( with the help on mongoose) in model dir and export  
- Handle Form Validation: 
    *Create login.js, signup.js and post.js
    *Import validator(For validation js Objs)  and is empty(checking if a value is empty).
    *Create Validation for login, signup and post
- Setup Routes and create Api's(need to install bcryt and jwt to handle password hashing and track user sessions) and setup .evn secret 
    *In the /controller/user dir import all necessary dependancies ie. express,router,bcrpt,jwt,SECRET,usermodel and validation for sigup and login.
    *Create SignUp Route
    *Crete Login Route
    *Tell app to see the route in server: app.use()
-Use passportjwt to unable user not to re-authenticate for every request. Passport works with the conncept of strategis. They are basicall middleware functions that a request runs before getting to a route
    * Go to Middle dir, create passsport.js and import required dependancies: 
    *install passport and passportjwt stategy

