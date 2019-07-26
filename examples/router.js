const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

const Router = {
    routes: [],
    scripts: [],
    findRoutes: () => Array.prototype.slice.call(document.getElementById("router").children).map(val => {
        val.style.display = "none";
        Router.routes.push({route: val.attributes.path.nodeValue, object: val});
    }), // Finding routes in div#router
    checkRoute: () => Router.routes.map(val => val.route).indexOf(window.location.pathname), // Checking was that route specified
    renderPage: () => {
        Router.routes.map(val => val.object.style.display = "none");
        if (Router.checkRoute() !== -1) {
            if (Router.routes[Router.checkRoute()].object.attributes.from !== undefined) {
                let xhr = new XHR;
                xhr.open("GET", Router.routes[Router.checkRoute()].object.attributes.from.nodeValue, true);
                xhr.onload = () => Router.routes[Router.checkRoute()].object.innerHTML = xhr.responseText;
                xhr.send();
            } else {
                if (Router.scripts.map(val => val.route).includes(Router.routes[Router.checkRoute()].route)) Router.scripts.filter(val => val.route == Router.routes[Router.checkRoute()].route)[0].callback();
            }
            Router.routes[Router.checkRoute()].object.style.display = "";
        } else Router.routes.filter(val => val.route == "*")[0].object.style.display = "";
    }, // Render page of the current route
    goTo: route => {
        history.pushState(null, null, window.location.origin + route);
        Router.renderPage();
    }, // Go to page with specifed route
    makeLinks: () => Array.prototype.slice.call(document.getElementsByClassName("RouterLink")).map(val => val.onclick = () => Router.goTo(val.attributes.path.nodeValue)), // Replace a.RouterLink to Router's link
    addScript: (route, callback) =>  Router.scripts.push({route: route, callback: callback}) // Add script that will run when page is rendring
};

Router.findRoutes();
// Adding scripts here

Router.makeLinks();
Router.goTo(window.location.pathname);
