/*
        -express module return a express function
            const express = require('express');
        -express function will return express object;
            const app = express();



    # express object have some http methods to handle http requests
        -  app.get()
        -  app.post()
        -  app.put()
        -  app.delete()

        Ex: app.get('/' , (req , res)=>{

            res.send('Welcome to our project');

        });
        app.listen(3000,()=> console.log('Listening to port 3000.....'));

# If you dont want to restart your server again and again after any changes 
  in our code then we have one tool known as 'nodemon' used for node monitoring
  so install this tool globally so that we can use it anywhere
                $ npm i -g nodemon

# We can use some 'Environment Variables' which is not a part our application
  so we can use these variables in our application like we have 'port no' on
  which our application is running on our local server, so we can set a Envirnment 
  variable for PORT , to do so
           
            -for linux or mac
                $ export PORT=5000
            -To check Variable is set or not    
                $ echo $PORT            
            - To list all environment variables
                $ printenv or $ set
   
 - To use Environment variable into node application we use 'process' object
                const port = process.env.PORT || 3000; 
   which means assign the value of PORT Environment variable to port const
   and if no PORT Environment variable is available then use 3000 i.e. default             

# For Input validation at node end there is a package called 'joi' we can use this 
  package instead of writing our complex if-else code
            const Joi = require('joi');
            -it return a Class
    - To use joi you need to first declare a schema always 
        Ex: 
            const schema ={
                name:Joi.string().min(3).required();
            };          
    - Then validate the incoming data with respect to the above scema
        Ex:
               const result =  Joi.validate(req.body,schema);
               
          - validate() method returns a object which have some properties we can see
            this using console.log(result);     
          - 'error' and  'value ' are one of the property of result object
          - if the data is valid data then error would become null and value would
            be the actual data and vise-versa.


# 'Distructing Object' means we can access object property directly with some syntax
            ex:
            const {error} = validateCourse(req.body); // {error} => result.error



*/