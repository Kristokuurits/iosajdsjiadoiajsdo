import { EventPeople } from "@/models/eventPeople";
import { ref } from "vue";
import { defineStore } from "pinia";
import useApi, { useApiRawRequest } from "@/models/api";

export const useEventStore = defineStore('eventPeopleStore', () => {
    const apiGetEvents = useApi<EventPeople[]>('eventPeople');
    const events = ref<EventPeople[]>([]);
    let allEvents: EventPeople[] = [];

    const loadEvents = async () => {
        await apiGetEvents.request();

        if (apiGetEvents.response.value) {
            return apiGetEvents.response.value;
        }
        return [];
    };

    const load = async () => {
        allEvents = await loadEvents();
        events.value = allEvents;
    };
    const getEventPeopleById = (id: number) => {
        return allEvents.find((event) => event.id === id);
    };


    const addEventPeople = async (event: EventPeople) => {
        const apiAddEventPeople = useApi<EventPeople>('events', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        await apiAddEventPeople.request();
        if (apiAddEventPeople.response.value) {
            load();
        }
    };
    const updateEventPeople = async (event: EventPeople) => {
        const apiUpdateEventPeople = useApi<EventPeople>('events/' + event.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        await apiUpdateEventPeople.request();
        if (apiUpdateEventPeople.response.value) {
            load();
        }
    };


    const deleteEventPeople = async (event: EventPeople) => {
        const deleteEventRequest = useApiRawRequest(`events/${event.id}`, {
            method: 'DELETE',
        });

        const res = await deleteEventRequest();

        if (res.status === 204) {
            let id = events.value.indexOf(event);

            if (id !== -1) {
                events.value.splice(id, 1);
            }

            id = events.value.indexOf(event);

            if (id !== -1) {
                events.value.splice(id, 1);
            }
        }
    };

    return { events, load, getEventPeopleById, addEventPeople, updateEventPeople, deleteEventPeople };
});