(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);


    function WidgetListController(currentUser, $sce,$routeParams, WidgetService) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];
        model.wtype = $routeParams['wtype'];

        // model.widgets = WidgetService.findAllWidgets(model.pid);
        WidgetService
            .findAllWidgets(model.pid)
            .then(function (widgets) {
                model.widgets = widgets;
            });


        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.sortItems = function (start, end) {

            WidgetService
             .sortItems(start, end, model.pid);

        }
        
        function trust(html) {
            //scrubbing the html
            return $sce.trustAsHtml(html);
        }
        
        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length -1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }

    function NewWidgetController(currentUser, $routeParams, $timeout, WidgetService) {
        var model = this;
        // model.uid = $routeParams.uid;
        model.uid = currentUser._id;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        // model.widgets = WidgetService.findAllWidgets(model.pid);
        WidgetService
            .findAllWidgets(model.pid)
            .then(function (widgets) {
                model.widgets = widgets;
            });
    }

    function CreateWidgetController(currentUser, $routeParams, $location, WidgetService) {
        var model = this;
        // model.uid = $routeParams.uid;
        model.uid = currentUser._id;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.widgetType = $routeParams.wtype;
        model.createWidget = createWidget;
        model.createError = null;

        function createWidget() {
            if (model.widgetName === undefined || model.widgetName === null || model.widgetName === "") {
                model.error = "Website Name cannot be empty.";
                return;
            }
            if (model.widgetType === 'IMAGE' || model.widgetType === 'YOUTUBE') {
                if (model.widgetUrl === null || model.widgetUrl === undefined) {
                    model.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (model.widgetType === 'HEADER') {
                if (model.widgetText === null || model.widgetText === undefined) {
                    model.createError = "Text is required for Header";
                    return;
                }
            }
            if (model.widgetType === 'HTML') {
                if (model.widgetText === null || model.widgetText === undefined) {
                    model.createError = "Text is required for HTML";
                    return;
                }
            }
            if (model.widgetType === 'TEXT') {
                if (model.widgetText === null || model.widgetText === undefined) {
                    model.createError = "Text is required for TEXT";
                    return;
                }
            }

            var newWidget = {
                name: model.widgetName,
                text: model.widgetText,
                widgetType: model.widgetType,
                size: model.widgetSize,
                width: model.widgetWidth,
                url: model.widgetUrl,
                placeholder: model.widgetPlaceholder,
                rows: model.widgetRows,
                formatted: model.widgetFormatted
            };
            // WidgetService.createWidget(model.pid, newWidget);
            // $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            $location.url("/website/" + model.wid + "/page/" + model.pid + "/widget");
            WidgetService
                .createWidget(model.pid, newWidget)
                .then(function () {
                    $location.url("/website/" + model.wid + "/page/" + model.pid + "/widget");
                })
        }
    }

    function EditWidgetController(currentUser, $routeParams, $location, WidgetService) {
        var model = this;
        // model.uid = $routeParams.uid;
        model.uid = currentUser._id;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        WidgetService
            .findWidgetById(model.wgid)
            .then(function (widget) {
                model.widget = widget;

                if (model.widget.widgetType === "HEADING") {
                    model.widgetName = model.widget.name;
                    model.widgetText = model.widget.text;
                    model.widgetSize = model.widget.size;
                } else if (model.widget.widgetType === "IMAGE") {
                    model.widgetName = model.widget.name;
                    model.widgetText = model.widget.text;
                    model.widgetUrl = model.widget.url;
                    model.widgetWidth = model.widget.width;
                } else if (model.widget.widgetType === "YOUTUBE") {
                    model.widgetName = model.widget.name;
                    model.widgetText = model.widget.text;
                    model.widgetUrl = model.widget.url;
                    model.widgetWidth = model.widget.width;
                }
            });

        model.editWidget = editWidget;
        model.deleteWidget = deleteWidget;

        function editWidget() {
            if (model.widget.name === undefined || model.widget.name === null || model.widget.name === "") {
                model.error = "Website Name cannot be empty.";
                return;
            }
            WidgetService
                .findWidgetById(model.wgid)
                .then(function (widget) {
                    model.widget = widget;
                });
            var latestData = {
                name: model.widget.name,
                text: model.widget.text,
                widgetType: model.widget.widgetType,
                size: model.widget.size,
                width: model.widget.width,
                url: model.widget.url,
                placeholder: model.placeholder,
                rows: model.rows,
                formatted: model.formatted
            };
            WidgetService
                .updateWidget(model.wgid, latestData)
                .then(function () {
                    $location.url("/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
        }

        function deleteWidget() {
            // WidgetService.deleteWidget(model.wgid);
            // $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");

            WidgetService
                .deleteWidget(model.wgid)
                .then(function () {
                    $location.url("/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
        }

    }

    // function EditWidgetController($routeParams, $location, WidgetService) {
    //     var model = this;
    //     model.uid = $routeParams.uid;
    //     model.wid = $routeParams.wid;
    //     model.pid = $routeParams.pid;
    //     model.wgid = $routeParams.wgid;
    //     // model.widget = WidgetService.findWidgetById(model.wgid);
    //     WidgetService
    //         .findWidgetById(model.wgid)
    //         .then(function (widget) {
    //             model.widget = widget;
    //         })
    //     model.editWidget = editWidget;
    //     model.deleteWidget = deleteWidget;
    //
    //     if (model.widget.widgetType === "HEADER") {
    //         model.widgetName = model.widget.name;
    //         model.widgetText = model.widget.text;
    //         model.widgetSize = model.widget.size;
    //     } else if (model.widget.widgetType === "IMAGE") {
    //         model.widgetName = model.widget.name;
    //         model.widgetText = model.widget.text;
    //         model.widgetUrl = model.widget.url;
    //         model.widgetWidth = model.widget.width;
    //     } else if (model.widget.widgetType === "YOUTUBE") {
    //         model.widgetName = model.widget.name;
    //         model.widgetText = model.widget.text;
    //         model.widgetUrl = model.widget.url;
    //         model.widgetWidth = model.widget.width;
    //     }
    //
    //     function editWidget() {
    //         var latestData = {
    //             name: model.widgetName,
    //             text: model.widgetText,
    //             widgetType: model.widget.widgetType,
    //             size: model.widgetSize,
    //             width: model.widgetWidth,
    //             url: model.widgetUrl
    //         };
    //         // WidgetService.updateWidget(model.wgid, latestData);
    //         // $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
    //         WidgetService
    //             .updateWidget(model.wgid, latestData)
    //             .then(function () {
    //                 $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
    //
    //             })
    //
    //
    //     }
    //
    //     function deleteWidget() {
    //         WidgetService.deleteWidget(model.wgid);
    //         $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
    //     }
    // }
})();