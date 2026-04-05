import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import { Star, MapPin, Minus, Plus, ShoppingCart, Store, Truck, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Producto no encontrado</h2>
        <Link to="/catalog">
          <Button variant="outline">Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} agregado al carrito`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} agregado al carrito`);
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-slate-600">
        <Link to="/" className="hover:text-green-600">
          Inicio
        </Link>
        {" / "}
        <Link to="/catalog" className="hover:text-green-600">
          Catálogo
        </Link>
        {" / "}
        <span className="text-slate-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-slate-200">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">{product.location}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{product.stock} disponibles</span>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-black text-green-600">L {product.price}</span>
            <span className="text-slate-600 ml-2">por unidad</span>
          </div>

          <p className="text-slate-700 mb-8 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">Cantidad</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <span className="text-slate-600 ml-2">
                Total: L {(product.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              size="lg"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleBuyNow}
            >
              Comprar ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Agregar al carrito
            </Button>
          </div>

          {/* Provider Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Store className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Vendido por</p>
                  <p className="font-semibold text-slate-900">{product.provider}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">Envío rápido</p>
                <p className="text-xs text-slate-600">Entrega en 2-3 días</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">Compra segura</p>
                <p className="text-xs text-slate-600">100% garantizado</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900">Calidad</p>
                <p className="text-xs text-slate-600">Productos frescos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-6">Productos similares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition group">
                  <div className="aspect-square overflow-hidden bg-slate-200">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-green-600">L {relatedProduct.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
