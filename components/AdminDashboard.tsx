import React, { useState, useMemo, useEffect } from 'react';
import type { Order, Product, OrderStatus, PaymentMethod, User, DeliveryZone, SocialLinks, PaymentDetails } from '../types';
import TrashIcon from './icons/TrashIcon';
import BoxIcon from './icons/BoxIcon';
import TagIcon from './icons/TagIcon';
import UsersIcon from './icons/UsersIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import PaletteIcon from './icons/PaletteIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import MapPinIcon from './icons/MapPinIcon';
import SearchIcon from './icons/SearchIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';


interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  deliveryZones: DeliveryZone[];
  socialLinks: SocialLinks;
  paymentMethods: PaymentMethod[];
  paymentDetails: PaymentDetails;
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
  onStockUpdate: (productId: number, newStock: number) => void;
  onPriceUpdate: (productId: number, newPrice: number) => void;
  onUpdateDeliveryZones: (zones: DeliveryZone[]) => void;
  currentUser: User | null;
  onChangePassword: (userId: number, oldPass: string, newPass: string) => { success: boolean; message: string };
  allUsers: User[];
  onCreateUser: (user: Omit<User, 'id'>) => { success: boolean; message: string };
  onDeleteUser: (userId: number) => { success: boolean; message: string };
  onUpdateLogo: (logoFile: File) => { success: boolean, message: string };
  onUpdateSocialLinks: (links: SocialLinks) => void;
  onUpdatePaymentMethods: (methods: PaymentMethod[]) => void;
  onUpdatePaymentDetails: (details: PaymentDetails) => void;
}

const OrderManager: React.FC<{ orders: Order[], onUpdateStatus: (orderId: number, status: OrderStatus) => void }> = ({ orders, onUpdateStatus }) => {
    const statusOptions: OrderStatus[] = ['Pendiente', 'Pendiente de Pago', 'Aprobado', 'En Preparación', 'Listo para Mensajería', 'En Camino', 'Entregado', 'Cancelado'];
    const statusTabs: OrderStatus[] = ['Pendiente', 'Pendiente de Pago', 'Aprobado', 'En Preparación', 'Listo para Mensajería', 'En Camino', 'Entregado'];
    
    const [activeTab, setActiveTab] = useState<OrderStatus>('Pendiente');
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const statusColorMap: Record<OrderStatus, string> = {
        'Pendiente': 'bg-yellow-100 text-yellow-800',
        'Pendiente de Pago': 'bg-orange-100 text-orange-800',
        'Aprobado': 'bg-blue-100 text-blue-800',
        'En Preparación': 'bg-indigo-100 text-indigo-800',
        'Listo para Mensajería': 'bg-purple-100 text-purple-800',
        'En Camino': 'bg-cyan-100 text-cyan-800',
        'Entregado': 'bg-green-100 text-green-800',
        'Cancelado': 'bg-red-100 text-red-800',
    };

    const ordersByStatus = useMemo(() => {
        return orders.reduce((acc, order) => {
            (acc[order.status] = acc[order.status] || []).push(order);
            return acc;
        }, {} as Record<OrderStatus, Order[]>);
    }, [orders]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: 'date' | 'total'; direction: 'desc' | 'asc' }>({ key: 'date', direction: 'desc' });
    
    const [advancedFilters, setAdvancedFilters] = useState({
        dateFrom: '',
        dateTo: '',
        customerName: '',
        paymentMethod: ''
    });
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleAdvancedFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAdvancedFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const ordersForCurrentTab = ordersByStatus[activeTab] || [];

    const clearFilters = () => {
        setSearchTerm('');
        setAdvancedFilters({
            dateFrom: '',
            dateTo: '',
            customerName: '',
            paymentMethod: ''
        });
    };

    const filteredAndSortedOrders = useMemo(() => {
        let filteredOrders = ordersForCurrentTab;

        // General Search
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filteredOrders = filteredOrders.filter(order =>
                order.orderNumber.toLowerCase().includes(lowercasedTerm) ||
                order.customerName.toLowerCase().includes(lowercasedTerm) ||
                order.address.toLowerCase().includes(lowercasedTerm)
            );
        }

        // Advanced Filters
        if (advancedFilters.customerName) {
            filteredOrders = filteredOrders.filter(order => order.customerName.toLowerCase().includes(advancedFilters.customerName.toLowerCase()));
        }
        if (advancedFilters.paymentMethod) {
            filteredOrders = filteredOrders.filter(order => order.paymentMethod === advancedFilters.paymentMethod);
        }
        if (advancedFilters.dateFrom) {
            filteredOrders = filteredOrders.filter(order => new Date(order.date) >= new Date(advancedFilters.dateFrom));
        }
        if (advancedFilters.dateTo) {
            filteredOrders = filteredOrders.filter(order => new Date(order.date) <= new Date(advancedFilters.dateTo + 'T23:59:59'));
        }
        
        // Sorting
        return [...filteredOrders].sort((a, b) => {
            if (sortConfig.key === 'date') {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return sortConfig.direction === 'desc' ? dateB - dateA : dateA - dateB;
            } else {
                return sortConfig.direction === 'desc' ? b.total - a.total : a.total - b.total;
            }
        });

    }, [ordersForCurrentTab, searchTerm, sortConfig, advancedFilters]);

    const paymentMethods = useMemo(() => [...new Set(orders.map(o => o.paymentMethod))], [orders]);

    return (
        <div className="space-y-4">
             <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                    {statusTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } flex-shrink-0 whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
                        >
                            {tab} 
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {(ordersByStatus[tab] || []).length}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
            
             <div className="bg-white p-4 rounded-lg shadow space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full md:w-auto">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar en esta pestaña..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="p-2 pl-10 border rounded-md w-full"
                        />
                    </div>
                     <select value={`${sortConfig.key}-${sortConfig.direction}`} onChange={e => {
                         const [key, direction] = e.target.value.split('-');
                         setSortConfig({ key, direction } as any);
                     }} className="p-2 border rounded-md w-full md:w-auto">
                        <option value="date-desc">Más Recientes</option>
                        <option value="date-asc">Más Antiguos</option>
                        <option value="total-desc">Mayor Total</option>
                        <option value="total-asc">Menor Total</option>
                     </select>
                     <button onClick={() => setShowAdvanced(!showAdvanced)} className="p-2 border rounded-md w-full md:w-auto bg-gray-100 hover:bg-gray-200">Filtros Avanzados</button>
                     <button onClick={clearFilters} className="p-2 border rounded-md w-full md:w-auto bg-red-100 hover:bg-red-200 text-red-700">Limpiar</button>
                </div>

                {showAdvanced && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                        <div>
                           <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                           <input id="customerName" type="text" name="customerName" placeholder="Nombre del cliente" value={advancedFilters.customerName} onChange={handleAdvancedFilterChange} className="p-2 border rounded-md w-full" />
                        </div>
                        <div>
                           <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                           <select id="paymentMethod" name="paymentMethod" value={advancedFilters.paymentMethod} onChange={handleAdvancedFilterChange} className="p-2 border rounded-md w-full">
                               <option value="">Todos</option>
                               {paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}
                           </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Fechas</label>
                            <div className="flex items-center gap-2">
                                <input type="date" name="dateFrom" value={advancedFilters.dateFrom} onChange={handleAdvancedFilterChange} className="p-2 border rounded-md w-full" />
                                <span>-</span>
                                <input type="date" name="dateTo" value={advancedFilters.dateTo} onChange={handleAdvancedFilterChange} className="p-2 border rounded-md w-full" />
                            </div>
                         </div>
                    </div>
                )}
            </div>

            <div className="space-y-3">
            {filteredAndSortedOrders.length > 0 ? filteredAndSortedOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm animate-[fadeIn_0.3s_ease-out] overflow-hidden border">
                    <div 
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    >
                        <div className="flex-1">
                            <span className="font-bold text-lg text-primary">{order.orderNumber}</span>
                            <span className="text-gray-600"> - {order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColorMap[order.status] || 'bg-gray-100 text-gray-800'}`}>
                               {order.status}
                            </span>
                            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {expandedOrderId === order.id && (
                        <div className="p-4 border-t bg-gray-50 animate-[slideDown_0.5s_ease-in-out]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700">Detalles del Cliente</h4>
                                    <p className="text-sm text-gray-600"><strong>Dirección:</strong> {order.address}</p>
                                    <p className="text-sm text-gray-600"><strong>Teléfono:</strong> {order.phone}</p>
                                    <p className="text-sm text-gray-600"><strong>Pago:</strong> {order.paymentMethod}</p>
                                    <p className="text-sm text-gray-600"><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Artículos del Pedido</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        {order.items.map(item => (
                                            <li key={item.id}>{item.quantity} x {item.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <label htmlFor={`status-${order.id}`} className="text-sm font-medium">Cambiar Estado:</label>
                                <select
                                    id={`status-${order.id}`}
                                    value={order.status}
                                    onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                                    className="p-2 border rounded-md"
                                >
                                    {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            )) : (
                <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
                    <p>No hay pedidos que coincidan con los filtros en la pestaña "{activeTab}".</p>
                </div>
            )}
            </div>
        </div>
    );
};

const ProductManager: React.FC<{
  products: Product[],
  onStockUpdate: (productId: number, newStock: number) => void,
  onPriceUpdate: (productId: number, newPrice: number) => void,
}> = ({ products, onStockUpdate, onPriceUpdate }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                  <thead>
                      <tr className="border-b">
                          <th className="p-2 font-semibold">Producto</th>
                          <th className="p-2 font-semibold">Precio Actual</th>
                          <th className="p-2 font-semibold">Nuevo Precio</th>
                          <th className="p-2 font-semibold">Stock Actual</th>
                          <th className="p-2 font-semibold">Nuevo Stock</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map(product => (
                          <tr key={product.id} className="border-t">
                              <td className="p-2 font-medium">{product.name}</td>
                              <td className="p-2">${product.price.toFixed(2)} / {product.unit}</td>
                              <td className="p-2">
                                  <input
                                      type="number"
                                      defaultValue={product.price.toFixed(2)}
                                      onBlur={(e) => onPriceUpdate(product.id, parseFloat(e.target.value) || 0)}
                                      className="w-24 border rounded-md p-1 text-center"
                                      step="0.01"
                                      min="0"
                                  />
                              </td>
                              <td className="p-2">{product.stock}</td>
                              <td className="p-2">
                                  <input
                                      type="number"
                                      defaultValue={product.stock}
                                      onBlur={(e) => onStockUpdate(product.id, parseInt(e.target.value, 10) || 0)}
                                      className="w-24 border rounded-md p-1 text-center"
                                      min="0"
                                  />
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
        </div>
    );
};

const UserManager: React.FC<{
    currentUser: User | null;
    allUsers: User[];
    onChangePassword: (userId: number, oldPass: string, newPass: string) => { success: boolean; message: string };
    onCreateUser: (user: Omit<User, 'id'>) => { success: boolean; message: string };
    onDeleteUser: (userId: number) => { success: boolean; message: string };
}> = ({ currentUser, allUsers, onChangePassword, onCreateUser, onDeleteUser }) => {
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    const [newMessengerName, setNewMessengerName] = useState('');
    const [newMessengerUsername, setNewMessengerUsername] = useState('');
    const [newMessengerPassword, setNewMessengerPassword] = useState('');
    const [createUserMessage, setCreateUserMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPassMessage(null);
        if (newPassword !== confirmPassword) {
            setPassMessage({ type: 'error', text: 'Las nuevas contraseñas no coinciden.' });
            return;
        }
        if (newPassword.length < 6) {
            setPassMessage({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres.' });
            return;
        }
        if (!currentUser) return;
        
        const result = onChangePassword(currentUser.id, oldPassword, newPassword);
        if (result.success) {
            setPassMessage({ type: 'success', text: result.message });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setPassMessage({ type: 'error', text: result.message });
        }
    };

    const handleCreateMessenger = (e: React.FormEvent) => {
        e.preventDefault();
        setCreateUserMessage(null);
        const result = onCreateUser({
            name: newMessengerName,
            email: newMessengerUsername,
            password: newMessengerPassword,
            role: 'messenger',
        });

        if (result.success) {
            setCreateUserMessage({ type: 'success', text: result.message });
            setNewMessengerName('');
            setNewMessengerUsername('');
            setNewMessengerPassword('');
        } else {
            setCreateUserMessage({ type: 'error', text: result.message });
        }
    };

    const handleDeleteUserAction = (userId: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción es irreversible.')) {
            onDeleteUser(userId);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-8">
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Crear Cuenta de Mensajero</h3>
                    <form onSubmit={handleCreateMessenger} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                            <input type="text" value={newMessengerName} onChange={e => setNewMessengerName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                            <input type="text" value={newMessengerUsername} onChange={e => setNewMessengerUsername(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                            <input type="password" value={newMessengerPassword} onChange={e => setNewMessengerPassword(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                        </div>
                        {createUserMessage && <p className={`text-sm ${createUserMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{createUserMessage.text}</p>}
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Crear Mensajero</button>
                    </form>
                 </div>
                 <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Seguridad de la Cuenta</h3>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                        </div>
                        {passMessage && <p className={`text-sm ${passMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{passMessage.text}</p>}
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Cambiar Contraseña</button>
                    </form>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Usuarios Registrados</h3>
                <div className="overflow-x-auto">
                     <table className="w-full text-left min-w-[500px]">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 font-semibold">Nombre</th>
                                <th className="p-2 font-semibold">Usuario/Email</th>
                                <th className="p-2 font-semibold">Rol</th>
                                <th className="p-2 font-semibold">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(user => (
                                <tr key={user.id} className="border-t">
                                    <td className="p-2 font-medium">{user.name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'messenger' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        <button 
                                            onClick={() => handleDeleteUserAction(user.id)}
                                            disabled={user.id === currentUser?.id}
                                            className="text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                                            aria-label={`Eliminar a ${user.name}`}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PaymentSettingsManager: React.FC<{
  paymentMethods: PaymentMethod[];
  onUpdatePaymentMethods: (methods: PaymentMethod[]) => void;
  paymentDetails: PaymentDetails;
  onUpdatePaymentDetails: (details: PaymentDetails) => void;
}> = ({ paymentMethods, onUpdatePaymentMethods, paymentDetails, onUpdatePaymentDetails }) => {
    
    const [localDetails, setLocalDetails] = useState(paymentDetails);
    
    const handleToggle = (id: string) => {
        const updatedMethods = paymentMethods.map(p => p.id === id ? {...p, enabled: !p.enabled} : p)
        onUpdatePaymentMethods(updatedMethods);
    };
    
    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalDetails(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSaveDetails = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdatePaymentDetails(localDetails);
        alert('Detalles de pago guardados.');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Habilitar Métodos de Pago</h3>
                <div className="space-y-3">
                    {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center justify-between p-3 border rounded-md">
                            <span className="font-medium">{method.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={method.enabled} onChange={() => handleToggle(method.id)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Detalles de Cuentas para Pagos</h3>
                <form onSubmit={handleSaveDetails} className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-700">Transferencia Bancaria</h4>
                        <div className="space-y-3">
                            <div>
                               <label className="block text-sm font-medium text-gray-600">Nombre del Banco</label>
                               <input name="bankName" value={localDetails.bankName} onChange={handleDetailsChange} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-600">Titular de la Cuenta</label>
                               <input name="accountHolder" value={localDetails.accountHolder} onChange={handleDetailsChange} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-600">Número de Cuenta</label>
                               <input name="accountNumber" value={localDetails.accountNumber} onChange={handleDetailsChange} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-600">Notas Adicionales</label>
                               <textarea name="bankNotes" value={localDetails.bankNotes} onChange={handleDetailsChange} rows={2} className="mt-1 p-2 w-full border rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                     <div className="border-t pt-6">
                        <h4 className="font-semibold text-lg mb-2 text-gray-700">Zelle</h4>
                        <div className="space-y-3">
                            <div>
                               <label className="block text-sm font-medium text-gray-600">Correo o Teléfono de Zelle</label>
                               <input name="zelleInfo" value={localDetails.zelleInfo} onChange={handleDetailsChange} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-600">Notas Adicionales</label>
                               <textarea name="zelleNotes" value={localDetails.zelleNotes} onChange={handleDetailsChange} rows={2} className="mt-1 p-2 w-full border rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Guardar Detalles de Pago</button>
                </form>
            </div>
        </div>
    );
};


const CustomizationManager: React.FC<{ 
    onUpdateLogo: (logoFile: File) => { success: boolean, message: string },
    socialLinks: SocialLinks,
    onUpdateSocialLinks: (links: SocialLinks) => void,
}> = ({ onUpdateLogo, socialLinks, onUpdateSocialLinks }) => {
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [logoMessage, setLogoMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [localSocialLinks, setLocalSocialLinks] = useState<SocialLinks>(socialLinks);
    const [linksMessage, setLinksMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleLogoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLogoMessage(null);
        if (logoFile) {
            const result = onUpdateLogo(logoFile);
            setLogoMessage({ type: result.success ? 'success' : 'error', text: result.message });
        } else {
            setLogoMessage({ type: 'error', text: 'Por favor, selecciona un archivo.' });
        }
    };
    
    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSocialLinks(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLinksSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateSocialLinks(localSocialLinks);
        setLinksMessage({ type: 'success', text: 'Enlaces guardados con éxito.' });
        setTimeout(() => setLinksMessage(null), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-lg mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Apariencia</h3>
              <form onSubmit={handleLogoSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Subir nuevo logo</label>
                      <input 
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange} 
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark/10 file:text-primary-dark hover:file:bg-primary-dark/20"
                      />
                  </div>
                  {previewUrl && (
                      <div className="text-center">
                          <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                          <img src={previewUrl} alt="Vista previa del logo" className="w-24 h-24 rounded-full mx-auto shadow-md" />
                      </div>
                  )}
                  {logoMessage && <p className={`text-sm ${logoMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{logoMessage.text}</p>}
                  <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Guardar Logo</button>
              </form>
            </div>
            <div className="border-t pt-8">
               <h3 className="text-xl font-bold mb-4">Enlaces a Redes Sociales</h3>
               <form onSubmit={handleLinksSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">Número de WhatsApp</label>
                        <input type="tel" id="whatsapp" name="whatsapp" value={localSocialLinks.whatsapp} onChange={handleLinkChange} className="mt-1 p-2 w-full border rounded-md" placeholder="Ej: +5355555555" />
                    </div>
                    <div>
                        <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook URL</label>
                        <input type="url" id="facebook" name="facebook" value={localSocialLinks.facebook} onChange={handleLinkChange} className="mt-1 p-2 w-full border rounded-md" placeholder="https://facebook.com/tu-pagina" />
                    </div>
                     <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram URL</label>
                        <input type="url" id="instagram" name="instagram" value={localSocialLinks.instagram} onChange={handleLinkChange} className="mt-1 p-2 w-full border rounded-md" placeholder="https://instagram.com/tu-usuario" />
                    </div>
                     <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter (X) URL</label>
                        <input type="url" id="twitter" name="twitter" value={localSocialLinks.twitter} onChange={handleLinkChange} className="mt-1 p-2 w-full border rounded-md" placeholder="https://x.com/tu-usuario" />
                    </div>
                    {linksMessage && <p className={`text-sm ${linksMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{linksMessage.text}</p>}
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Guardar Enlaces</button>
               </form>
            </div>
        </div>
    );
};

const DeliverySettingsManager: React.FC<{
    zones: DeliveryZone[],
    onUpdate: (zones: DeliveryZone[]) => void,
}> = ({ zones, onUpdate }) => {
    const [localZones, setLocalZones] = useState(zones);
    const [newZone, setNewZone] = useState({ name: '', maxDistanceKm: '', cost: '' });
    const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);

    const handleAddNew = () => {
        if (newZone.name && newZone.maxDistanceKm && newZone.cost) {
            const updatedZones = [...localZones, {
                id: Date.now(),
                name: newZone.name,
                maxDistanceKm: parseFloat(newZone.maxDistanceKm),
                cost: parseFloat(newZone.cost),
            }].sort((a, b) => a.maxDistanceKm - b.maxDistanceKm);
            setLocalZones(updatedZones);
            onUpdate(updatedZones);
            setNewZone({ name: '', maxDistanceKm: '', cost: '' });
        }
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta zona de envío?')) {
            const updatedZones = localZones.filter(z => z.id !== id);
            setLocalZones(updatedZones);
            onUpdate(updatedZones);
        }
    };

    const handleUpdate = () => {
        if (!editingZone) return;
        const updatedZones = localZones.map(z => z.id === editingZone.id ? editingZone : z).sort((a,b) => a.maxDistanceKm - b.maxDistanceKm);
        setLocalZones(updatedZones);
        onUpdate(updatedZones);
        setEditingZone(null);
    }
    
    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Zonas y Costos de Envío</h3>
            
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-semibold mb-3 text-lg">Añadir Nueva Zona</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre de Zona</label>
                        <input type="text" placeholder="Ej. Zona Céntrica" value={newZone.name} onChange={e => setNewZone({...newZone, name: e.target.value})} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distancia Máx (KM)</label>
                        <input type="number" min="0" placeholder="Ej. 5" value={newZone.maxDistanceKm} onChange={e => setNewZone({...newZone, maxDistanceKm: e.target.value})} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Costo ($)</label>
                        <input type="number" min="0" placeholder="Ej. 150" value={newZone.cost} onChange={e => setNewZone({...newZone, cost: e.target.value})} className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <button onClick={handleAddNew} className="bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary-dark transition h-10">Añadir Zona</button>
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-3 text-lg">Zonas Actuales</h4>
                <div className="space-y-3">
                    {/* Header */}
                    <div className="hidden md:grid grid-cols-4 gap-4 p-2 font-semibold text-gray-600 border-b">
                        <div>Nombre</div>
                        <div>Distancia Máxima</div>
                        <div>Costo</div>
                        <div className="text-right">Acciones</div>
                    </div>
                    {localZones.map(zone => (
                        <div key={zone.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-3 border rounded-md hover:bg-gray-50">
                            {editingZone?.id === zone.id ? (
                                <>
                                    {/* Editing state */}
                                    <div><input type="text" value={editingZone.name} onChange={e => setEditingZone({...editingZone, name: e.target.value})} className="p-2 w-full border rounded" /></div>
                                    <div><input type="number" min="0" value={editingZone.maxDistanceKm} onChange={e => setEditingZone({...editingZone, maxDistanceKm: parseFloat(e.target.value) || 0})} className="p-2 w-full border rounded" /></div>
                                    <div><input type="number" min="0" value={editingZone.cost} onChange={e => setEditingZone({...editingZone, cost: parseFloat(e.target.value) || 0})} className="p-2 w-full border rounded" /></div>
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={handleUpdate} className="bg-green-500 text-white py-1 px-3 rounded">Guardar</button>
                                        <button onClick={() => setEditingZone(null)} className="bg-gray-500 text-white py-1 px-3 rounded">Cancelar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Display state */}
                                    <div className="font-medium">{zone.name}</div>
                                    <div>Hasta {zone.maxDistanceKm} KM</div>
                                    <div className="font-semibold">${zone.cost.toFixed(2)}</div>
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => setEditingZone(zone)} className="bg-blue-500 text-white py-1 px-3 rounded">Editar</button>
                                        <button onClick={() => handleDelete(zone.id)} className="bg-red-500 text-white py-1 px-3 rounded">Eliminar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                 {localZones.length === 0 && <p className="text-center text-gray-500 mt-4">No hay zonas de envío configuradas.</p>}
            </div>
        </div>
    );
};


const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('orders');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const TABS: Record<string, { label: string, icon: React.ReactNode, component: React.ReactNode }> = {
      orders: { label: 'Pedidos', icon: <BoxIcon />, component: <OrderManager orders={props.orders} onUpdateStatus={props.onUpdateStatus} /> },
      products: { label: 'Productos', icon: <TagIcon />, component: <ProductManager products={props.products} onStockUpdate={props.onStockUpdate} onPriceUpdate={props.onPriceUpdate} /> },
      users: { label: 'Usuarios', icon: <UsersIcon />, component: <UserManager currentUser={props.currentUser} allUsers={props.allUsers} onChangePassword={props.onChangePassword} onCreateUser={props.onCreateUser} onDeleteUser={props.onDeleteUser} /> },
      shipping: { label: 'Envíos', icon: <MapPinIcon/>, component: <DeliverySettingsManager zones={props.deliveryZones} onUpdate={props.onUpdateDeliveryZones} /> },
      settings: { label: 'Pagos', icon: <CreditCardIcon />, component: <PaymentSettingsManager paymentMethods={props.paymentMethods} onUpdatePaymentMethods={props.onUpdatePaymentMethods} paymentDetails={props.paymentDetails} onUpdatePaymentDetails={props.onUpdatePaymentDetails} /> },
      customization: { label: 'Personalización', icon: <PaletteIcon />, component: <CustomizationManager onUpdateLogo={props.onUpdateLogo} socialLinks={props.socialLinks} onUpdateSocialLinks={props.onUpdateSocialLinks} /> },
  };

  const activeTab = TABS[activeTabKey];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
        <aside className={`bg-gray-800 text-white flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
              <h1 className={`text-xl font-bold whitespace-nowrap ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Admin Panel</h1>
              <h1 className={`text-xl font-bold ${!isSidebarCollapsed ? 'hidden' : 'block'}`}>AC</h1>
            </div>
            <nav className="flex-grow overflow-y-auto">
                {Object.entries(TABS).map(([key, tab]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTabKey(key)}
                        className={`w-full flex items-center p-4 transition-colors duration-200 group ${activeTabKey === key ? 'bg-primary' : 'hover:bg-gray-700'} ${isSidebarCollapsed ? 'justify-center' : ''}`}
                        title={isSidebarCollapsed ? tab.label : ''}
                    >
                        <div className="w-6 h-6">{tab.icon}</div>
                        {!isSidebarCollapsed && <span className="ml-4">{tab.label}</span>}
                         {!isSidebarCollapsed || <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-primary text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">{tab.label}</span>}
                    </button>
                ))}
            </nav>
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-4 border-t border-gray-700 hover:bg-gray-700 flex items-center transition-colors duration-200 w-full">
                <div className="w-6 h-6">
                    <ChevronLeftIcon className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
                </div>
                {!isSidebarCollapsed && <span className="ml-4">Contraer</span>}
            </button>
        </aside>

        <main className="flex-grow overflow-y-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{activeTab.label}</h1>
            {activeTab.component}
        </main>
    </div>
  );
};

export default AdminDashboard;