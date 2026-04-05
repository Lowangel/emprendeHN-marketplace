import { useState } from "react";
import { UserPlus, MoreVertical, Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { useUsers } from "../../hooks/useUsers";
import { toast } from "sonner";

export function AdminUsers() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    type: "Consumidor" as "Consumidor" | "Proveedor",
  });
  const { users, updateUser, addUser } = useUsers();

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "all" || user.type === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (action: string, userId: string, userName: string) => {
    switch (action) {
      case "Aprobar":
        updateUser(userId, { status: "Activo" });
        toast.success(`Usuario ${userName} aprobado`);
        break;
      case "Suspender":
        updateUser(userId, { status: "Suspendido" });
        toast.success(`Usuario ${userName} suspendido`);
        break;
      case "Ver perfil":
        toast.info(`Ver perfil de ${userName}`);
        break;
      case "Editar":
        toast.info(`Editar usuario ${userName}`);
        break;
      default:
        toast.info(`Acción "${action}" realizada para ${userName}`);
    }
  };

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    addUser({
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      type: newUser.type,
      status: "Activo",
      joinDate: new Date().toISOString().split('T')[0],
    });

    toast.success(`Usuario ${newUser.name} agregado exitosamente`);
    setNewUser({ name: "", email: "", type: "Consumidor" });
    setIsAddUserOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Gestión de usuarios</h1>
          <p className="text-slate-600">Administra todos los usuarios del sistema</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar nuevo usuario</DialogTitle>
              <DialogDescription>
                Completa la información del nuevo usuario. Se creará con estado "Activo".
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Nombre completo"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                  placeholder="usuario@email.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={newUser.type}
                  onValueChange={(value: "Consumidor" | "Proveedor") =>
                    setNewUser({ ...newUser, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consumidor">Consumidor</SelectItem>
                    <SelectItem value="Proveedor">Proveedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddUser}>
                Agregar usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Total usuarios</h3>
            <p className="text-3xl font-black text-slate-900">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Consumidores</h3>
            <p className="text-3xl font-black text-blue-600">
              {users.filter((u) => u.type === "Consumidor").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Proveedores</h3>
            <p className="text-3xl font-black text-green-600">
              {users.filter((u) => u.type === "Proveedor").length}
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
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 shadow-none p-0"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los usuarios</SelectItem>
                <SelectItem value="Consumidor">Consumidores</SelectItem>
                <SelectItem value="Proveedor">Proveedores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-semibold">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.type === "Proveedor"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction("Ver perfil", user.id, user.name)}>
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Editar", user.id, user.name)}>
                          Editar
                        </DropdownMenuItem>
                        {user.status === "Pendiente" && (
                          <DropdownMenuItem onClick={() => handleAction("Aprobar", user.id, user.name)}>
                            Aprobar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleAction("Suspender", user.id, user.name)}
                        >
                          Suspender
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
