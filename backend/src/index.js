import app from './app.js';
import cnx from './db.js';

cnx();

const port = process.env.PORT || 4000;

app.listen(port);

console.log('Servidor en puerto ', port);