<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Register</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                v-model="username"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                v-model="name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                v-model="email"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                id="password"
                v-model="password"
              >
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                name="confirm_password"
                id="confirm_password"
                v-model="confirm_password"
              >
            </div>
            <button class="btn btn-primary">Register</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/login" class="card-link">Already have an account?</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return {
      username: "",
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  },
  methods: {
    ...mapActions(['register']),
    registerUser(){
      let userRegister = {
        username : this.username,
        name : this.name,
        email: this.email,
        password : this.password,
        confirm_password: this.confirm_password
      }
      this.register(userRegister)
      .then(res =>{
        if(res.data.success){
          this.$router.push('/login');
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .card{
    width: 60%;
    border-radius: 0;
  }
  .btn{
    border-radius: 0;
  }
  .form-control{
    border-radius: 0;
  }
</style>