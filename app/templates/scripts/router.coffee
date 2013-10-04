define [
  "app"

  # Load Modules
  "modules/index"


], (app, Index) ->

  # Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend
    routes:
      ""                 : "index"

    index: ->
      (new Index()).render()

  Router
