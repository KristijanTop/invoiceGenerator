<template>
  <div class="app" :class="mode">
    <div id="nav">
      <div class="brand">
        <span>InvoiceGenerator</span>
      <div class="dot"></div>
      </div>
      <div class="darkMode">
        <label class="toggle">
          <input
            type="checkbox"
            :checked="mode === 'dark' ? 'checked' : false"
            @click="toggle()"
          />
          <span class="toggler"></span>
        </label>
        <span class="darkModeText">Dark mode</span>
      </div>
      <router-link to="/Login" v-if="!store.currentUser">Login</router-link>
      <router-link to="/Register" v-if="!store.currentUser"
        >Register</router-link
      >
      <span class="logout" @click.prevent="logOut()" v-if="store.currentUser"
        >Log out</span
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import { auth, onAuthStateChanged, signOut, doc, getDoc, db } from "@/firebase";
import store from "@/store";
import router from "@/router";

onAuthStateChanged(auth, async (user) => {
  const currentRoute = router.currentRoute;
  if (user) {
    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      store.currentUser = docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    store.currentUser = null;
    console.log("No user");
    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "App",
  data() {
    return {
      store,
      mode: "light",
    };
  },

  methods: {
    logOut() {
      signOut(auth)
        .then(() => {
          console.log("Signout succesfull!");
        })
        .catch((error) => {
          console.error(error);
        });
    },

    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Play");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-family: "Play";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  transition: background 0.3s ease-in-out;
}

.dark {
  background: #192734;
  color: #fff;

  .form {
    background: #192734;

    .newItem-btn {
      background: #131e27;
      color: #fff;
    }
    .newItem-btn:hover {
      background: #101a20;
    }
  }

  .container {
    .invoice {
      background: #131e27;
    }
  }

  a {
    color: #fff !important;
  }

  input,
  select {
    background: #131e27 !important;
    color: #fff;
    transition: background 0.3s ease-in-out;
  }

  .invoiceContainer {
    background: #131e27;
    transition: background 0.3s ease-in-out;

    .total {
      border-color: #fff;
    }
  }
}

#nav {
  padding: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  flex-wrap: wrap;

  a {
    font-weight: 700;
    color: #2c3e50;
    text-decoration: none;
    font-size: 17px;
    margin-left: 10px;

    /*&.router-link-exact-active {
      color: #42b983;
    }*/
  }

  .brand {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: rgb(96, 52, 255);
    display: inline-block;
    position: relative;
    bottom: -2px;
    left: 5px;
    border-radius: 2px;
    margin-right: 50px;
  }

  .darkMode {
    margin-right: auto;
    display: flex;
    align-items: center;

    .toggle {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #2c3e50;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
      }

      .toggler:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background: #fff;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .toggler {
        background: rgb(96, 52, 255);
      }

      input:focus {
        box-shadow: 0 0 2px rgb(96, 52, 255);
      }

      input:checked + .toggler:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }

    .darkModeText {
      font-size: 17px;
      font-weight: 700;
      margin-left: 10px;
    }
  }

  .logout {
    font-size: 17px;
    margin-left: 10px;
    cursor: pointer;
    font-weight: 700;
  }
}

.primary-btn {
  background: rgb(96, 52, 255);
  color: #fff;
  padding: 15px;
  outline: none;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Play";
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: 0.2s ease;
}

.primary-btn:hover {
  background: rgb(68, 36, 184);
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: rgb(163, 163, 163);
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(141, 141, 141);
}

@media only screen and (max-width: 650px) {

  .register {
    padding-top: 140px !important;
    padding-bottom: 30px;
  }

  #nav {
    gap: 20px;
  }

  a {
    margin-left: 0px !important;
  }
}
</style>
