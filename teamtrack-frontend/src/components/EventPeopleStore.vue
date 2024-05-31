<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
        <div class="text-center">
            <h1 class="font-bold"> Inimeste Sündmused </h1>
          <DataTable :value="combinedData" v-if="combinedData.length > 0">
              <Column field="id" header="ID" />
              <Column field="location" header="Location" />
              <Column field="username" header="Person Name" />
          </DataTable>
            <div v-else>Sündmused puuduvad</div>
        </div>
        </div>
</template>

<script setup lang="ts">

import { useEventPeopleStore } from "@/stores/eventPeopleStore";
import { usePeopleStore } from "@/stores/peopleStore";
import { useEventsStore } from "@/stores/eventsStore";
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";


const eventPeopleStore = useEventPeopleStore();
const peopleStore = usePeopleStore();
const eventsStore = useEventsStore();
const { eventPeople } = storeToRefs(eventPeopleStore);
const { peopleLists } = storeToRefs(peopleStore);
const { events } = storeToRefs(eventsStore);

onMounted(() => {
  eventPeopleStore.load();
  peopleStore.load();
  eventsStore.load();
});



const combinedData = computed(() => {
  return eventPeople.value.map(ep => {
    const event = events.value.find(e => e.id === ep.eventid);
    const person = peopleLists.value.find(p => p.id === ep.personid);
    return {
      id: ep.id,
      location: event ? event.location : 'Unknown Location',
      username: person ? person.username : 'Unknown Person',
    };
  });
});
</script>

<style>
    .min-h-screen {
        background-color: rgb(136, 136, 136);
        color: #111827; 
    }


    .ring {
        color: rgb(212, 255, 111);
    }

        .ring:hover {
            animation: colorchange1 1s infinite;
        }

    .delete {
        font-weight: bold;
        color: white;
        background-color: rgb(255, 0, 0);
        padding: 0.00000005rem 0.5rem;
    }

        .delete:hover {
            animation: colorchange2 1s infinite;
        }

    .details {
        font-weight: bold;
        color: white;
        background-color: rgb(149, 225, 238);
        padding: 0.00000005rem 0.5rem;
    }

        .details:hover {
            animation: colorchange3 1s infinite;
        }

    h1 {
        padding: 1rem 0; 
        font-size: 2.25rem;
        line-height: 2.5rem;
        margin-bottom: 2rem;
    }


    button, .router-link {
        padding: 0.5rem 1rem; 
        margin: 0 0.25rem; 
        border: none; 
        font-weight: 600; 
        transition: background-color 0.3s; 
    }

        button:hover, .router-link:hover {
            background-color: darken(bg-color, 10%); 
        }

    .popup {

        display: flex; 
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease-in-out; 
        z-index: 100; 
    }

    .popup-inner {
        background-color: rgb(76, 202, 76); 
        padding: 40px; 
        border-radius: 15px; 
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        position: relative; 
        width: 90%;
        max-width: 500px; 
        transition: transform 1.3s ease-in-out; 
        transform: scale(1.05); 
    }

        .popup-inner h2 {
            margin-top: 0; 
            margin-bottom: 1rem; 
            color: #333; 
            font-size: 1.75rem; 
        }

        .popup-inner ul {
            list-style: none; 
            padding: 0; 
            margin: 0; 
        }

            .popup-inner ul li {
                padding: 0.5rem 0; 
                border-bottom: 1px solid #eee;
            }

                .popup-inner ul li:last-child {
                    border-bottom: none; 
                }

    .popupClose {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px; 
        height: 30px;
        line-height: 30px; 
        text-align: center; 
        border-radius: 50%; 
        font-size: 16px; 
        transition: background-color 0.2s, transform 0.2s;
        cursor: pointer;
        display: flex; /* Use flexbox to center content */
        align-items: center; /* Center vertically */
        justify-content: center; /* Center horizontally */
        padding: 0; /* Remove padding to prevent misalignment */
    }

        .popupClose:hover,
        .popupClose:focus {
            animation: colorchange 1s infinite; /* Darker shade for hover effect */
            outline: none; /* Remove outline on focus for a cleaner look */
        }

    /* Showing and hiding the popup */
    .popup-enter-active, .popup-leave-active {
        transition: opacity 0.3s ease-in-out;
    }

    .popup-enter, .popup-leave-to /* .popup-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: scale(1);
    }

    /* DataTable styling */
    .DataTable {
        /* Assuming you have a custom class to target */
        width: 100%; /* Full width */
        border-collapse: collapse; /* Collapsed borders for a clean look */
        margin-top: 1rem; /* Space above the table */
    }

    .Column {
        /* Assuming custom classnames for Column */
        text-align: right; /* Align text to the left for readability */
        padding: 0.75rem 1rem; /* Padding within cells */
    }

    /* Media queries for responsiveness */
    @media (min-width: 768px) {
        .min-h-screen {
            padding: 2rem; /* More padding on larger screens */
        }
    }

    @keyframes colorchange {
        0% {
            color: red;
        }

        100% {
            color: rgb(76, 202, 76);
        }
    }

    @keyframes colorchange1 {
        0% {
            color: blue
        }

        100% {
            color: lightskyblue
        }
    }

    @keyframes colorchange2 {
        0% {
            color: red
        }

        100% {
            color: white;
        }
    }

    @keyframes colorchange3 {
        0% {
            color: rgb(37, 179, 37)
        }

        100% {
            color: white;
        }
    }
</style>

