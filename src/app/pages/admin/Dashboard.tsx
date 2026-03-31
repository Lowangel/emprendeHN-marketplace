import { Users, Package, ShoppingCart, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

export function AdminDashboard() {
  const stats = [
    {
      title: "Usuarios totales",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      change: "+12% vs mes anterior",
      progress: 75,
    },
    {
      title: "Productos activos",
      value: "456",
      icon: Package,
      color: "bg-green-500",
      change: "+8% este mes",
      progress: 85,
    },
    {
      title: "Pedidos totales",
      value: "789",
      icon: ShoppingCart,
      color: "bg-yellow-500",
      change: "45 pendientes",
      progress: 60,
    },
    {
      title: "Ingresos",
      value: "L 125,600",
      icon: DollarSign,
      color: "bg-purple-500",
      change: "+25% vs mes anterior",
      progress: 90,
    },
  ];

  const recentActivities = [
    { type: "user", text: "Nuevo usuario registrado: María López", time: "Hace 5 min" },
    { type: "product", text: "Producto aprobado: Café Orgánico Premium", time: "Hace 15 min" },
    { type: "order", text: "Pedido completado: ORD-456", time: "Hace 30 min" },
    { type: "user", text: "Nuevo proveedor registrado: Finca El Jardín", time: "Hace 1 hora" },
    { type: "alert", text: "Stock bajo: Miel de Abeja Pura", time: "Hace 2 horas" },
  ];

  const alerts = [
    { text: "5 proveedores pendientes de aprobación", severity: "warning" },
    { text: "3 productos con stock bajo", severity: "error" },
    { text: "12 pedidos requieren atención", severity: "warning" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Panel administrativo</h1>
        <p className="text-slate-600">Vista general del marketplace emprendeHN</p>
      </div>

      {/* Alerts */}
      <div className="mb-8 space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-start gap-3 ${
              alert.severity === "error"
                ? "bg-red-50 border border-red-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <AlertCircle
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                alert.severity === "error" ? "text-red-600" : "text-yellow-600"
              }`}
            />
            <p
              className={`text-sm ${
                alert.severity === "error" ? "text-red-900" : "text-yellow-900"
              }`}
            >
              {alert.text}
            </p>
          </div>
        ))}
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
                <p className="text-2xl font-black text-slate-900 mb-2">{stat.value}</p>
                <p className="text-xs text-slate-500 mb-3">{stat.change}</p>
                <Progress value={stat.progress} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === "user"
                        ? "bg-blue-100"
                        : activity.type === "product"
                        ? "bg-green-100"
                        : activity.type === "order"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}
                  >
                    {activity.type === "user" && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === "product" && <Package className="w-4 h-4 text-green-600" />}
                    {activity.type === "order" && <ShoppingCart className="w-4 h-4 text-yellow-600" />}
                    {activity.type === "alert" && <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{activity.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Crecimiento mensual</span>
              </div>
              <p className="text-3xl font-black text-blue-900">+18%</p>
              <p className="text-sm text-blue-700 mt-1">Respecto al mes anterior</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Tasa de conversión</span>
                <span className="font-semibold">3.2%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Satisfacción cliente</span>
                <span className="font-semibold">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Pedidos completados</span>
                <span className="font-semibold">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
