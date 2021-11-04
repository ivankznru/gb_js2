Vue.component( 'error', {
    data() {
        return {
            showMessage: false,
            errorMessage: '',
        }
    },
    methods: {
        showError( error ) {
            this.showMessage = true;
            this.errorMessage = error;
        }
    },
    template: `<aside v-if="showMessage" class="modal" id="modal">
                    <div class="modal-heading">
                        <span>Сообщение об ошибке !!!</span>
                    </div>
                    <section class="modal-error">
                    {{ errorMessage }}
                    </section>
                     <button class="buy-btn" type="button" @click='showMessage = !showMessage'>Закрыть</button>
                </aside>`
} );


// 3. * Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.