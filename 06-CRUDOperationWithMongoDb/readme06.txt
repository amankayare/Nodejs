# Intallation process of Mongo db

 1) Using Brew Package manager
     
       Visit to 'www.brew.sh' site and install brew on your system
       so, brew is a package manager similar to NPM and using this 
       we can install our MongoDB.

       -For linux visit this link:
        'https://docs.brew.sh/Homebrew-on-Linux'
       
       -On site you will get this command to install brew on your system
        'sudo apt-get install build-essential curl file git'
    
       Now we already installed brew then we use a single command to install
       our MongoDB
        'brew install mongodb'

                                    OR
        
        Alternative Installation
        Extract or git clone Homebrew wherever you want.
        Use /home/linuxbrew/.linuxbrew if possible (to enable the use of binary packages).
                                    
        $ git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew
        $ mkdir ~/.linuxbrew/bin
        $ ln -s ~/.linuxbrew/Homebrew/bin/brew ~/.linuxbrew/bin
        $ eval $(~/.linuxbrew/bin/brew shellenv)

       - Now install our mongodb using brew 
        
                Add a custom tap:$ brew tap mongodb/brew
                And install mongo:$ brew install mongodb-community


 2) Using Mongodb official site
     
      Visit the official MongoDb site and follow the given instruction
      'https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/'

 
    a)Import the public key used by the package management system.
        From a terminal, issue the following command to import the MongoDB public GPG Key from https://www.mongodb.org/static/pgp/server-4.2.asc:
        
        '$wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -'
        
         The operation should respond with an OK.
        
         However, if you receive an error indicating that gnupg is not installed, you can:
                1-Install gnupg and its required libraries using the following command:
                     '$ sudo apt-get install gnupg'
                2-Once installed, retry importing the key:
                     '$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -'


    b)  Create a list file for MongoDB.
        Create the list file /etc/apt/sources.list.d/mongodb-org-4.2.list for your version of Ubuntu.
    
        Click on the appropriate tab for your version of Ubuntu. If you are unsure of what Ubuntu version the host is running, open a terminal or shell on the host and execute lsb_release -dc.
    
        The following instruction is for Ubuntu 16.04 (Xenial). 
        
        -Create the /etc/apt/sources.list.d/mongodb-org-4.2.list file for Ubuntu 16.04 (Xenial):
            '$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list'
    
    c)  Reload local package database.
        Issue the following command to reload the local package database:
    
            '$ sudo apt-get update'

    d) install the MongoDB packages.
       You can install either the latest stable version of MongoDB or a specific version of MongoDB.
    
       Install the latest version of MongoDB.	Install a specific release of MongoDB.
       To install the latest stable version, issue the following
    
          '$ sudo apt-get install -y mongodb-org'

        -------------------- To Run MongoDB Community Edition-----------------



        To run and manage your mongod process, you will be using your operating system’s 
        built-in init system. Recent versions of Linux tend to use systemd 
        (which uses the systemctl command), while older versions of Linux tend to use System
        V init (which uses the service command).
        If you are unsure which init system your platform uses, run the following command:

                $ 'ps --no-headers -o comm' 1

        for systemd (systemctl)	:-

    1)  Start MongoDB.
        You can start the mongod process by issuing the following command:
        
            '$ sudo systemctl start mongod'
       
        If you receive an error similar to the following when starting mongod:
        
       ' Failed to start mongod.service: Unit mongod.service not found.''
       
        Run the following command first:
        
            '$ sudo systemctl daemon-reload'
        
        Then run the start command above again.
        
        
    2) Verify that MongoDB has started successfully.
        
            '$ sudo systemctl status mongod'
    
       You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:
       
            '$ sudo systemctl enable mongod'
        
    3) Stop MongoDB.
       As needed, you can stop the mongod process by issuing the following command:
            '$ sudo systemctl stop mongod' 
        
    4) Restart MongoDB.
       You can restart the mongod process by issuing the following command:
        
          '$ sudo systemctl restart mongod'

       You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.
        
    5) Begin using MongoDB.
       Start a mongo shell on the same host machine as the mongod. You can run the mongo shell without any command-line options to connect to a mongod that is running on your localhost with default port 27017:
        
            '$ mongo'

    -------------------------Install MongoDb Compass-----------------------
    
    Its a Gui tool to manage MongoDb similar to Mysql-Workbench if you are familier with it.'

    Download link: 'https://www.mongodb.com/download-center/compass'

    -----------------------If want to use Terminal to execute queries------------------

    -First get into the mongo terminal
        '$ mongo'

       ---------------------- MongoDB Commands Cheatsheet-------------------------
       
       #######The following is the list of the commands:##########
        
        
        -Start,stop and status the MongoDB Database:
        
            > sudo service mongod start
            > sudo service mongod stop
            > sudo service mongod status

        -Access the MongoDB database using Shell:
        
            > mongo --host localhost:27017
        
        -Show all databases:
        
            > show dbs
        
        -Create a database, say, testdb; Switch to the database:
        
            > use testdb
        
        **Until a collection is created in a database, the database name is not listed as a result of execution of the command, "show dbs."
        
        -Add a collection:
        
            > db.createCollection("user")
        
        -Show all collections in a database; Execute the "use dbname" command to access the database before executing the command given below.
        
            > show collections
            > show tables
        
            The following command also work:
        
            > db.getCollectionNames()
        
        -Insert a record in the collection; A record is inserted in the collection, "user."
        
            > db.user.insert({"name": "Ajitesh Shukla", "location": "hyderabad", "username": "eajitesh"})
       
        -Display list of records of a collection; "user" collection is used.
        
            > db.user.find()
            > db.user.find().pretty()
        
        -Display a list of records matching with value (s) of specific fields:
        
            > db.user.find({"username": "eajitesh"})
            > db.user.find({"username": "eajitesh", "location": "hyderabad"})
        
        -Drop the collection:
        
            > db.user.drop()
        
        -Create users in the database; The below command creates a user with username as "ajitesh" and having the role such as "readWrite" and "dbAdmin"
        
            > db.createUser({"user": "ajitesh", "pwd": "gurukul", "roles": ["readWrite", "dbAdmin"]})
        
        -Show users; If executed without selecting a database, it displays all users along with database information.
        
            > show users
        
        -Login into the database with username and password:
        
            > mongo -u USERNAME -p PASSWORD --authenticationDatabase DATABASENAME
        
        -For user created in above command, the login command would look like the following:
        
            > mongo -u ajitesh -p gurukul --authenticationDatabase testdb
            
        -List down all the users of current database

            > show users;
            > db.getUsers();

        -List down all the roles

            > show roles

# Using mongodb with our node application

    - first we need to connect our application with mongodb , to do so we need a Package
       called 'mongoose' .it make easy or us to deal with mongodb.

       '$ npm i mongoose'

        const mongoose = require('mongoose');

        mongoose.connect('mongodb://localhost/playground')
        .then(()=>console.log('data-base connected successully... '))
        .catch((err)=>console.log(err));

    - In above code we get a 'mongoose' object from require func and we have connect 
      method in mongoose which takes a string url to connect with our mongodb database.
      in the url 'playground' is our database  

    - so connect method returns a promise and we need to consume that promise Using
      then() and catch() methods 
      
      Now we have connected with our database successfully.

      **NOTE: Dont forget to turn on or start the mongodb before running this code .


     - Now its time to write the schema for our document before that lets understand 
     
        What is database?
        what is collections?
        and
        what is documents?

        In mongodb there is nothing like tables and records that we have in relational
        databases like sql-server , mysql or postgress because mongodb is 'NoSql db'.
        When people use the term “NoSQL database”, they typically use it to refer
        to any non-relational database. Some say the term “NoSQL” stands for “non SQL”
        while others say it stands for “not only SQL.” Either way, most agree that NoSQL
        databases are databases that store data in a format other than relational tables.

        - so on simple words we have 'collections' in place of tables and 'documents' in 
        place of records in mongodb or NoSQL

    - Records are stored in tables just like this:

        +----+----------+-----+-----------+----------+
        | ID | NAME     | AGE | ADDRESS   | SALARY   |
        +----+----------+-----+-----------+----------+
        |  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
        |  2 | Khilan   |  25 | Delhi     |  1500.00 |
        |  3 | kaushik  |  23 | Kota      |  2000.00 |
        |  4 | Chaitali |  25 | Mumbai    |  6500.00 |
        |  5 | Hardik   |  27 | Bhopal    |  8500.00 |
        |  6 | Komal    |  22 | MP        |  4500.00 |
        |  7 | Muffy    |  24 | Indore    | 10000.00 |
        +----+----------+-----+-----------+----------+

    - Doucuments are stored in collection just like JSON:

    {
        "_id" : ObjectId("5dd4e2cc0821d3b44607534c"),
        "title" : "MongoDB Overview",
        "description" : "MongoDB is no SQL database",
        "by" : "tutorials point",
        "url" : "http://www.Amankayare.com",
        "tags" : [
            "mongodb",
            "database",
            "NoSQL"
        ],
        "likes" : 100
    }
    {
        "_id" : ObjectId("5dd4e2cc0821d3b44607534d"),
        "title" : "NoSQL Database",
        "description" : "NoSQL database doesn't have tables",
        "by" : "tutorials point",
        "url" : "http://www.AmanKayare.com",
        "tags" : [
            "mongodb",
            "database",
            "NoSQL"
        ],
        "likes" : 20,
        "comments" : [
            {
                "user" : "user1",
                "message" : "My first comment",
                "dateCreated" : ISODate("2013-12-09T21:05:00Z"),
                "like" : 0
            }
        ]
    }

    - A document is nothing but a container of a key-value pair 
    - Now we are ready to design a schema for our document before inserting
      it into the db. because it is compulsary to design a schema for our
      document before inserting in mongoose that means schema is just specific 
      to mongoose its not a part of mongodb .
    - we use a schema to define the shape of document within a collection 
      in mongodb that means we need to define what are the properties are there
      in our document.

------------------NOW TO INSERT A DATA INTO MONGODB---------------------------    

      For a document called 'course' we will define its schema like:

      const courseSchema = new mongoose.Schema({

        name: String,
        auther: String,
        tags:[ String ],
        date: { type: Date , default: Date.now},
        isPublished : Boolean 

      });

    - So every Doucuments within a courses collection will follow this schema   

    - Types of Schema
      1)String 
      2)Number
      3)Date
      4)Buffer  ---> for binary data
      5)Boolean
      6)ObjectId  ---> for assignining unique identifier
      7)Array

    - After defining our schema for course documents we need to compile this into above
     model .
     
    - To understand the term 'model' we relate this to 'Classes and objects'
      so Classes are the bluePrints of our objects similarly Schema's are the 
      BluePrint of our models that means we have created our class i.e. schema
      and now we need to create its instance i.e. model , for example:- nodeCourse

    - To create a instance for our model there are two steps
        1) First we need to create a class which connect our schema that means that class
           will follow that particular schema
           
           const Course = mongoose.model('singularNameOfOurCollection','SchemaName');
            - mongoose,model() will return a class i.e. Course is a Class not an object.
            
        2) Second We need to create a instance for our Node Course document using Course
           Course Class
           
           const course = new Course({

            name:'Node JS',
            auther:'Mosh',
            tags:['node','backend']
            isPublished:true


           });
       
    - So we have done with Schema and Model ,now its time to save the Node Course document
      into our mongodb database , to do so...

      const result = wait course.save();

    - our course model have a method called save() to save document into database which is
      an asynchronous meathod , it returns a promise thats why we add a 'await' opeartor
      but we need to write the whole code inside a 'async' function .


      const Course = mongoose.model('Course',courseSchema);       
      async function createCourse(){

        const course = new Course({

            name:'Node JS',
            auther:'Mosh',
            tags:['node','backend']
            isPublished:true


           });
           const result = await course.save();
           console.log(result);
        
      }

      createCourse();

------------------NOW TO QUERY A DATA FROM MONGODB---------------------------    

      - create a async function to get the data
      - The Course class we defined earlier have some methods with which we can get the data


      async function getCourses(){

            const result = await Course.find();
            console.log(result);

      }
      getCourse();


   - for Applying filter to get the filtered data.
         const result = await Course.find({auther:'Aman'});
   - for sorting data 
         const result = await Course
                        .find()
                        .sort({name:1});
         1 => ascending
        -1 => descending

    - For getting specific properties
          const result = await Course
                        .find()
                        .sort({name:1})
                        .select({name:1,tags:1});

    - For getting limited documents
          const result = await Course
                        .find()
                        .limit(1)
                        .sort({name:1})
                        .select({name:1,tags:1})

    **Some Complex data Filtering in Quering**      
    
      There are some mongodb opearators which is also available with monsgoose
      since mongoose is built over mongodb driver 

      "
      **Relational Query Operators**
      eq => (equal)
      ne => (not equal)
      gt => (greater than)
      lt => (less than)
      gte => (greater than or equal to)
      lte => (less than or equal to )
      in => (in)
      nin => (not in)
    
      "
    -for understanding opearator lets assume that we have a property called :
      'price' into our courses document.
      
    - for getting courses having price greater then 10rs
         const result = await Course
                        .find( { price: { $gt:10 } } );
      
    - for getting courses having price greater than 10rs and less then 20rs
         const result = await Course
                        .find( { price: { $gt:10, $lt:20 } } );
    
    - for getting courses having prize 10rs ,15rs or 20rs            
          const result = await Course
                         .find( { price: { $in:[ 10, 15, 20 ] } } );          

      "
      **Logical Querying Operator**

        or
        and
           
      "
      - for getting courses having auther: Mosh or isPublished:true
                const result = await Course
                            .find()
                            .or( [ { auther:'Mosh'} , { isPublished:true } ] ); 
      
      - for getting courses having both auther:Aman and isPublished:true
                const result = await Course
                               .find()
                               .and( [ { auther:'Aman'} , { isPublished:true } ] ); 

        " Regular Expression"

        - Before we are getting the data exactly what we are passing into the Filtering
          if we have auther Aman Kayare or Aman Kumar it will not be returned 
        
        -'"If we want to get more control over the filtering string we need to use a 
          regular expression"  

                    syntax: .find( { auther: /pattern/ } );

        - In regular expression we use ^ character to represent a string that start with 
          something Ex: ^Aman => that regular expression represent  string which starts
          with Aman as long as the auther starts with Aman it doesn't matter what we have 
          later those coureses will be returns.

                    syntax: .find( { auther: /^Aman/ } );

        - In regular expression we use $ character to represent a string that ends with 
          something Ex: ^Kayare => that regular expression represent  string which ends
          with Kayare as long as the auther ends with Aman it doesn't matter what we have 
          in begining those coureses will be returns.

                    syntax: .find( { auther: /Kayare$/ } );

        - By default string expression are case sensitive to make it case insensitive
          we use i at the end of the expression           

                    syntax: .find( { auther: /Kayare$/i } );
        
        - If we want to get the data with auther containing 'Aman' that means Aman can 
          be at begining , can be at end or can be at middle.  

                    syntax: .find( { auther: /.*Aman*./i } );

                 
       - To get more about javascript regular expression visit at:
         'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#:~:text=Regular%20expressions%20are%20patterns%20used,split()%20methods%20of%20String%20.'


    - For getting no. of documents overall or matches particular filter 
    

        1) overall Documents:

                const result = await Course
                               .count();

                               OR

                - new method               
                const result = await Course
                               .countDocuments();
        
        2) matches particular filter                       
             
                const result = await Course
                                .find( { price: { $in:[ 10, 15, 20 ] } } );          
                                .count();

        ---------------------Pagination----------------------------

      -Pagination is important now a days so to implement pagination we use
       skip() method and limit() method :


        const pageNumber = 1;
        const pageSize = 10;
        async function pagination(){

            const result = Course
                            .find( { auther: 'Aman' , isPublished:true } )
                            .skip( ( pageNumber -1  ) * pageSize ) 
                            .limit(pageSize)
                            .sort( { name: 1 } )
                            .select( { name :1 , tags:1 })

            console.log(result);                
        } 
        pagination();


        ------------------ How to import JSON file in database----------------------

        ' $ mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray'

        ------------------NOW TO UPDATE A DATA FROM MONGODB---------------------------    

        -There are two approch to update the data in mongodb
          1) Query first approch
          2) update first approch

        - Query first :-
            i)findByid()
           ii)Modify its property
          iii)save()

        - Update first:- 
            i)Update directly   
           ii)Optionally get the updated document



          const course = await Course.findByIdAndUpdate(id, {

            $set: {
                auther: 'Another auther 2',
                name: 'Angular-JS'
            }
          }, { new: true });

-----------------------------------------------------------------------

          const result = await Course.update({ _id: id }, {

            $set: {
                auther: 'Another',
                name: 'Nest.js'
            }
          });

------------------------------------------------------------------------

          const course = await Course.findById(id);
          if (!course) {
              console.log('no data');
               return;  
          }
          course.set({

            name: 'Nest.js',
            author: 'Another'
          });
/*
    course.name = 'updatedName';
    course.auther = 'Another auther';
*/
        const result = await course.save();
        console.log(result);


      ------------------NOW TO DELETE A DATA FROM MONGODB---------------------------    

      // delete a document from database
    
      async function deleteCourse(id) {
         console.log('ID: ' + id);
         const result = await Course.deleteOne({ _id: id });
          console.log(result);
      }


      const result = await Course.deleteMany({ _id: id });
      const course = await Course.findByIdAndRemove(id);