<template>
  <div class="home">
    <button
        class="button"
        @click="modalToggleHandler"
    >Open Cart</button>

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

        <section class="card-content">

          <article
              class="media"
              v-for="(product, index) in cartData"
              :key="product.id"
          >
            <div class="media-left">
              <figure class="image is-128x128">
                <img :src="product.thumbnail" alt="Image">
              </figure>
            </div>

            <div class="media-content has-text-left">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <p style="line-height: 30px">
                      <strong>{{product.name}}</strong>
                      <br>
                      <small>
                        <strong>Color:</strong>
                        {{product.color}}
                      </small>
                    </p>
                  </div>
                </div>

                <div class="level-right">
                  <div class="level-item">
                    <a
                        class="has-text-danger"
                        @click="productRemoveHandler(index)"
                    >Remove</a>
                  </div>
                </div>
              </div>
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <div class="field has-addons">
                      <p class="control">
                        <a class="button" @click="quantityAdjustHandler(-1, index)">
                          -
                        </a>
                      </p>
                      <p class="control">
                        <input
                            style="width: 50px"
                            class="input has-text-centered"
                            type="text"
                            v-model="product.quantity"
                        >
                      </p>
                      <p class="control">
                        <a class="button" @click="quantityAdjustHandler(1, index)">
                          +
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="level-right">
                  <div class="level-item">
                    <p>
                      <strong>
                        ${{product.unitPrice}}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <hr>

          <div class="has-text-right">
            <strong>Subtotal &nbsp; ${{subTotal}}</strong>
          </div>

          <button class="button is-black my-3 is-fullwidth">PROCEED TO SECURED CHECKOUT</button>

          <div class="separator">Or quick checkout with</div>

          <button class="button is-warning my-3" style="width: 100%">
            <img src="./paypal-logo.png" alt="paypal" style="height: 30px; width: auto">
          </button>

        </section>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
    import '@/types/cart'
    import Api from '@/api'
    import {Component, Vue} from 'vue-property-decorator'

    @Component
    export default class Home extends Vue {
        /**Data**/
        private modalVisible: boolean = false;
        private cartData: Array<ProductInCart> = [];

        /**Computed**/
        get subTotal(): number {
            return this.cartData.reduce((a, b) => a + (b.unitPrice * b.quantity), 0)
        }

        /**Methods**/
        public async modalToggleHandler() {
            this.modalVisible = !this.modalVisible;
            if (this.modalVisible) {
                this.cartData = [];
                this.cartData = await Api.getCartData();
            }
        }

        public quantityAdjustHandler(amount: number, index: number): void {
            let _quantity: number = this.cartData[index].quantity;
            if (_quantity + amount < 0) return;
            this.cartData[index].quantity += amount
        }

        public productRemoveHandler(index: number): void {
            this.cartData.splice(index, 1);
        }
    };
</script>

<style lang="scss">
  .home {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-items: center;

  }

  .my-3 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .separator::before, .separator::after {
    content: ' ';
    height: 2px;
    width: 100px;
    flex: 1;
    border-bottom: 2px solid #f5f5f5;
  }

  .separator::before {
    margin-right: .5em;
  }

  .separator::after {
    margin-left: .5em;
  }
</style>
