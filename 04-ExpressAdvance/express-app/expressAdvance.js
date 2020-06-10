/*

# Middleware / Request Processing Pipeline
    - A middleware function is a function that takes a request object and either
      terminates the request/response cycle or passes control to another middleware
      function.
    - Express has a few built-in middleware functions:
        - json(): to parse the body of requests with a JSON payload
        - urlencoded(): to parse the body of requests with URL-encoded payload
        - static(): to serve static files
    - You can create custom middleware for cross-cutting concerns, such as logging,
      authentication, etc.

           _________________________________________________________
          |             ___________          ___________            |
          | Request    |           |        |           | Response  |
      ----|----------->|  json()   |------->|  route()  |-----------|--->
          |            |___________|        |___________|           |
          |_________________________________________________________|
                        Request Processing Pipeline

    - Sequence of middleware functions matters a lot on this basis excution take place
    - we can write middleware our custom functions in different module/file and can
      export it and can be import it wherever is needed basically in app.js or index.js
    - Some built-in middleware functions are:
        1) app.use(express.json());
        2) app.use(express.urlencoded( { extented: true }));
        3) app.use(express.static('public'));
    - There are many other third party middle-ware function available but that doesn't
      mean that we are using them unnecesarily because it can degrade our application
      performance.
          Some third party middle-ware functions are:
          1) helmet - for make url secure may be ..
          2) morgan - for logging http request on terminal or log file

          for more information can see documentation at Expressjs.com and you need to
          install those third party packages using npm
            $ npm i <packageName>

# In building our application we work in different environment like we have development
  environment and production environment so we can set our envirment for our application
  so there are two ways :
    1) Using global object 'process'
          const env = process.env.NODE_ENV
      - if you have not set the value of NODE_ENV then default value of this variable
        is 'undefined'
    2) Using Express method => internally it uses global process object
          const env = app.get('env');
       - default value that this method returns is 'development'

       console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
       console.log(`app env : ${app.get('env')}`);

  - we can set our environment => $ export NODE_ENV=production
  - We may need some feature of our application for specific environment
    Ex: we want morgon middle-ware funtion only in development environment

        if(app.get('env') === development){
          app.use(morgan('tiny'));
        }

# Configuration:-
        - So we can configure our application according to the environment which means
          we can have different confuguration for dev environment and different configuration
          for production.
        - For configuration we have two popular packages
            1) rc
            2) config
        - 'rc' is popular but little complex and having some bugs so we will use
          'config' package in our project.
        - The config package gives us an elegant way to store configuration settings
          for our applications.
            $ npm i config

    - For using 'config' package need to do following steps
        1) create directory called config in project folder
        2) create file 'default.json'=> for default configuration settings
          Ex:
            {
              "name":"My express app"
            }
        3) create another file called 'development.json'=> settings specific for dev environment
           here we can override the default settings
            Ex:
              {
                 "name": "My express app - devlopment",
                 "mail": {
                     "host": "dev-mail-server"
                  }
              }
        4) create another file called 'production.json'=> settings specific for productiom
           environment, here we can override the default settings
             Ex:
              {
                 "name": "My express app - production",
                 "mail": {
                     "host": "prod-mail-server"
                  }
              }
          5) Add below code in index.js to check configuration
              const config = require('config');
              console.log('Application Name:'+ config.get('name') );
              console.log('Mail Server:'+ config.get('mail.host') );
          
              for  $ export NODE_ENV=devlopment
              OUTPUT: Application Name:devlopment
                      Mail Server:dev-mail-server

              for  $ export NODE_ENV=production
              OUTPUT: Application Name:productiom
                      Mail Server:prod-mail-server
        
      **NOTE:- You should not store password ,database password or any secrete 
               information in all this config file. 
               To deal with passwords or any other secrete info you should store
               it in Environment variables. and read them in our application using 
               'conig'  pacakage
                Ex:
                1)create environment variable
                   $ export app_password=12345
                2)create another file called 'custom-environment-variables.json' ,name
                  of the file should be exact.  This file is used to define the mapping
                  of configuration to the environment variables.
                    Ex:
                      {
                          "mail": {
                              "password": "app_password"
                           }
                      }
                  - we have added only password here and remove name and host property
                    because they can be accessed from those configuration file and we want
                    to access the environment variable value using 'config' so mapping is
                    done in this file like we have 'app_password' environment variable
                    and now it can be accessible using 'password' property using config

                    Ex:
                      console.log('Password   :' +config.get('mail.password'));

# Debugging in our application can help us to make our code more professional and 
  can debug for different environment with different levels.We have package called
  'debug' which is very popular for debugging 
                        $ npm i debug
             
  - require('debug'); => it returns a function so we can call this funtion and pass
    a argument directly like this:
                     
                      require('debug').('app:startup');

    -after passing an argument it returns another function for writing debugging
     messages in 'app:startup'namespace
                      
                      const startupDebugger = require('debug').('app:startup');

    - namespace are used to seperate the debugging messages for different works
      like we have created startupDebugger for general work and now we will create
      another debugger for different namespace in which only database debugging can
      be done
                   const dbDebugger = require('debug').('app:db');

    - now you need to set a Environment variable called 'DEBUG' accordingly set its value
      for different namespaces
                        $ export DEBUG=app:startup
                                    OR
                        $ export DEBUG=app:db
    - So when Environment variable is set to 'app:startup' then only messages logged 
      using 'startupDebugger' object is visible and when Environment variable is set
      to 'app:db' then only messages logged  using 'dbDebugger' object is visible 

    - If we want to see messages logged from both namespaces then use this cmd
                      $ export DUBUG=app:startup,app:db
      now we can see debug messages  from these two debugging namespaces
    - If you want to see debugging messages from all debugging namespaces
                      $ export DUBUG=app:*
    - We can also set Environment Variable at runtime using this cmd:
                      $ DEBUG=app:db nodemon index.js
    - Always prefer 'debug' package/module over console.log() statement

# Templating Engines
            
 - In Restfull application we generally send response to the client in form of Json 
   but sometime We need to send HTML markup as a response to the client for dynamic
   rendering therefore we use TEMPLATING ENGINES 

 - Some popular Templating Engines packages are:
                  1) pug
                  2) mustache 
                  3) EJS
    - Installation => $ npm i pug
    - Need to set a view Engine in our application using this cmd
        app.set('view engine','pug');                  
      internally express will automatically load the pug module using above line and
      we need not to use require(''); function to load it in index.js
    - There is optional setting to set a path for our html templates
         app.set('views','./views');
      default path is './views' so no  need to set that but if want custom path then
      can use this setting.
    - create folder called 'views' and create index.pug file inside it
    - pug files contains html code but with different syntax which make it dynamic

         Ex:
                    html
                      head 
                        title=title
                      body 
                        h1 = message

    - now we will create a route method  app.get('/',(req,res)=>{}); and previously
      we were sending a simple text now we want to send specific html template so to
      do so add 
                      app.get('/',(req,res)=>{

                        res.render('index' , {object});
                      })
 
                       1st parameter => name of the pug file which contains your html
                                        template
                       2nd parameter => object with properties and values which we have 
                                        defined in index.pug file i.e. title and message                    
                     
                  =>  res.render('index' , {title: "Application",message:"Welcome"});
     
     - Different Templating Engines have different style of working and syntax like 
       has its own way and mustache has its own , go for their documentation for more 
       details

# Authentication and Authorization is out of scope from Express i.e. Express dont have
  any opinion on authentication and authorization






    */