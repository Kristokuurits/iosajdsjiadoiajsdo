<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
        <div class="text-center">
            <h1 class="font-bold">{{ title }}</h1>
            <DataTable :value="EventPeople" v-if="EventPeople.length > 0">
                <Column field="type" header="Nimetus" />
                <Column field="date" header="Kuupäev" />
                <Column field="time" header="Kellaaeg" />
                <Column field="Id" header="Id" />
                <Column v-if="!isAthlete">
                </Column>
            </DataTable>
            <div v-else>Sündmused puuduvad</div>
        </div>
        <div v-if="showPopup" class="popup">
            <div class="popup-inner">
                <h2>EventPeople</h2>
                <ul>
                    <li v-for="(value, key) in selectedEventPeople" :key="key">
                        {{ key }}: {{ value }}
                    </li>
                </ul>
                <button @click="showPopup = false" class="popup-close">X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { eventPeople } from '@/models/eventPeople';
    import { useEventPeopleStore } from "@/stores/eventPeopleStore";
    import { storeToRefs } from "pinia";
    import { defineProps, onMounted, ref, watch } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();

    watch(route, (to, from) => {
        if (to.path !== from.path || to.query !== from.query) {
            EventPeopleStore.load();
        }
    }, { deep: true });

    defineProps<{ title: string, isAthlete: boolean }>();

    const showPopup = ref(false);
    const selectedEventPeople = ref({});

    const showDetails = (event: Event) => {
        selectedEventPeople.value = event;
        showPopup.value = true;
    };

    const EventPeopleStore = useEventPeopleStore();
    const { events } = storeToRefs(EventPeopleStore);

    onMounted(() => {
        EventPeopleStore.load();
    });

    const remove = (event: Event) => {
        eventPeople.deleteEventList(event);
    };
</script>

<style>
    .min-h-screen {
        background-color: lightblue;
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

