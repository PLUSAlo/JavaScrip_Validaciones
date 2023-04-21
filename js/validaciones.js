export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
    //console.log(input);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
          }else{
        input.parentElement.classList.add("input-container--invalid"); 
        input.parentElement.querySelector(".input-message-error").innerHTML=
         mostrarMensajeError(tipoDeInput, input);
    }
  }
  const tipoErrores= [
    "valueMissing", 
    "typeMismatch", 
    "patternMismatch", 
    "customError"
  ];

  const mensajesDeError={
    nombre: {
        valueMissing: "Este campo nombre no puede ser vacio"
    },
    email:{
        valueMissing: "Este campo email no puede ser vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "Este campo password no puede ser vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento:{
        valueMissing: "Este campo no puede ser vacio",
        customError:"Debes tener al menos 18 anios"
    },
    numero:{
      valueMissing: "Este campo no puede ser vacio",
      patternMismatch:"El formato requerido es de 10 digitos"
    },
    ciudad:{
      valueMissing: "Este campo no puede ser vacio",
      patternMismatch:"La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado:{
      valueMissing: "Este campo no puede ser vacio",
      patternMismatch:"El estado debe contener entre 10 a 40 caracteres"
    },
    direccion:{
      valueMissing: "Este campo no puede ser vacio",
      patternMismatch:"La direccion debe contener entre 10 a 40 caracteres"
    }
  };
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

  function mostrarMensajeError(tipoDeInput, input){
    let mensaje="";
    tipoErrores.forEach((error) => {
      if(input.validity[error]){        
        // console.log(tipoDeInput, error);
        // console.log(input.validity[error]);        
        // console.log(mensajesDeError[tipoDeInput][error]);
        mensaje= mensajesDeError[tipoDeInput][error];
      }
    });

    return mensaje;
  }

  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }
  