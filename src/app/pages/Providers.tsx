import { useState } from "react";
import { Plus, MoreVertical, Search, User, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { categories } from "../data/mockData";
import { useProviders } from "../hooks/useProviders";
import { toast } from "sonner";

export function Providers() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<any>(null);
  const { providers, addProvider, updateProvider, deleteProvider } = useProviders();

  const [formData, setFormData] = useState<{
    name: string;
    contact: string;
    email: string;
    phone: string;
    location: string;
    category: string;
    status: "Activo" | "Inactivo" | "Pendiente";
    description: string;
  }>({
    name: "",
    contact: "",
    email: "",
    phone: "",
    location: "",
    category: "",
    status: "Activo",
    description: "",
  });

  const filteredProviders = providers.filter((provider) => {
    const matchesCategory = filter === "all" || filter === "Variedades" || provider.category === filter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      provider.name.toLowerCase().includes(query) ||
      provider.contact.toLowerCase().includes(query) ||
      provider.email.toLowerCase().includes(query) ||
      provider.location.toLowerCase().includes(query) ||
      provider.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleAction = (action: string, providerName: string, providerId?: string) => {
    if (action === "Eliminar" && providerId) {
      deleteProvider(providerId);
      toast.success(`Proveedor "${providerName}" eliminado`);
    } else if (action === "Editar" && providerId) {
      const provider = providers.find(p => p.id === providerId);
      if (provider) {
        setEditingProvider(provider);
        setFormData({
          name: provider.name,
          contact: provider.contact,
          email: provider.email,
          phone: provider.phone,
          location: provider.location,
          category: provider.category,
          status: provider.status,
          description: provider.description,
        });
        setIsDialogOpen(true);
      }
    } else {
      toast.info(`Acción "${action}" realizada para ${providerName}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProvider) {
      updateProvider(editingProvider.id, formData);
      toast.success("Proveedor actualizado exitosamente");
    } else {
      addProvider({
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      });
      toast.success("Proveedor agregado exitosamente");
    }
    setIsDialogOpen(false);
    setEditingProvider(null);
    setFormData({
      name: "",
      contact: "",
      email: "",
      phone: "",
      location: "",
      category: "",
      status: "Activo",
      description: "",
    });
  };

  const openAddDialog = () => {
    setEditingProvider(null);
    setFormData({
      name: "",
      contact: "",
      email: "",
      phone: "",
      location: "",
      category: "",
      status: "Activo",
      description: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Gestión de proveedores</h1>
          <p className="text-slate-600">Administra todos los proveedores del marketplace</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingProvider ? "Editar Proveedor" : "Agregar Nuevo Proveedor"}
              </DialogTitle>
              <DialogDescription>
                {editingProvider
                  ? "Modifica la información del proveedor"
                  : "Ingresa la información del nuevo proveedor"
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contacto
                  </Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Estado
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "Activo" | "Inactivo" | "Pendiente") =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {editingProvider ? "Actualizar" : "Agregar"} Proveedor
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Total proveedores</h3>
            <p className="text-3xl font-black text-slate-900">{providers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Activos</h3>
            <p className="text-3xl font-black text-green-600">
              {providers.filter((p) => p.status === "Activo").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Pendientes</h3>
            <p className="text-3xl font-black text-yellow-600">
              {providers.filter((p) => p.status === "Pendiente").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Categorías</h3>
            <p className="text-3xl font-black text-blue-600">
              {new Set(providers.map(p => p.category)).size}
            </p>
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
                placeholder="Buscar proveedores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Proveedores ({filteredProviders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-semibold max-w-[200px]">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      {provider.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        {provider.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {provider.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {provider.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {provider.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        provider.status === "Activo"
                          ? "bg-green-100 text-green-700"
                          : provider.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {provider.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction("Ver detalles", provider.name)}>
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Editar", provider.name, provider.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleAction("Eliminar", provider.name, provider.id)}
                        >
                          Eliminar
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