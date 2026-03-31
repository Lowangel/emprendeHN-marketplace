import { Link } from "react-router";
import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { mockProducts } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Separator } from "../components/ui/separator";

export function Cart() {
  const [cartItems, setCartItems] = useState([
    { product: mockProducts[0], quantity: 2 },
    { product: mockProducts[1], quantity: 1 },
    { product: mockProducts[3], quantity: 1 },
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, newQuantity)) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">Tu carrito está vacío</h2>
          <p className="text-slate-600 mb-6">
            Agrega productos al carrito para comenzar tu compra
          </p>
          <Link to="/catalog">
            <Button className="bg-green-600 hover:bg-green-700">
              Explorar productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Carrito de compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-slate-900 hover:text-green-600 transition">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-slate-600">{item.product.provider}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-green-600 text-lg">
                          L {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">L {item.product.price} c/u</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-black text-slate-900 mb-4">Resumen del pedido</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal ({cartItems.length} productos)</span>
                  <span>L {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Envío</span>
                  <span>L {shipping.toFixed(2)}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between mb-6">
                <span className="font-black text-slate-900 text-lg">Total</span>
                <span className="font-black text-green-600 text-xl">L {total.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Proceder al pago
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" className="w-full mt-3">
                  Seguir comprando
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
