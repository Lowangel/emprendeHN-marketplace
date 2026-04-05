import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { categories } from "../data/mockData";
import { useProducts } from "../hooks/useProducts";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function Catalog() {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [location, setLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category ?? "all");
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
    if (priceRange === "low" && product.price > 100) return false;
    if (priceRange === "medium" && (product.price <= 100 || product.price > 200)) return false;
    if (priceRange === "high" && product.price <= 200) return false;
    if (location !== "all" && product.location !== location) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Catálogo de productos
        </h1>
        <p className="text-slate-600">
          Descubre productos frescos directamente de productores hondureños
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
            <Search className="w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar productos..."
              className="border-0 focus-visible:ring-0 shadow-none p-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Hasta L 100</SelectItem>
                <SelectItem value="medium">L 100 - L 200</SelectItem>
                <SelectItem value="high">Más de L 200</SelectItem>
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                <SelectItem value="Copán">Copán</SelectItem>
                <SelectItem value="Comayagua">Comayagua</SelectItem>
                <SelectItem value="Intibucá">Intibucá</SelectItem>
                <SelectItem value="La Ceiba">La Ceiba</SelectItem>
                <SelectItem value="Olancho">Olancho</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== "all" || priceRange !== "all" || location !== "all") && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-600">Filtros activos:</span>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="h-7"
              >
                "{searchQuery}" ×
              </Button>
            )}
            {selectedCategory !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="h-7"
              >
                {selectedCategory} ×
              </Button>
            )}
            {priceRange !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPriceRange("all")}
                className="h-7"
              >
                {priceRange === "low" && "Hasta L 100 ×"}
                {priceRange === "medium" && "L 100 - L 200 ×"}
                {priceRange === "high" && "Más de L 200 ×"}
              </Button>
            )}
            {location !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("all")}
                className="h-7"
              >
                {location} ×
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-600">
          Mostrando <span className="font-semibold">{filteredProducts.length}</span> productos
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition group h-full">
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
                <p className="text-xs text-slate-500 mb-2">{product.category}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-slate-500 ml-1">({product.stock} disponibles)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-green-600 text-lg">L {product.price}</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Ver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
            <SlidersHorizontal className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-slate-600 mb-4">
            Intenta ajustar los filtros para ver más resultados
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setPriceRange("all");
              setLocation("all");
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
