var MultiColumnWizard={execute:function(c,d,a){var l=$(a);var g=l.getFirst().getNext();var k=$(c).getParent("tr");var n={maxCount:l.getProperty("rel").match(/maxCount\[[0-9]+\]/ig)[0].replace("maxCount[","").replace("]","").toInt(),uniqueFields:l.getProperty("rel").match(/unique\[[a-z0-9,]*\]/ig)[0].replace("unique[","").replace("]","").split(",")};if(window.Backend){Backend.getScrollOffset()}MultiColumnWizard[d](g,k,n);var m=g.getChildren();for(var f=0;f<m.length;f++){var h=m[f].getChildren();for(var e=0;e<h.length;e++){var b=h[e].getChildren();MultiColumnWizard.updateFieldName(b,f)}m[f].getElements("select, input, textarea").each(function(j){if(j.get("type")=="checkbox"||j.get("type")=="radio"){j.checked?j.setAttribute("checked","checked"):j.removeAttribute("checked")}else{if(j.get("tag")=="select"&&j.selectedIndex>0){var i=j.getChildren();i.each(function(p,o){if(j.selectedIndex==o){p.setAttribute("selected",true)}else{p.removeAttribute("selected")}})}else{j.setAttribute("value",j.value)}}});m[f].set("html",m[f].get("html").replace(/_row[0-9]+_/ig,"_row"+f+"_"))}},copy:function(b,f,a){var h=new Element("tr");var g=f.getChildren();for(var c=0;c<g.length;c++){var e=g[c].clone(true,true).injectInside(h);e.getFirst().value=g[c].getFirst().value}h.injectAfter(f);if(a.maxCount<=b.getChildren().length&&a.maxCount!=0){b.getElements("img[src=system/themes/default/images/copy.gif]").setStyle("display","none")}if(a.uniqueFields.length>1||a.uniqueFields[0]!=""){for(var c=0;c<a.uniqueFields.length;c++){var d=h.getElements("*[name*=["+a.uniqueFields[c]+"]]");if(d){MultiColumnWizard.clearElementValue(d)}}}},up:function(b,c,a){c.getPrevious()?c.injectBefore(c.getPrevious()):c.injectInside(b)},down:function(b,c,a){c.getNext()?c.injectAfter(c.getNext()):c.injectBefore(b.getFirst())},"delete":function(b,d,a){if(b.getChildren().length>1){d.destroy()}else{var e=d.getElements("input,select,textarea");for(var c=0;c<e.length;c++){MultiColumnWizard.clearElementValue(e[c])}}if(a.maxCount>b.getChildren().length){b.getElements("img[src=system/themes/default/images/copy.gif]").setStyle("display","inline")}},updateFieldName:function(a,b){a.each(function(f){if(f.name!=undefined&&f.name!=null&&f.name!=""){var d=f.name.substring(0,f.name.indexOf("["));if(Browser.ie||Browser.Engine.trident){var e=f.name;var c=f.name.replace(new RegExp(d+"[[0-9]+]","ig"),d+"["+b+"]");if(e!=c){f.mergeAttributes(document.createElement("<INPUT name='"+c+"'/>"),false)}}else{f.name=f.name.replace(new RegExp(d+"[[0-9]+]","ig"),d+"["+b+"]")}}if(f.getChildren().length>0){MultiColumnWizard.updateFieldName(f.getChildren(),b)}})},clearElementValue:function(a){if(a.get("type")=="checkbox"||a.get("type")=="radio"){a.checked=false}else{a.set("value","")}}};