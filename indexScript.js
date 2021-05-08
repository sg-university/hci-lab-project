import screenRouter from "./screenRouter.js";

const d = document;

const router = screenRouter(d);

const HomeScreen = '<object data="./Containers/HomeScreen.html"></object>';
const LoginScreen = '<object data="./Containers/LoginScreen.html"></object>';
const RegisterScreen =
  '<object data="./Containers/RegisterScreen.html"></object>';
const ProductScreen =
  '<object data="./Containers/ProductScreen.html"></object>';
const ContactScreen =
  '<object data="./Containers/ContactScreen.html"></object>';

d.addEventListener("DOMContentLoaded", () => {
  router.setScreens({
    home: HomeScreen,
    login: LoginScreen,
    register: RegisterScreen,
    product: ProductScreen,
    contact: ContactScreen,
  });

  router.nav("home");

  d.getElementById("logo").addEventListener("click", (e) => {
    router.nav("home");
  });

  d.getElementById("navigation-back").addEventListener("click", (e) => {
    router.back();
  });

  d.getElementById("nav-head-register-screen").addEventListener(
    "click",
    (e) => {
      const style = {
        height: "120vh",
      };
      router.nav("register", { style });
    }
  );

  d.getElementById("nav-head-login-screen").addEventListener("click", (e) => {
    const style = {
      height: "120vh",
    };
    router.nav("login", { style });
  });

  d.getElementById("nav-head-home-screen").addEventListener("click", (e) => {
    router.nav("home");
  });

  d.getElementById("nav-tail-home-screen").addEventListener("click", (e) => {
    router.nav("home");
  });

  d.getElementById("nav-tail-product-screen").addEventListener("click", (e) => {
    router.nav("product");
  });

  d.getElementById("nav-tail-contact-screen").addEventListener("click", (e) => {
    const style = {
      height: "110vh",
    };
    router.nav("contact", { style });
  });
});
