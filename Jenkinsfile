pipeline {
    // Define que el pipeline puede ejecutarse en cualquier agente disponible
    agent any

    tools {
        // Define la herramienta Node.js que se usará, debe estar configurada en Jenkins con este nombre
        nodejs 'Node_24'
    }

    options {
        // Evita el checkout automático por defecto (lo haremos manualmente en el stage 'Checkout')
        skipDefaultCheckout(true)
        // Limita la cantidad de builds que se guardan, aquí solo se mantienen los últimos 10
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Clean Workspace') {
            steps {
                // Borra todo el contenido del workspace para empezar limpio en cada ejecución
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                // Hace checkout del código fuente usando la configuración SCM definida para el proyecto
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Instala las dependencias del proyecto definidas en package.json
                sh 'npm install'
                // Compila la aplicación React (o realiza el build definido en package.json)
                sh 'npm run build'
            }
        }

        stage('Parallel Tests') {
            // Define que las pruebas se ejecutarán en paralelo para ahorrar tiempo
            parallel {
                stage('Test Chrome') {
                    steps {
                        // Ejecuta las pruebas unitarias con Jest usando Chrome como navegador
                        // La salida se redirige a un archivo y no hace fallar el pipeline si hay errores
                        sh 'npm test -- --watchAll=false --silent --browser=chrome > test-chrome.txt || true'
                        // Muestra en consola el resultado de las pruebas para Chrome
                        sh 'cat test-chrome.txt'
                    }
                    post {
                        always {
                            // Archiva el archivo de resultados de pruebas de Chrome para que esté disponible en Jenkins
                            archiveArtifacts artifacts: 'test-chrome.txt', allowEmptyArchive: true
                            // Publica el reporte HTML generado de las pruebas en Chrome
                            publishHTML(target: [
                                reportName: 'Reporte Chrome',
                                reportDir: 'path/to/chrome/html-report',   // Ajusta esta ruta según tu proyecto
                                reportFiles: 'index.html',
                                allowMissing: true,
                                alwaysLinkToLastBuild: true
                            ])
                        }
                    }
                }
                stage('Test Firefox') {
                    steps {
                        // Ejecuta las pruebas unitarias con Jest usando Firefox como navegador
                        sh 'npm test -- --watchAll=false --silent --browser=firefox > test-firefox.txt || true'
                        // Muestra en consola el resultado de las pruebas para Firefox
                        sh 'cat test-firefox.txt'
                    }
                    post {
                        always {
                            // Archiva el archivo de resultados de pruebas de Firefox
                            archiveArtifacts artifacts: 'test-firefox.txt', allowEmptyArchive: true
                            // Publica el reporte HTML generado de las pruebas en Firefox
                            publishHTML(target: [
                                reportName: 'Reporte Firefox',
                                reportDir: 'path/to/firefox/html-report',  // Ajusta esta ruta según tu proyecto
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
                // Solo simula un despliegue para validar que esta etapa funcione sin hacer cambios reales
                echo 'Simulando despliegue...'
                // Comando de ejemplo para simular deploy, puede ser un copy o cualquier otro script
                sh 'echo Deploy simulado OK'
            }
        }
    }

    post {
        failure {
            // Si el pipeline falla, envía un correo notificando el fallo
            mail to: 'wilmer.restrepo@contraloriarisaralda.gov.co',
                 subject: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "El build ha fallado. Ver detalles en: ${env.BUILD_URL}"
        }
        success {
            // Mensaje simple en consola si el build termina exitosamente
            echo 'Build finalizado correctamente.'
        }
    }
}
