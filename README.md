# Pi Website
## Raspberry pi website for home server
## URL : https://24d8-116-87-173-227.ngrok-free.app
# Table of contents
* [General info](#general-information)
* [Technology](#technology)
* [Requirements](#requirements)
* [Installation](#installation)

## General Information
This project is a raspberry pi website for my home server with features to control other servers on my home server for ease of use.
The aim of this project is to make controlling other servers easier.

## Technology
This projects is created with:
* NodeJS version: v18.13.0
* ejs version: v3.1.8
* mongoose version: v6.9.0
* express version: v4.18.2
* dotenv version: v16.0.3

## Requirements
Pi website requires the following dependencies to run:
* [NodeJs](https://nodejs.org/en)
* [Docker](https://www.docker.com)
* [Git Cli](https://git-scm.com/downloads)
* [Mongodb account](https://www.mongodb.com)
* [Secret Key in hexadecimal](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx)
* [Ngrok account](https://ngrok.com)

## Installation
#### Clone installation guide
**IMPORTANT!!!** Please note that if you are going to clone this repository please fork it first.
You can clone the repository with the following command:
```console
git clone https://github.com/Cyrof/password_manager_2.0.git
```
**OR** 
You can download the zip file [here](https://github.com/Cyrof/pi_website/archive/refs/tags/v0.1-beta.zip) or the tar file [here](https://github.com/Cyrof/pi_website/archive/refs/tags/v0.1-beta.tar.gz).


## Prerequisites
#### Environment setup for .env file
##### Steps:
  - Steps:
    - [.env file format](#env-file-format)
    - [Step 1 (Create .env file):](#step-1-create-env-file)
    - [Step 2 (Create database on mongodb):](#step-2-create-database-on-mongodb)
    - [Step 3 (Generate hexadecimal secret key):](#step-3-generate-hexadecimal-secret-key)
    - [Step 4 (Set folder path for sharedfolder page function):](#step-4-set-folder-path-for-sharedfolder-page-function)
    - [Step 5 (Set port to use):](#step-5-set-port-to-use)
    - [Step 6 (Ngrok authentication token):](#step-6-ngrok-authentication-token)
    - [Step 7 (Set git branch for auto readme file url updates):](#step-7-set-git-branch-for-auto-readme-file-url-updates)

#### .env file format
Copy the following into your .env file and change the following accordingly.
```environment
    https://24d8-116-87-173-227.ngrok-free.app
    SECRET_KEY={hexadecimal_secret_key}
    SHARED_FOLDER_PATH={Path_for_sharedfolder}
    PORT={port}
    AUTH={NgrokAuthenticationToken}
    GIT_BRANCH={github_branch}
```

##### Step 1 (Create .env file):
Create the .env file in the same directory as the app.js file

##### Step 2 (Create database on mongodb):
Login to [mongodb](https://www.mongodb.com) and create a cluster with whatever cluster name. 

To do so, navigate to Database Deployments and click the create button to create the cluster.

After creating the cluster, create a database as well as 2 collections named **users** and **sessions** in the same database.

To do the following, navigate into the cluster by clicking on the **Browse Collection** button. Then in **Collections** tab click on **Create Database** button to create the database and collections.

After creating the required database and collections, add the following into your .env file by editing the **DATABASE_URL** https://24d8-116-87-173-227.ngrok-free.app
* Username
* Password
* Cluster Name
* Database Name


##### Step 3 (Generate hexadecimal secret key):
Follow this [link](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx) to generate an encryptiion key with the following parameters:
* 256 bit
* hexadecimal setting: True

After generating the encryptiion key copy it and edit the **SECRET_KEY** variable.

##### Step 4 (Set folder path for sharedfolder page function):
For this step it may very from user to user. You can either use a created folder or the entire drive for the shared folder directory path.
Which ever you have decided on, copy the absolute path and edit the **SHARED_FOLDER_PATH** variable.

##### Step 5 (Set port to use):
Decide a port to use for use this http server preferably the standard port such as port 8080 or 3000. After you have decided, edit the **PORT** variable in the .env file.

##### Step 6 (Ngrok authentication token):
To get your ngrok authentication token, login to [ngrok](https://ngrok.com) and click on **Your Authtoken**. 
At the top of the page it should display your authentication token. Copy it and edit the **AUTH** in the .env file.

##### Step 7 (Set git branch for auto readme file url updates):
Set The branch to your main branch on your git hub repository. Get the branch name and edit the **GIT_BRANCH** variable in the .env file.

**IMPORTANT!!!** Please note that if you do not setup the required prerequisites the code will not work properly.
