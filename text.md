I made an API. Users can create an account, login and save website links through it. The goal is to create a storage system of website links. I can access them from any device with an Internet connection. 
On my computer I use Google Chrome to browse and do everything on the internet. But, on mobile I use Brave Browser where I am not logged into my google account. 

Sometimes I want to share a link but I don't have my device with me. I can get on the website to get the link and share it to other. 

This is for personal use for the moment. The API has the following endpoints: 

1. Singup: https://link-share-e032.onrender.com/v1/api/auth/signup/
    Request body: 
    {
        "firstName": "Dwight",
        "lastName": "Schrute",
        "emails": "dwight@gmail.com",
        "password": "bran"
    }

    Response body: 
    {
        "message": "Successfully created the user"  
    }

    User Exists Response Body: 
    {
        "success": false,
        "error": {
            "code": "User_Already_Exists",
            "message": "User already exists with the given email"
        }
    }

2. Login: https://link-share-e032.onrender.com/v1/api/auth/login
    {
        "email": "dwight@gmail.com",
        "password": "bran"
    }

    Response body: 
    {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2E2YmQ4MWEtNDk2YS00MmE3LTgwNGEtMjIwMDI2ODFkZjlhIn0sImlhdCI6MTc5NDU5MTMzOSwiZXhwIjoxNzk0NTk0OTM5fQ.zTUh0Lq8On0HZEI1Woc5CiErelyIPp_aZ8BkofvILa0",
        "users": {
            "name": "Dwight Schrute",
            "email": "dwight@gmail.com"
        }
    }

    Invalid Password Response Body: 
    {
        "success": false,
        "error": {
            "code": "Invalid_Password",
            "message": "Invalid password"
        }
    }

3. Create Link: https://link-share-e032.onrender.com/v1/api/link/create
    Auth Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2E2YmQ4MWEtNDk2YS00MmE3LTgwNGEtMjIwMDI2ODFkZjlhIn0sImlhdCI6MTc5NDU5MTMzOSwiZXhwIjoxNzk0NTk0OTM5fQ.zTUh0Lq8On0HZEI1Woc5CiErelyIPp_aZ8BkofvILa0

    Request Boody: 
    {
        "websiteName": "github",
        "link": "www.github.com"
    }

    Response Body: 
    {
        "message": "Successfully created a link",
        "link": {
            "link_id": "4316a1ef-5883-4513-ac53-cf883cb03496",
            "user_id": "3a6bd81a-496a-42a7-804a-22002681df9a",
            "website_name": "bitbucket",
            "link": "www.bitbucket.com"
        }
    }
    Response for existing link: 
    {
        "success": false,
        "error": {
            "code": "LINK_ALREADY_EXISTS",
            "message": "The link already exists"
        }
    }

4. Get All Links: https://link-share-e032.onrender.com/v1/api/link/all
    Auth Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2E2YmQ4MWEtNDk2YS00MmE3LTgwNGEtMjIwMDI2ODFkZjlhIn0sImlhdCI6MTc5NDU5MTMzOSwiZXhwIjoxNzk0NTk0OTM5fQ.zTUh0Lq8On0HZEI1Woc5CiErelyIPp_aZ8BkofvILa0
    
    Response Body: 
    {
        "message": "Successfully retrived the data",
        "data": [
            {
                "linkId": "4316a1ef-5883-4513-ac53-cf883cb03496",
                "websiteName": "bitbucket",
                "link": "www.bitbucket.com"
            }
        ]
    }

    Response Body if there are no links: 
    {
        "message": "The user doesn't gave any links stored",
        "data": []
    }

