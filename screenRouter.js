const getRandomId = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z ^0-9]+/g, "")
    .substr(2, 10);
};

const data = {
  screens: {
    screenId: String,
    htmlObject: String,
  },
  routes: [{ routeId: Number, screenName: String, props: Object }],
  props: Object,
};

const screenRouter = (document) => {
  const d = document;
  const root = d.getElementById("root");
  const header = d.getElementById("header-component");
  const headerNav = d.getElementById("navigation-head");
  const headerNavBack = d.getElementById("navigation-back");
  const footer = d.getElementById("footer-component");
  const loading = d.getElementById("loading");

  headerNavBack.style.display = "none";

  const setScreens = (screens) => {
    Object.keys(screens).forEach((s) => {
      if (screens[s].substring(1, 7) == "object") {
        const generatedId = getRandomId();
        data.screens[s] = {
          screenId: `screen-${generatedId}`,
          htmlObject:
            screens[s].substring(0, 7) +
            ` id="screen-${generatedId}"` +
            screens[s].substring(7),
        };
      }
    });
  };

  const routePush = (screenName, props) => {
    const screen = {
      routeId: data.routes.length,
      screenName: screenName,
      props: props,
    };

    data.routes.push(screen);
  };

  const setStyle = (screenId, styles) => {
    Object.keys(styles).forEach((key) => {
      d.getElementById(screenId).setAttribute(
        "style",
        `${key}: ${styles[key]}`
      );
    });
  };

  const nav = (screenName, props) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      loading.style.display = "flex";

      const screenId = data.screens[screenName].screenId;

      if (
        data.routes.length > 1 &&
        data.screens[data.routes[data.routes.length - 1].screenName]
      ) {
        const lastScreenId =
          data.screens[data.routes[data.routes.length - 1].screenName].screenId;
        d.getElementById(lastScreenId).remove();
      }
      header.insertAdjacentHTML(
        "afterend",
        data.screens[screenName].htmlObject
      );

      d.getElementById(screenId).onload = () => {
        if (props && props.style) {
          setStyle(screenId, props.style);
        }
        routePush(screenName, props);

        loading.style.display = "none";

        if (screenName != "home") {
          headerNav.style.display = "none";
          headerNavBack.style.display = "flex";
        }

        resolve();
      };

      d.getElementById(screenId).onerror = (err) => {
        reject(err);
      };
    });
  };

  const back = () => {
    return new Promise((resolve, reject) => {
      if (data.routes.length > 1) {
        const lastScreen = data.routes[data.routes.length - 2].screenName;

        headerNav.style.display = "flex";
        headerNavBack.style.display = "none";
        nav(lastScreen)
          .then(() => {
            data.routes.splice(-2, 2);
            resolve();
          })
          .catch(reject);
      }
    });
  };

  return {
    setScreens,
    nav,
    back,
  };
};

export default screenRouter;
