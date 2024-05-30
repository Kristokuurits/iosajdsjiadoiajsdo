<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
        <div class="text-center">
            <h1 class="font-bold">{{ title }}</h1>
            <DataTable :value="events" v-if="events.length > 0">
                <Column field="type" header="Nimetus" />
                <Column field="location" header="Asukoht" />
                <Column field="date" header="Kuupäev" />
                <Column field="time" header="Kellaaeg" />
                <Column v-if="!isAthlete">
                    <template #body="{ data }">
                        <router-link class="btn btn-blue" :to="'update/' + data.id">⭮</router-link>
                        <button class="btn btn-red" @click="remove(data)">Delete</button>
                        <button class="btn btn-green" @click="showDetails(data)">Details</button>
                    </template>
                </Column>
            </DataTable>
            <div v-else>Sündmused puuduvad</div>
        </div>
        <div v-if="showPopup" class="popup">
            <div class="popup-inner">
                <h2>Event Details</h2>
                <ul>
                    <li v-for="(value, key) in selectedEvent" :key="key">
                        {{ key }}: {{ value }}
                    </li>
                </ul>
                <button @click="showPopup = false" class="popup-close">X</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Event } from '@/models/event';
    import { useEventsStore } from "@/stores/eventsStore";
    import { storeToRefs } from "pinia";
    import { defineProps, onMounted, ref, watch } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();

    watch(route, (to, from) => {
        if (to.path !== from.path || to.query !== from.query) {
            eventsStore.load();
        }
    }, { deep: true });

    defineProps<{ title: string, isAthlete: boolean }>();

    const showPopup = ref(false);
    const selectedEvent = ref({});

    const showDetails = (event: Event) => {
        selectedEvent.value = event;
        showPopup.value = true;
    };

    const eventsStore = useEventsStore();
    const { events } = storeToRefs(eventsStore);

    onMounted(() => {
        eventsStore.load();
    });

    const remove = (event: Event) => {
        eventsStore.deleteEvent(event);
    };
</script>

<style scoped>
    /* General styles */
    .min-h-screen {
        background-color: #888888;
        color: #111827;
    }

    h1 {
        padding: 1rem 0;
        font-size: 2.25rem;
        line-height: 2.5rem;
        margin-bottom: 2rem;
        color: rgb(0, 0, 0);
    }

    /* Buttons and links */
    .btn {
        padding: 0.5rem 1rem;
        margin: 0 0.25rem;
        border: none;
        font-weight: 600;
        transition: background-color 0.3s;
    }

    .btn-blue {
        background-color: #4a96b9;
        color: #fff;
    }

    .btn-red {
        background-color: #ca6969;
        color: #fff;
    }

    .btn-green {
        background-color: #4dbb96;
        color: #fff;
    }

    .btn:hover {
        filter: brightness(0.9);
    }

    /* Popup styles */
    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease-in-out;
        z-index: 100;
    }

    .popup-inner {
        background-color: #fff;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        position: relative;
        width: 90%;
        max-width: 500px;
        transition: transform 0.3s ease-in-out;
        transform: scale(1.05);
    }

    .popup-inner h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: rgb(156, 156, 156);
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

    .popup-close {
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
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .popup-close:hover,
    .popup-close:focus {
        background-color: #e11d48;
        color: #fff;
        outline: none;
    }

    /* DataTable styling */
    .DataTable {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    .Column {
        text-align: left;
        padding: 0.75rem 1rem;
    }

    /* Media queries for responsiveness */
    @media (min-width: 768px) {
        .min-h-screen {
            padding: 2rem;
        }
    }
</style>
