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
import { mockUsers } from "../../data/mockData";
import { toast } from "sonner";

export function AdminUsers() {
  const [filter, setFilter] = useState("all");
  const [users] = useState(mockUsers);

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.type === filter;
  });

  const handleAction = (action: string, userName: string) => {
    toast.info(`Acción "${action}" realizada para ${userName}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Gestión de usuarios</h1>
          <p className="text-slate-600">Administra todos los usuarios del sistema</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Agregar usuario
        </Button>
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
                        <DropdownMenuItem onClick={() => handleAction("Ver perfil", user.name)}>
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Editar", user.name)}>
                          Editar
                        </DropdownMenuItem>
                        {user.status === "Pendiente" && (
                          <DropdownMenuItem onClick={() => handleAction("Aprobar", user.name)}>
                            Aprobar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleAction("Suspender", user.name)}
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
