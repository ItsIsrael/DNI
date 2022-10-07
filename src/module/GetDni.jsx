import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './GetDni.scss';

import { Report } from 'notiflix/build/notiflix-report-aio';

export const GetDni = () =>{

  const [value, setValue ] = useState([]);

  // Manejador del envio del formulario
  const handleSubmit = e => {
    e.preventDefault();
    numberValidator();
  }
  // Setter
  const handleName = (e) => {
    setValue(e.target.value)
  }


  // Function

  const numberValidator = () => {
    let dniLetters = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
    let dninumber = parseInt(value.slice(0, 8));
    let dniRestoDivision = dninumber % 23;
    const lastLetterDni = value[8].toString().toUpperCase();
    let findLetterResto = dniLetters[dniRestoDivision];

    // Comprobar que la letra sea la misma que la que tenemos nosotros en el array
    const findLetter = dniLetters.find(letter => letter === findLetterResto && letter === lastLetterDni );
    if(findLetter === lastLetterDni){
      Report.success(
        'DNI Encontrado',
        'Coincide con la base de datos.',
        'Okay',
      );
    }else {
      Report.failure(
        'Ningun DNI encontrado',
        'No hay coincidencias en la base de datos',
        'Okay',
      );
    };
  }
    return(
        <div className="container-fluid container ">
          <form  onSubmit={handleSubmit}>
            <label>Ingrese su DNI:</label>
              <input className="form-control" onChange={handleName} type="text" minLength="9" maxLength="9" placeholder="XXXXXXXA"/>
              <small className="form-text text-muted">
              Ejemplo: 12345678A
            </small>
            <input className="btn btn-primary" type="submit" value="Enviar"/>
          </form>
        </div>
    )
}