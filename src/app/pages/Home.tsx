import { Link } from "react-router";
import { Search, MapPin, Star, TrendingUp, Shield, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { categories } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-yellow-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              Productos frescos de{" "}
              <span className="text-green-600">Honduras</span> a tu puerta
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              Conectamos productores rurales con consumidores. Compra directo del campo.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Buscar productos..."
                  className="border-0 focus-visible:ring-0 shadow-none"
                />
              </div>
              <div className="flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0">
                <MapPin className="w-5 h-5 text-slate-400" />
                <select className="border-0 bg-transparent text-slate-700 focus:outline-none">
                  <option>Todas las ubicaciones</option>
                  <option>Tegucigalpa</option>
                  <option>San Pedro Sula</option>
                  <option>La Ceiba</option>
                  <option>Comayagua</option>
                </select>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">
            Explora por categoría
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} to="/catalog">
                <Card className="hover:shadow-lg transition cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition">
                      <span className="text-3xl">
                        {category.name === "Café" && "☕"}
                        {category.name === "Frutas" && "🍎"}
                        {category.name === "Granos" && "🌾"}
                        {category.name === "Miel" && "🍯"}
                        {category.name === "Cacao" && "🍫"}
                        {category.name === "Lácteos" && "🥛"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-slate-500">{category.count} productos</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Productos destacados
            </h2>
            <Link to="/catalog">
              <Button variant="outline" className="hidden md:flex">
                Ver todos
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition group">
                  <div className="aspect-square overflow-hidden bg-slate-200">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{product.location}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-green-600 text-lg">
                        L {product.price}
                      </span>
                      <span className="text-xs text-slate-500">
                        {product.stock} disponibles
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/catalog">
              <Button variant="outline">Ver todos los productos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 text-center">
            ¿Por qué emprendeHN?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Apoya lo local</h3>
              <p className="text-slate-600">
                Compra directo a productores hondureños y apoya la economía rural.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Productos frescos</h3>
              <p className="text-slate-600">
                Productos directos del campo, sin intermediarios, más frescos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Envío confiable</h3>
              <p className="text-slate-600">
                Entregamos a domicilio con cuidado y puntualidad garantizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            ¿Eres productor?
          </h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Únete a emprendeHN y llega a miles de clientes en todo Honduras.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
              Registra tu negocio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}