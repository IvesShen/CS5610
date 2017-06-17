(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADING", pageId: "321", size: "2", text:"GIZMODO"},
            {_id: "234", widgetType: "HEADING", pageId: "321", size: "4", text:"Lorem ipsum"},
            {_id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url:"http://lorempixel.com/400/200/"},
            {_id: "456", widgetType: "HTML", pageId: "321", text:"<p>Lorem ipsum</p>"},
            {_id: "567", widgetType: "HEADING", pageId: "321", size: "4", text:"Lorem ipsum"},
            {_id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", text:"https://youtu.be/AM2Ivdi9c4E"},
            {_id: "789", widgetType: "HTML", pageId: "321", text:"<p>Lorem ipsum</p>"}

        ];

        var services = {
            'createWidget': createWidget,
            'findWidgetByPageId': findWidgetByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }

            return websites.reduce(getMaxId, 0).toString();
        }

        function createWidget(pageId, widget){
            var newWidgetId = getNextId();
            var newWidget = {
                _id: newWidgetId,
                widgetType: widget.widgetType,
                pageId: pageId,
                size:widget.size,
                text:widget.text,
                width:widget.width,
                url:widget.url
            };
            widgets.push(newWidget);
        }

        function findWidgetByPageId(pageId) {
            for (w in widgets){
                var widget = widgets[w];
                if(parseInt(widget._id) === parseInt(pageId)){
                    return widget;
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for(w in widgets){
                var widget = widgets[w];
                if(parseInt(widget._id) === parseInt(widgetId)){
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widgets[index].widgetType = widget.widgetType;
            widgets[index].size = widget.size;
            widgets[index].url = widget.url;
            widgets[index].width = widget.width;
            widgets[index].text = widget.text;
        }

        function deleteWidget(widgetId) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widgets.splice(index, 1);
        }
    }
})();