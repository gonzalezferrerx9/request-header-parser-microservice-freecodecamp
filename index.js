// (1) IMPORTAR MÓDULOS
const express = require('express');
const path = require('path');
const cors = require('cors');

// (2) INICIALIZAR LA APLICACIÓN DE EXPRESS
const app = express();

// (3) HABILITAR CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// (4) CONFIGURACIÓN PARA CONFIAR EN PROXIES
app.set('trust proxy', true);

// (5) SERVIR LOS ARCHIVOS ESTÁTICOS (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// (6) DEFINIR LA RUTA PRINCIPAL QUE MUESTRA EL HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// (7) CREAR LA RUTA DE LA API
app.get('/api/whoami', (req, res) => {
  // (7.1) EXTRAER LA INFORMACIÓN DE LOS ENCABEZADOS
  const ipaddress = req.ip;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  // (7.2) DEVOLVER LA INFORMACIÓN EN UN OBJETO JSON
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// (8) INICIAR EL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tu aplicación está escuchando en el puerto ${PORT}`);
});