<template>
  <main class="home">
    <button
        class="button"
        @click="modalToggleHandler"
    >Open Cart</button>

    <transition name="fade-in">
      <div
          class="override-modal-background"
          v-if="modalVisible"
      />
    </transition>

    <b-modal
        class="custom-modal"
        :active.sync="modalVisible"
        has-modal-card animation="slide-in"
        width="500px"
    >
      <div class="card">
        <header class="modal-card-head has-text-left">
          <p class="modal-card-title">Your shopping cart</p>
          <button
              class="delete is-large"
              @click="modalToggleHandler"
          >X
          </button>
        </header>

      </div>
    </b-modal>
  </main>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    @Component
    export default class Home extends Vue {
        /**Data**/
        private modalVisible: boolean = false;

        /**Methods**/
        public async modalToggleHandler() {
            console.log('click');
            this.modalVisible = !this.modalVisible;
        }
    };
</script>

<style lang="scss">
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

</style>
