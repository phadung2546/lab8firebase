<template>
  <br />
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-hover v-slot="{ isHovering, props }" disabled>
        <v-card
          :elevation="isHovering ? 12 : 2"
          class="mx-auto"
          height="500"
          max-width="500"
          v-bind="props"
          variant="outlined"
        >
          <v-card-text class="my-4 text-center text-h6"> LOFIN | RERISTER </v-card-text>
          <div>
            <v-responsive class="mx-auto" max-width="344">
              <v-text-field
                hide-details="auto"
                label="Email address"
                placeholder="johndoe@gmail.com"
                type="email"
                v-model="email"
              ></v-text-field
              ><br />
              <v-text-field
                label="Password"
                type="password"
                hint="Enter your password to access this website"
                v-model="pwd"
              ></v-text-field>
            </v-responsive>
            <!--  Email : <input type="text" placeholder="email" v-model="email" /> <br />
            password :<input type="password" name="pwd" id="" v-model="pwd" /><br /> -->

            <center>
              <v-btn variant="flat" color="info">
                <button @click="Login()">Login</button>
              </v-btn>

              <v-btn variant="flat" color="error">
                <button @click="register()">regiter</button>
              </v-btn>
            </center>
          </div>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <br />
</template>

<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const pwd = ref("");
const email = ref("");

const Login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("OK");
      console.log(user);
      router.push('/about')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      alert("No");
    });
};

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Successfully Register" + user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);

      // ..
    });
};
</script>

<style></style>
