<template>
    <div class="site-content">
        <div class="container">
            <div class="close-container">
                <button type="button" class="close" @click="closeAddEvent">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form @submit.prevent="addEvent">
                <div class="form-group">
                    <label for="title">
                        <strong>
                            Anotações
                        </strong>
                    </label>
                    <div>
                        <textarea class="form-control" id="title" placeholder="Escreva aqui" v-model="newlocalEvent.title"
                            required autocomplete="off" style="height: 130px; width: 300px;">
                        </textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label for="value">
                        <strong>
                            Potencial do negócio
                        </strong>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="value" @input="formatCurrency"
                            v-model="newlocalEvent.value" required autocomplete="off" placeholder="Digite o valor" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="category">
                        <strong>
                            Categorização
                        </strong>
                    </label>
                    <div class="input-group">
                        <select class="form-control" id="category" v-model="newlocalEvent.category" required
                            autocomplete="off" style="cursor: pointer;">
                            <option value="">
                                Selecione uma categoria
                            </option>
                            <option value="Crucial">Crucial</option>
                            <option value="Essencial">Essencial</option>
                            <option value="Importante">Importante</option>
                            <option value="Relevante">Relevante</option>
                            <option value="Secundário">Secundário</option>
                            <option value="Dispensável">Dispensável</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="time">
                        <strong>
                            Horário
                        </strong>
                    </label>
                    <div class="input-group">
                        <input
                        type="time"
                        class="form-control"
                        id="time"
                        required
                        v-model="newlocalEvent.time"
                        autocomplete="off" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="date">
                        <strong>
                            Lembrete
                        </strong>
                    </label>
                    <div>
                        <div class="input-group">
                            <input 
                            type="date" 
                            class="form-control" 
                            id="date" 
                            v-model="newlocalEvent.date" 
                            required
                            autocomplete="off" />
                        </div>
                    </div>
                </div>
                <div class="btn-container">
                    <div class="btn-group">
                        <button type="reset" class="btn btn-danger">
                            <i class="fas fa-trash-alt">
                            </i>
                        </button>
                    </div>
                    <div class="button-container">
                        <button type="submit" class="btn btn-primary" @click="validateFields">
                            Salvar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>


export default {
    name: 'AddEvent',

    data() {
        return {
            newlocalEvent: {
                title: '',
                value: '',
                category: '',
                date: '',
                time: ''
            },
        };
    },
    methods: {
        closeAddEvent() {
            this.$router.push({ name: 'HomePage' })
        },

        navigateToEventList() {
            this.$router.push({ name: 'EventList' })
        },

        addEvent() {
            if (
                this.newlocalEvent.title &&
                this.newlocalEvent.value &&
                this.newlocalEvent.category &&
                this.newlocalEvent.date &&
                this.newlocalEvent.time
            ) {
                this.$emit('eventAdded', this.newlocalEvent);
                this.clearFields();
            }
        },

        formatCurrency(event) {
            let input = event.target.value;
            const onlyDigits = input.replace(/\D/g, '');
            const numericValue = Number(onlyDigits) / 100;
            const currencyFormat = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const formatValue = currencyFormat.format(numericValue);
            this.newlocalEvent.value = formatValue;
        },

        clearFields() {
            this.newlocalEvent = {
                title: '',
                value: '',
                category: '',
                date: '',
                time: ''
            }
        },

        validateFields(event) {
            event.preventDefault();

            if (
                this.newlocalEvent.title &&
                this.newlocalEvent.value &&
                this.newlocalEvent.category &&
                this.newlocalEvent.date &&
                this.newlocalEvent.time
            ) {
                this.addEvent();
                this.navigateToEventList();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios!')
            }
        },
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
    height: 684px;
    width: 400px;
    margin: 20px auto;
}

.form-group {
    flex: 1 1 50%;
    padding: 5px;
    box-sizing: border-box;
    max-width: 300px;
    margin-bottom: 25px;
}

textarea {
    height: 130px;
    width: 300px;
    resize: none;
}

textarea::-webkit-scrollbar {
    width: 8px;
}

textarea::-webkit-scrollbar-thumb {
    background-color: #0d6efd;
    border-radius: 6px;
}

textarea::-moz-scrollbar {
    width: 8px;
}

textarea::-moz-scrollbar-thumb {
    background-color: #0d6efd;
    border-radius: 6px;
}

.form-control {
    border-radius: 300px;
}

#title {
    border-radius: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
}

.input-group {
    border-radius: 350px;
}

.btn-container {
    display: flex;
    justify-content: space-between;
}

.btn-danger {
    border-radius: 20px;
}

.btn-primary {
    width: 225px;
    border-radius: 25px;
}

.close-container {
    padding-left: 100%;
}

.close {
    text-align: right;
    background-color: rgba(240, 248, 255, 0.616);
    border: none;
}

.fa-times {
    font-size: 1.5em;
    background-color: rgba(240, 248, 255, 0.616);
    color: black;
}

@media (max-width: 600px) {
    .container {
        width: 100%;
    }

    .form-group {
        max-width: 100%;
    }

    .form-control {
        width: 100%;
    }

    #title {
        width: 100%;
    }


}

@media (min-width: 601px) and (max-width: 1024px) {
    .container {
        width: 80%;
        margin: auto;
        justify-content: center;
        align-items: center;
    }

    .form-group {
        max-width: 100%;
    }

    .form-control {
        width: 100%;
    }

    #title {
        width: 100%;
    }
}
</style>