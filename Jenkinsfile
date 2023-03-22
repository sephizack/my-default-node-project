pipeline {
    agent {
        docker { image 'node:12-stretch' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}