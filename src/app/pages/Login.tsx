import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (userType: string) => {
    // Simulación de login
    if (userType === "provider") {
      navigate("/provider");
    } else if (userType === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="font-black text-white text-xl">eHN</span>
            </div>
            <span className="font-black text-2xl text-slate-900">
              emprende<span className="text-green-600">HN</span>
            </span>
          </Link>
          <p className="text-slate-600 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        <Tabs defaultValue="consumer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="consumer">Consumidor</TabsTrigger>
            <TabsTrigger value="provider">Proveedor</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="consumer">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido de vuelta</CardTitle>
                <CardDescription>Ingresa tus datos para continuar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-consumer">Correo electrónico</Label>
                  <Input
                    id="email-consumer"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-consumer">Contraseña</Label>
                  <Input
                    id="password-consumer"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-green-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleLogin("consumer")}
                >
                  Iniciar sesión
                </Button>
                <div className="text-center text-sm text-slate-600">
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" className="text-green-600 hover:underline">
                    Regístrate
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="provider">
            <Card>
              <CardHeader>
                <CardTitle>Portal de proveedores</CardTitle>
                <CardDescription>Accede a tu panel de proveedor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Correo electrónico</Label>
                  <Input
                    id="email-provider"
                    type="email"
                    placeholder="proveedor@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-provider">Contraseña</Label>
                  <Input
                    id="password-provider"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleLogin("provider")}
                >
                  Acceder al panel
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Panel administrativo</CardTitle>
                <CardDescription>Acceso solo para administradores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-admin">Correo electrónico</Label>
                  <Input
                    id="email-admin"
                    type="email"
                    placeholder="admin@emprendehn.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-admin">Contraseña</Label>
                  <Input
                    id="password-admin"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleLogin("admin")}
                >
                  Acceder como admin
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
