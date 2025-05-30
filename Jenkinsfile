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
