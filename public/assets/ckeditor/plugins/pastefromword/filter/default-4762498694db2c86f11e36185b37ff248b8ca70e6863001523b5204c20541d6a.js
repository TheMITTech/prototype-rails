!function(){function e(){return!1}function t(e,t){var n,a=[];for(e.filterChildren(t),n=e.children.length-1;0<=n;n--)a.unshift(e.children[n]),e.children[n].remove();n=e.attributes;var i,o=e,r=!0;for(i in n)if(r)r=!1;else{var l=new CKEDITOR.htmlParser.element(e.name);l.attributes[i]=n[i],o.add(l),o=l,delete n[i]}for(n=0;n<a.length;n++)o.add(a[n])}var n,a,i,o=CKEDITOR.tools,r=["o:p","xml","script","meta","link"],l={},s=0;CKEDITOR.plugins.pastefromword={},CKEDITOR.cleanWord=function(d,c){var u=Boolean(d.match(/mso-list:\s*l\d+\s+level\d+\s+lfo\d+/));d=d.replace(/<!\[/g,"<!--[").replace(/\]>/g,"]-->");var p=CKEDITOR.htmlParser.fragment.fromHtml(d);i=new CKEDITOR.htmlParser.filter({root:function(e){e.filterChildren(i),CKEDITOR.plugins.pastefromword.lists.cleanup(n.createLists(e))},elementNames:[[/^\?xml:namespace$/,""],[/^v:shapetype/,""],[new RegExp(r.join("|")),""]],elements:{a:function(e){if(e.attributes.name){if("_GoBack"==e.attributes.name)return void delete e.name;if(e.attributes.name.match(/^OLE_LINK\d+$/))return void delete e.name}if(e.attributes.href&&e.attributes.href.match(/#.+$/)){var t=e.attributes.href.match(/#(.+)$/)[1];l[t]=e}e.attributes.name&&l[e.attributes.name]&&(e=l[e.attributes.name],e.attributes.href=e.attributes.href.replace(/.*#(.*)$/,"#$1"))},div:function(e){a.createStyleStack(e,i,c)},img:function(e){if(e.parent){var t=e.parent.attributes;(t=t.style||t.STYLE)&&t.match(/mso\-list:\s?Ignore/)&&(e.attributes["cke-ignored"]=!0)}a.mapStyles(e,{width:function(t){a.setStyle(e,"width",t+"px")},height:function(t){a.setStyle(e,"height",t+"px")}}),e.attributes.src&&e.attributes.src.match(/^file:\/\//)&&e.attributes.alt&&e.attributes.alt.match(/^https?:\/\//)&&(e.attributes.src=e.attributes.alt)},p:function(e){if(e.filterChildren(i),e.attributes.style&&e.attributes.style.match(/display:\s*none/i))return!1;if(n.thisIsAListItem(e))n.convertToFakeListItem(e);else{var t=e.getAscendant(function(e){return"ul"==e.name||"ol"==e.name}),r=o.parseCssText(e.attributes.style);t&&!t.attributes["cke-list-level"]&&r["mso-list"]&&r["mso-list"].match(/level/)&&(t.attributes["cke-list-level"]=r["mso-list"].match(/level(\d+)/)[1])}a.createStyleStack(e,i,c)},pre:function(e){n.thisIsAListItem(e)&&n.convertToFakeListItem(e),a.createStyleStack(e,i,c)},h1:function(e){n.thisIsAListItem(e)&&n.convertToFakeListItem(e),a.createStyleStack(e,i,c)},font:function(e){return e.getHtml().match(/^\s*$/)?(new CKEDITOR.htmlParser.text(" ").insertAfter(e),!1):(c&&!0===c.config.pasteFromWordRemoveFontStyles&&e.attributes.size&&delete e.attributes.size,void t(e,i))},ul:function(e){if(u)return"li"==e.parent.name&&0===o.indexOf(e.parent.children,e)&&a.setStyle(e.parent,"list-style-type","none"),n.dissolveList(e),!1},li:function(e){u&&(e.attributes.style=a.normalizedStyles(e,c),a.pushStylesLower(e))},ol:function(e){if(u)return"li"==e.parent.name&&0===o.indexOf(e.parent.children,e)&&a.setStyle(e.parent,"list-style-type","none"),n.dissolveList(e),!1},span:function(e){if(e.filterChildren(i),e.attributes.style=a.normalizedStyles(e,c),!e.attributes.style||e.attributes.style.match(/^mso\-bookmark:OLE_LINK\d+$/)||e.getHtml().match(/^(\s|&nbsp;)+$/)){for(var t=e.children.length-1;0<=t;t--)e.children[t].insertAfter(e);return!1}a.createStyleStack(e,i,c)},table:function(e){e._tdBorders={},e.filterChildren(i);var t,n,o=0;for(n in e._tdBorders)e._tdBorders[n]>o&&(o=e._tdBorders[n],t=n);a.setStyle(e,"border",t)},td:function(e){var t=e.getAscendant("table"),n=t._tdBorders,i=["border","border-top","border-right","border-bottom","border-left"],t=o.parseCssText(t.attributes.style),r=t.background||t.BACKGROUND;r&&a.setStyle(e,"background",r,!0),(t=t["background-color"]||t["BACKGROUND-COLOR"])&&a.setStyle(e,"background-color",t,!0);var l,t=o.parseCssText(e.attributes.style);for(l in t)r=t[l],delete t[l],t[l.toLowerCase()]=r;for(l=0;l<i.length;l++)t[i[l]]&&(r=t[i[l]],n[r]=n[r]?n[r]+1:1);a.pushStylesLower(e,{background:!0})},"v:imagedata":e,"v:shape":function(e){var t=!1;if(e.parent.getFirst(function(n){"img"==n.name&&n.attributes&&n.attributes["v:shapes"]==e.attributes.id&&(t=!0)}),t)return!1;var n="";e.forEach(function(e){e.attributes&&e.attributes.src&&(n=e.attributes.src)},CKEDITOR.NODE_ELEMENT,!0),e.filterChildren(i),e.name="img",e.attributes.src=e.attributes.src||n,delete e.attributes.type},style:function(){return!1}},attributes:{style:function(e,t){return a.normalizedStyles(t,c)||!1},"class":function(e){return e=e.replace(/msonormal|msolistparagraph\w*/gi,""),""!==e&&e},cellspacing:e,cellpadding:e,border:e,valign:e,"v:shapes":e,"o:spid":e},comment:function(e){return e.match(/\[if.* supportFields.*\]/)&&s++,"[endif]"==e&&(s=0<s?s-1:0),!1},text:function(e){return s?"":e.replace(/&nbsp;/g," ")}});var m=new CKEDITOR.htmlParser.basicWriter;return i.applyTo(p),p.writeHtml(m),m.getHtml()},CKEDITOR.plugins.pastefromword.styles={setStyle:function(e,t,n,a){var i=o.parseCssText(e.attributes.style);a&&i[t]||(""===n?delete i[t]:i[t]=n,e.attributes.style=CKEDITOR.tools.writeCssText(i))},mapStyles:function(e,t){for(var n in t)e.attributes[n]&&("function"==typeof t[n]?t[n](e.attributes[n]):a.setStyle(e,t[n],e.attributes[n]),delete e.attributes[n])},normalizedStyles:function(e,t){var a="background-color:transparent border-image:none color:windowtext direction:ltr mso- text-indent visibility:visible div:border:none".split(" "),i="font-family font font-size color background-color line-height text-decoration".split(" "),r=function(){for(var e=[],t=0;t<arguments.length;t++)arguments[t]&&e.push(arguments[t]);return-1!==o.indexOf(a,e.join(":"))},l=t&&!0===t.config.pasteFromWordRemoveFontStyles,s=o.parseCssText(e.attributes.style);"cke:li"==e.name&&s["TEXT-INDENT"]&&s.MARGIN&&(e.attributes["cke-indentation"]=n.getElementIndentation(e),s.MARGIN=s.MARGIN.replace(/(([\w\.]+ ){3,3})[\d\.]+(\w+$)/,"$10$3"));for(var d=o.objectKeys(s),c=0;c<d.length;c++){var u=d[c].toLowerCase(),p=s[d[c]],m=CKEDITOR.tools.indexOf;(l&&-1!==m(i,u.toLowerCase())||r(null,u,p)||r(null,u.replace(/\-.*$/,"-"))||r(null,u)||r(e.name,u,p)||r(e.name,u.replace(/\-.*$/,"-"))||r(e.name,u)||r(p))&&delete s[d[c]]}return CKEDITOR.tools.writeCssText(s)},createStyleStack:function(e,t,n){var i=[];for(e.filterChildren(t),t=e.children.length-1;0<=t;t--)i.unshift(e.children[t]),e.children[t].remove();a.sortStyles(e),t=o.parseCssText(a.normalizedStyles(e,n)),n=e;var r,l="span"===e.name;for(r in t)if(!r.match(/margin|text\-align|width|border|padding/i))if(l)l=!1;else{var s=new CKEDITOR.htmlParser.element("span");s.attributes.style=r+":"+t[r],n.add(s),n=s,delete t[r]}for("{}"!==JSON.stringify(t)?e.attributes.style=CKEDITOR.tools.writeCssText(t):delete e.attributes.style,t=0;t<i.length;t++)n.add(i[t])},sortStyles:function(e){for(var t=["border","border-bottom","font-size","background"],n=o.parseCssText(e.attributes.style),a=o.objectKeys(n),i=[],r=[],l=0;l<a.length;l++)-1!==o.indexOf(t,a[l].toLowerCase())?i.push(a[l]):r.push(a[l]);for(i.sort(function(e,n){var a=o.indexOf(t,e.toLowerCase()),i=o.indexOf(t,n.toLowerCase());return a-i}),a=[].concat(i,r),i={},l=0;l<a.length;l++)i[a[l]]=n[a[l]];e.attributes.style=CKEDITOR.tools.writeCssText(i)},pushStylesLower:function(e,t){if(!e.attributes.style||0===e.children.length)return!1;t=t||{};var n,i={"list-style-type":!0,width:!0,border:!0,"border-":!0},r=o.parseCssText(e.attributes.style);for(n in r)if(!(n.toLowerCase()in i||i[n.toLowerCase().replace(/\-.*$/,"-")]||n.toLowerCase()in t)){for(var l=!1,s=0;s<e.children.length;s++){var d=e.children[s];d.type===CKEDITOR.NODE_ELEMENT&&(l=!0,a.setStyle(d,n,r[n]))}l&&delete r[n]}return e.attributes.style=CKEDITOR.tools.writeCssText(r),!0}},a=CKEDITOR.plugins.pastefromword.styles,CKEDITOR.plugins.pastefromword.lists={thisIsAListItem:function(e){return!!(e.attributes.style&&e.attributes.style.match(/mso\-list:\s?l\d/)&&"li"!==e.parent.name||e.attributes["cke-dissolved"]||e.getHtml().match(/<!\-\-\[if !supportLists]\-\->/)||e.getHtml().match(/^( )*.*?[\.\)] ( ){2,666}/))},convertToFakeListItem:function(e){if(this.getListItemInfo(e),!e.attributes["cke-dissolved"]){var t;if(e.forEach(function(e){!t&&"img"==e.name&&e.attributes["cke-ignored"]&&"*"==e.attributes.alt&&(t="\xb7",e.remove())},CKEDITOR.NODE_ELEMENT),e.forEach(function(e){t||e.value.match(/^ /)||(t=e.value)},CKEDITOR.NODE_TEXT),"undefined"==typeof t)return;e.attributes["cke-symbol"]=t.replace(/ .*$/,""),n.removeSymbolText(e)}if(e.attributes.style){var a=o.parseCssText(e.attributes.style);a["margin-left"]&&(delete a["margin-left"],e.attributes.style=CKEDITOR.tools.writeCssText(a))}e.name="cke:li"},convertToRealListItems:function(e){var t=[];return e.forEach(function(e){"cke:li"==e.name&&(e.name="li",t.push(e))},CKEDITOR.NODE_ELEMENT,!1),t},removeSymbolText:function(e){var t,n=e.attributes["cke-symbol"];e.forEach(function(a){!t&&a.value.match(n.replace(")","\\)").replace("(",""))&&(a.value=a.value.replace(n,""),a.parent.getHtml().match(/^(\s|&nbsp;)*$/)&&(t=a.parent!==e?a.parent:null))},CKEDITOR.NODE_TEXT),t&&t.remove()},setListSymbol:function(e,t,a){a=a||1;var i=o.parseCssText(e.attributes.style);if("ol"==e.name){if(e.attributes.type||i["list-style-type"])return;var r,l={"[ivx]":"lower-roman","[IVX]":"upper-roman","[a-z]":"lower-alpha","[A-Z]":"upper-alpha","\\d":"decimal"};for(r in l)if(n.getSubsectionSymbol(t).match(new RegExp(r))){i["list-style-type"]=l[r];break}e.attributes["cke-list-style-type"]=i["list-style-type"]}else l={"\xb7":"disc",o:"circle","\xa7":"square"},!i["list-style-type"]&&l[t]&&(i["list-style-type"]=l[t]);n.setListSymbol.removeRedundancies(i,a),(e.attributes.style=CKEDITOR.tools.writeCssText(i))||delete e.attributes.style},setListStart:function(e){for(var t=[],a=0,i=0;i<e.children.length;i++)t.push(e.children[i].attributes["cke-symbol"]||"");switch(t[0]||a++,e.attributes["cke-list-style-type"]){case"lower-roman":case"upper-roman":e.attributes.start=n.toArabic(n.getSubsectionSymbol(t[a]))-a;break;case"lower-alpha":case"upper-alpha":e.attributes.start=n.getSubsectionSymbol(t[a]).replace(/\W/g,"").toLowerCase().charCodeAt(0)-96-a;break;case"decimal":e.attributes.start=parseInt(n.getSubsectionSymbol(t[a]),10)-a||1}"1"==e.attributes.start&&delete e.attributes.start,delete e.attributes["cke-list-style-type"]},numbering:{toNumber:function(e,t){function n(e){e=e.toUpperCase();for(var t=1,n=1;0<e.length;n*=26)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e.charAt(e.length-1))*n,e=e.substr(0,e.length-1);return t}function a(e){var t=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];e=e.toUpperCase();for(var n=t.length,a=0,i=0;i<n;++i)for(var o=t[i],r=o[1].length;e.substr(0,r)==o[1];e=e.substr(r))a+=o[0];return a}return"decimal"==t?Number(e):"upper-roman"==t||"lower-roman"==t?a(e.toUpperCase()):"lower-alpha"==t||"upper-alpha"==t?n(e):1},getStyle:function(e){e=e.slice(0,1);var t={i:"lower-roman",v:"lower-roman",x:"lower-roman",l:"lower-roman",m:"lower-roman",I:"upper-roman",V:"upper-roman",X:"upper-roman",L:"upper-roman",M:"upper-roman"}[e];return t||(t="decimal",e.match(/[a-z]/)&&(t="lower-alpha"),e.match(/[A-Z]/)&&(t="upper-alpha")),t}},getSubsectionSymbol:function(e){return(e.match(/([\da-zA-Z]+).?$/)||["placeholder",1])[1]},setListDir:function(e){var t=0,n=0;e.forEach(function(e){"li"==e.name&&("rtl"==(e.attributes.dir||e.attributes.DIR||"").toLowerCase()?n++:t++)},CKEDITOR.ELEMENT_NODE),n>t&&(e.attributes.dir="rtl")},createList:function(e){return(e.attributes["cke-symbol"].match(/([\da-np-zA-NP-Z]).?/)||[])[1]?new CKEDITOR.htmlParser.element("ol"):new CKEDITOR.htmlParser.element("ul")},createLists:function(e){var t,a,i,o=n.convertToRealListItems(e);if(0===o.length)return[];var r=n.groupLists(o);for(e=0;e<r.length;e++){var l=r[e],s=l[0];for(i=0;i<l.length;i++)if(1==l[i].attributes["cke-list-level"]){s=l[i];break}var s=[n.createList(s)],d=s[0],c=[s[0]];for(d.insertBefore(l[0]),i=0;i<l.length;i++){for(t=l[i],a=t.attributes["cke-list-level"];a>s.length;){var u=n.createList(t),p=d.children;0<p.length?p[p.length-1].add(u):(p=new CKEDITOR.htmlParser.element("li",{style:"list-style-type:none"}),p.add(u),d.add(p)),s.push(u),c.push(u),d=u,a==s.length&&n.setListSymbol(u,t.attributes["cke-symbol"],a)}for(;a<s.length;)s.pop(),d=s[s.length-1],a==s.length&&n.setListSymbol(d,t.attributes["cke-symbol"],a);t.remove(),d.add(t)}for(s[0].children.length&&(i=s[0].children[0].attributes["cke-symbol"],!i&&1<s[0].children.length&&(i=s[0].children[1].attributes["cke-symbol"]),i&&n.setListSymbol(s[0],i)),i=0;i<c.length;i++)n.setListStart(c[i]);for(i=0;i<l.length;i++)this.determineListItemValue(l[i])}return o},cleanup:function(e){var t,n,a=["cke-list-level","cke-symbol","cke-list-id","cke-indentation","cke-dissolved"];for(t=0;t<e.length;t++)for(n=0;n<a.length;n++)delete e[t].attributes[a[n]]},determineListItemValue:function(e){if("ol"===e.parent.name){var t,n=this.calculateValue(e),a=e.attributes["cke-symbol"].match(/[a-z0-9]+/gi);a&&(a=a[a.length-1],t=e.parent.attributes["cke-list-style-type"]||this.numbering.getStyle(a),a=this.numbering.toNumber(a,t),a!==n&&(e.attributes.value=a))}},calculateValue:function(e){if(!e.parent)return 1;var t=e.parent;e=e.getIndex();var n,a,i,o=null;for(i=e;0<=i&&null===o;i--)a=t.children[i],a.attributes&&void 0!==a.attributes.value&&(n=i,o=parseInt(a.attributes.value,10));return null===o&&(o=void 0!==t.attributes.start?parseInt(t.attributes.start,10):1,n=0),o+(e-n)},dissolveList:function(e){function t(e){return 50<=e?"l"+t(e-50):40<=e?"xl"+t(e-40):10<=e?"x"+t(e-10):9==e?"ix":5<=e?"v"+t(e-5):4==e?"iv":1<=e?"i"+t(e-1):""}var n,i=[],r=[];for(e.forEach(function(e){if("li"==e.name){var n=e.children[0];if(n&&n.name&&n.attributes.style&&n.attributes.style.match(/mso-list:/i)){a.pushStylesLower(e,{"list-style-type":!0,display:!0});var l=o.parseCssText(n.attributes.style,!0);a.setStyle(e,"mso-list",l["mso-list"],!0),a.setStyle(n,"mso-list",""),(l.display||l.DISPLAY)&&(l.display?a.setStyle(e,"display",l.display,!0):a.setStyle(e,"display",l.DISPLAY,!0))}e.attributes.style&&e.attributes.style.match(/mso-list:/i)&&(e.name="p",e.attributes["cke-dissolved"]=!0,i.push(e))}if("ul"==e.name||"ol"==e.name){for(n=0;n<e.children.length;n++)if("li"==e.children[n].name){var l=e.attributes.type,s=parseInt(e.attributes.start,10)||1;switch(l||(l=o.parseCssText(e.attributes.style)["list-style-type"]),l){case"disc":l="\xb7";break;case"circle":l="o";break;case"square":l="\xa7";break;case"1":case"decimal":l=s+n+".";break;case"a":case"lower-alpha":l=String.fromCharCode(97+s-1+n)+".";break;case"A":case"upper-alpha":l=String.fromCharCode(65+s-1+n)+".";break;case"i":case"lower-roman":l=t(s+n)+".";break;case"I":case"upper-roman":l=t(s+n).toUpperCase()+".";break;default:l="ul"==e.name?"\xb7":s+n+"."}e.children[n].attributes["cke-symbol"]=l}r.push(e)}},CKEDITOR.NODE_ELEMENT,!1),n=i.length-1;0<=n;n--)i[n].insertAfter(e);for(n=r.length-1;0<=n;n--)delete r[n].name},groupLists:function(e){var t,a,i=[[e[0]]],o=i[0];for(a=e[0],a.attributes["cke-indentation"]=a.attributes["cke-indentation"]||n.getElementIndentation(a),t=1;t<e.length;t++){a=e[t];var r=e[t-1];a.attributes["cke-indentation"]=a.attributes["cke-indentation"]||n.getElementIndentation(a),a.previous!==r&&(n.chopDiscontinuousLists(o,i),i.push(o=[])),o.push(a)}return n.chopDiscontinuousLists(o,i),i},chopDiscontinuousLists:function(e,t){for(var a,i={},r=[[]],l=0;l<e.length;l++){var s,d,c=i[e[l].attributes["cke-list-level"]],u=this.getListItemInfo(e[l]);for(c?(d=c.type.match(/alpha/)&&7==c.index?"alpha":d,d="o"==e[l].attributes["cke-symbol"]&&14==c.index?"alpha":d,s=n.getSymbolInfo(e[l].attributes["cke-symbol"],d),u=this.getListItemInfo(e[l]),(c.type!=s.type||a&&u.id!=a.id&&!this.isAListContinuation(e[l]))&&r.push([])):s=n.getSymbolInfo(e[l].attributes["cke-symbol"]),a=parseInt(e[l].attributes["cke-list-level"],10)+1;20>a;a++)i[a]&&delete i[a];i[e[l].attributes["cke-list-level"]]=s,r[r.length-1].push(e[l]),a=u}[].splice.apply(t,[].concat([o.indexOf(t,e),1],r))},isAListContinuation:function(e){var t=e;do if((t=t.previous)&&t.type===CKEDITOR.NODE_ELEMENT){if(void 0===t.attributes["cke-list-level"])break;if(t.attributes["cke-list-level"]===e.attributes["cke-list-level"])return t.attributes["cke-list-id"]===e.attributes["cke-list-id"]}while(t);return!1},getElementIndentation:function(e){if(e=o.parseCssText(e.attributes.style),e.margin||e.MARGIN){e.margin=e.margin||e.MARGIN;var t={styles:{margin:e.margin}};CKEDITOR.filter.transformationsTools.splitMarginShorthand(t),e["margin-left"]=t.styles["margin-left"]}return parseInt(o.convertToPx(e["margin-left"]||"0px"),10)},toArabic:function(e){return e.match(/[ivxl]/i)?e.match(/^l/i)?50+n.toArabic(e.slice(1)):e.match(/^lx/i)?40+n.toArabic(e.slice(1)):e.match(/^x/i)?10+n.toArabic(e.slice(1)):e.match(/^ix/i)?9+n.toArabic(e.slice(2)):e.match(/^v/i)?5+n.toArabic(e.slice(1)):e.match(/^iv/i)?4+n.toArabic(e.slice(2)):e.match(/^i/i)?1+n.toArabic(e.slice(1)):n.toArabic(e.slice(1)):0},getSymbolInfo:function(e,t){var a=e.toUpperCase()==e?"upper-":"lower-",i={"\xb7":["disc",-1],o:["circle",-2],"\xa7":["square",-3]};return e in i||t&&t.match(/(disc|circle|square)/)?{index:i[e][1],type:i[e][0]}:e.match(/\d/)?{index:e?parseInt(n.getSubsectionSymbol(e),10):0,type:"decimal"}:(e=e.replace(/\W/g,"").toLowerCase(),!t&&e.match(/[ivxl]+/i)||t&&"alpha"!=t||"roman"==t?{index:n.toArabic(e),type:a+"roman"}:e.match(/[a-z]/i)?{index:e.charCodeAt(0)-97,type:a+"alpha"}:{index:-1,type:"disc"})},getListItemInfo:function(e){if(void 0!==e.attributes["cke-list-id"])return{id:e.attributes["cke-list-id"],level:e.attributes["cke-list-level"]};var t=o.parseCssText(e.attributes.style)["mso-list"],n={id:"0",level:"1"};return t&&(t+=" ",n.level=t.match(/level(.+?)\s+/)[1],n.id=t.match(/l(\d+?)\s+/)[1]),e.attributes["cke-list-level"]=void 0!==e.attributes["cke-list-level"]?e.attributes["cke-list-level"]:n.level,e.attributes["cke-list-id"]=n.id,n}},n=CKEDITOR.plugins.pastefromword.lists,n.setListSymbol.removeRedundancies=function(e,t){(1===t&&"disc"===e["list-style-type"]||"decimal"===e["list-style-type"])&&delete e["list-style-type"]},CKEDITOR.plugins.pastefromword.createAttributeStack=t}();