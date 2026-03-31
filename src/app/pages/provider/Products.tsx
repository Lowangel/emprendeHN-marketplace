import { useState } from "react";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { mockProducts } from "../../data/mockData";
import { toast } from "sonner";

export function ProviderProducts() {
  const [products] = useState(mockProducts.slice(0, 5));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Producto agregado exitosamente");
    setIsDialogOpen(false);
    setFormData({ name: "", category: "", price: "", stock: "", description: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Mis productos</h1>
          <p className="text-slate-600">Gestiona tu inventario de productos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Agregar producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar nuevo producto</DialogTitle>
              <DialogDescription>
                Completa la información del producto que deseas vender
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del producto</Label>
                <Input
                  id="name"
                  required
                  placeholder="Café Orgánico Premium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <select
                  id="category"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Café">Café</option>
                  <option value="Frutas">Frutas</option>
                  <option value="Granos">Granos</option>
                  <option value="Miel">Miel</option>
                  <option value="Cacao">Cacao</option>
                  <option value="Lácteos">Lácteos</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (L)</Label>
                  <Input
                    id="price"
                    required
                    type="number"
                    placeholder="250"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Cantidad en stock</Label>
                  <Input
                    id="stock"
                    required
                    type="number"
                    placeholder="45"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <textarea
                  id="description"
                  required
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder="Describe tu producto..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Guardar producto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-semibold">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-semibold text-green-600">L {product.price}</TableCell>
                  <TableCell>{product.stock} unidades</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.stock > 20
                          ? "bg-green-100 text-green-700"
                          : product.stock > 10
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 20 ? "En stock" : product.stock > 10 ? "Bajo stock" : "Crítico"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => toast.info("Función de edición en desarrollo")}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => toast.info("Función de eliminación en desarrollo")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No tienes productos registrados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
