import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/componentsStyles/itemComponent.css';

const ItemComponent = ({ item, handleEdit, handleDelete, fields }) => {
  const location = useLocation();
  const showDetailButton = location.pathname === "/";

  return (
    <li className="card">
      <div className="card-content">
        {fields.some(field => field.field === 'imagen') && (
          <img 
            src={item['imagen']} 
            alt={item.nombre || 'Imagen'} 
            className="card-image" 
          />
        )}
        <div className="card-details">
          {fields.map(({ label, field, formatter }) => (
            field !== 'imagen' && (
              <span key={field}>
                <strong>{label}:</strong> {formatter ? formatter(item) : item[field]}
              </span>
            )
          ))}
          <div className="card-buttons">
            {showDetailButton && (
              <Link to={`/propiedades/${item.id}`} className="detail-button">Detalle</Link>
            )}
            <button className="button" onClick={() => handleEdit(item.id)}>Editar</button>
            <button className="button" onClick={() => handleDelete(item.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemComponent;