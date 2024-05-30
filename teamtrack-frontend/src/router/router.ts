import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import EventsVue from '@/views/Events.vue';
import AddEventVue from '@/views/AddEvent.vue';
import UpdateEventVue from '@/views/UpdateEvent.vue'
import HomePageViewVue from '@/views/HomePageView.vue';
import EventPeopleVue from '@/views/EventPeople.vue';
import PeopleListVue from '@/views/PeopleList.vue';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Avaleht',
        component: HomePageViewVue,
    },
    {
        path: '/athleteEvents',
        name: 'Sportlase Sündmused',
        component: EventsVue,
        props: { title: 'Sündmused', isAthlete: true },
    },
    {
        path: '/coachEvents',
        name: 'Treeneri Sündmused',
        component: EventsVue,
        props: { title: 'Sündmused', isAthlete: false },
    },
    {
        path: '/eventPeople',
        name: 'Isikute sündmused',
        component: EventPeopleVue,
        props: { title: 'Isikute sündmused' },
    },
    {
        path: '/PeopleList',
        name: 'Isikud',
        component: PeopleListVue,
    },
    {
        path: '/newevent',
        name: 'Lisa uus sündmus',
        component: AddEventVue,
    },
    {
        path: '/update/:id',
        name: 'Uuenda harjutust',
        component: UpdateEventVue,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;