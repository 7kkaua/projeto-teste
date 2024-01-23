<template>
  <div id="app">
    <div class="content">
      <div class="container mt-4">
        <router-view 
           :events="eventsList" 
           @eventAdded="handleEventAdded" 
           @eventsUpdated="updatedEventsList">
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      eventsList: [],
    };
  },

  created() {
    const savedEvents = localStorage.getItem('events');
    this.eventsList = JSON.parse(savedEvents);
  },

  methods: {
    handleEventAdded(newEvent) {
      this.eventsList.push(newEvent);
      this.updateEvents();
    },

    updatedEventsList(updatedEvents) {
      this.eventsList = updatedEvents;
      this.updateEvents();
    },

    updateEvents() {
      localStorage.setItem('events', JSON.stringify(this.eventsList));
    },

  },
};
</script>

