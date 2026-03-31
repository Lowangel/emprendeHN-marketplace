import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    businessName: "",
  });

  const handleRegister = (userType: string) => {
    // Simulación de registro
    if (userType === "provider") {
      navigate("/provider");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="font-black text-white text-xl">eHN</span>
            </div>
            <span className="font-black text-2xl text-slate-900">
              emprende<span className="text-green-600">HN</span>
            </span>
          </Link>
          <p className="text-slate-600 mt-2">Crea tu cuenta en emprendeHN</p>
        </div>

        <Tabs defaultValue="consumer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="consumer">Consumidor</TabsTrigger>
            <TabsTrigger value="provider">Proveedor</TabsTrigger>
          </TabsList>

          <TabsContent value="consumer">
            <Card>
              <CardHeader>
                <CardTitle>Registro de consumidor</CardTitle>
                <CardDescription>Completa tus datos para comenzar a comprar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-consumer">Nombre completo</Label>
                  <Input
                    id="name-consumer"
                    placeholder="María López"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-consumer">Correo electrónico</Label>
                  <Input
                    id="email-consumer"
                    type="email"
                    placeholder="maria@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-consumer">Teléfono</Label>
                  <Input
                    id="phone-consumer"
                    placeholder="+504 1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-consumer">Dirección de entrega</Label>
                  <Input
                    id="address-consumer"
                    placeholder="Col. Palmira, Tegucigalpa"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-consumer">Contraseña</Label>
                  <Input
                    id="password-consumer"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleRegister("consumer")}
                >
                  Crear cuenta
                </Button>
                <div className="text-center text-sm text-slate-600">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="text-green-600 hover:underline">
                    Inicia sesión
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="provider">
            <Card>
              <CardHeader>
                <CardTitle>Registro de proveedor</CardTitle>
                <CardDescription>Comienza a vender tus productos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nombre del negocio</Label>
                  <Input
                    id="business-name"
                    placeholder="Finca Los Pinos"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name-provider">Nombre del responsable</Label>
                  <Input
                    id="name-provider"
                    placeholder="Carlos Hernández"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Correo electrónico</Label>
                  <Input
                    id="email-provider"
                    type="email"
                    placeholder="carlos@fincalospinos.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-provider">Teléfono</Label>
                  <Input
                    id="phone-provider"
                    placeholder="+504 9876-5432"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-provider">Ubicación del negocio</Label>
                  <Input
                    id="address-provider"
                    placeholder="Copán, Honduras"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-provider">Contraseña</Label>
                  <Input
                    id="password-provider"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleRegister("provider")}
                >
                  Registrar negocio
                </Button>
                <div className="text-center text-sm text-slate-600">
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login" className="text-green-600 hover:underline">
                    Inicia sesión
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
