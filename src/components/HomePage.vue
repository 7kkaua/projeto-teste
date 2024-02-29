<template>
    <div class="menu-toggle" @click="toggleMenu" :class="{ 'fixed-icon': isMenuOpen }">
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'">
        </i>
    </div>

    <!-- Menu Lateral -->
    <aside class="sidebar" :class="{ 'sidebar-open': isMenuOpen }">
        <div class="title-menu">
            <h1>[Nome]</h1>
        </div>
        <ul class="list-menu">
            <li @click="goTo('EventList')">Ver Anotações</li>
            <li @click="navigateTo('AddEvent')">Adicionar Anotação</li>
        </ul>
    </aside>
    <div class="site-content">
        <div class="container">
            <div class="title">
                <i class="fas fa-paperclip"></i>
                <h1>
                    Anotações
                </h1>
                <h2>
                    by [Nome]
                </h2>
            </div>
            <div class="btn-container">
                <button type="button" class="btn btn-primary" @click="goToAddEvent">
                    + Criar anotação
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomePage',
    data() {
        return {
            isMenuOpen: false,
        }
    },

    methods: {
        navigateTo(AddEvent) {
            this.$router.push({ name: AddEvent });
            this.closeMenu();
        },

        goTo(EventList) {
            this.$router.push({ name: EventList });
            this.closeMenu();
        },

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },

        closeMenu() {
            this.isMenuOpen = false;
        },

        goToAddEvent() {
            this.$router.push({ name: 'AddEvent' });
        }
    }
};
</script>

<style scoped>
.container {
    overflow-y: hidden;
    overflow-x: hidden;
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

.fa-paperclip {

    color: lightslategray;
    padding-top: 40px;
    font-size: 3em;
}

.title {
    padding-top: 30%;
}

h1 {
    font-weight: bold;
    color: #0d6efd;
    padding-top: 30%;
}

h2 {
    font-size: medium;
}

.btn-container {
    padding-bottom: 50%;
    margin: auto;
}

.btn-primary {
    margin: auto;
    border-radius: 25px;
}

.menu-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    cursor: pointer;
    font-size: 20px;
    z-index: 2;
    transition: left 0.3s ease, right 0.3s ease;
}


.fixed-icon {
    position: fixed;
    right: 20px;
    top: 20px;
    left: 175px;
}

.menu-toggle.fixed-icon {
    transition: left 0.3s ease, right 0.3s ease;
}

.menu-toggle i {
    transition: transform 0.3s ease;
    /* Adiciona animação ao ícone do menu */
}

.menu-toggle.open {
    transform: rotate(90deg);
    /* Rotação do ícone quando o menu está aberto */
}

.sidebar {
    width: 200px;
    background-color: #f8f9fa;
    height: 100vh;
    position: fixed;
    top: 0;
    left: -200px;
    /* Inicia fechado */
    padding-top: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
}

.title-menu h1 {
    padding-left: 10px;
    padding-top: 0;
    color: #11699B;
    font-size: 1.8em;
}

ul {
    margin-top: 50px;
}

li {
    padding-left: 10px;
    cursor: pointer;
}

li:hover {
    background-color: #11699B;
    color: white;
    transition: 0.3s ease;
    width: 100%;
}

.sidebar-open {
    left: 0;
}

.list-menu {
    list-style: none;
    padding: 0;
    padding-top: 0;
}


@media (max-width: 600px) {
    .container {
        width: 100%;
    }

    .sidebar {
        position: fixed;
    }
}

@media (min-width: 601px) and (max-width: 1024px) {
    .container {
        width: 80%;
        margin: auto;
        justify-content: center;
        align-items: center;
    }
}
</style>
