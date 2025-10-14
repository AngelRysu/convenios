const express = require("express");
const dotenv = require("dotenv");
const https = require("https");
const routerLogin = require("./router/login");
const routerAuth = require("./router/auth");
const routerUnidades = require("./router/unidades");
const routerCuentas = require("./router/cuentas");

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

routerLogin(app);
routerAuth(app);
routerUnidades(app)
routerCuentas(app);

app.use('/login',routerLogin);
app.use('/auth',routerAuth);
app.use('/unidades',routerUnidades);
app.use('/cuenta',routerCuentas);


if(process.env.MODE === 'PRODUCCION'){
    const privateKey  = fs.readFileSync(process.env.PRIVKEY, 'utf8');
    const ca = fs.readFileSync(process.env.CA, 'utf8');
    const certificate = fs.readFileSync(process.env.CERT, 'utf8');

    const credentials = { key: privateKey, ca: ca, cert: certificate };
    const https_server = https.createServer( credentials, app );

    https_server.listen(process.env.PORT, () => {
        console.log('servidor corriendo en el puerto:', process.env.PORT);
    })

}else{
    app.listen(process.env.PORT, () => {
        console.log('servidor corriendo en el puerto:', process.env.PORT);
    })
}

module.exports = app;
