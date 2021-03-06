(function () {
    angular
        .module("WebAppMaker")
        .service('WidgetService', WidgetService);

    function WidgetService($http) {

        this.findAllWidgets = findAllWidgets;
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.deleteWidgetsByPage = deleteWidgetsByPage;
        this.sortItems = sortItems;

        var widgets =
            [
                {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"
                },
                {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E"
                },
                {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var createWidgetMap = {
            'HEADING': createHeaderWidget,
            'IMAGE': createImageWidget,
            'YOUTUBE': createYouTubeWidget,
            'HTML': createHTMLWidget,
            'LINK': createLinkWidget,
            'TEXTINPUT': createTextInputWidget,
            'LABEL': createLabelWidget,
            'BUTTON': createButtonWidget,
            'REPEATER': createRepeaterWidget,
            'DATATABLE': createDataTableWidget
        };


        function findAllWidgets(pid) {
            var url = "/api/page/" +pid+ "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
            //return widgets;
        }

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }

            return widgets.reduce(getMaxId, 0).toString();
        }

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADING',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createLabelWidget(widgetId, pageId, widget) {
        }

        function createHTMLWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createTextInputWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'TEXT',
                pageId: pageId,
                text: widget.text,
                rows: widget.rows,
                placeholder: widget.placeholder,
                formatted: widget.formatted
            };
        }

        function createLinkWidget(widgetId, pageId, widget) {

        }

        function createButtonWidget(widgetId, pageId, widget) {

        }

        function createImageWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };

        }

        function createDataTableWidget(widgetId, pageId, widget) {

        }

        function createRepeaterWidget(widgetId, pageId, widget) {

        }

        /*
         * Standard CRUD
         */

        function sortItems(start, end, pid) {
           var url = "/api/page/"+pid+ "/widget?initial=" +start+ "&final=" +end ;
            return $http.put(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" +pageId+ "/widget";
            return $http.post(url, widget)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // var newWidgetId = getNextId();
            // var newWidget = createWidgetMap[widget.widgetType](newWidgetId, pageId, widget);
            // widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            results = [];
            function filterByPageId(widget) {
                return widget.pageId === pageId;
            }

            results = widgets.filter(filterByPageId);
            return results;
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" +widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            // for (wid in widgets) {
            //     var widget = widgets[wid];
            //     if (widget._id === widgetId) {
            //         return widget;
            //     }
            // }
            // return null;
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" +widgetId;
            return $http.put(url, widget)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });



            // var oldWidget = findWidgetById(widgetId);
            // var index = widgets.indexOf(oldWidget);
            // if (oldWidget.widgetType != widget.widgetType) {
            //     return;
            // }
            // Object.keys(widget).forEach(function (property) {
            //     if (property === '_id' || property === 'widgetType' || property === 'pageId') {
            //         return;
            //     }
            //     if (oldWidget.hasOwnProperty(property)) {
            //         oldWidget[property] = widget[property];
            //     }
            // });
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" +widgetId;
            return $http.delete(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            // var oldWidget = findWidgetById(widgetId);
            // var index = widgets.indexOf(oldWidget);
            // widgets.splice(index, 1);
        }

        function deleteWidgetsByPage(pageId) {
            for (wid in widgets) {
                widget = widgets[wid];
                if (widget.pageId === pageId) {
                    deleteWidget(widget._id);
                }
            }

        }
    }
})();