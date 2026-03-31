import { Link } from "react-router";
import { Package, TrendingUp, DollarSign, ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { mockSales } from "../../data/mockData";

export function ProviderDashboard() {
  const stats = [
    {
      title: "Productos activos",
      value: "12",
      icon: Package,
      color: "bg-blue-500",
      change: "+2 este mes",
    },
    {
      title: "Ventas totales",
      value: "L 45,600",
      icon: DollarSign,
      color: "bg-green-500",
      change: "+15% vs mes anterior",
    },
    {
      title: "Pedidos pendientes",
      value: "8",
      icon: ShoppingCart,
      color: "bg-yellow-500",
      change: "2 urgentes",
    },
    {
      title: "Visualizaciones",
      value: "1,234",
      icon: Eye,
      color: "bg-purple-500",
      change: "+45 hoy",
    },
  ];

  const recentSales = mockSales.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Panel de proveedor</h1>
        <p className="text-slate-600">Bienvenido de vuelta, Finca Los Pinos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm text-slate-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ventas recientes</CardTitle>
              <Link to="/provider/sales">
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{sale.product}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell className="font-semibold">L {sale.total}</TableCell>
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/provider/products">
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <Package className="w-4 h-4 mr-2" />
                Agregar producto
              </Button>
            </Link>
            <Link to="/provider/sales">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ver pedidos
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Ver estadísticas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
