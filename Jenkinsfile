pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'digital-insurance'
        IMAGE_TAG      = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'digital-insurance-app'
    }

    stages {
        stage('Checkout & Verification') {
            steps {
                echo 'Checking workspace files...'
                sh '''
                    test -f Dockerfile
                    test -f index.html
                    test -f style.css
                    test -f script.js
                '''
            }
        }

        stage('Build Image') {
            steps {
                echo "Building local Docker image..."
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying application to local Docker engine..."
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 80:80 ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }
    }
}