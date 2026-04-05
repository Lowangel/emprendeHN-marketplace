export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  location: string;
  image: string;
  description: string;
  stock: number;
  provider: string;
  rating: number;
}

export interface Provider {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  category: string;
  status: 'Activo' | 'Inactivo' | 'Pendiente';
  joinDate: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    provider: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Pendiente' | 'Completada' | 'Cancelada';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'Consumidor' | 'Proveedor';
  status: 'Activo' | 'Pendiente' | 'Suspendido';
  joinDate: string;
}

export const initialProducts: Product[] = [
  // ← aquí pegas exactamente todos tus productos que ya tienes
  {
    id: "1",
    name: "Café Orgánico de Copán",
    category: "Café",
    price: 250,
    location: "Copán",
    image: "https://images.unsplash.com/photo-1649372639648-cf9efb47c184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGZhcm18ZW58MXx8fHwxNzczNTIyNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Café 100% orgánico cultivado en las montañas de Copán. Sabor intenso y aroma natural.",
    stock: 45,
    provider: "Finca Los Pinos",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Miel de Abeja Pura",
    category: "Miel",
    price: 180,
    location: "Comayagua",
    image: "https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMG5hdHVyYWx8ZW58MXx8fHwxNzczNDU4MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Miel pura de abeja sin procesar, directo de las colmenas de Comayagua.",
    stock: 30,
    provider: "Apiarios El Bosque",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Frijoles Rojos Orgánicos",
    category: "Granos",
    price: 85,
    location: "Intibucá",
    image: "https://images.unsplash.com/photo-1654815439629-5e93cb7f74a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBiZWFucyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MzUyMjc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Frijoles rojos de alta calidad, cultivados sin químicos ni pesticidas.",
    stock: 120,
    provider: "Cooperativa La Esperanza",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Chocolate Artesanal",
    category: "Cacao",
    price: 320,
    location: "La Ceiba",
    image: "https://images.unsplash.com/photo-1569622701449-32fe4e90e492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hvY29sYXRlJTIwYmFyfGVufDF8fHx8MTc3MzQ0MzU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Chocolate artesanal elaborado con cacao hondureño de primera calidad.",
    stock: 25,
    provider: "Cacao del Atlántico",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Plátanos Verdes",
    category: "Frutas",
    price: 45,
    location: "El Progreso",
    image: "https://images.unsplash.com/photo-1708798493094-630a4288b096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50YWlucyUyMGZyZXNofGVufDF8fHx8MTc3MzUyMjc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Plátanos verdes frescos, ideales para tostones y tajadas.",
    stock: 200,
    provider: "Frutas del Valle",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Aguacate Hass",
    category: "Frutas",
    price: 65,
    location: "Santa Bárbara",
    image: "https://images.unsplash.com/photo-1757332914587-6d3e174e0e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwZnJlc2glMjBncmVlbnxlbnwxfHx8fDE3NzM0MzQ4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Aguacates Hass de excelente calidad y cremosidad.",
    stock: 90,
    provider: "Huertos San José",
    rating: 4.8,
  },
  {
    id: "7",
    name: "Queso Fresco Artesanal",
    category: "Lácteos",
    price: 120,
    location: "Olancho",
    image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoZWVzZSUyMGRhaXJ5fGVufDF8fHx8MTc3MzUyMjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Queso fresco artesanal elaborado con leche de vacas de pastoreo.",
    stock: 35,
    provider: "Lácteos Don Pedro",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Tortillas de Maíz",
    category: "Granos",
    price: 35,
    location: "Choluteca",
    image: "https://images.unsplash.com/photo-1688940737480-bee66f221b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwdG9ydGlsbGFzJTIwZnJlc2h8ZW58MXx8fHwxNzczNTIyNzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Tortillas de maíz hechas a mano, tradicionales y frescas.",
    stock: 150,
    provider: "Tortillería La Tradición",
    rating: 4.5,
  },
  // ... resto de productos
];


export const initialProviders: Provider[] = [
  {
    id: "1",
    name: "Finca Los Pinos",
    contact: "Juan Pérez",
    email: "juan@fincalospinos.hn",
    phone: "+504 9876-5432",
    location: "Copán",
    category: "Café",
    status: "Activo",
    joinDate: "2023-06-15",
    description: "Finca dedicada al cultivo de café orgánico en las montañas de Copán.",
  },
  {
    id: "2",
    name: "Apiarios El Bosque",
    contact: "María González",
    email: "maria@apiarioselbosque.hn",
    phone: "+504 9876-5433",
    location: "Comayagua",
    category: "Miel",
    status: "Activo",
    joinDate: "2023-08-20",
    description: "Productores de miel pura de abeja con más de 10 años de experiencia.",
  },
  {
    id: "3",
    name: "Cooperativa La Esperanza",
    contact: "Carlos Rodríguez",
    email: "carlos@cooperativalaesperanza.hn",
    phone: "+504 9876-5434",
    location: "Intibucá",
    category: "Granos",
    status: "Activo",
    joinDate: "2023-05-10",
    description: "Cooperativa de agricultores orgánicos especializados en frijoles y granos.",
  },
  {
    id: "4",
    name: "Cacao del Atlántico",
    contact: "Ana López",
    email: "ana@cacaodelatlantico.hn",
    phone: "+504 9876-5435",
    location: "La Ceiba",
    category: "Cacao",
    status: "Activo",
    joinDate: "2023-09-01",
    description: "Especialistas en chocolate artesanal y productos derivados del cacao hondureño.",
  },
  {
    id: "5",
    name: "Frutas del Valle",
    contact: "Pedro Martínez",
    email: "pedro@frutasdelvalle.hn",
    phone: "+504 9876-5436",
    location: "El Progreso",
    category: "Frutas",
    status: "Activo",
    joinDate: "2023-07-25",
    description: "Cultivadores de frutas frescas y plátanos en el valle de Sula.",
  },
];


// Función para calcular el conteo de productos por categoría
const getCategoryCount = (categoryName: string) => {
  return initialProducts.filter(product => product.category === categoryName).length;
};

export const categories = [
  { name: "Café", icon: "Coffee", count: getCategoryCount("Café") },
  { name: "Frutas", icon: "Apple", count: getCategoryCount("Frutas") },
  { name: "Granos", icon: "Wheat", count: getCategoryCount("Granos") },
  { name: "Miel", icon: "Droplets", count: getCategoryCount("Miel") },
  { name: "Cacao", icon: "Cookie", count: getCategoryCount("Cacao") },
  { name: "Lácteos", icon: "Milk", count: getCategoryCount("Lácteos") },
  { name: "Variedades", icon: "Package", count: getCategoryCount("Variedades") },
];

export const initialUsers: User[] = [
  {
    id: "1",
    name: "María López",
    email: "maria@email.com",
    type: "Consumidor" as const,
    status: "Activo" as const,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Carlos Hernández",
    email: "carlos@email.com",
    type: "Proveedor" as const,
    status: "Activo" as const,
    joinDate: "2023-11-20",
  },
  {
    id: "3",
    name: "Ana Martínez",
    email: "ana@email.com",
    type: "Consumidor" as const,
    status: "Activo" as const,
    joinDate: "2024-02-10",
  },
  {
    id: "4",
    name: "José Ramírez",
    email: "jose@email.com",
    type: "Proveedor" as const,
    status: "Pendiente" as const,
    joinDate: "2024-03-05",
  },
];

export const mockOrders = [
  {
    id: "ORD-001",
    customer: "María López",
    products: 3,
    total: 485,
    status: "Entregado",
    date: "2024-03-10",
  },
  {
    id: "ORD-002",
    customer: "Ana Martínez",
    products: 2,
    total: 370,
    status: "En tránsito",
    date: "2024-03-12",
  },
  {
    id: "ORD-003",
    customer: "Pedro Gómez",
    products: 5,
    total: 625,
    status: "Pendiente",
    date: "2024-03-14",
  },
];

export const mockSales = [
  {
    id: "SALE-001",
    product: "Café Orgánico de Copán",
    quantity: 10,
    total: 2500,
    customer: "María López",
    date: "2024-03-10",
    status: "Completada",
  },
  {
    id: "SALE-002",
    product: "Miel de Abeja Pura",
    quantity: 5,
    total: 900,
    customer: "Ana Martínez",
    date: "2024-03-11",
    status: "Completada",
  },
  {
    id: "SALE-003",
    product: "Chocolate Artesanal",
    quantity: 3,
    total: 960,
    customer: "Pedro Gómez",
    date: "2024-03-12",
    status: "Pendiente",
  },
];