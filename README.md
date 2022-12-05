# Zesty ![image](https://i.imgur.com/764zj91t.jpg)

***

Zesty is a full stack application clone with features and design inspired by [Etsy][https://www.etsy.com/]. Zesty can be used to find/sell products that fit the Zesty/Citrus theme. 

Visit [Zesty](https://aa-etsy-clone.onrender.com) to find/sell products! 

# Wiki Links

[FEATURE LIST](https://github.com/williamkimngo/aa-ETSY-WEBSITE_CLONE/wiki/Features-List)

Details of specific feature functionality of the application

[DATABASE SCHEMA](https://github.com/williamkimngo/aa-ETSY-WEBSITE_CLONE/wiki/Database-Schema)

Overview of the database schema of the application.

[USER STORIES](https://github.com/williamkimngo/aa-ETSY-WEBSITE_CLONE/wiki/User-Stories)

Details of expected output for each feature as a user.

## Built With

Frameworks, Platforms and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

HOSTING:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Instructions on how to run this website locally
-Git Clone Repo

-In the root directory, run the following installs:
```
pipenv lock -r > requirements.txt
```

-In the "react-app" directory, run the following installs:
```
npm install
```
-Create a .env file in the root of your backend directory to replicate the env.example file. 

-In the root directory, after completing all the installs, run the following commands:
```
pipenv shell
flask run
```

-In the "react-app" directory, after completing all the installs, run the following command: 
```
npm start
```

-The website will not function unless BOTH root-directory(backend) and react-app(frontend) are both running at the same time. 

## Landing Page

Landing page for non-signed in user. You will be able to view product's details but won't be able to add products to cart, post reviews, or list your product. 

![image](https://i.imgur.com/S1G58rX.png)

## Sign-in/Sign up

Sign-in/Sign-up Modal when clicking on "Sign In" Button. Demo user is provided for you to access all the features of the websites. 

![image](https://i.imgur.com/ze1Ad4N.png)

## Account Page

Once signed in, you are able to access your account profile, which gives you the option to list your product, edit/delete your products or edit/delete your reviews. 

![image](https://i.imgur.com/EYGYj2z.png)

## Specific Product's Page

When viewing a specific product's page, you will be able to post a review regarding the product or add the product to the cart as long as you are not the owner of the product. 

![image](https://i.imgur.com/gPRaIWK.png)

## Cart

When adding an item to your cart, you will be able to edit the cart item's quantity and checkout when you are ready. The costs will automatically calculate if you do edit the quantity. Once you checkout, the quantity of the item will update on the product's page. 

![image](https://i.imgur.com/gwLm7FA.png)

## Contact 

If you have any questions or concerns about my project or any other projects that I may be working on, please contact me at Williamkimngo@gmail.com.
