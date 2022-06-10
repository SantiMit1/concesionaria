const fs = require("fs");
const autos = "./autos.json"
let autosJSON = fs.readFileSync(autos, "utf-8");
let autosJS = JSON.parse(autosJSON);

let concesionaria = {

   buscarAuto: function(patente) {
      let autosFiltrado = autosJS.filter(auto => {
        return auto.patente === patente;
      });
      autosFiltrado = autosFiltrado.pop();
      if(autosFiltrado) {
          return autosFiltrado;
        } else {
            return null;
        }
   },

   venderAuto: function(patente) {
       let index = autosJS.map(auto => auto.patente).indexOf(patente);
       let auto = this.buscarAuto(patente);
       if(auto) {
           auto.vendido = true;
           autosJS.splice(index, 1);
           autosJS.push(auto);
           fs.writeFileSync(autos, JSON.stringify(autosJS));
        }
    },

   autosParaLaVenta: function() {
       let autos = autosJS.filter(auto => {
           return auto.vendido === false;
       })
       return autos.length > 0 ? autos : "No hay autos a la venta";
   },

   autosNuevos: function() {
       let autos = this.autosParaLaVenta();
       let autos0KM = autos.filter(auto => {
           return auto.km < 100;
       })
       return autos0KM;
   },

   listaDeVentas: function() {
       let autosVendidos = autosJS.filter(auto => {
           return auto.vendido == true;
       })
       
       let lista = autosVendidos.map(auto => {
           return auto.precio;
       })
       return lista.length > 0 ? lista : "No se vendió ningun auto"
   },

   totalDeVentas: function() {
       let vendidos = this.listaDeVentas();
       if(Array.isArray(vendidos)) {
           let total = vendidos.reduce((acum, total) => {
               return acum + total;
           }, 0)
           return total;
       } else {
           return "No se vendió ningun auto";
       }
   },

   puedeComprar: function(patente, persona) {
        let auto = this.buscarAuto(patente);
        let costoCuota = (auto.precio / auto.cuotas);
        let precio = auto.precio;
        if(persona.capacidadDePagoEnCuotas >= costoCuota && persona.capacidadDePagoTotal >= precio) {
            return true;
        } else {
            return false;
        }
   },

   autosQuePuedeComprar: function(persona) {
       let autos = this.autosParaLaVenta();
       let autosComprables = [];
       autos.forEach(auto => {
           if(this.puedeComprar(auto.patente, persona)) {
                autosComprables.push(auto);
           }
       })
       return autosComprables.length > 0 ? autosComprables : "La persona no puede comprar ningun auto"
   }
}

module.exports = concesionaria;