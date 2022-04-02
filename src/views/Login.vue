<template>
  <div class="login">
    <div class="loginContainer">
      <h1>Login</h1>
      <p>Email adress</p>
      <input type="text" placeholder="Email adress" v-model="email">
      <p>Password</p>
      <input type="password" placeholder="Password" v-model="password">
      <button class="primary-btn" @click="login()">Log in</button>
    </div>
  </div>
</template>

<script>

import { auth, signInWithEmailAndPassword } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    }
  },

  created() {
    document.title = "Login";
  },

  methods: {
    login() {
      if(this.email == null ||this.password == null) {
        alert("Please fill out all fields")
      }
      else {

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          alert(error)
        });
      }
    },
  },
}
</script>

<style lang="scss">

.login {
  width: 100%;
  height: 100vh;

  .loginContainer {
    width: 90%;
    max-width: 400px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: auto;
    padding: 40px;
    border-radius: 5px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    h1 {
      text-align: center;
      margin-bottom: 50px;
    }

    p {
      margin-bottom: 5px;
    }

    input {
      padding: 10px;
      border: none;
      background: rgb(243, 243, 243);
      border-radius: 5px;
      width: 100%;
      margin-bottom: 20px;
    }

    .primary-btn {
      width: 90px;
      margin: auto;
      margin-top: 30px;
      display: block;
    }
  }
}

</style>
