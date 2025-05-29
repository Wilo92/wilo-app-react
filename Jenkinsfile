pipeline {
    agent any

    tools {
        nodejs 'Node_24'
    }

    options {
        skipDefaultCheckout(true)
        buildDiscarder(logRotator(numToKeepStr: '10'))
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
                        // Ejecuta pruebas Jest configuradas para generar reportes en reports/chrome
                        sh 'npm run test:chrome || true'
                        sh 'ls -l reports/chrome'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'test-chrome.txt', allowEmptyArchive: true
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
                        // Ejecuta pruebas Jest configuradas para generar reportes en reports/firefox
                        sh 'npm run test:firefox || true'
                        sh 'ls -l reports/firefox'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'test-firefox.txt', allowEmptyArchive: true
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
