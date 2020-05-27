/*
# for npm version
$ npm -v
    6.14.4

#for node version
    $ node -v
     v12.16.2

# for change the version of npm to a specific version globally in our system
    $ sudo npm i -g npm@5.5.1
        OR
    $ npm i -g npm@5.5.1

#   Before installing the npm pakages into your project you need to first create
    package.json in your project folder which will hold meta data of your project
    ,to do so we have some cmd

    - first navigate to your project folder
        $ cd /home/aman/work-place/NodeJs/mosh-project/NPM/OurProject

    -  then run these commands
        $ npm init
            OR
        $ npm init --yes  => for default values

# When you want to install a third party package using npm there are cmd's
    - For older version of npm
         $ npm i <package_name> --save
                    OR
         $ npm install <package_name> --save

    - For new version of npm
         $ npm i <package_name>
                    OR
         $ npm install <package_name>

      Ex:  npm i underscore
           npm i mongoose


    - when you execute above commands then automatically 'node_modules'
      folder is created first time and the required package will be intalled
      there along with its personal package.json which will provide us the
      meta data about this package.

    - After executing the above cmd's another property called 'dependencies'
      will be created inside our project's package.json with values.

    - Example $ npm i underscore

# if accidently or intensionally your node_module is deleted then you can get back
  all the dependencies back using given command
    - $ npm i
    - after excuting this cmd npm automatically check your package.json file and
      check the 'dependencies' property and then start download those packages
    - so no need to give the 'node_modules' if your are giving your project to
      anyone.
    - if you are putting your project on github or any other repository then again
      you should exclude this 'node_modules' folder to avoid the extra burden of
      dependencies so to do so
        1) create a .gitignore file in your project folder
        2) then write the folder or file name to which you want to exclude
            from your git repository i.e. 'node_module' folder
        3) add a forward slash to indicate that its a folder =>  node_modules/
    - To make your project a git repository run this cmd
        $ git init
    - to check 'node_module' folder is excluded or not we can run this command
        $ git status

# Semantic Versioning
    - like our npm version is 5.6.0 => Major.Minor.Patch
    Major => for major change which affect whole API then this will increase
    Minor => for adding new feature to our application which dont affect our API
    Patch => for fixing some small bugs which dont affect anything but solved bug only

    -We can see the ^ or ~ symbols before versions like ^5.6.0 or ~5.6.2 or something
     like 5.x.x so these symbols are called caret so this symbols indicates that we
     only intrested in Major part of the version i.e 5 only ,minor or patch can be
     adjustable but if we write only like 5.6.0 that means we are instrested to
     specific 5.6.0 version.
    - so if we have written mongoose version in package.json under 'dependencies'
      property like '^5.9.15' so its not necessary that .9.15 is actually installed
      on our system but 5.x.x is assured
    - so to determine which version of mongoose is actually installed on our system
      we have two ways
        1) navigate to the node_module/mongoose/package.json
           and scroll down to see the version installed
        2) -simply run this cmd to get installed dependencies with respective versions
            this will give you whole tree i.e. info of dependencies of dependencies
                $ npm list
           -but if you want to see only your project dependencies and their versions
                $ npm list --depth=0

# To get information about any package you can run this commands
        $ npm view mongoose
    - For getting info about any specific property of a package
        $ npm view mongoose dependencies

# To install specific version of any package
         $ npm i <package_name>@version
    -ex: $ npm i mongoose@2.4.2
         $ npm i underscore@1.4.0

# To check outdated packages of our project
        $ npm outdated

    OUTPUT:
        Package     Current  Wanted  Latest  Location
        mongoose      2.4.2  2.9.10  5.9.15  my-project
        underscore    1.4.0  1.10.2  1.10.2  my-project

    - Current => this version is installed in our project
      Wanted  => this version is which we have specified in dependencies of
                 package.json i.e. ^2.4.2 and due to caret ^ its showing latest
                 version of minor and patch i.e. .9.10 , thats why we have
                 2.9.10 in Wanted
      Latest => this is the latest version available on Npm remote repository

# To update our outdated packages of our project
        $ npm update
  1) This will update our outdated packages to 'Wanted' level versions if caret
    ^, ~ or 2.x.x is mentioned in package.json dependencies.

  2) If you want to update your dependencies version to the latest one then
            - You need to enter into different command line tool with this cmd
                $ npm i -g npm-check-updates
                            OR
                $ sudo npm i -g npm-check-updates

           - Now we have new command line tool called npm-check-updates or ncu
           - we can write this cmd to check outdated package
                    $ npm-check-updates
           - ncu is a short form of => npm-check-updates
           - before installing latest version we need to update in package.json first
             we can do so by:
                $ ncu -u
           - now install the latest package:
                $ npm i

# There are two types of dependencies
      1) production dependencies => This will help to run your application.
                                    ex: mongoose , underscore and etc
      2) dev dependencies        => This will only help for development,its not
                                    something which will help to run our application
                                    and no need to put this dependencies on production
                                    ex: jshint

  - To specify that this is a dev dependency while installation
        $ npm i jshint --saven-dev

    This will add a new property 'devDependencies' in package.json and add the
    installed dev dependency into it.

# To unistall a package from our project
        $ npm unistall <packageName>
                OR

        $ npm un <packageName>

        ex: $ npm un mongoose

# Working with Global packages
    - There are two types of packages
      1) Specific to project - Packages like mongoose , underscore which we install
                               using $ npm i <packageName> are specific to that project
                               in which package.json is present and we can find the
                               entries of these packages into it.

      2) Global in system    - Packages like npm , ng, npm-check-upadate basically are
                               tools which we install using $ npm i -g <packageName>
                               are not project specific but a general tools which can
                               be used across the projects

                               ex: $ npm i -g npm   OR   $ sudo npm i -g npm
                                   if already installed then this will upgrade our NPM

                             - If you want to check outdated global packages
                                  $ npm -g outdated

                             - If you want to unistall Global packages
                                  $ npm un -g <packageName>

                             - If you want to list down global packages
                                  $ npm -g list --depth=0

# If you want to PUBLISH YOUR OWN PACKAGE on npm then follow these steps

    1) First create your project directory
        $ mkdir <FolderName>
        ex: $ mkdir lockdown-2.0

    2) Go to your project directory
        $ cd lockdown-2.0

    3) Now create a package.json file in your project directory
        $ npm init --yes

    4) Create index.js file and write your code inside it whatever you want to write
       and also dont forget to write export at the end.

       ex: module.exports.sayHelloTo = function(name){

              return`Hello ${name}`;

       }

    5) If you dont have account on npm
          - $ npm adduser
          - Enter username
          - Enter password
          - Enter email
       Note* username should be unique and password must be minimum 10
             character with no comman password like 'iloveyou' and etc.

     6) If you already have a account on npm
              $ npm login
          - Enter username
          - Enter password
          - Enter email
          - Verify your email then go for publishing

     7) Now publish your package using cmd
                $ npm publish

     8) Now we have published on npm and we can use it in another Node
        application
          - create a project directory for testing our published package
            anywhere you want . let's say
                $ mkdir node-app
          - create package.json inside node-app directory
                $ cd node-app
                $ npm init
          - now install our package which we have published
                $ npm i lockdown-2.0

          - now we can load our published package in node-app application
                  - create index.js
                  - write the below code to load the package/module

                       var lock = require('lockdown-2.0');
                       var result = lock.sayHelloTo('Aman');
                       console.log(result);
                  - now run index.js with $ node index.js
                    OUTPUT: Hello Aman

# If you want to update your published package with new version then 
  you can not publish it directly because it will give error so you
  need to give a new version to it
  
   ex: -Like i have updated my src code  
       
       module.exports.sayHelloTo = function(name , surname){

              return`Hello '${name} ${surname}'  Namaste`;

       }
       - Then we can change the version manually from package.json
                                  OR
       - $ npm version major
              OR
         $ npm version minor
              OR
         $ npm version patch
         
         here we have just modified our only function no major changes has
         done and no new feature is added then we will use 
                  $ npm version patch

        - Now we can publish new version of our package
              $ npm publish 

    */