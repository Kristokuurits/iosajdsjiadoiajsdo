import { EventPeople } from "@/models/eventPeople";
import { ref } from "vue";
import { defineStore } from "pinia";
import useApi, { useApiRawRequest } from "@/models/api";

export const useEventPeopleStore = defineStore('eventPeopleStore', () => {
  const apiGetEventPeople = useApi<EventPeople[]>('eventPeople');
  const eventPeople = ref<EventPeople[]>([]);
  let allEventPeople: EventPeople[] = [];

  const loadEventPeople = async () => {
    await apiGetEventPeople.request();

    if (apiGetEventPeople.response.value) {
      return apiGetEventPeople.response.value;
    }
    return [];
  };

  const load = async () => {
    allEventPeople = await loadEventPeople();
    eventPeople.value = allEventPeople;
  };
  const getEventPeopleById = (id: number) => {
    return allEventPeople.find((eventpeople) => eventpeople.id === id);
  };


  const addEventPeople = async (eventpeople: EventPeople) => {
    const apiAddEventPeople = useApi<EventPeople>('eventPeople', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventpeople),
    }); 
    
    await apiAddEventPeople.request();
    if (apiAddEventPeople.response.value) {
      load();      
    }
  };
  const updateEventPeople = async (eventpeople: EventPeople) => {
    const apiUpdateEventPeople = useApi<EventPeople>('eventPeople/' + eventpeople.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventpeople),
    });

    await apiUpdateEventPeople.request();
    if (apiUpdateEventPeople.response.value) {
      load();
    }    
  };


  const deleteEventPeople = async (eventpeople: EventPeople) => {
    const deleteEventPeopleRequest = useApiRawRequest(`eventPeople/${eventpeople.id}`, {
      method: 'DELETE',
    });

    const res = await deleteEventPeopleRequest();

    if (res.status === 204) {
      let id = eventPeople.value.indexOf(eventpeople);

      if (id !== -1) {
        eventPeople.value.splice(id, 1);
      }

      id = eventPeople.value.indexOf(eventpeople);

      if (id !== -1) {
        eventPeople.value.splice(id, 1);
      }
    }
  };

  return { eventPeople, load, getEventPeopleById, addEventPeople, updateEventPeople, deleteEventPeople };
});