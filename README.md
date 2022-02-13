# haspace-movieApp
A sample movie listing app created with ReactJS, ExpressJS and MongoDB in typescript

Required Dependencies
1. NodeJS - v 14.14
2. Docker - v 20.10
3. Docker-compose  v1.29.2

Application features

1. List all the movies added

![Screenshot from 2022-02-14 01-57-43](https://user-images.githubusercontent.com/49935554/153774630-ba68a06e-090b-48d0-b1c5-05bc2dfe42ae.png)
 
 2. Details of a movie
 
 ![Screenshot from 2022-02-14 01-58-06](https://user-images.githubusercontent.com/49935554/153774442-a30f640c-ec49-4716-95b6-68bbd88f7b54.png)

 3. Add a movie

![Screenshot from 2022-02-14 01-58-11](https://user-images.githubusercontent.com/49935554/153774642-71ade03f-5ea7-4919-be8d-a6e790b91e67.png)

 4. Edit/Delete existing movie
 
 ![Screenshot from 2022-02-14 01-58-20](https://user-images.githubusercontent.com/49935554/153774655-322c8e29-6a2e-4c57-ac01-24bacf5ae6e6.png)


## To run this project,

### 1. Using docker and docker-compose (requires latest versions)
### Steps

1. Clone this repository
2. $ cd repository/
2. $ docker-compose build
3. $ docker-compose up

Open a browser tab, go to http://localhost:3000

To access swagger api documentation , http://localhost:3001/api-docs

### 1. In the local machine,

1. Open the development.json file in haspace-movieApp/backend/src/configs and update the mongodb configurations
2. cd haspace-movieApp/backend/
3. npm install && npm start
4. To run the react app,

 cd haspace-movieApp/frontend/
 npm install && npm start
 
 Postman collection
 
  haspace-movieApp/backend/Movie App.postman_collection.json
  
  Swagger API documentation
  
  ![Screenshot from 2022-02-14 02-40-44](https://user-images.githubusercontent.com/49935554/153775200-dc707954-6079-401e-866d-a14bba3cd20c.png)





