import { Outlet, Link, useLocation } from "react-router";
import logo from "../../assets/Emprende.png"



import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Home,
  Package,
  BarChart3,
  Users,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "../hooks/useCart";

export function Layout() {
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isProvider = location.pathname.startsWith("/provider");
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center">
                <img src={logo} alt="emprendeHN" className="h-10 w-auto max-w-full" />
              </div>
           
            </Link>

            {/* Desktop Navigation */}
            {!isProvider && !isAdmin && (
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-slate-700 hover:text-green-600 transition">
                  Inicio
                </Link>
                <Link to="/catalog" className="text-slate-700 hover:text-green-600 transition">
                  Catálogo
                </Link>
                <Link to="/providers" className="text-slate-700 hover:text-green-600 transition">
                  Proveedores
                </Link>
                <Link to="#" className="text-slate-700 hover:text-green-600 transition">
                  Nosotros
                </Link>
              </nav>
            )}

            {isProvider && (
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/provider"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/provider/products"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Productos
                </Link>
                <Link
                  to="/provider/sales"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Ventas
                </Link>
              </nav>
            )}

            {isAdmin && (
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/admin"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Usuarios
                </Link>
                <Link
                  to="/admin/products"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Productos
                </Link>
                <Link
                  to="/admin/orders"
                  className="text-slate-700 hover:text-green-600 transition flex items-center gap-2"
                >
                  <ClipboardList className="w-4 h-4" />
                  Pedidos
                </Link>
              </nav>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              {!isProvider && !isAdmin && (
                <>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Search className="w-5 h-5" />
                  </Button>
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              {!isProvider && !isAdmin && (
                <nav className="flex flex-col gap-3">
                  <Link to="/" className="text-slate-700 hover:text-green-600 py-2">
                    Inicio
                  </Link>
                  <Link to="/catalog" className="text-slate-700 hover:text-green-600 py-2">
                    Catálogo
                  </Link>
                  <Link to="/providers" className="text-slate-700 hover:text-green-600 py-2">
                    Proveedores
                  </Link>
                  <Link to="#" className="text-slate-700 hover:text-green-600 py-2">
                    Nosotros
                  </Link>
                </nav>
              )}
              {isProvider && (
                <nav className="flex flex-col gap-3">
                  <Link to="/provider" className="text-slate-700 hover:text-green-600 py-2">
                    Dashboard
                  </Link>
                  <Link to="/provider/products" className="text-slate-700 hover:text-green-600 py-2">
                    Productos
                  </Link>
                  <Link to="/provider/sales" className="text-slate-700 hover:text-green-600 py-2">
                    Ventas
                  </Link>
                </nav>
              )}
              {isAdmin && (
                <nav className="flex flex-col gap-3">
                  <Link to="/admin" className="text-slate-700 hover:text-green-600 py-2">
                    Dashboard
                  </Link>
                  <Link to="/admin/users" className="text-slate-700 hover:text-green-600 py-2">
                    Usuarios
                  </Link>
                  <Link to="/admin/products" className="text-slate-700 hover:text-green-600 py-2">
                    Productos
                  </Link>
                  <Link to="/admin/orders" className="text-slate-700 hover:text-green-600 py-2">
                    Pedidos
                  </Link>
                </nav>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <span className="font-black text-white text-lg">eHN</span>
                </div>
                <span className="font-black text-xl">
                  emprende<span className="text-green-400">HN</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Conectando productores rurales con consumidores en Honduras.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/" className="hover:text-green-400 transition">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="hover:text-green-400 transition">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <a href="/providers" className="hover:text-green-400 transition">
                    Proveedores
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Términos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>info@emprende.hn</li>
                <li>+504 1234-5678</li>
                <li>Tegucigalpa, Honduras</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
            © 2026 emprendeHN. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
