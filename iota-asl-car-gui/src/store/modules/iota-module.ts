/* eslint-disable */
import axios from "axios";

const state = {
  car: {},
  charger: {},
  carBalance: 0,
  chargerBalance: 0,
  transactions: {},
};

const getters = {
  car: (state: any) => state.car,
  charger: (state: any) => state.charger,
  carBalance: (state: any) => state.carBalance,
  chargerBalance: (state: any) => state.chargerBalance,
  transactions: (state: any) => state.transactions,
};

const actions = {
  async createAccount({ commit }: any, type: string) {
    const response = await axios.post("http://localhost:3000/create-account", {
      type,
    });
    if (type === "car") {
      commit("setCarCreatedAccount", response.data);
    } else {
      commit("setChargerCreatedAccount", response.data);
    }
  },
  async generateAddress({ commit }: any, type: string) {
    const response = await axios.post(
      "http://localhost:3000/generate-address",
      {
        type,
      }
    );
    if (type === "car") {
      commit("setCarGeneratedAddress", response.data);
    } else {
      commit("setChargerGeneratedAddress", response.data);
    }
  },
  async checkBalance({ commit }: any, type: string) {
    const response = await axios.post("http://localhost:3000/check-balance", {
      type,
    });
    if (type === "car") {
      commit("fetchCarBalance", response.data.balance);
    } else {
      commit("fetchChargerBalance", response.data.balance);
    }
  },
  async sendBalance({ commit }: any, type: any) {
    try {
      const response = await axios.post(
        `http://localhost:3000/send-payment`,
        type
      );
      commit("setTransaction", response);
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

const mutations = {
  setCarCreatedAccount: (state: { car: any }, car: any) => (state.car = car),
  setChargerCreatedAccount: (state: { charger: any }, charger: any) =>
    (charger.users = charger),
  setCarGeneratedAddress: (state: { car: any }, car: any) => (state.car = car),
  setChargerGeneratedAddress: (state: { charger: any }, charger: any) =>
    (state.charger = charger),
  fetchCarBalance: (state: { carBalance: any }, carBalance: any) =>
    (state.carBalance = carBalance),
  fetchChargerBalance: (state: { chargerBalance: any }, chargerBalance: any) =>
    (state.chargerBalance = chargerBalance),
  setTransaction: (state: { transactions: any }, transactions: any) =>
    (state.transactions = transactions),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
