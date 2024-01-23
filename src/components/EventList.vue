<template>
    <div class="site-content">
        <div class="container">
            <div class="title">
                <h1>
                    Anotações
                </h1>
            </div>
            <div class="close-container">
                <button type="button" class="close" @click="closeEventList">
                    <i class="fas fa-times">
                    </i>
                </button>
            </div>
            <ul class="list-group" v-if="localEvents.length > 0">
                <li class="list-group-item" v-for="(event, eventIndex) in localEvents" :key="eventIndex">
                    <div>
                        <div class="mt-4">
                            <div class="event-item">
                                <i class="fas fa-paperclip"></i>
                                <div class="event-info">
                                    <div class="title-item">
                                        <p>
                                            <u>
                                                {{ event.title.length > 25 ? event.title.slice(0, 25) + (event.title.length
                                                    >
                                                    25 ? '...' : '') : event.title }}
                                            </u>
                                        </p>
                                    </div>
                                    <div class="sub">
                                        <p> {{ event.value }} - </p>
                                        <span class="separator"></span>
                                        <p> {{ event.category }} - </p>
                                        <span class="separator"></span>
                                        <p> {{ formatDate(event.date) }}</p>
                                    </div>
                                </div>
                                <div class="button-container">
                                    <div class="btn-group">
                                        <button type="button" class="btn" @click="openModal">
                                            <i class="fas fa-trash-alt">
                                            </i>
                                        </button>
                                    </div>
                                    <div class="modal" :class="{ 'is-active': showModal }">
                                        <div class="modal-background" @click="closeModal"></div>
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">
                                                        Deseja excluir essa anotação?
                                                    </h5>
                                                </div>
                                                <div class="modal-body">
                                                    <p>
                                                        Você está prestes a deletar uma anotação e esta ação não poderá ser
                                                        desfeita. Tem certeza que deseja excluí-la?
                                                    </p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" @click="closeModal">
                                                        Cancelar
                                                    </button>
                                                    <button class="btn btn-danger" @click="deleteEvent(eventIndex)">
                                                        Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="no-events-message">
                <h2>
                    Nenhuma anotação realizada.
                </h2>
            </div>
            <div class="btn-container">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" @click="goToAddEvent">
                        + Criar anotação
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventList',
    emits: ['eventAdded', 'eventsUpdated'],
    props: {
        events: {
            type: Array,
            default: () => { }
        }
    },

    data() {
        return {
            localEvents: [],
            showModal: false,
            currentIndex: null
        };
    },

    created() {
        this.localEvents = JSON.parse(JSON.stringify(this.events));
    },

    methods: {
        openModal(eventIndex) {
            this.currentIndex = eventIndex;
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
        },

        closeEventList() {
            this.$router.push({ name: 'HomePage' });
        },

        saveChanges() {
            localStorage.setItem('events', JSON.stringify(this.localEvents));
            this.$emit('eventsUpdated', this.localEvents);
        },

        deleteEvent(eventIndex) {
            this.localEvents.splice(eventIndex, 1);
            localStorage.setItem('events', JSON.stringify(this.localEvents));
            this.$emit('eventsUpdated', this.localEvents);
            this.closeModal();
        },

        formatDate(date) {
            if (!date) return '';
            const eventDate = new Date(date);
            if (isNaN(eventDate.getTime())) {
                return 'Data inválida';
            }
            const day = String(eventDate.getDate()).padStart(2, '0');
            const month = String(eventDate.getMonth() + 1).padStart(2, '0');
            const year = eventDate.getFullYear();
            return `${day}/${month}/${year}`;
        },

        goToAddEvent() {
            this.$router.push({ name: 'AddEvent' });
        }
    }
};
</script>



<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
    display: none;
    margin: auto;
}

.modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
  

.modal-body {
    text-align: left;
}


.modal-content {
    width: 100%;
    height: 100%;
    border-radius: 9px;
    display: flex;
    margin: auto;
}

.btn-danger {
    border-radius: 50px;
}

.btn-secondary {
    border-radius: 50px;
}


.btn-content {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;
    margin-left: 450px;
}

.modal.is-active {
    width: 100%;
    background: rgba(0, 0, 0, 0.29);
    display: flex;
    align-items: center;
    justify-content: center;
}

.no-events-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
}

.container {
    position: relative;
    max-height: 100%;
    background-color: rgba(240, 248, 255, 0.616);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 600px;
    width: 400px;
    margin: 20px auto;
}

.list-group-item {
    position: relative;
    background-color: rgba(240, 248, 255, 0.616);
    padding: 0px;
    border: none;
}

.list-group {
    max-height: 450px;
    width: 100%;
    overflow-y: auto;
    flex-grow: 1;
}

.event-item {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    margin-bottom: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-item p {
    font-size: 1.3em;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
}

.sub {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    text-align: left;
}

.sub p {
    font-size: 0.7em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.event-info {
    width: 80%;
    font-size: 16px;
    padding: 9px;
    margin-top: 10px;
}

.title {
    position: absolute;
    top: 13px;
    width: 90%;
    display: flex;
    justify-content: left;
    padding-bottom: 15px;
    text-align: left;
}

h1 {
    font-weight: bold;
}

.btn-container {
    position: absolute;
    bottom: 13px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 15px;
    margin-top: auto;
}


.separator {
    margin: 0 2px;
    color: black;
}

.btn-primary {
    width: 225px;
    border-radius: 25px;
}

.btn {
    border: none;
}

.fa-paperclip {
    color: lightslategray;
}

.fa-trash-alt {
    color: red;
}

.close-container {
    position: absolute;
    top: 15px;
    padding-left: 95%;
    width: 96%;
    display: flex;
    justify-content: right;
    padding-bottom: 15px;
    text-align: right;
}

.close {
    text-align: right;
    background-color: rgba(240, 248, 255, 0.616);
    border: none;
}

.fa-times {
    font-size: 1.5em;
    border: none;
    background-color: rgba(240, 248, 255, 0.616);
    color: black;
}

::-webkit-scrollbar {
    width: 8px;

}

::-webkit-scrollbar-thumb {
    background-color: #0d6efd;
    border-radius: 6px;
}

::-moz-scrollbar {
    width: 12px;
}

::-moz-scrollbar-thumb {
    background-color: #0d6efd;
    border-radius: 6px;
}

@media (max-width: 600px) {
    .container {
        width: 100%;
    }

    .list-group {
        width: 100%;
    }

    .btn-content {
        margin-top: 100px;
        margin-left: 165px;
    }
}

@media (min-width: 601px) and (max-width: 1024px) {
    .container {
        width: 80%;
    }


}
</style>
