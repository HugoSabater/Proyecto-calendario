
import React, { useState } from 'react';
import { Event } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import DayEventsModal from './DayEventsModal';
import { EditIcon } from './icons/EditIcon';

interface CalendarViewProps {
    events: Event[];
    onAddEventClick: () => void;
    onToggleEvent: (id: number) => void;
    onEditEventClick: (event: Event) => void;
}

const MAX_EVENTS_VISIBLE = 2;

const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEventClick, onToggleEvent, onEditEventClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dayModalState, setDayModalState] = useState<{ isOpen: boolean; events: Event[]; date: Date | null }>({ isOpen: false, events: [], date: null });

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    
    const handleOpenDayModal = (events: Event[], date: Date) => {
        setDayModalState({ isOpen: true, events, date });
    };

    const handleCloseDayModal = () => {
        setDayModalState({ isOpen: false, events: [], date: null });
    };
    
    const renderHeader = () => {
        return (
             <div className="flex justify-between items-center p-6 bg-white">
                <div className="relative w-1/3">
                    <input type="text" placeholder="Buscar" className="w-full pl-10 pr-4 py-3 border-2 border-cyan-400 rounded-full focus:outline-none focus:border-cyan-600" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                </div>
                <div>
                     <button 
                        onClick={onAddEventClick}
                        className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors">
                        AÑADIR EVENTO
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        return (
            <div className="grid grid-cols-7 bg-cyan-500 text-white font-bold">
                {daysOfWeek.map(day => (
                    <div key={day} className="p-4 text-center">{day}</div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // 0=Lunes
        const daysInMonth = getDaysInMonth(year, month);
        const prevMonthDays = getDaysInMonth(year, month - 1);
        
        const cells = [];
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(
                <div key={`prev-${i}`} className="p-2 border border-gray-200 bg-gray-50 text-gray-400">
                    {prevMonthDays - firstDayOfMonth + i + 1}
                </div>
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === today.getDate();
            const dayDate = new Date(year, month, day);
            const eventsForDay = events.filter(e => 
                e.date.getFullYear() === year && e.date.getMonth() === month && e.date.getDate() === day
            );

            cells.push(
                <div key={day} className={`p-2 border border-gray-200 min-h-28 ${isToday ? 'bg-cyan-50' : ''}`}>
                    <div className={`font-semibold ${isToday ? 'text-cyan-600' : 'text-gray-700'}`}>{day}</div>
                    <div className="mt-1 space-y-1">
                        {eventsForDay.slice(0, MAX_EVENTS_VISIBLE).map(event => (
                           <div key={event.id} className="group relative text-xs text-white bg-cyan-500 p-1 rounded flex items-center truncate">
                             <input
                                type="checkbox"
                                checked={event.checked}
                                onChange={() => onToggleEvent(event.id)}
                                className="h-3 w-3 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 mr-2 shrink-0"
                             />
                             <span className={`flex-1 ${event.checked ? 'line-through' : ''}`}>{event.title}</span>
                              <button
                                onClick={() => onEditEventClick(event)}
                                className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={`Editar evento ${event.title}`}
                             >
                                <EditIcon />
                             </button>
                           </div>
                         ))}
                         {eventsForDay.length > MAX_EVENTS_VISIBLE && (
                            <button 
                                onClick={() => handleOpenDayModal(eventsForDay, dayDate)}
                                className="text-xs text-blue-600 hover:underline font-semibold p-1 rounded w-full text-left"
                            >
                                +{eventsForDay.length - MAX_EVENTS_VISIBLE} más
                            </button>
                         )}
                    </div>
                </div>
            );
        }

        const totalCells = firstDayOfMonth + daysInMonth;
        const nextDays = (7 - (totalCells % 7)) % 7;
        for (let i = 1; i <= nextDays; i++) {
            cells.push(
                <div key={`next-${i}`} className="p-2 border border-gray-200 bg-gray-50 text-gray-400">
                    {i}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-7 grid-rows-5 bg-white">
                {cells}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            {renderHeader()}
            <div className="flex-grow p-6">
                <div className="shadow-lg rounded-lg overflow-hidden">
                    {renderDays()}
                    {renderCells()}
                </div>
            </div>
            {dayModalState.isOpen && (
                <DayEventsModal 
                    events={dayModalState.events}
                    date={dayModalState.date}
                    onClose={handleCloseDayModal}
                    onToggleEvent={onToggleEvent}
                    onEditEventClick={onEditEventClick}
                />
            )}
        </div>
    );
};

export default CalendarView;
