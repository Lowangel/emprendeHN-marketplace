import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { BookOpen, Rocket, ShoppingCart, Users, Crown } from "lucide-react";

export function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Sobre Nosotros
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Impulsando el comercio digital en Honduras
        </p>
      </div>

      {/* Quiénes somos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Quiénes somos</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <p className="mb-4">
            Grupo Unicommerce es un equipo enfocado en el desarrollo de soluciones digitales orientadas al comercio electrónico en Honduras. Nuestro objetivo es conectar emprendedores, productores y consumidores mediante herramientas tecnológicas modernas, accesibles y confiables.
          </p>
          <p>
            Nuestra plataforma EmprendeHN Marketplace nace como una iniciativa para impulsar el crecimiento económico local y facilitar la comercialización de productos a través de internet.
          </p>
        </CardContent>
      </Card>

      {/* Misión y Visión */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">
              <BookOpen className="w-5 h-5 inline-block mr-2" />
              Misión
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            Impulsar el comercio digital en Honduras ofreciendo una plataforma accesible que conecte emprendedores con clientes, facilitando la compra y venta de productos de forma segura y eficiente.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">
              <Rocket className="w-5 h-5 inline-block mr-2" />
              Visión
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700">
            Ser una plataforma referente en comercio electrónico nacional que promueva el crecimiento de pequeños y medianos emprendedores mediante tecnología innovadora.
          </CardContent>
        </Card>
      </div>

      {/* Qué hace la plataforma */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">
            <ShoppingCart className="w-5 h-5 inline-block mr-2" />
            Qué hace EmprendeHN Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Nuestra plataforma permite:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">✓</Badge>
              <span>Publicar productos fácilmente</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">✓</Badge>
              <span>Conectar proveedores con clientes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">✓</Badge>
              <span>Facilitar procesos de compra</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">✓</Badge>
              <span>Promover emprendimientos locales</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">✓</Badge>
              <span>Centralizar ventas en un solo lugar</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipo de desarrollo */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">
            <Users className="w-5 h-5 inline-block mr-2" />
            Equipo de desarrollo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Este proyecto es desarrollado por Grupo Unicommerce:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg">Jeshua Bardales</h3>
              <p className="text-gray-600">Desarrollador</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg">Angel Lagos</h3>
              <p className="text-gray-600">Desarrollador</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg">Alexander Alemán</h3>
              <p className="text-gray-600">Desarrollador</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Propietario del proyecto */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <Crown className="w-5 h-5 inline-block mr-2" />
            Propietario del proyecto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="inline-block p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
              <h3 className="font-bold text-xl mb-2">Grupo Unicommerce</h3>
              <p className="text-blue-100">
                Responsable de la arquitectura del sistema y desarrollo del marketplace EmprendeHN.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
