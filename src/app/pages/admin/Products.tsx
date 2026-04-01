import { useState } from "react";
import { Package, MoreVertical, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { categories } from "../../data/mockData";
import { useProducts } from "../../hooks/useProducts";
import { toast } from "sonner";

export function AdminProducts() {
  const [filter, setFilter] = useState("all");
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  const handleAction = (action: string, productName: string, productId?: string) => {
    if (action === "Desactivar" && productId) {
      deleteProduct(productId);
      toast.success(`Producto "${productName}" desactivado`);
    } else {
      toast.info(`Acción "${action}" realizada para ${productName}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Gestión de productos</h1>
          <p className="text-slate-600">Administra todos los productos del marketplace</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Total productos</h3>
            <p className="text-3xl font-black text-slate-900">{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Activos</h3>
            <p className="text-3xl font-black text-green-600">
              {products.filter((p) => p.stock > 0).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Stock bajo</h3>
            <p className="text-3xl font-black text-yellow-600">
              {products.filter((p) => p.stock > 0 && p.stock <= 30).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Categorías</h3>
            <p className="text-3xl font-black text-blue-600">{categories.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg">
              <Search className="w-5 h-5 text-slate-400" />
              <Input
                placeholder="Buscar productos..."
                className="border-0 focus-visible:ring-0 shadow-none p-0"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
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
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Productos ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-semibold max-w-[250px]">{product.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>{product.provider}</TableCell>
                  <TableCell className="font-semibold text-green-600">L {product.price}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.stock > 50
                          ? "bg-green-100 text-green-700"
                          : product.stock > 30
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>⭐ {product.rating}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction("Ver detalles", product.name)}>
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Editar", product.name)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Destacar", product.name)}>
                          Destacar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleAction("Desactivar", product.name, product.id)}
                        >
                          Desactivar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
