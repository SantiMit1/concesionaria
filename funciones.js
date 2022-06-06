const autos = require("./autos")
const fs = require("fs")

let concesionaria = {
   autos: autos,
 
   buscarAuto: function(patente) {
      let autosFiltrado = this.autos.filter(auto => {
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
       let auto = this.buscarAuto(patente);
       if(auto) {
           auto.vendido = true;
           autos.push(auto);
       }
   },

   autosParaLaVenta: function() {
       let autos = this.autos.filter(auto => {
           return auto.vendido === false;
       })
       return autos;
   },

   autosNuevos: function() {
       let autos = this.autosParaLaVenta();
       let autos0KM = autos.filter(auto => {
           return auto.km < 100;
       })
       return autos0KM;
   },

   listaDeVentas: function() {
       let autosVendidos = this.autos.filter(auto => {
           return auto.vendido == true;
       })
       
       let lista = autosVendidos.map(auto => {
           return auto.precio;
       })
       return lista.length > 0 ? lista : "no se vendió ningun auto"
   },

   totalDeVentas: function() {
       let vendidos = this.listaDeVentas();
       if(Array.isArray(vendidos)) {
           let total = vendidos.reduce((acum, total) => {
               return acum + total;
           }, 0)
           return total;
       } else {
           return 0;
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
       return autosComprables;
   }
}

module.exports = concesionaria;