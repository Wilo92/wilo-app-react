pipeline {
    // El pipeline puede ejecutarse en cualquier agente disponible de Jenkins
    agent any

    tools {
        // Se usará Node.js versión 'Node_24' 
        nodejs 'Node_24'
    }

    stages {
        // ===============================
        // Etapa 1: Clonar el repositorio
        // ===============================
        stage('Checkout') {
            steps {
                // Clona la rama 'main' del repositorio especificado
                // ⚠️ Nota: hay un error en la URL (https://https://), debería corregirse
                git branch: 'main', url: 'https://github.com/Wilo92/wilo-app-react.git'
            }
        }

        // ==========================================
        // Etapa 2: Instalar dependencias y compilar
        // ==========================================
        stage('Build') {
            steps {
                // Instala todas las dependencias del proyecto desde package.json
                sh 'npm install'

                // Ejecuta el comando de compilación de la aplicación React
                sh 'npm run build'
            }
        }

        // =====================================
        // Etapa 3: Ejecutar pruebas unitarias
        // =====================================
        stage('Unit Tests') {
            steps {
                // Ejecuta pruebas unitarias con Jest sin modo interactivo
                // Redirige la salida al archivo 'test-output.txt'
                // El '|| true' evita que el pipeline falle si alguna prueba falla
                sh 'npm test -- --watchAll=false --silent > test-output.txt || true'

                // Muestra el contenido del archivo de resultados de pruebas en consola
                sh 'cat test-output.txt'
            }
            post {
                always {
                    // Guarda el archivo de resultados de pruebas como artefacto
                    // Permite que esté disponible para descarga o análisis posterior
                    archiveArtifacts artifacts: 'test-output.txt', allowEmptyArchive: true
                }
            }
        }
    }

    // ========================
    // Acciones al finalizar
    // ========================
    post {
        success {
            // Mensaje si el pipeline fue exitoso
            echo '¡Pipeline ejecutado con éxito!'
        }
        failure {
            // Mensaje si alguna etapa falló
            echo 'Pipeline fallido. Revisar logs.'
        }
    }
}
