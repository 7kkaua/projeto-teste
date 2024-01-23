import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AddEvent from './components/AddEvent.vue';
import EventList from './components/EventList';

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'HomePage'
    },


    {
        path: '/add-event',
        component: AddEvent,
        name: 'AddEvent'
    },

    {
        path: '/event-list',
        component: EventList,
        name: 'EventList'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;