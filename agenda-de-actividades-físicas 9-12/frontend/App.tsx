import React, { useState, useEffect } from 'react';   // ⬅️ AÑADIDO useEffect
import { View, Event, Activity } from './types';
import Sidebar from './components/Sidebar';
import CalendarView from './components/CalendarView';
import ActivitiesView from './components/ActivitiesView';
import ProfileView from './components/ProfileView';
import { MOCK_EVENTS, MOCK_ACTIVITIES } from './constants';
import AddEventModal from './components/AddEventModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EditEventModal from './components/EditEventModal';
import SettingsView from './components/SettingsView';
import HomeView from './components/HomeView';
import AddActivityModal from './components/AddActivityModal';
import RoutineCreatorView from './components/RoutineCreatorView';

// ⬅️ AÑADIDO: import del servicio API
import { getActividades, crearActividad } from "./src/services/api";

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('home');
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
    const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isSidebarEditMode, setIsSidebarEditMode] = useState(false);
    
    const [deleteModalState, setDeleteModalState] = useState<{isOpen: boolean; eventId: number | null}>({isOpen: false, eventId: null});
    const [dontAskAgain, setDontAskAgain] = useState(false);

    // ⬅️ AÑADIDO: cargar actividades reales del backend
    useEffect(() => {
        getActividades().then((data: Activity[]) => {
            if (Array.isArray(data)) {
                setActivities(data);
            }
        });
    }, []);

    const handleAddEvent = (newEventData: Omit<Event, 'id' | 'checked'>) => {
        const newEvent: Event = {
            ...newEventData,
            id: Date.now(),
            checked: false,
        };
        setEvents([...events, newEvent]);
        setIsAddEventModalOpen(false);
    };

    const handleUpdateEvent = (updatedEvent: Event) => {
        setEvents(events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ));
        setEditingEvent(null);
    };

    const handleAddActivity = async (newActivityData: Omit<Activity, 'id' | 'checked'>) => {
        // 1. Guardar en la base de datos (backend)
        await crearActividad(newActivityData);
    
        // 2. Recargar actividades desde MySQL
        const actividadesActualizadas = await getActividades();
        setActivities(actividadesActualizadas);
    
        // 3. Cerrar el modal
        setIsAddActivityModalOpen(false);
    };
    

    const handleDeleteActivity = (id: number) => {
        setActivities(activities.filter(activity => activity.id !== id));
    };

    const handleToggleActivity = (id: number) => {
        setActivities(activities.map(activity =>
            activity.id === id ? { ...activity, checked: !activity.checked } : activity
        ));
    };

    const handleUpdateActivity = (updatedActivity: Activity) => {
        setActivities(activities.map(activity =>
            activity.id === updatedActivity.id ? updatedActivity : activity
        ));
    };

    const handleDeleteRequest = (id: number) => {
        if (editingEvent) setEditingEvent(null); 
        if (dontAskAgain) {
            handleDeleteConfirm(id);
        } else {
            setDeleteModalState({ isOpen: true, eventId: id });
        }
    };

    const handleDeleteConfirm = (id: number) => {
        setEvents(events.filter(event => event.id !== id));
        setDeleteModalState({ isOpen: false, eventId: null });
        if (editingEvent?.id === id) {
            setEditingEvent(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalState({ isOpen: false, eventId: null });
    };

    const handleToggleEvent = (id: number) => {
        setEvents(events.map(event => 
            event.id === id ? { ...event, checked: !event.checked } : event
        ));
    };


    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <HomeView 
                    activities={activities}
                    events={events}
                    onAddActivityClick={() => setIsAddActivityModalOpen(true)}
                    onAddEventClick={() => setIsAddEventModalOpen(true)}
                />;
            case 'activities':
                return <ActivitiesView 
                    activities={activities} 
                    onAddActivity={handleAddActivity}
                    onDeleteActivity={handleDeleteActivity}
                    onToggleActivity={handleToggleActivity}
                    onUpdateActivity={handleUpdateActivity}
                    onAddActivityClick={() => setIsAddActivityModalOpen(true)}
                />;
            case 'calendar':
                return <CalendarView 
                    events={events} 
                    onAddEventClick={() => setIsAddEventModalOpen(true)} 
                    onToggleEvent={handleToggleEvent}
                    onEditEventClick={setEditingEvent}
                />;
            case 'profile':
                 return <ProfileView />;
            case 'settings':
                 return <SettingsView />;
            case 'routine':
                 return <RoutineCreatorView />;
            default:
                return <CalendarView 
                    events={events} 
                    onAddEventClick={() => setIsAddEventModalOpen(true)} 
                    onToggleEvent={handleToggleEvent} 
                    onEditEventClick={setEditingEvent}
                />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar 
                currentView={currentView} 
                setCurrentView={setCurrentView}
                events={events}
                onDeleteRequest={handleDeleteRequest}
                isEditMode={isSidebarEditMode}
                onToggleEditMode={() => setIsSidebarEditMode(!isSidebarEditMode)}
                onToggleEvent={handleToggleEvent}
            />
            <main className="flex-1 overflow-y-auto">
                {renderView()}
            </main>
            {isAddEventModalOpen && <AddEventModal onSave={handleAddEvent} onClose={() => setIsAddEventModalOpen(false)} />}
            {isAddActivityModalOpen && <AddActivityModal onSave={handleAddActivity} onClose={() => setIsAddActivityModalOpen(false)} />}
            {editingEvent && (
                <EditEventModal 
                    event={editingEvent}
                    onSave={handleUpdateEvent}
                    onClose={() => setEditingEvent(null)}
                    onDelete={handleDeleteRequest}
                />
            )}
            {deleteModalState.isOpen && deleteModalState.eventId !== null && (
                <DeleteConfirmationModal
                    onClose={handleDeleteCancel}
                    onConfirm={() => handleDeleteConfirm(deleteModalState.eventId!)}
                    dontAskAgain={dontAskAgain}
                    onDontAskAgainChange={setDontAskAgain}
                />
            )}
        </div>
    );
};

export default App;
