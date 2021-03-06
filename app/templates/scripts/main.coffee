require.config
  paths :
    templates             : "../templates"

  #Some requirements
    jquery                : "../components/jquery/jquery"
    underscore            : "../components/underscore/underscore"
    backbone              : "../components/backbone/backbone"
    bridle                : "../components/bridle/dist/bridle"
    layoutmanager         : "../components/layoutmanager/backbone.layoutmanager"
    d3                    : "../components/d3/d3"
  

  # shimmy-shimmy yeah
  shim :
    backbone:
      exports: 'Backbone'
      deps: ['jquery', 'underscore']

    layoutmanager:
      deps: ['jquery', 'backbone']

    d3:
      exports: 'd3'

    underscore:
      exports: '_'


# Start the app!
require ["app", "router"], (app, Router) ->

  # Define your master router on the application namespace and trigger all
  # navigation from this instance.
  app.router = new Router()

  # Trigger the initial route and enable HTML5 History API support, set the
  # root folder to '/' by default.  Change in app.js.
  Backbone.history.start root: app.root

  # All navigation that is relative should be passed through the navigate
  # method, to be processed by the router. If the link has a `data-bypass`
  # attribute, bypass the delegation completely.
  $(document).on "click", "a[href]:not([data-bypass])", (evt) ->

    # Get the absolute anchor href.
    href =
      prop: $(this).prop("href")
      attr: $(this).attr("href")


    # Get the absolute root.
    root = location.protocol + "//" + location.host + app.root

    # Ensure the root is part of the anchor href, meaning it's relative.
    if href.prop.slice(0, root.length) is root

      # Stop the default event to ensure the link will not cause a page
      # refresh.
      evt.preventDefault()

      # `Backbone.history.navigate` is sufficient for all Routers and will
      # trigger the correct events. The Router's internal `navigate` method
      # calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate href.attr, true
