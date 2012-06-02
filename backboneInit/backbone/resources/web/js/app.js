(function ($){
 	window.Todo = Backbone.Model.extend({});	
	
	window.TodoView = Backbone.View.extend({
		initialize: function () {
			this.template = _.template($("#todo-template").html());
			this.render();			
		},

		render: function (){
			var renderContent = this.template({model: this.model.toJSON()});
			$(this.el).html(renderContent);
			return this;
		}		

	});

	window.MainView = Backbone.View.extend({
		initialize: function () {
			_.bindAll(this, "render", "createTodo", "addOne", "addAll");
			this.template = _.template($("#main-template").html());
			this.render();
		},

		events: {
			"click .new-todo": "createTodo"
		},
		
		render: function (){
            var renderContent = this.template();
            $(this.el).html(renderContent);
            return this;
        },

		createTodo: function () {
			console.log("asdsa");
			var todo = new Todo({text: $("input[name=todo]").val()});
			this.addOne(todo);
		},

		addOne: function (todo) {
			var view = new TodoView({model: todo});
			$("#todos").prepend(view.render().el);
		},

		addAll: function () {
			this.collection.each(this.addOne);
		}		
	});
	
 })(jQuery);
