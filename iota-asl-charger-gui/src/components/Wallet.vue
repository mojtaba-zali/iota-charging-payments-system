<template>
  <div class="wallet">
    <b-message :closable="false" title="Charger UI" type="is-primary">
      <b-steps v-model="stepValue" type="is-primary">
        <b-step-item
          key="account"
          value="account"
          label="Account"
          icon="account-key"
        >
          <div class="flex">
            <p class="content">Generate Charger Acccount</p>
            <b-button
              type="is-primary"
              :loading="generateLoaderFlag"
              @click="generateCarChargerAccount"
            >
              Generate
            </b-button>
          </div>
          <div v-if="generateFlag">
            <!-- <b-tag type="is-primary"> Car Details </b-tag>
            <div class="flex">
              <p class="content">Address</p>
              <b-tag
                type="is-primary"
                @click="copyText(car.addresses[0].address)"
              >
                {{ car.addresses[0].address }}
              </b-tag>
            </div>
            <div class="flex">
              <p class="content">Balance</p>
              <b-tag type="is-primary">
                {{ car.addresses[0].balance }}
              </b-tag>
            </div> -->
            <div class="flex">
              <p class="content">Address</p>
              <b-tag
                type="is-primary"
                @click="copyText(charger.addresses[0].address)"
              >
                {{ charger.addresses[0].address }}
              </b-tag>
            </div>
            <div class="flex">
              <p class="content">Balance</p>
              <b-tag type="is-primary">
                {{ charger.addresses[0].balance }}
              </b-tag>
            </div>
            <div class="flex">
              <p class="content">Publish Charger Address</p>
              <b-button
                type="is-primary"
                :loading="publisheLoaderFlag"
                @click="publishChargerAccount"
              >
                Publish
              </b-button>
            </div>
          </div>
        </b-step-item>
        <!-- <b-step-item
          key="transfers"
          value="transfers"
          label="Transfers"
          icon="finance"
        >
          <div v-if="!tryAgainTransaction">
            <p class="content">Enter the Amount to be Sent to the Charger</p>
            <b-field label="Amount">
              <b-numberinput :controls="false" v-model="amount"></b-numberinput>
            </b-field>
            <b-button
              type="is-primary"
              :loading="transactionLoaderFlag"
              @click="submitTransaction"
              >Submit</b-button
            >
          </div>
          <div v-else>
            <p class="content">
              Copy the Transaction ID/ Message ID below and
              <a
                href="https://explorer.iota.org/devnet"
                target="_blank"
                style="color: #48c78e"
                >Click Here</a
              >
              to Track the Transaction
            </p>
            <br />
            <p class="content">Transaction ID</p>
            <b-tag type="is-primary" @click="copyText(transactionData)">
              {{ transactionData }}
            </b-tag>
            <p class="content">Messge ID</p>
            <b-tag type="is-primary" @click="copyText(messageId)">
              {{ messageId }}
            </b-tag>
            <br />
            <br />
            <b-button type="is-primary" @click="tryAgainTransactions"
              >New Transaction</b-button
            >
          </div>
        </b-step-item> -->
        <b-step-item key="balance" value="balance" label="Balance" icon="cash">
          <!-- <div class="flex">
            <p class="content">Car Current Balance</p>
            <b-tag type="is-primary"> {{ carBalance }} </b-tag>
          </div> -->
          <div class="flex">
            <p class="content">Charger Current Balance</p>
            <b-tag type="is-primary"> {{ chargerBalance }} </b-tag>
          </div>
        </b-step-item>
      </b-steps>
      <!-- <b-tabs
        v-model="activeTab"
        position="is-centered"
        type="is-boxed"
        class="block"
      >
        <b-tab-item
          key="account"
          value="account"
          label="Account & Address Creation"
          icon="account"
        >
          <div class="flex">
            <p class="content">Generate Car & Charger Acccounts</p>
            <b-button
              type="is-primary"
              :loading="generateLoaderFlag"
              @click="generateCarChargerAccount"
            >
              Generate
            </b-button>
          </div>
          <div v-if="generateFlag">
            <b-tag type="is-primary"> Car Details </b-tag>
            <div class="flex">
              <p class="content">Address</p>
              <b-tag
                type="is-primary"
                @click="copyText(car.addresses[0].address)"
              >
                {{ car.addresses[0].address }}
              </b-tag>
            </div>
            <div class="flex">
              <p class="content">Balance</p>
              <b-tag type="is-primary">
                {{ car.addresses[0].balance }}
              </b-tag>
            </div>
            <b-tag type="is-primary"> Charger Details </b-tag>
            <div class="flex">
              <p class="content">Address</p>
              <b-tag
                type="is-primary"
                @click="copyText(charger.addresses[0].address)"
              >
                {{ charger.addresses[0].address }}
              </b-tag>
            </div>
            <div class="flex">
              <p class="content">Balance</p>
              <b-tag type="is-primary">
                {{ charger.addresses[0].balance }}
              </b-tag>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item
          key="finance"
          value="finance"
          label="Transfer"
          icon="finance"
        >
          <div v-if="!tryAgainTransaction">
            <p class="content">Enter the Amount to be Sent to the Charger</p>
            <b-field label="Amount">
              <b-numberinput :controls="false" v-model="amount"></b-numberinput>
            </b-field>
            <b-button
              type="is-primary"
              :loading="transactionLoaderFlag"
              @click="submitTransaction"
              >Submit</b-button
            >
          </div>
          <div v-else>
            <p class="content">
              Copy the Transaction ID/ Message ID below and
              <a
                href="https://explorer.iota.org/devnet"
                target="_blank"
                style="color: #48c78e"
                >Click Here</a
              >
              to Track the Transaction
            </p>
            <br />
            <p class="content">Transaction ID</p>
            <b-tag type="is-primary" @click="copyText(transactionData)">
              {{ transactionData }}
            </b-tag>
            <p class="content">Messge ID</p>
            <b-tag type="is-primary" @click="copyText(messageId)">
              {{ messageId }}
            </b-tag>
            <br />
            <br />
            <b-button type="is-primary" @click="tryAgainTransactions"
              >New Transaction</b-button
            >
          </div>
        </b-tab-item>
        <b-tab-item
          key="cash"
          value="cash"
          label="Balance"
          icon="cash"
          @click="balance"
        >
          <div class="flex">
            <p class="content">Car Current Balance</p>
            <b-tag type="is-primary"> {{ carBalance }} </b-tag>
          </div>
          <div class="flex">
            <p class="content">Charger Current Balance</p>
            <b-tag type="is-primary"> {{ chargerBalance }} </b-tag>
          </div>
        </b-tab-item>
      </b-tabs> -->
    </b-message>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";

export default Vue.extend({
  name: "Wallet",
  components: {},
  data() {
    return {
      wallet: "",
      amount: 2000000,
      activeTab: "account",
      stepValue: "account",
      carBalance: 0,
      chargerBalance: 0,
      car: {} as any,
      charger: {} as any,
      transactionData: {} as any,
      messageId: "",
      generateFlag: false,
      generateLoaderFlag: false,
      transactionLoaderFlag: false,
      tryAgainTransaction: false,
      publisheLoaderFlag: false,
    };
  },
  watch: {
    stepValue: function (newVal) {
      if (newVal === "balance") {
        this.balance();
      }
      if (newVal === "transfers") {
        this.tryAgainTransactions();
      }
    },
  },
  methods: {
    publishChargerAccount() {
      this.publisheLoaderFlag = true;
      setTimeout(() => {
        this.$buefy.notification.open({
          duration: 3000,
          message: "Address Published",
          position: "is-bottom-right",
          type: "is-success",
        });
        this.publisheLoaderFlag = false;
      }, 3000);
    },
    async balance() {
      await this.$store.dispatch("checkBalance", "car");
      await this.$store.dispatch("checkBalance", "charger");
      this.carBalance = this.$store.getters.carBalance;
      this.chargerBalance = this.$store.getters.chargerBalance;
      this.$buefy.notification.open({
        duration: 3000,
        message: "Balance Successfully Fetched",
        position: "is-bottom-right",
        type: "is-success",
      });
    },
    async generateCarChargerAccount() {
      this.generateLoaderFlag = true;
      await this.$store.dispatch("createAccount", "car");
      await this.$store.dispatch("createAccount", "charger");
      await this.$store.dispatch("generateAddress", "car");
      await this.$store.dispatch("generateAddress", "charger");
      this.car = this.$store.getters.car;
      this.charger = this.$store.getters.charger;
      this.generateFlag = true;
      this.generateLoaderFlag = false;
      this.$buefy.notification.open({
        duration: 3000,
        message: "Accounts Created Successfully",
        position: "is-bottom-right",
        type: "is-success",
      });
    },
    async copyText(mytext: string) {
      try {
        await navigator.clipboard.writeText(mytext);
        this.$buefy.notification.open({
          duration: 3000,
          message: "Text Copied",
          position: "is-bottom-right",
          type: "is-success",
        });
      } catch ($e) {
        this.$buefy.notification.open({
          duration: 3000,
          message: "Text Copied",
          position: "is-bottom-right",
          type: "is-success",
        });
      }
    },
    async submitTransaction() {
      this.transactionLoaderFlag = true;
      if (this.amount === 0) {
        this.transactionLoaderFlag = false;
        this.$buefy.notification.open({
          duration: 3000,
          message: "The Amount cannot be Zero",
          position: "is-bottom-right",
          type: "is-danger",
        });
      } else if (this.amount < 1000000 && this.amount > 0) {
        this.transactionLoaderFlag = false;
        this.$buefy.notification.open({
          duration: 3000,
          message:
            "The Amount should be greater than 1000000. Dust error: No dust output allowed on address",
          position: "is-bottom-right",
          type: "is-danger",
        });
      } else {
        const recieverAddress = this.charger.addresses[0].address;
        await this.$store.dispatch("sendBalance", {
          address: recieverAddress,
          amount: this.amount,
          type: "car",
        });
        const response = this.$store.getters.transactions;
        if (response.status === 200) {
          const responseData =
            response.data.response.payload.data.essence.data.inputs[0];
          this.transactionData = responseData.data.input;
          this.messageId = responseData.data.metadata.messageId;
          this.tryAgainTransaction = true;
          this.transactionLoaderFlag = false;
          this.$buefy.notification.open({
            duration: 3000,
            message: "Transaction Successful",
            position: "is-bottom-right",
            type: "is-success",
          });
        } else {
          this.transactionLoaderFlag = false;
          this.$buefy.notification.open({
            duration: 3000,
            message: "Internal Server Error",
            position: "is-bottom-right",
            type: "is-danger",
          });
        }
      }
    },
    tryAgainTransactions() {
      this.tryAgainTransaction = false;
    },
  },
});
</script>

<style scoped>
.wallet {
  height: 40%;
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.flex {
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}

.content {
  text-align: left;
}
</style>
