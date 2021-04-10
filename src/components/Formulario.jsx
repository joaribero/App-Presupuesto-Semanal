import React, {useState} from 'react';
import Error from './Error.jsx';
import shortid from 'shortid';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    
    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '' ) {
            guardarError(true);
            return;
        }
        guardarError(false);

        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //Pasar al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //Resetear form
        guardarNombre('');
        guardarCantidad(0);

    }
    
    return ( 
        <form onSubmit={agregarGasto}>

            <h2>Agrega tus gastos aqui</h2>
            {error ? <Error mensaje= "Ambos campos son obligatorios o el presupuesto es incorrecto"/> : null}         
            <div className="campo">
                <label>Nombre Gasto</label>
                <input type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(e.target.value)}
                />
            </div>

            <input type="submit" value="Agregar Gasto" className="button-primary u-full-width"/>
        </form>
     );
}
 
export default Formulario;