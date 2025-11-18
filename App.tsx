import React, { useState, useMemo, useEffect } from 'react';
import type { Product, CartItem, User, Order, OrderStatus, Notification, Role, DeliveryZone, SocialLinks, PaymentMethod, PaymentDetails } from './types';
import { PRODUCTS, USERS, ORDERS as MOCK_ORDERS, DELIVERY_ZONES, INITIAL_SOCIAL_LINKS, PAYMENT_METHODS as INITIAL_PAYMENT_METHODS, INITIAL_PAYMENT_DETAILS } from './constants';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import MessengerDashboard from './components/MessengerDashboard';
import CheckoutModal from './components/CheckoutModal';
import NotificationCenter from './components/NotificationCenter';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import OrderTrackingPage from './components/OrderTrackingPage';
import RegistrationPage from './components/RegistrationPage';
import CustomerOrdersPage from './components/CustomerOrdersPage';
import WhatsappIcon from './components/icons/WhatsappIcon';

const App: React.FC = () => {
  // App State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  
  // UI State
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'login' | 'registration' | 'admin' | 'messenger' | 'customerOrders' | 'orderTracking'>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(USERS);

  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Customization & Settings State
  const [appLogoUrl, setAppLogoUrl] = useState(() => {
    return localStorage.getItem('appLogo') || 'https://i.ibb.co/9g65y9s/agro-en-casa-logo.png';
  });
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(DELIVERY_ZONES);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    return savedLinks ? JSON.parse(savedLinks) : INITIAL_SOCIAL_LINKS;
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(INITIAL_PAYMENT_DETAILS);


  // Derived State
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);
  
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Effects
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setCurrentPage('admin');
    } else if (currentUser?.role === 'messenger') {
      setCurrentPage('messenger');
    } else if (currentUser && (currentPage === 'home' || currentPage === 'login' || currentPage === 'registration')) {
      setCurrentPage('products');
    } else if (!currentUser && ['admin', 'messenger', 'customerOrders'].includes(currentPage)) {
      setCurrentPage('home');
    }
  }, [currentUser, currentPage]);

  // Handlers
  const handleLogin = (email: string, password?: string) => {
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
        setCurrentUser(user);
    }
    return !!user;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleRegister = (name: string, email: string): { success: boolean; message: string } => {
    if (allUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: "Este correo electrónico ya está registrado." };
    }
    const newUser: User = {
        id: Date.now(),
        name,
        email,
        role: 'customer',
    };
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser); // Automatically log in the new user
    return { success: true, message: "Registro exitoso." };
  };

  const handleChangePassword = (userId: number, oldPass: string, newPass: string): { success: boolean; message: string } => {
    const userIndex = allUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, message: "Usuario no encontrado." };
    }
    
    const user = allUsers[userIndex];
    if (user.password !== oldPass) {
      return { success: false, message: "La contraseña actual es incorrecta." };
    }

    const updatedUsers = [...allUsers];
    updatedUsers[userIndex] = { ...user, password: newPass };
    setAllUsers(updatedUsers);

    return { success: true, message: "Contraseña actualizada con éxito." };
  };

  const handleCreateUser = (newUser: Omit<User, 'id'>): { success: boolean; message: string } => {
    if (allUsers.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
        return { success: false, message: "El nombre de usuario ya existe." };
    }

    const userWithId: User = {
        ...newUser,
        id: Date.now(),
    };

    setAllUsers(prev => [...prev, userWithId]);
    return { success: true, message: `Usuario ${newUser.name} creado con éxito.` };
  };

  const handleDeleteUser = (userId: number): { success: boolean; message: string } => {
    if (currentUser?.id === userId) {
        return { success: false, message: "No puedes eliminar tu propia cuenta." };
    }
    setAllUsers(prev => prev.filter(u => u.id !== userId));
    return { success: true, message: "Usuario eliminado." };
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handlePlaceOrder = (customerDetails: { name: string; address: string; phone: string; paymentMethod: string; }, deliveryCost: number) => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: orders.length + 1,
      orderNumber: `AEC-${Date.now()}`,
      customerId: currentUser?.id, // Link order to customer
      customerName: customerDetails.name,
      address: customerDetails.address,
      phone: customerDetails.phone,
      date: new Date().toISOString(),
      status: 'Pendiente',
      items: cartItems,
      deliveryCost: deliveryCost,
      total: parseFloat((subtotal + deliveryCost).toFixed(2)),
      paymentMethod: customerDetails.paymentMethod,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    const newNotification: Notification = {
        id: Date.now(),
        message: `Tu pedido ha sido recibido y está pendiente de aprobación.`,
        orderNumber: newOrder.orderNumber,
        date: new Date().toISOString(),
        read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);

    setLastPlacedOrder(newOrder);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };
  
  const handleTrackOrder = () => {
    setIsConfirmationOpen(false);
    setCurrentPage('orderTracking');
  };

  const handleUpdateOrderStatus = (orderId: number, status: OrderStatus) => {
    let updatedOrder: Order | undefined;
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          updatedOrder = { ...order, status };
          return updatedOrder;
        }
        return order;
      })
    );
    
    if (updatedOrder) {
      let message = '';
      if (status === 'Aprobado') {
        message = 'Tu pedido ha sido aprobado y pronto estará en preparación.';
      } else if (status === 'En Preparación') {
        message = '¡Estamos preparando tu pedido! Te avisaremos cuando esté en camino.';
      } else if (status === 'Listo para Mensajería') {
        message = '¡Buenas noticias! Tu pedido está listo y ha sido asignado a un mensajero.';
      } else if (status === 'En Camino') {
        message = 'Tu pedido ya está en camino. ¡Prepárate para recibirlo!';
      } else if (status === 'Entregado') {
        message = '¡Tu pedido ha sido entregado! Gracias por tu compra.';
      }

      if (message) {
        const newNotification: Notification = {
          id: Date.now(),
          message,
          orderNumber: updatedOrder.orderNumber,
          date: new Date().toISOString(),
          read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }
  };
  
  const handleStockUpdate = (productId: number, newStock: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: newStock } : p
      )
    );
  };

  const handlePriceUpdate = (productId: number, newPrice: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, price: newPrice } : p
      )
    );
  };
  
  const handleUpdateLogo = (logoFile: File): { success: boolean, message: string } => {
    if (!logoFile.type.startsWith('image/')) {
        return { success: false, message: 'Por favor, selecciona un archivo de imagen válido.' };
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result as string;
        setAppLogoUrl(result);
        localStorage.setItem('appLogo', result); // Persist to localStorage
    };
    reader.readAsDataURL(logoFile);

    return { success: true, message: "Logo actualizado con éxito." };
  };

  const handleMarkNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  };
  
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };
  
  const handleUpdateDeliveryZones = (zones: DeliveryZone[]) => {
    setDeliveryZones(zones);
  };
  
  const handleUpdateSocialLinks = (links: SocialLinks) => {
    setSocialLinks(links);
    localStorage.setItem('socialLinks', JSON.stringify(links));
  };
  
  const handleUpdatePaymentMethods = (methods: PaymentMethod[]) => {
    setPaymentMethods(methods);
  };
  
  const handleUpdatePaymentDetails = (details: PaymentDetails) => {
    setPaymentDetails(details);
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage 
                  onLogin={handleLogin} 
                  onNavigateToRegister={() => setCurrentPage('registration')} 
               />;
      case 'registration':
        return <RegistrationPage onRegister={handleRegister} onNavigateToLogin={() => setCurrentPage('login')} />;
      case 'products':
        return <ProductList products={products} onAddToCart={handleAddToCart} />;
      case 'admin':
        return <AdminDashboard 
                  orders={orders} 
                  products={products}
                  deliveryZones={deliveryZones}
                  socialLinks={socialLinks}
                  paymentMethods={paymentMethods}
                  paymentDetails={paymentDetails}
                  onUpdateStatus={handleUpdateOrderStatus} 
                  onStockUpdate={handleStockUpdate}
                  onPriceUpdate={handlePriceUpdate}
                  onUpdateDeliveryZones={handleUpdateDeliveryZones}
                  currentUser={currentUser}
                  onChangePassword={handleChangePassword}
                  allUsers={allUsers}
                  onCreateUser={handleCreateUser}
                  onDeleteUser={handleDeleteUser}
                  onUpdateLogo={handleUpdateLogo}
                  onUpdateSocialLinks={handleUpdateSocialLinks}
                  onUpdatePaymentMethods={handleUpdatePaymentMethods}
                  onUpdatePaymentDetails={handleUpdatePaymentDetails}
               />;
      case 'messenger':
        const messengerOrders = orders.filter(o => o.status === 'Listo para Mensajería' || o.status === 'En Camino');
        return <MessengerDashboard orders={messengerOrders} onUpdateStatus={handleUpdateOrderStatus} />;
       case 'customerOrders':
        const customerOrders = orders.filter(o => o.customerId === currentUser?.id);
        return <CustomerOrdersPage orders={customerOrders} />;
      case 'orderTracking':
        return <OrderTrackingPage order={lastPlacedOrder} onNavigate={() => setCurrentPage('products')} />;
      case 'home':
      default:
        return <HomePage onNavigate={() => setCurrentPage('products')} appLogoUrl={appLogoUrl} />;
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-text-primary flex flex-col">
      <Navbar 
        user={currentUser}
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
        unreadNotificationCount={unreadNotificationCount}
        appLogoUrl={appLogoUrl}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <Footer socialLinks={socialLinks} />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        cartItems={cartItems}
        deliveryZones={deliveryZones}
        paymentMethods={paymentMethods}
        paymentDetails={paymentDetails}
      />
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationAsRead}
        onClearAll={handleClearAllNotifications}
      />
      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onTrackOrder={handleTrackOrder}
        order={lastPlacedOrder}
      />

      {socialLinks.whatsapp && !['admin', 'messenger', 'login', 'registration'].includes(currentPage) && (
         <a
            href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform hover:scale-110"
            aria-label="Contactar por WhatsApp"
          >
            <WhatsappIcon className="w-8 h-8" />
         </a>
      )}
    </div>
  );
};

export default App;