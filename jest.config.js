// jest.config.js

module.exports = {
    // Define los reporteros a usar: el estándar de Jest y jest-junit para Jenkins
    reporters: [
        'default', // Muestra resultados estándar en consola
        ['jest-junit', {
            outputDirectory: './',       // Carpeta donde se guardará el archivo de reporte
            outputName: 'junit.xml'      // Nombre del archivo XML generado (compatible con Jenkins)
        }]
    ]
};
