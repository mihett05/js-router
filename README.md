# js-router
Micro client-side js router.

## Pages
Pages must be in `div#router` tag. All pages must have path attribute, that have routing of the page, in tag. `*` in path means all before undefined pages.

Example:
```
<div id="router">
    <div path="/">
        <h1>Index Page</h1>
    </div>
    <div path="/news">
        <h1>News Page</h1>
    </div>
    <div path="*">
        <h1>Another page or Page Not Found</h1>
    </div>
</div>
```

### Pages from another sites
You can use pages from another sites as pages in router. You need to set `from` attribute in your page tag.

Example:
```
<div id="router">
    <div path="/">
        <h1>Index Page</h1>
    </div>
    <div path="/news">
        <h1>News Page</h1>
    </div>
    <div path="/friend" from="http://myfriendsite.com/about"></div>
    <div path="*">
        <h1>Another page or Page Not Found</h1>
    </div>
</div>
```

## Scripts

You can add scripts to pages, you just need to use `Router.addScript(route, callback);` in `router.js`

Example:
```
// Adding scripts here
Router.addScript("/", () => alert("Welcome!"));
```

## Links
To make link to routing's page, you need set route in `path` attribute in tag, and set class of tag as `RouterLink`.

Example:
```
<header>
    <a path="/" class="RouterLink">Index</a>
    <a path="/news" class="RouterLink">News</a>
    <a path="/friend" class="RouterLink">About page of my friend's site</a>
</header>
```

## Config
You can set router's config. You can set only routing mode yet. You need to set `Route.config` to configure router.

`Route.config` is object, that have one key: `mode` and 2 parameters: `"history"` or `"href"`.

`history` - in this mode the router use History API to routing, and pages will be upadting withoue updating of site page in browser.

`href` - in this mode the router use `window.location.href` for transition to pages. 

```
Route.config = {mode: "history" | "href"}
```

## API
`Router.routes` - Array of objects of app's routes. Object have keys: route, object (`{route, object}`), route - route of the page, object - DOM-object with the page.

`Router.scripts` - Array of objects of app's routes' scripts. Object have keys: route, callback (`{route, callback}`).

`Router.config` - Object of config's parameters. This only `mode` parameter yet. More about it in **config** section.

`Router.findRoutes()` - Find pages in `div#router` tag, hide pages and add in `Router.routes`.

`Router.checkRoute()` - Check is the current pathname in `Router.routes`.

`Router.renderPage()` - Show page with the current pathname and run script with current script, if this have in `Router.routes`, else show page with route - `*`. Or send Ajax request to `from` attribute.

`Router.goTo(route)` - replace url to `route` and rendering page with `Router.renderPage`.

`Router.makeLinks()` - add onclick attribute to `a.RouterLink`.

`Router.addScript(route, callback)` -  add object to `Router.scripts`. You need to add scrpits to `// Adding scripts here` in `router.js`.
