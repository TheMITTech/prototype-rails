(function(){var t;t=function(t){var e,n,r,i,o;return i=t.selectionStart,n=t.selectionEnd,o=$(t).val(),r=o.replace(/\u2018/g,"'").replace(/\u2019/g,"'").replace(/\u2032/g,"'").replace(/\u2033/g,'"').replace(/\u201C/g,'"').replace(/\u201D/g,'"'),e=r.replace(/'(\d\d)/,"\u2019$1").replace(/\b'\b/,"\u2019").replace(/'\b/g,"\u2018").replace(/\b'/g,"\u2019").replace(/(\. ?)'/g,"$1\u2019").replace(/(\? ?)'/g,"$1\u2019").replace(/(, ?)'/g,"$1\u2019").replace(/(! ?)'/g,"$1\u2019").replace(/(; ?)'/g,"$1\u2019").replace(/"\b/g,"\u201c").replace(/\b"/g,"\u201d").replace(/(\. ?)"/g,"$1\u201d").replace(/(\? ?)"/g,"$1\u201d").replace(/(, ?)"/g,"$1\u201d").replace(/(! ?)"/g,"$1\u201d").replace(/(; ?)"/g,"$1\u201d").replace(/--/g,"\u2013"),$(t).val(e),t.setSelectionRange(i,n)},$(document).on("keypress","[data-smart-quotes]",function(e){return setTimeout(t.bind(null,e.target),0),!0}),$(document).on("paste","[data-smart-quotes]",function(e){return setTimeout(t.bind(null,e.target),0),!0})}).call(this);