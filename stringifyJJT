function formatjjt(jjt){
    var str = "";
    var newline = "&#10;";
    var tab = "&emsp;";
    for (var i in jjt){
        var title = Object.keys(jjt[i])[0];
        str = str.concat(title + ":" + newline)
        var classChildren = jjt[i][title];
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
    return str;
}
