pipeline {
    // El pipeline puede ejecutarse en cualquier agente disponible de Jenkins
    agent any

    tools {
        // Se usará Node.js versión 'Node_24' (debe estar configurado en Jenkins)
        nodejs 'Node_24'
    }

    stages {
        // Etapa para clonar el repositorio desde GitHub
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Wilo92/wilo-app-react.git'
            }
        }

        // Etapa para instalar dependencias y construir la aplicación React
        stage('Build') {
            steps {
                sh 'npm install'        // Instala dependencias
                sh 'npm run build'      // Construye la app
            }
        }

        // Etapa que ejecuta pruebas en paralelo en dos navegadores distintos
        stage('Parallel Browser Tests') {
            parallel {
                // Pruebas ejecutadas en Google Chrome
                stage('Test on Chrome') {
                    steps {
                        echo 'Running tests on Chrome'
                        sh 'BROWSER=chrome npm test -- --watchAll=false --silent > test-output-chrome.txt || true'
                        sh 'cat test-output-chrome.txt'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'test-output-chrome.txt', allowEmptyArchive: true
                        }
                    }
                }

                // Pruebas ejecutadas en Firefox Developer Edition
                stage('Test on Firefox Developer Edition') {
                    steps {
                        echo 'Running tests on Firefox Developer Edition'
                        sh 'BROWSER=firefox npm test -- --watchAll=false --silent > test-output-firefox.txt || true'
                        sh 'cat test-output-firefox.txt'
                    }
                    post {
                        always {
                            archiveArtifacts artifacts: 'test-output-firefox.txt', allowEmptyArchive: true
                        }
                    }
                }
            }
        }

        // Etapa que simula el deploy con un delay
        stage('Simulated Deploy') {
            steps {
                echo 'Simulating deploy...'
                sh 'sleep 10'
                echo 'Deploy simulation finished.'
            }
        }
    }

    // Acciones post pipeline, sólo en caso de fallo envía mail
    post {
        failure {
            mail(
                to: 'wilmer.restrepo@contraloriarisaralda.gov.co',
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
The Jenkins pipeline has failed.

Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Result: ${currentBuild.currentResult}
URL: ${env.BUILD_URL}
"""
            )
        }
    }
}
