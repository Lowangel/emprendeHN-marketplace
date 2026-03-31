import { useState } from "react";
import { ClipboardList, MoreVertical, Search, Download } from "lucide-react";
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
import { mockOrders } from "../../data/mockData";
import { toast } from "sonner";

export function AdminOrders() {
  const [filter, setFilter] = useState("all");
  const [orders] = useState(mockOrders);

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const handleAction = (action: string, orderId: string) => {
    toast.info(`Acción "${action}" realizada para pedido ${orderId}`);
  };

  const handleExport = () => {
    toast.success("Reporte de pedidos exportado exitosamente");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Gestión de pedidos</h1>
          <p className="text-slate-600">Administra todos los pedidos del sistema</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Total pedidos</h3>
            <p className="text-3xl font-black text-slate-900">{orders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Entregados</h3>
            <p className="text-3xl font-black text-green-600">
              {orders.filter((o) => o.status === "Entregado").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">En tránsito</h3>
            <p className="text-3xl font-black text-blue-600">
              {orders.filter((o) => o.status === "En tránsito").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm text-slate-600 mb-1">Pendientes</h3>
            <p className="text-3xl font-black text-yellow-600">
              {orders.filter((o) => o.status === "Pendiente").length}
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
                placeholder="Buscar pedidos..."
                className="border-0 focus-visible:ring-0 shadow-none p-0"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Pendiente">Pendientes</SelectItem>
                <SelectItem value="En tránsito">En tránsito</SelectItem>
                <SelectItem value="Entregado">Entregados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.products} productos</TableCell>
                  <TableCell className="font-semibold text-green-600">L {order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Entregado"
                          ? "bg-green-100 text-green-700"
                          : order.status === "En tránsito"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
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
                        <DropdownMenuItem onClick={() => handleAction("Ver detalles", order.id)}>
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Actualizar estado", order.id)}>
                          Actualizar estado
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Contactar cliente", order.id)}>
                          Contactar cliente
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleAction("Cancelar", order.id)}
                        >
                          Cancelar pedido
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
