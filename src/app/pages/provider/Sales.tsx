import { useState } from "react";
import { Download, TrendingUp, DollarSign, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
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
import { mockSales } from "../../data/mockData";
import { toast } from "sonner";

export function ProviderSales() {
  const [filter, setFilter] = useState("all");
  const [sales] = useState(mockSales);

  const filteredSales = sales.filter((sale) => {
    if (filter === "all") return true;
    return sale.status === filter;
  });

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const completedSales = sales.filter((s) => s.status === "Completada").length;
  const pendingSales = sales.filter((s) => s.status === "Pendiente").length;

  const handleExport = () => {
    toast.success("Reporte exportado exitosamente");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Historial de ventas</h1>
          <p className="text-slate-600">Gestiona y revisa todas tus ventas</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Ingresos totales</h3>
            <p className="text-2xl font-black text-slate-900">L {totalSales.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Ventas completadas</h3>
            <p className="text-2xl font-black text-slate-900">{completedSales}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Ventas pendientes</h3>
            <p className="text-2xl font-black text-slate-900">{pendingSales}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las ventas</SelectItem>
            <SelectItem value="Completada">Completadas</SelectItem>
            <SelectItem value="Pendiente">Pendientes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Ventas ({filteredSales.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell className="max-w-[250px]">{sale.product}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell className="font-semibold text-green-600">L {sale.total}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        sale.status === "Completada"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {sale.status}
                    </span>
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
