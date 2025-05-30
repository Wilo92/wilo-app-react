pipeline {
    agent any

    tools {
        nodejs 'Node_24'
    }

    options {
        skipDefaultCheckout(true)
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'false' // Cambia a true si preinstalas Chromium
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install System Dependencies') {
            steps {
                sh '''
                    apt-get update
                    apt-get install -y wget ca-certificates fonts-liberation libappindicator3-1 \
                    libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
                    libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 \
                    libxrandr2 libxss1 libxtst6 xdg-utils libglib2.0-0 libgbm1 libgtk-3-0
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Parallel Tests') {
            parallel {
                stage('Test Chrome') {
                    steps {
                        sh 'npm run test:chrome || true'
                        sh 'ls -l reports/chrome || true'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'reports/chrome/**/*.*', allowEmptyArchive: true
                            publishHTML(target: [
                                reportName: 'Reporte Chrome',
                                reportDir: 'reports/chrome',
                                reportFiles: 'index.html',
                                allowMissing: true,
                                alwaysLinkToLastBuild: true
                            ])
                        }
                    }
                }

                stage('Test Firefox') {
                    steps {
                        sh 'npm run test:firefox || true'
                        sh 'ls -l reports/firefox || true'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'reports/firefox/**/*.*', allowEmptyArchive: true
                            publishHTML(target: [
                                reportName: 'Reporte Firefox',
                                reportDir: 'reports/firefox',
                                reportFiles: 'index.html',
                                allowMissing: true,
                                alwaysLinkToLastBuild: true
                            ])
                        }
                    }
                }
            }
        }

        stage('Simulate Deploy') {
            when {
                expression { currentBuild.currentResult == 'SUCCESS' }
            }
            steps {
                echo 'Simulando despliegue...'
                sh 'echo Deploy simulado OK'
            }
        }
    }

    post {
        failure {
            mail to: 'wilmer.restrepo@contraloriarisaralda.gov.co',
                 subject: "❌ Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "El build ha fallado. Revisa detalles en: ${env.BUILD_URL}"
        }
        success {
            echo '✅ Build finalizado correctamente.'
        }
    }
}
