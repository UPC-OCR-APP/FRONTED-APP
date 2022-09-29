import base_url from "../components/BaseUrl"

export const createHistory = (nombre, apellido, dni, numHistory, date, sexo) => 
    fetch(`${base_url}/history`, {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            numHistory: numHistory,
            date: date,
            sexo: sexo
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
      .then(data => data)

export const getHistoryByName = (nombre, apellido) => 
    fetch(`${base_url}/history/name/${nombre}/${apellido}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
      .then(data => data)

export const getHistoryByDni = (dni) =>
    fetch(`${base_url}/history/${dni}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => data)

export const getResultado = () => 
    fetch(`${base_url}/resultado`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res =>res.json())
      .then(data => data)


export const registerUser = (nombre, apellido, dni, email, usuario, password) => 
      fetch(`${base_url}/users`, {
          method: 'POST',
          body: JSON.stringify({
              nombre: nombre,
              apellido: apellido,
              dni: dni,
              email: email,
              usuario: usuario,
              password: password
          }),
          headers: {
              "Content-Type": "application/json"
          }
      }).then(res => res.json())
    .then(data => data)

export const agregarConsulta = (fecha_atencion, hora, edad, motivo, tiempo_enf, signos_sin, temp, presion, frecuencia_card,
    frecuencia_resp, peso, talla, pabd, apetito, estado, sed, orina, suenio, deposiciones,
    diagnostico, exa_auxiliares, prox_cita, observacion, tratamiento, numero_historia) => 
    fetch(`${base_url}/consulta`, {
        method: 'POST',
        body: JSON.stringify({
            "fecha_atencion": fecha_atencion,
            "hora": hora,
            "edad": edad,
            "diagnostico": diagnostico,
            "tratamiento": tratamiento,
            "examenes_auxiliares":exa_auxiliares,
            "proxima_cita": prox_cita,
            //"atendido_por": atendido_por,
            "observaciones": observacion,
            "numero_historia": numero_historia,
            "detalle_consulta":
            {
                "motivo_consulta": motivo,
                "tiempo_enfermedad": tiempo_enf,
                "Signos_sintomas": signos_sin
            },
            "signos_vitales":
            {
                "temperatura": temp,
                "frecuencia_cardiaca":frecuencia_card,
                "presion_arterial": presion,
                "frecuencia_respiratoria": frecuencia_resp
            },
            "datos_antropometricos":
            {
                "peso":peso,
                "talla":talla
            },
            "funciones_biologicas":
            {
                "apetito":apetito,
                "estado_animo":estado,
                "sueño": suenio,
                "sed": sed,
                "orina": orina,
                "deposiciones": deposiciones
            }
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => data)

export const getConsultaByHistoria = (numero_historia) =>
    fetch(`${base_url}/consulta/${numero_historia}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => data)