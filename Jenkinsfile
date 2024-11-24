pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Use bash explicitly for compatibility
                    sh '''
                        #!/bin/bash
                        docker build -t elshoky/nodjs-app:${BUILD_NUMBER} .
                    '''
                }
            }
        }
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-elshoky', usernameVariable: 'USER', passwordVariable: 'PASSWORD')]) {
                    script {
                        // Login to Docker
                        sh '''
                            #!/bin/bash
                            echo "$PASSWORD" | docker login -u "$USER" --password-stdin
                        '''
                    }
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image
                    sh '''
                        #!/bin/bash
                        docker push elshoky/nodjs-app:${BUILD_NUMBER}
                    '''
                }
            }
        }
        stage('Deploy Application') {
            steps {
                script {
                    // Run the Docker container
                    sh '''
                        #!/bin/bash
                        docker run -d --name nodejs-app -p 3030:3000 elshoky/nodjs-app:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
