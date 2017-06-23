(function () {
    angular
        .module("WebAppMaker")
        .service('WebsiteService', WebsiteService);

    function WebsiteService() {
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;

        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
            {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
            {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
            {_id: "890", name: "Go", developerId: "123", description: "Lorem"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
            {_id: "678", name: "Checkers", developerId: "123", description: "Lorem"},
            {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
        ];


        function findWebsitesByUser(uid){
            var results = [];

            for(var v in websites){
                if(websites[v].developerId === uid){
                    results.push(websites[v]);
                }
            }

            return results;
        }

        function findWebsiteById(wid) {
            for (w in websites){
                var website = websites[w];
                if(parseInt(website._id) === parseInt(wid)){
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(wid) {
            for(var w in websites){
                if(websites[w]._id === wid){
                    websites.splice(w, 1);
                }
            }
        }

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }
    }
})();