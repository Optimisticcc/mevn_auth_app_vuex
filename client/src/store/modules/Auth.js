import axios from "axios";
import router from "../../router";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: "",
  error: null,
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  error: state => state.error
};

const actions = {
  //login action
  async login({ commit }, user) {
    commit("auth_request");
    try {
      let res = await axios.post("/api/users/login", user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        //store token in local storage
        localStorage.setItem("token", token);
        //set axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
      }
      return res;
    } catch (error) {
      commit("auth_error", error);
    }
  },
  async register({ commit }, userData) {
    commit("register_request");
    try {
      let res = await axios.post(
        "/api/users/login",
        userData
      );
      if (res.data.success !== undefined) {
        commit("register_success");
      }
      return res;
    } catch (error) {
      commit("register_error", error);
    }
  },
  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  },
  //get user profile
  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get("/api/users/profile");
    commit("profile_present", res.data.user);
    return res;
  },
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
    state.error = null;
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.user = user;
    state.token = token;
    state.error = null;
  },
  register_request(state) {
    state.status = "loading";
    state.error = null;
  },
  register_success(state) {
    state.status = "success";
    state.error = null;
  },
  logout(state) {
    (state.token = ""), (state.user = {}), (state.status = "") ,(state.error = null);
  },
  profile_request(state) {
    state.status = "loading";
  },
  profile_present(state, user) {
    (state.status = "success"), (state.user = user);
  },
  auth_error(state,err){
    state.error = err.response.data.msg;
  },
  register_error(state,err){
    state.error = err.response.data.msg;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
