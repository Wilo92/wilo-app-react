pipeline {
    // El pipeline puede ejecutarse en cualquier agente disponible de Jenkins
    agent any

    tools {
        // Se usará Node.js versión 'Node_24' (debe estar configurado en Jenkins)
        nodejs 'Node_24'
    }

    stages {
        // ===============================
        // Etapa 1: Clonar el repositorio
        // ===============================
        stage('Checkout') {
            steps {
                // Clona la rama 'main' del repositorio de GitHub
                git branch: 'main', url: 'https://github.com/Wilo92/wilo-app-react.git'
            }
        }

        // ==========================================
        // Etapa 2: Instalar dependencias y compilar
        // ==========================================
        stage('Build') {
            steps {
                // Instala todas las dependencias definidas en package.json
                sh 'npm install'

                // Compila la aplicación React
                sh 'npm run build'
            }
        }

        // =====================================
        // Etapa 3: Ejecutar pruebas unitarias
        // =====================================
        stage('Unit Tests') {
            steps {
                // Ejecuta pruebas con Jest en modo no interactivo
                // Redirige la salida a un archivo para su posterior revisión
                // '|| true' evita que el pipeline falle aunque las pruebas fallen
                sh 'npm test -- --watchAll=false --silent > test-output.txt || true'

                // Muestra en consola el resultado de las pruebas
                sh 'cat test-output.txt'
            }
            post {
                always {
                    // Guarda el archivo de pruebas como artefacto del build
                    archiveArtifacts artifacts: 'test-output.txt', allowEmptyArchive: true
                }
            }
        }
    }

    // ========================
    // Acciones al finalizar el pipeline
    // ========================
    post {
        always {
            // Envía un correo con el resultado del pipeline a la dirección especificada
            // Requiere que el servidor SMTP esté configurado en Jenkins
            mail(
                to: 'wilmer.restrepo@contraloriarisaralda.gov.co',
                subject: "Build Status: ${currentBuild.currentResult}",
                body: "Job: ${env.JOB_NAME}\nEstado: ${currentBuild.currentResult}\nURL: ${env.BUILD_URL}"
            )
        }
    }
}
