!function(){function e(e){return{editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(t){if(t.editable().hasFocus){var n,a=t.getSelection();if(n=new CKEDITOR.dom.elementPath(a.getCommonAncestor(),a.root).contains({td:1,th:1},1)){var a=t.createRange(),i=CKEDITOR.tools.tryThese(function(){var t=n.getParent().$.cells[n.$.cellIndex+(e?-1:1)];return t.parentNode.parentNode,t},function(){var t=n.getParent(),t=t.getAscendant("table").$.rows[t.$.rowIndex+(e?-1:1)];return t.cells[e?t.cells.length-1:0]});if(i||e){if(!i)return!0;i=new CKEDITOR.dom.element(i),a.moveToElementEditStart(i),a.checkStartOfBlock()&&a.checkEndOfBlock()||a.selectNodeContents(i)}else{for(var r=n.getAscendant("table").$,i=n.getParent().$.cells,r=new CKEDITOR.dom.element(r.insertRow(-1),t.document),o=0,s=i.length;o<s;o++)r.append(new CKEDITOR.dom.element(i[o],t.document).clone(!1,!1)).appendBogus();a.moveToElementEditStart(r)}return a.select(!0),!0}}return!1}}}var t={editorFocus:!1,modes:{wysiwyg:1,source:1}},n={exec:function(e){e.container.focusNext(!0,e.tabIndex)}},a={exec:function(e){e.container.focusPrevious(!0,e.tabIndex)}};CKEDITOR.plugins.add("tab",{init:function(i){for(var r=!1!==i.config.enableTabKeyTools,o=i.config.tabSpaces||0,s="";o--;)s+="\xa0";s&&i.on("key",function(e){9==e.data.keyCode&&(i.insertText(s),e.cancel())}),r&&i.on("key",function(e){(9==e.data.keyCode&&i.execCommand("selectNextCell")||e.data.keyCode==CKEDITOR.SHIFT+9&&i.execCommand("selectPreviousCell"))&&e.cancel()}),i.addCommand("blur",CKEDITOR.tools.extend(n,t)),i.addCommand("blurBack",CKEDITOR.tools.extend(a,t)),i.addCommand("selectNextCell",e()),i.addCommand("selectPreviousCell",e(!0))}})}(),CKEDITOR.dom.element.prototype.focusNext=function(e,t){var n,a,i,r,o,s,l=void 0===t?this.getTabIndex():t;if(0>=l)for(o=this.getNextSourceNode(e,CKEDITOR.NODE_ELEMENT);o;){if(o.isVisible()&&0===o.getTabIndex()){i=o;break}o=o.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT)}else for(o=this.getDocument().getBody().getFirst();o=o.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!n)if(!a&&o.equals(this)){if(a=!0,e){if(!(o=o.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;n=1}}else a&&!this.contains(o)&&(n=1);if(o.isVisible()&&!(0>(s=o.getTabIndex()))){if(n&&s==l){i=o;break}s>l&&(!i||!r||s<r)?(i=o,r=s):i||0!==s||(i=o,r=s)}}i&&i.focus()},CKEDITOR.dom.element.prototype.focusPrevious=function(e,t){for(var n,a,i,r,o=void 0===t?this.getTabIndex():t,s=0,l=this.getDocument().getBody().getLast();l=l.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){if(!n)if(!a&&l.equals(this)){if(a=!0,e){if(!(l=l.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT)))break;n=1}}else a&&!this.contains(l)&&(n=1);if(l.isVisible()&&!(0>(r=l.getTabIndex())))if(0>=o){if(n&&0===r){i=l;break}r>s&&(i=l,s=r)}else{if(n&&r==o){i=l;break}r<o&&(!i||r>s)&&(i=l,s=r)}}i&&i.focus()};