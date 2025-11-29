import type { Producto } from '../services/ecommerce/productos.services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  producto: Producto;
  onAddCart?: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAddCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${producto.id}`);
  };

  const handleAddCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddCart) {
      onAddCart(producto);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="card h-100 shadow-sm hover-shadow" 
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
        {!imageError && producto.imagen ? (
          <img
            src={producto.imagen}
            className="card-img-top"
            alt={producto.nombre}
            style={{ height: '100%', objectFit: 'cover', width: '100%' }}
            onError={handleImageError}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 bg-light">
            <span className="text-muted">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted small">{producto.descripcion}</p>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-info text-capitalize">{producto.categoria || 'Sin categoría'}</span>
            <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado'}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-primary">
              ${producto.precio.toFixed(2)}
            </h5>
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddCart) onAddCart(producto);
              }}
              disabled={producto.stock <= 0}
            >
              <i className="bi bi-cart-plus"></i> Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

