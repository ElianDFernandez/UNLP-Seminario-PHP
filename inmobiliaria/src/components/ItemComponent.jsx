import React from 'react';
import '../assets/componentsStyles/itemComponent.css';

const ItemComponent = ({ item, handleEdit, handleDelete, fields }) => (
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
          <button onClick={() => handleEdit(item.id)}>Editar</button>
          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  </li>
);

export default ItemComponent;
