
import React, { useState } from 'react';
import { View, Event, Activity } from './types.ts';
import Sidebar from '../../../components/Sidebar.tsx';
import CalendarView from '../../../components/CalendarView.tsx';
import ActivitiesView from '../../../components/ActivitiesView.tsx';
import ProfileView from '../../../components/ProfileView.tsx';
import { MOCK_EVENTS, MOCK_ACTIVITIES } from './constants.ts';
import AddEventModal from '../../../components/AddEventModal.tsx';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal.tsx';
import EditEventModal from '../../../components/EditEventModal.tsx';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('calendar');
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
    const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isSidebarEditMode, setIsSidebarEditMode] = useState(false);
    
    const [deleteModalState, setDeleteModalState] = useState<{isOpen: boolean; eventId: number | null}>({isOpen: false, eventId: null});
    const [dontAskAgain, setDontAskAgain] = useState(false);

    const handleAddEvent = (newEventData: Omit<Event, 'id' | 'checked'>) => {
        const newEvent: Event = {
            ...newEventData,
            id: Date.now(),
            checked: false,
        };
        setEvents([...events, newEvent]);
        setIsAddModalOpen(false);
    };

    const handleUpdateEvent = (updatedEvent: Event) => {
        setEvents(events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ));
        setEditingEvent(null);
    };

    const handleAddActivity = (newActivityData: Omit<Activity, 'id' | 'checked'>) => {
        const newActivity: Activity = {
            ...newActivityData,
            id: Date.now(),
            checked: false,
        };
        setActivities(prev => [...prev, newActivity]);
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
                return <div className="p-8"><h1 className="text-3xl font-bold">Página de Inicio</h1></div>;
            case 'activities':
                return <ActivitiesView 
                    activities={activities} 
                    onAddActivity={handleAddActivity}
                    onDeleteActivity={handleDeleteActivity}
                    onToggleActivity={handleToggleActivity}
                    onUpdateActivity={handleUpdateActivity}
                />;
            case 'calendar':
                return <CalendarView 
                    events={events} 
                    onAddEventClick={() => setIsAddModalOpen(true)} 
                    onToggleEvent={handleToggleEvent}
                    onEditEventClick={setEditingEvent}
                />;
            case 'profile':
                 return <ProfileView />;
            default:
                return <CalendarView 
                    events={events} 
                    onAddEventClick={() => setIsAddModalOpen(true)} 
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
            {isAddModalOpen && <AddEventModal onSave={handleAddEvent} onClose={() => setIsAddModalOpen(false)} />}
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
