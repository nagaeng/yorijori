pipeline {
    agent any

    environment {
        REGISTRY = "https://registry.hub.docker.com"
        IMAGE_NAME = "yorijori"
        DOCKER_CREDENTIALS_ID = "nagaeng"
	}

    stages {
        stage('Clone repository') {
            steps {
                git 'https://github.com/nagaeng/yorijori.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // docker image building
                    app = docker.build("nagaeng/yorijori")
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                script {
                    app.inside {
                        sh 'make test'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'nagaeng') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }

    }
}
