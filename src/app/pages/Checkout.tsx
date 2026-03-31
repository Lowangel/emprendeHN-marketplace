import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { CreditCard, Truck, MapPin, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { toast } from "sonner";

export function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Pedido realizado con éxito! Te contactaremos pronto.");
    setTimeout(() => navigate("/"), 2000);
  };

  const subtotal = 750;
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Finalizar compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </div>
                  Información de entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    required
                    placeholder="María López"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    required
                    placeholder="+504 1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección completa</Label>
                  <Input
                    id="address"
                    required
                    placeholder="Col. Palmira, Calle Principal, Casa #123"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <select
                    id="city"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="">Seleccionar ciudad</option>
                    <option value="Tegucigalpa">Tegucigalpa</option>
                    <option value="San Pedro Sula">San Pedro Sula</option>
                    <option value="La Ceiba">La Ceiba</option>
                    <option value="Comayagua">Comayagua</option>
                    <option value="Choluteca">Choluteca</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                    2
                  </div>
                  Método de pago
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Tarjeta de crédito/débito</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        <span>Pago contra entrega</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input
                        id="cardName"
                        required
                        placeholder="MARÍA LÓPEZ"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Vencimiento</Label>
                        <Input
                          id="expiry"
                          required
                          placeholder="MM/AA"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-900 mt-4">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>
                        El pago se realizará en efectivo al momento de la entrega. Ten el monto
                        exacto preparado.
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal</span>
                    <span>L {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Envío</span>
                    <span>L {shipping.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-black text-slate-900">Total</span>
                  <span className="font-black text-green-600 text-xl">L {total.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Envío en 2-3 días hábiles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Productos frescos garantizados</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Soporte al cliente 24/7</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Confirmar pedido
                </Button>
                <Link to="/cart">
                  <Button variant="outline" className="w-full">
                    Volver al carrito
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
