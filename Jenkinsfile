pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        IMAGE_NAME = "chargeguard:latest"
    }

    stages {

        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Security Check') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh '''
                    docker rm -f chargeguard-staging 2>/dev/null || true
                    docker run -d --name chargeguard-staging -p 3002:3000 $IMAGE_NAME

                    sleep 3
                    curl -f http://localhost:3002
                '''
            }
        }

        stage('Deploy to Production') {
            steps {
                sh '''
                    docker rm -f chargeguard-production 2>/dev/null || true
                    docker run -d --name chargeguard-production -p 3003:3000 $IMAGE_NAME

                    sleep 3
                    curl -f http://localhost:3003
                '''
            }
        }

        stage('Monitoring') {
            steps {
                sh '''
                    echo "Checking ChargeGuard..."
                    curl -f http://localhost:3003
                    echo "ChargeGuard is running."
                '''
            }
        }
    }

    post {
        success {
            echo 'ChargeGuard pipeline completed successfully.'
        }

        failure {
            echo 'ChargeGuard pipeline failed.'
        }
    }
}
