1. Install docker and docker compose.
2. Clone the repo to your desired directory.
3. In ./docker-compose.yml update:
    environment:
      - MYSQL_ROOT_PASSWORD=alsdkfajs2-amsdkfDkj2l-a;lskfjewdfFDa
      with a password of your choosing. Future iterations will use Hashicorp Vault to store this info. 
4. Update ./dbconfig/db.sql with your database configuration. Make sure to change the name of the database.
5. Copy the new MySQL Root pass from docker-compose.yml into the connection block in app.js and update the database name to whatever it is called in db.sql. 
    const db = mysql.createConnection({
    host: 'app_database',
    user: 'root',
    password: 'alsdkfajs2-amsdkfDkj2l-a;lskfjewdfFDa',
    database: '<db_name>'
    });
6. Run docker compose up --build
 
Note: This app is in dev mode using nodemon to auto restart the node server everytime a file is updated. When ready for prod, change this line in ./Dockerfile
    CMD ["npm", "run", "dev"]
to 
    CMD ["npm", "run", "start"]


    
