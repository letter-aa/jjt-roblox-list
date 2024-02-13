function updatelist(exportToElement) {
    fetch("https://api.allorigins.win/raw?url=https%3A%2F%2Fjtohs-joke-towers.fandom.com%2Fwiki%2FThe_Grand_Difficulty_Chart_Archive")
    .then(response => {
        return response.text()
    })
    .then(data => {
        var html = new DOMParser().parseFromString(data, "text/html")

        function arrayify(convert) {
            return Array.prototype.slice.call(convert);
        }

        var children = html.getElementsByClassName('mw-parser-output')[0].children;
        var tbl = [];
        var f = 0;
        for (var v in arrayify(children)) {
            var i = parseInt(v);
            var str = children[i].textContent.trim();
            str = str.substr(0, str.length - 2).trim();
            var notClass = str == "References" || str == "Latest Updates" || str == "Rules" || str == "Introduction";
            if (children[i].nodeName == "H2" && notClass == false) {
                var p = children[i + 1].children;
                //console.log(p)
                var r = 0;
                var tbl1 = []; // children[i + 1].textContent.split("\n");
                var isChains = str == "Chains";
                for (var d in arrayify(p)) {
                    var list = p[d].querySelector('ul');
                    if (list) {
                        tbl1[d] = [p[d].textContent.split("\n")[0], list.textContent.split("\n")];
                    } else {
                        tbl1[d] = p[d].textContent;
                    }
                }
                if (isChains == false) {
                    for (var x = 0; x < tbl1.length - 1; x++) {
                        //var y = parseInt(x);
                        var el = tbl1[x];
                        if (typeof(el) == "string") {
                            var z = el.trim();
                            if (z != "") {
                                tbl1[x] = z;
                            } else {
                                tbl1.splice(x--, 1);
                            }
                        } else if (typeof(el) == "object") {
                            for (var j in el) {
                                var el1 = el[j];
                                if (typeof(el1) == "string") {
                                    var z = el1.trim();
                                    if (z != "") {
                                        tbl1[x][j] = z;
                                    } else {
                                        tbl1.splice(x--, 1);
                                    }
                                } else if (typeof(el1) == "object") {
                                    for (var g = 0; g < el1.length; g++) {
                                        var z = el1[g].trim();
                                        if (z != "") {
                                            tbl1[x][j][g] = z;
                                        } else {
                                            tbl1[x][j].splice(g--, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    tbl1 = []; // does not support chains
                }
                tbl[f++] = {
                    [str]: tbl1
                }; // [v]
            }
        }

        var str = "";
        var newline = "&#10;";
        var tab = "&emsp;";
        for (var i in tbl){
            var title = Object.keys(tbl[i])[0];
            str = str.concat(title + ":" + newline)
            var classChildren = tbl[i][title];
            for (var v in classChildren){
                var child = classChildren[v];
                if (typeof(child) == "string"){
                    str = str.concat(tab + child + newline);
                } else if (typeof(child) == "object"){
                    for (var x in child){
                        var subChild = child[x];
                        if (typeof(subChild) == "string"){
                            str = str.concat(tab + subChild + ":" + newline);
                        } else if (typeof(subChild) == "object"){
                            for (var p in subChild){
                                str = str.concat(tab + tab + subChild[p] + newline);
                            }
                        }
                    }
                }
            }
            str = str.concat(newline);
        }
        exportToElement.style.whiteSpace = "pre-wrap";
        exportToElement.innerHTML = str;
    });
}
