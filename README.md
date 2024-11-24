# Node.js Application Docker Deployment with Jenkins Pipeline

This project is a Jenkins pipeline setup that automates the process of building, pushing, and deploying a Dockerized Node.js application to an EC2 instance.

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Pipeline Stages](#pipeline-stages)
4. [Pre-requisites](#pre-requisites)
5. [Setup Instructions](#setup-instructions)
6. [Jenkins Configuration](#jenkins-configuration)
7. [Troubleshooting](#troubleshooting)
8. [Screenshot](#screenshot)

## Overview
This Jenkins pipeline automates the following tasks:
- **Checkout**: Pulls the latest code from the version control repository.
- **Build Docker Image**: Builds a Docker image of the Node.js application.
- **Docker Login**: Authenticates with Docker Hub using stored credentials.
- **Push Docker Image**: Pushes the built Docker image to Docker Hub.
- **Deploy Application**: Deploys the Docker image to an EC2 instance using SSH, handling any conflicts with port allocation by removing existing containers.

## Project Structure
- `Dockerfile`: Defines the Docker image for the Node.js application.
- `Jenkinsfile`: The Jenkins pipeline configuration file (this file).
- `src/`: Directory containing the source code for the Node.js application.

## Pipeline Stages

### 1. Checkout Code
This stage checks out the latest code from the version control repository using the `scm` (Source Control Management) plugin.

### 2. Build Docker Image
In this stage, the pipeline builds the Docker image for the Node.js application using the `Dockerfile` located in the root directory of the repository. The image is tagged with the Jenkins build number.

### 3. Docker Login
This stage logs in to Docker Hub using credentials stored in Jenkins as a `usernamePassword` credential with ID `docker-elshoky`.

### 4. Push Docker Image
After successfully building and logging in, the pipeline pushes the Docker image to Docker Hub using the tag based on the build number.

### 5. Deploy Application
This stage deploys the Docker image to an EC2 instance by SSH-ing into the EC2 instance and running the Docker container. If a container is already running on port 3036, it is stopped and removed before deploying the new container. The container is then run in detached mode (`-d`), and port 3036 is mapped to port 3000 inside the container.

## Pre-requisites
1. **Docker**: Ensure Docker is installed and configured on your Jenkins agent and EC2 instance.
2. **Jenkins**: A Jenkins server set up with necessary plugins (such as `docker`, `ssh`, `credentials`).
3. **EC2 Instance**: An EC2 instance running and accessible for SSH.
4. **Docker Hub Account**: A Docker Hub account with credentials stored in Jenkins for authentication (`docker-elshoky`).
5. **SSH Key**: An SSH key (`ssh-key-ec2`) that allows Jenkins to connect to your EC2 instance.

## Setup Instructions

### 1. Jenkins Configuration
- Install the necessary plugins in Jenkins: Docker, SSH, and Credentials.
- Create credentials for Docker Hub (ID: `docker-elshoky`) and SSH access to the EC2 instance (ID: `ssh-key-ec2`).
- Create a new pipeline job in Jenkins and configure it to use the `Jenkinsfile` in your repository.

### 2. EC2 Configuration
- Ensure Docker is installed and running on your EC2 instance.
- Open port `3036` on your EC2 instance (or any other ports if using a different mapping) in the Security Groups.
- The EC2 instance should be accessible using the provided SSH key.

## Jenkins Configuration Example

In your Jenkins job, make sure you:
- Configure the job to use the `Jenkinsfile` located in your repository.
- Set the environment variables (`BUILD_NUMBER`, etc.) for the pipeline.

## Troubleshooting

### Port Conflict Error
If you encounter an error such as:
This indicates that the port (3036) is already in use by a running container. The pipeline now handles this by stopping and removing any existing container using port 3036 before running the new one.

### Docker Login Failures
Ensure that the Docker Hub credentials are correctly set in Jenkins. Check the credentials store in Jenkins to verify that the `docker-elshoky` credentials are accurate.

### SSH Connection Failures
Verify the SSH credentials (`ssh-key-ec2`) and the EC2 instance's security group settings to ensure proper SSH access.

## Screenshot

Here is a screenshot of the application:

![Application Screenshot](https://github.com/elshoky/hamada/blob/main/Capture.PNG)

---

For any further questions or issues, feel free to open an issue in the repository.
