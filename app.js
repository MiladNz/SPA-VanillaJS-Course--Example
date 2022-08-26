//1. what view show to user based on Route ?
function router(params) {
  const routes = [
    { path: "/", view: () => console.log("dashboard page") },
    { path: "/posts", view: () => console.log("posts page") },
    { path: "/products", view: () => console.log("products page") },
  ];
  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });
  let match = potentialRoutes.find((route) => route.isMatch);

  if (!match) {
    match = {
      route: { path: "/not-found", view: () => console.log("not found page") },
      isMatch: true,
    };
  }
  console.log(match.route.view());
}

//2. push user to new url :
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // if (e.target.hasAttribute("data-link")) {         or
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
