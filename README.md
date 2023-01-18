# Gym_Management
gym management system which have users, trainner, payment and all.

# Setup Feathersjs

Follow the instruction of feathersjs documentation https://crow.docs.feathersjs.com/
mkdir gym_management
cd gym_management
install feathers packages @feathersjs/feathers, @feathersjs/express

now created app using express(feather());
create app.use() and provide the routes of the user, traineer, plan and satus.

create a get('/healthcheck') to get check rout is working or not.

create a .env file to store essesntial information like port number and database url.

# User
created a create, update and remove method for creating a user, updating a user by it's id and removing the user by it's id.

# Traineer
created a create, update and remove method for creating a user, updating a user by it's id and removing the user by it's id.

# plan
created a create, update and remove method in the plan also, status will be paid, if the user hit the plan method.


# setup Neo4j
step 1: go to the neo4j download website, https://neo4j.com/download/
step 2: fill out the form before download the neo4j.
step 3: take copy of the Desktop key which is provided in the downloading website, once the dowloading is done, now let's make the downloaded file should be executable "chmod +x *" 
step 4: "chmod +x *" use this command to make downloaded file be executable,
step 5: then simply run the executable file to install.
step 6: now paste the valid Activation key, which was copied from the Desktop key from the website.
step 7: then the user interface will be there for the Neo4j Desktop.

# link my project to the Neo4j database
step 1: created a database and then start that database which will be opended the neo4j browser. 
step 2: copied the bolt link, which is there in the neo4j browser and paste it into the .env file's database url, use database_username and database_password nnd create a new database which is neo4j


# Create, Update and Remove using cypher and feathersjs
feather already created the routes of the create, update and remove. 
In the create method use cypher query to create user, traineer, plans similarly use the cypher query to update and remove.

 and created a database model to create session and driver.
