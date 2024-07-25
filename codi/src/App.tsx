import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { PlusCircle, Calendar, DollarSign, Clock, Percent, Video, List, FileText, Users, MapPin, Laptop, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    clientDuration: '',
    calendarDuration: '',
    depositPercentage: '',
    modality: '',
    serviceType: '',
    description: '',
    notes: '',
    providers: '',
    isActive: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name, value) => {
    setNewService((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSwitchChange = (checked) => {
    setNewService((prev) => ({ ...prev, isActive: checked }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newService.name) errors.name = 'Nombre es requerido';
    if (!newService.price) errors.price = 'Precio es requerido';
    if (!newService.clientDuration) errors.clientDuration = 'Duración es requerida';
    if (!newService.modality) errors.modality = 'Modalidad es requerida';
    if (!newService.serviceType) errors.serviceType = 'Tipo de servicio es requerido';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateService = () => {
    if (validateForm()) {
      setServices((prev) => [...prev, { ...newService, id: Date.now() }]);
      setNewService({
        name: '',
        price: '',
        clientDuration: '',
        calendarDuration: '',
        depositPercentage: '',
        modality: '',
        serviceType: '',
        description: '',
        notes: '',
        providers: '',
        isActive: true,
      });
      setShowModal(true);
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const colorClasses = {
    indigo: 'border-indigo-200 focus:border-indigo-500 text-indigo-600',
    green: 'border-green-200 focus:border-green-500 text-green-600',
    blue: 'border-blue-200 focus:border-blue-500 text-blue-600',
    purple: 'border-purple-200 focus:border-purple-500 text-purple-600',
    orange: 'border-orange-200 focus:border-orange-500 text-orange-600',
    teal: 'border-teal-200 focus:border-teal-500 text-teal-600',
    pink: 'border-pink-200 focus:border-pink-500 text-pink-600',
    yellow: 'border-yellow-200 focus:border-yellow-500 text-yellow-600',
  };

  const InputField = ({ icon: Icon, name, type = 'text', placeholder, color }) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">{placeholder}</Label>
      <div className="relative">
        <Icon className={`absolute left-3 top-3 h-5 w-5 ${colorClasses[color].split(' ').pop()}`} />
        <Input
          id={name}
          name={name}
          type={type}
          value={newService[name]}
          onChange={handleInputChange}
          className={`pl-10 border-2 ${colorClasses[color]} rounded-lg`}
          placeholder={placeholder}
        />
      </div>
      {formErrors[name] && <p className="text-red-500 text-xs mt-1">{formErrors[name]}</p>}
    </div>
  );

  const SelectField = ({ name, placeholder, options, color }) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">{placeholder}</Label>
      <Select name={name} onValueChange={(value) => handleSelectChange(name, value)}>
        <SelectTrigger className={`w-full border-2 ${colorClasses[color]} rounded-lg`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center">
                {option.icon && <option.icon className={`mr-2 h-4 w-4 ${colorClasses[color].split(' ').pop()}`} />}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {formErrors[name] && <p className="text-red-500 text-xs mt-1">{formErrors[name]}</p>}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-indigo-800 shadow-text"
      >
        Gestión de Servicios
      </motion.h2>
      
      <Tabs defaultValue="create" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create" className="text-lg font-semibold py-3 transition-all">Crear Servicio</TabsTrigger>
          <TabsTrigger value="view" className="text-lg font-semibold py-3 transition-all">Ver Servicios</TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="create">
              <Card className="mt-6 border-2 border-indigo-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500">
                  <CardTitle className="text-2xl font-semibold text-white">Crear Nuevo Servicio</CardTitle>
                </CardHeader>
                <CardContent className="mt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField icon={PlusCircle} name="name" placeholder="Nombre del servicio" color="indigo" />
                      <InputField icon={DollarSign} name="price" type="number" placeholder="Precio del servicio" color="green" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <InputField icon={Clock} name="clientDuration" type="number" placeholder="Duración para el cliente" color="blue" />
                      <InputField icon={Calendar} name="calendarDuration" type="number" placeholder="Tiempo en calendario" color="purple" />
                      <InputField icon={Percent} name="depositPercentage" type="number" placeholder="Porcentaje de seña" color="orange" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectField
                        name="modality"
                        placeholder="Modalidad"
                        options={[
                          { value: 'presencial', label: 'Presencial', icon: MapPin },
                          { value: 'online', label: 'Online', icon: Laptop },
                        ]}
                        color="teal"
                      />
                      <SelectField
                        name="serviceType"
                        placeholder="Tipo de servicio"
                        options={[
                          { value: 'normal', label: 'Normal' },
                          { value: 'fechaVariable', label: 'Fecha Variable' },
                          { value: 'porCupos', label: 'Por cupos' },
                          { value: 'recurrente', label: 'Recurrente' },
                        ]}
                        color="pink"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">Descripción</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newService.description}
                        onChange={handleInputChange}
                        className="min-h-[100px] border-2 border-indigo-200 focus:border-indigo-500 rounded-lg"
                        placeholder="Describe el servicio..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Aclaraciones para recordatorios/Archivos</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={newService.notes}
                        onChange={handleInputChange}
                        className="min-h-[100px] border-2 border-yellow-200 focus:border-yellow-500 rounded-lg"
                        placeholder="Agrega notas o aclaraciones..."
                      />
                    </div>

                    <InputField icon={Users} name="providers" placeholder="Quienes lo prestarán" color="indigo" />

                    <div className="flex items-center space-x-2">
                      <Switch id="isActive" checked={newService.isActive} onCheckedChange={handleSwitchChange} />
                      <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">Servicio Activo</Label>
                    </div>

                    <Button
                      onClick={handleCreateService}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                      Crear Servicio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="view">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-2 border-indigo-200 shadow-lg transition-all hover:shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500">
                        <CardTitle className="text-xl font-semibold text-white">{service.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 flex items-center">
                            <DollarSign className="mr-2 h-4 w-4 text-green-500" /> Precio: ${service.price}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-blue-500" /> Duración: {service.clientDuration} minutos
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <List className="mr-2 h-4 w-4 text-pink-500" /> Tipo: {service.serviceType}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            {service.modality === 'presencial' ? (
                              <MapPin className="mr-2 h-4 w-4 text-teal-500" />
                            ) : (
                              <Laptop className="mr-2 h-4 w-4 text-teal-500" />
                            )}
                            Modalidad: {service.modality}
                          </p>
                          <div className="flex items-center space-x-2 text-sm">
                            {service.isActive ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className={service.isActive ? 'text-green-600' : 'text-red-600'}>
                              {service.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>