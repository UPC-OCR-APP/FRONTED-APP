import base_url from "../components/BaseUrl";

export const getAllUsers = () => 
    fetch("users")
    .then(res => res.json());

export const loginUser = (user, pass) => 
    fetch(`${base_url}/user`, {
        method: 'POST',
        body: JSON.stringify({
            usuario: user,
            password: pass
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
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

export const updateUser = (nombre, apellido, email, usuario, password) => 
    fetch(`${base_url}/users`, {
        method: 'PUT',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            email: email,
            usuario: usuario,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
      .then(data => data)

export const getDNI = (dni) => 
      fetch(`https://cloud.novoapi.com/api/reniec/N08skb2Rqa4VewcnXHNzDSZtvzWiose4lBMtkbWU/${dni}`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json"
          }
      }).then(res =>res.json())
        .then(data => data)

export const getEmail = (email) => 
      fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=7fbe2cffff2246649b5a6003ffce491f&email=${email}`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json"
          }
      }).then(res =>res.json())
        .then(data => data)