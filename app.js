const { listaDeVentas } = require("./funciones");
const concesionaria = require("./funciones");
const opcion = process.argv[2];
function Persona(capacidadDePagoEnCuotas, capacidadDePagoTotal) {
    this.capacidadDePagoTotal = capacidadDePagoTotal;
    this.capacidadDePagoEnCuotas = capacidadDePagoEnCuotas;
}

switch(opcion) {
    case "buscar":
        console.log(concesionaria.buscarAuto(process.argv[3]));
        break;
    
    case "vender":
        concesionaria.venderAuto(process.argv[3]);
        console.log(`Auto ${process.argv[3]} vendido`);
        break;
        
    case "enVenta":
        console.log(concesionaria.autosParaLaVenta());
        break;

    case "autosNuevos":
        console.log(concesionaria.autosNuevos());
        break;

    case "listaDeVentas":
        console.log(concesionaria.listaDeVentas());
        break;

    case "totalDeVentas":
        console.log(concesionaria.totalDeVentas());
        break;

    case "puedeComprar": {
        let persona = new Persona(process.argv[4], process.argv[5]);
        console.log(concesionaria.puedeComprar(process.argv[3], persona));
        break;
    }

    case "autosQuePuedeComprar": {
        let persona = new Persona(process.argv[3], process.argv[4]);
        console.log(concesionaria.autosQuePuedeComprar(persona));
        break;
    }
}