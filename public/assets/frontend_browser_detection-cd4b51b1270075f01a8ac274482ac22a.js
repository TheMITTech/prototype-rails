(function(){navigator.sayswho=function(){var a,r,i;return i=navigator.userAgent,r=void 0,a=i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],/trident/i.test(a[1])?(r=/\brv[ :]+(\d+)/g.exec(i)||[],"IE "+(r[1]||"")):"Chrome"===a[1]&&(r=i.match(/\bOPR\/(\d+)/),null!==r)?"Opera "+r[1]:(a=a[2]?[a[1],a[2]]:[navigator.appName,navigator.appVersion,"-?"],null!==(r=i.match(/version\/(\d+)/i))&&a.splice(1,1,r[1]),a)}(),$(function(){var a,r,i;return i=navigator.sayswho,a=i[0],r=i[1],i})}).call(this);