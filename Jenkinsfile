pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'insuretech-app'
        IMAGE_TAG      = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'insuretech-frontend'
        REGISTRY_CREDS = 'docker-hub-credentials' // Jenkins credential ID
    }

    stages {
        stage('Checkout & Validation') {
            steps {
                echo 'Validating repository integrity and presence of source files...'
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
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Smoke Test') {
            steps {
                echo 'Testing web server availability...'
                sh """
                    docker run -d --name temp-test-${IMAGE_TAG} -p 8081:80 ${IMAGE_NAME}:${IMAGE_TAG}
                    sleep 3
                    curl --fail http://localhost:8081/index.html || exit 1
                    docker stop temp-test-${IMAGE_TAG}
                    docker rm temp-test-${IMAGE_TAG}
                """
            }
        }

        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} \$DOCKER_USER/${IMAGE_NAME}:${IMAGE_TAG}
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} \$DOCKER_USER/${IMAGE_NAME}:latest
                        docker push \$DOCKER_USER/${IMAGE_NAME}:${IMAGE_TAG}
                        docker push \$DOCKER_USER/${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to environment...'
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
        success {
            echo 'Pipeline finished successfully.'
        }
        failure {
            echo 'Pipeline failed. Check stage logs for details.'
        }
    }
}