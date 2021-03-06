define [
  'jquery'
  'backbone'
  'underscore'
  'layoutmanager'
  ], ($, Backbone, _) ->

  # Provide a global location to place configuration settings and module
  # creation.

  # The root path to run the application.
    app = root: "/"

    # Localize or create a new JavaScript Template object.
    JST = window.JST = window.JST or {}

    # Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.Layout.configure

      # Allow LayoutManager to augment Backbone.View.prototype.
      manage: true
      # the new version of layoutmanager uses 'prefix instead of paths'
      prefix: 'templates/'

      fetch: (path) ->

        # Concatenate the file extension.
        path = path + ".html"
        # If cached, use the compiled template.


        if JST[path]
          return JST[path]
        # else
        # warn the user
        # throw Error("You haven't required your template "+ path + "on its module")

        # We dont need this anymore
        # Put fetch into `async-mode`.
        done = @async()
        # Seek out the template asynchronously.
        $.get app.root + path, (contents) ->
          done JST[path] = _.template(contents)

    # Mix Backbone.Events, modules, and layout management into the app object.
    _.extend app,

      # Create a custom object with a nested Views object.
      module: (additionalProps) ->
        _.extend
          Views: {}
          Models: {}
          Collections: {}
          additionalProps

      # Helper for using layouts.
      useLayout: (name, options) ->

        # Enable variable arity by allowing the first argument to be the options
        # object and omitting the name argument.
        options = name  if _.isObject(name)

        # Ensure options is an object.
        options = options or {}

        # If a name property was specified use that as the template.
        options.template = name  if _.isString(name)

        # Create a new Layout with options.
        layout = new Backbone.Layout(_.extend(
          el: "#main"
        , options))

        # Cache the refererence.
        @layout = layout
    , Backbone.Events
