pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Security Audit') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }
    }
}
