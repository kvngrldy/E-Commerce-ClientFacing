<template>
  <section id="login" style="overflow: hidden;">
    <div class="wrapper-test">
      <div class="message"></div>
      <form @submit.prevent="login" method="post" class="form-signin">
        <h2 class="form-signin-heading text-center">Login</h2>
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email-login"
          type="text"
          class="form-control"
          name="email"
          placeholder="eg: example@email.com"
          required
          autofocus
        />

        <label for="email">Password</label>
        <input
          v-model="password"
          id="password-login"
          type="password"
          class="form-control"
          name="password"
          placeholder="Sssstttt"
          required
        />

        <button class="btn btn-lg btn-primary btn-block">Login</button>
        <small>
          Don't have an account?
          <a href="" @click.prevent="toRegister">Register</a>
        </small>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
      toRegister() {
          this.$store.dispatch('toRegister')
      },
      login() {
          this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })
      }
  }
};
</script>

<style>
#login {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(72, 161, 118, 1) 100%
  );
  min-height: 100vh;
}

#login-form {
  width: 30rem;
  height: auto;
}

.form-signin {
  max-width: 7000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px 40px 50px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
}

.form-signin input[type="text"],
.form-signin input[type="password"] {
  margin-bottom: 20px;
}
.form-signin .form-control {
  padding: 10px;
}
.list-group-item:hover {
  background-color: beige;
}

.fixed-bottom {
  left: auto;
  right: 25px;
  bottom: 30px;
}
</style>