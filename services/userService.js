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
      fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJvbWVyb192aWxsYS1zZWJhc3RpYW5AaG90bWFpbC5jb20ifQ.jq5D8xra4XzmBJ9WDaadZGfbExY7hsBhj_U5WObXJIY`, {
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