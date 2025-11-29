import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { productosService } from '../../services/ecommerce/productos.services';
import type { Producto } from '../../services/ecommerce/productos.services';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        if (!id) return;
        const data = await productosService.obtenerProductoPorId(parseInt(id));
        setProducto(data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) return <div className="text-center my-5">Cargando...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;
  if (!producto) return <div className="alert alert-warning my-5">Producto no encontrado</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            {producto.imagen ? (
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center" style={{ height: '300px', backgroundColor: '#f8f9fa' }}>
                <span className="text-muted">Imagen no disponible</span>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="mb-4">{producto.nombre}</h1>
          <p className="h3 text-primary mb-4">${producto.precio.toFixed(2)}</p>
          
          <div className="mb-4">
            <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'} me-2`}>
              {producto.stock > 0 ? 'En stock' : 'Agotado'}
            </span>
            <span className="badge bg-info text-capitalize">
              {producto.categoria || 'Sin categoría'}
            </span>
          </div>

          <div className="mb-4">
            <h5>Descripción</h5>
            <p className="text-muted">{producto.descripcion || 'Sin descripción disponible'}</p>
          </div>

          <div className="d-flex gap-2">
            <button 
              className="btn btn-primary"
              disabled={producto.stock <= 0}
              onClick={() => {/* Agregar al carrito */}}
            >
              Agregar al carrito
            </button>
            <button className="btn btn-outline-secondary">
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
