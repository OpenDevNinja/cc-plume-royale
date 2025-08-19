// src/components/tutoring/Calendar.jsx
import { useState } from 'react'
import { format, addDays, addHours, isSameDay, isBefore } from 'date-fns'
import { fr } from 'date-fns/locale'
import Button from '../common/Button'

const TIME_SLOTS = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
]

function Calendar({ tutorId, onTimeSelect }) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(null)
    const [bookedSlots, setBookedSlots] = useState([])

    const generateWeekDays = () => {
        const days = []
        const today = new Date()

        for (let i = 0; i < 7; i++) {
            const date = addDays(today, i)
            days.push(date)
        }

        return days
    }

    const isSlotBooked = (date, time) => {
        return bookedSlots.some(slot =>
            isSameDay(slot.date, date) && slot.time === time
        )
    }

    const isSlotPassed = (date, time) => {
        const [hours, minutes] = time.split(':').map(Number)
        const slotDate = addHours(date, hours)
        slotDate.setMinutes(minutes)
        return isBefore(slotDate, new Date())
    }

    const handleTimeSelect = (time) => {
        setSelectedTime(time)
        onTimeSelect({
            date: selectedDate,
            time,
            tutorId
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex overflow-x-auto pb-2 -mx-2">
                {generateWeekDays().map((date) => (
                    <button
                        key={date.toString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex-shrink-0 mx-2 px-4 py-2 rounded-lg ${isSameDay(date, selectedDate)
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <div className="text-sm font-medium">
                            {format(date, 'EEE', { locale: fr })}
                        </div>
                        <div className="text-lg">
                            {format(date, 'd', { locale: fr })}
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TIME_SLOTS.map((time) => {
                    const isBooked = isSlotBooked(selectedDate, time)
                    const isPassed = isSlotPassed(selectedDate, time)
                    const isSelected = selectedTime === time

                    return (
                        <Button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            disabled={isBooked || isPassed}
                            variant={
                                isSelected ? 'primary' :
                                    isBooked ? 'disabled' : 'outline'
                            }
                        >
                            {time}
                            {isBooked && ' (Indisponible)'}
                            {isPassed && ' (Passé)'}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar