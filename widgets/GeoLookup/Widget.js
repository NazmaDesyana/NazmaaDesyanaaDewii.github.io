// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"dojox/data/CsvStore":function(){define("dojo/_base/lang dojo/_base/declare dojo/_base/xhr dojo/_base/kernel dojo/data/util/filter dojo/data/util/simpleFetch".split(" "),function(J,F,G,H,x,K){F=F("dojox.data.CsvStore",null,{constructor:function(a){this._attributes=[];this._attributeIndexes={};this._dataArray=[];this._arrayOfAllItems=[];this._loadFinished=!1;a.url&&(this.url=a.url);this._csvData=a.data;a.label?this.label=a.label:""===this.label&&(this.label=void 0);this._storeProp=
"_csvStore";this._idProp="_csvId";this._features={"dojo.data.api.Read":!0,"dojo.data.api.Identity":!0};this._loadInProgress=!1;this._queuedFetches=[];this.identifier=a.identifier;""===this.identifier?delete this.identifier:this._idMap={};"separator"in a&&(this.separator=a.separator);"urlPreventCache"in a&&(this.urlPreventCache=a.urlPreventCache?!0:!1)},url:"",label:"",identifier:"",separator:",",urlPreventCache:!1,_assertIsItem:function(a){if(!this.isItem(a))throw Error(this.declaredClass+": a function was passed an item argument that was not an item");
},_getIndex:function(a){a=this.getIdentity(a);this.identifier&&(a=this._idMap[a]);return a},getValue:function(a,c,e){this._assertIsItem(a);var g=e;if("string"===typeof c)c=this._attributeIndexes[c],null!=c&&(g=this._dataArray[this._getIndex(a)][c]||e);else throw Error(this.declaredClass+": a function was passed an attribute argument that was not a string");return g},getValues:function(a,c){return(a=this.getValue(a,c))?[a]:[]},getAttributes:function(a){this._assertIsItem(a);var c=[];a=this._dataArray[this._getIndex(a)];
for(var e=0;e<a.length;e++)""!==a[e]&&c.push(this._attributes[e]);return c},hasAttribute:function(a,c){this._assertIsItem(a);if("string"===typeof c)return c=this._attributeIndexes[c],a=this._dataArray[this._getIndex(a)],"undefined"!==typeof c&&c<a.length&&""!==a[c];throw Error(this.declaredClass+": a function was passed an attribute argument that was not a string");},containsValue:function(a,c,e){var g=void 0;"string"===typeof e&&(g=x.patternToRegExp(e,!1));return this._containsValue(a,c,e,g)},_containsValue:function(a,
c,e,g){a=this.getValues(a,c);for(c=0;c<a.length;++c){var f=a[c];if("string"===typeof f&&g)return null!==f.match(g);if(e===f)return!0}return!1},isItem:function(a){if(a&&a[this._storeProp]===this)if(a=a[this._idProp],this.identifier){if(this._dataArray[this._idMap[a]])return!0}else if(0<=a&&a<this._dataArray.length)return!0;return!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getFeatures:function(){return this._features},getLabel:function(a){if(this.label&&this.isItem(a))return this.getValue(a,
this.label)},getLabelAttributes:function(a){return this.label?[this.label]:null},_fetchItems:function(a,c,e){var g=this,f=function(n,q){var I=null;if(n.query){var z;I=[];var C=n.queryOptions?n.queryOptions.ignoreCase:!1,Q={};for(z in n.query){var M=n.query[z];"string"===typeof M&&(Q[z]=x.patternToRegExp(M,C))}for(C=0;C<q.length;++C){var R=!0,S=q[C];for(z in n.query)M=n.query[z],g._containsValue(S,z,M,Q[z])||(R=!1);R&&I.push(S)}}else I=q.slice(0,q.length);c(I,n)};if(this._loadFinished)f(a,this._arrayOfAllItems);
else if(""!==this.url)if(this._loadInProgress)this._queuedFetches.push({args:a,filter:f});else{this._loadInProgress=!0;var u=G.get({url:g.url,handleAs:"text",preventCache:g.urlPreventCache});u.addCallback(function(n){try{g._processData(n),f(a,g._arrayOfAllItems),g._handleQueuedFetches()}catch(q){e(q,a)}});u.addErrback(function(n){g._loadInProgress=!1;if(e)e(n,a);else throw n;});var p=null;a.abort&&(p=a.abort);a.abort=function(){var n=u;n&&-1===n.fired&&(n.cancel(),n=null);p&&p.call(a)}}else if(this._csvData)try{this._processData(this._csvData),
this._csvData=null,f(a,this._arrayOfAllItems)}catch(n){e(n,a)}else{var r=Error(this.declaredClass+": No CSV source data was provided as either URL or String data input.");if(e)e(r,a);else throw r;}},close:function(a){},_getArrayOfArraysFromCsvFileContents:function(a){if(J.isString(a)){var c=RegExp("^\\s+","g"),e=RegExp("\\s+$","g"),g=RegExp('""',"g"),f=[],u=this._splitLines(a);for(a=0;a<u.length;++a){var p=u[a];if(0<p.length){p=p.split(this.separator);for(var r=0;r<p.length;){var n=p[r].replace(c,
""),q=n.replace(e,""),I=q.charAt(0),z=q.charAt(q.length-1),C=q.charAt(q.length-2),Q=q.charAt(q.length-3);if(2===q.length&&'""'==q)p[r]="";else if('"'==I&&('"'!=z||'"'==z&&'"'==C&&'"'!=Q)){if(r+1===p.length)return;p[r]=n+this.separator+p[r+1];p.splice(r+1,1)}else'"'==I&&'"'==z&&(q=q.slice(1,q.length-1),q=q.replace(g,'"')),p[r]=q,r+=1}f.push(p)}}this._attributes=f.shift();for(a=0;a<this._attributes.length;a++)this._attributeIndexes[this._attributes[a]]=a;this._dataArray=f}},_splitLines:function(a){var c=
[],e,g="",f=!1;for(e=0;e<a.length;e++){var u=a.charAt(e);switch(u){case '"':f=!f;g+=u;break;case "\r":f?g+=u:(c.push(g),g="",e<a.length-1&&"\n"==a.charAt(e+1)&&e++);break;case "\n":f?g+=u:(c.push(g),g="");break;default:g+=u}}""!==g&&c.push(g);return c},_processData:function(a){this._getArrayOfArraysFromCsvFileContents(a);this._arrayOfAllItems=[];if(this.identifier&&void 0===this._attributeIndexes[this.identifier])throw Error(this.declaredClass+": Identity specified is not a column header in the data set.");
for(a=0;a<this._dataArray.length;a++){var c=a;this.identifier&&(c=this._dataArray[a][this._attributeIndexes[this.identifier]],this._idMap[c]=a);this._arrayOfAllItems.push(this._createItemFromIdentity(c))}this._loadFinished=!0;this._loadInProgress=!1},_createItemFromIdentity:function(a){var c={};c[this._storeProp]=this;c[this._idProp]=a;return c},getIdentity:function(a){return this.isItem(a)?a[this._idProp]:null},fetchItemByIdentity:function(a){var c=a.scope?a.scope:H.global;if(this._loadFinished){var e=
this._createItemFromIdentity(a.identity);this.isItem(e)||(e=null);a.onItem&&a.onItem.call(c,e)}else{var g=this;if(""!==this.url)this._loadInProgress?this._queuedFetches.push({args:a}):(this._loadInProgress=!0,e=G.get({url:g.url,handleAs:"text"}),e.addCallback(function(f){try{g._processData(f);var u=g._createItemFromIdentity(a.identity);g.isItem(u)||(u=null);a.onItem&&a.onItem.call(c,u);g._handleQueuedFetches()}catch(p){a.onError&&a.onError.call(c,p)}}),e.addErrback(function(f){this._loadInProgress=
!1;a.onError&&a.onError.call(c,f)}));else if(this._csvData)try{g._processData(g._csvData),g._csvData=null,e=g._createItemFromIdentity(a.identity),g.isItem(e)||(e=null),a.onItem&&a.onItem.call(c,e)}catch(f){a.onError&&a.onError.call(c,f)}}},getIdentityAttributes:function(a){return this.identifier?[this.identifier]:null},_handleQueuedFetches:function(){if(0<this._queuedFetches.length){for(var a=0;a<this._queuedFetches.length;a++){var c=this._queuedFetches[a],e=c.filter,g=c.args;e?e(g,this._arrayOfAllItems):
this.fetchItemByIdentity(c.args)}this._queuedFetches=[]}}});J.extend(F,K);return F})},"widgets/GeoLookup/layerQueryDetails":function(){define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","esri/geometry/geometryEngine"],function(J,F,G,H,x){return F([J],{declaredClass:"layerQueryDetails",layer:null,fields:null,intersectField:null,valueIn:null,valueOut:null,numberOfRequest:0,requestComplete:0,numberOfHits:0,totalRecords:0,currentNumber:0,deferreds:[],complete:!1,hasError:!1,
constructor:function(K){F.safeMixin(this,K)},addDeferred:function(K,a){K.then(G.hitch(this,function(c){c&&H.forEach(a,G.hitch(this,function(e){H.forEach(c.features,G.hitch(this,function(g){x.intersects(e.geometry,g.geometry)&&(H.forEach(this.fields,function(f){g.attributes[f]&&(e.attributes[this.layer.label+"_"+f]=g.attributes[f])},this),e.attributes[this.intersectField]=this.valueIn,e.symbol=this.valueInSym,this.numberOfHits++)}));this.currentNumber++;this.requestComplete++}));this.currentNumber=
this.currentNumber;this.requestComplete=this.requestComplete;this.numberOfHits=this.numberOfHits;this.emit("requestComplete",{layerID:this.layer.id,currentNumber:this.currentNumber,totalRecords:this.totalRecords,intesected:this.numberOfHits,name:this.layer.label});this.isComplete()&&this.emit("complete",{layerID:this.layer.id})}),G.hitch(this,function(c){this.hasError=!0;console.log("error: "+c);this.emit("error",{layerID:this.layer.id});return c}));this.deferreds.push(K)},isComplete:function(){return this.complete=
this.numberOfRequest===this.requestComplete?!0:!1}})})},"widgets/GeoLookup/_build-generate_module":function(){define(["dojo/text!./Widget.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/GeoLookup/Widget.html":'\x3cdiv style\x3d"width:100%;height:100%;overflow-y:auto;"\x3e\r\n\r\n   \x3c!-- \x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" style\x3d"height:100%;width:100%"\x3e --\x3e\r\n        \x3cdiv class\x3d"widgetDescription" data-dojo-attach-point\x3d"widgetDescription" tabIndex\x3d0\x3e\x3c/div\x3e\r\n        \x3cform data-dojo-attach-point\x3d"inputForm"\x3e\r\n        \x3cdiv class\x3d"divCheckPlot"\x3e\r\n        \t\x3ctable\x3e\r\n        \t\t\x3ctr\x3e\r\n        \t\t\t\x3ctd class\x3d"optionStyle"\x3e\x3cinput type\x3d"checkbox" id\x3d"chkboxPlotOnly" data-dojo-attach-point\x3d"chkboxPlotOnly" tabIndex\x3d0  aria-label\x3d"${nls.plotOnly}"\x3e\x3clabel\x3e${nls.plotOnly}\x3c/label\x3e\x3c/td\x3e\r\n        \t\t\x3c/tr\x3e\r\n        \t\t\x3ctr\x3e\r\n        \t\t\t\x3ctd class\x3d"optionStyle"\x3e\r\n\t\t        \t\t\x3clabel class\x3d"labelPad" aria-label\x3d"${nls.projectionChoice}" tabIndex\x3d0\x3e${nls.projectionChoice}\x3c/label\x3e\r\n\t\t        \t\t\x3cinput type\x3d"radio" class\x3d"jimu-radio-btn" name\x3d"rdProjection" id\x3d"rdProjectionLat" data-dojo-attach-point\x3d"rdProjection" value\x3d"latlon" checked tabIndex\x3d0  aria-label\x3d"${nls.projectionLat}"\x3e\x3clabel class\x3d"labelPad"\x3e${nls.projectionLat}\x3c/label\x3e\r\n\t\t        \t\t\x3cinput type\x3d"radio" class\x3d"jimu-radio-btn" name\x3d"rdProjection" id\x3d"rdProjectionMap" data-dojo-attach-point\x3d"rdProjection" value\x3d"map" tabIndex\x3d0  aria-label\x3d"${nls.projectionMap}"\x3e\x3clabel\x3e${nls.projectionMap}\x3c/label\x3e\r\n        \t\t\t\x3c/td\x3e\r\n        \t\t\x3c/tr\x3e\r\n\t\t\t\t\x3ctr\x3e\r\n\t\t\t\t\t\x3ctd\x3e\r\n\t\t\t\t\t\t\x3ctable border\x3d0\x3e\r\n\t\t\t\t\t\t\t\x3ctr\x3e\r\n\t\t\t\t\t\t\t\t\x3ctd class\x3d"tdClearButton" nowrap\x3e\x3cdiv class\x3d"clear-CSVresult" data-dojo-attach-point\x3d"clearResultsBtn" data-dojo-attach-event\x3d"click:clearCSVResults" tabIndex\x3d0 role\x3d"button"\x3e${nls.clearResults}\x3c/div\x3e\x3c/td\x3e\r\n\t\t\t\t\t      \x3ctd class\x3d"tdDownloadButton" nowrap\x3e\x3cdiv class\x3d"download-CSVresult" data-dojo-attach-point\x3d"downloadResultsBtn" data-dojo-attach-event\x3d"click:downloadCSVResults" tabIndex\x3d0 role\x3d"button"\x3e${nls.downloadResults}\x3c/div\x3e\x3c/td\x3e\r\n\t\t\t\t\t\t\t\x3c/tr\x3e\r\n\t\t\t\t\t\t\x3c/table\x3e\r\n\t\t\t\t\t\x3c/td\x3e\r\n\r\n\t\t        \x3c/tr\x3e\r\n        \t\x3c/table\x3e\r\n\x3c!--\r\n        \t\x3cdiv class\x3d"plotChoice"\x3e\x3cinput type\x3d"checkbox" id\x3d"chkboxPlotOnly" data-dojo-attach-point\x3d"chkboxPlotOnly"\x3e\x3clabel\x3e${nls.plotOnly}\x3c/label\x3e\x3c/div\x3e\r\n        \t\x3cdiv class\x3d"projectionChoice"\x3e\r\n        \t\t\x3clabel class\x3d"labelPad"\x3e${nls.projectionChoice}\x3c/label\x3e\r\n        \t\t\x3cinput type\x3d"radio" name\x3d"rdProjection" id\x3d"rdProjectionLat" data-dojo-attach-point\x3d"rdProjection" value\x3d"latlon" checked\x3e\x3clabel class\x3d"labelPad"\x3e${nls.projectionLat}\x3c/label\x3e\r\n        \t\t\x3cinput type\x3d"radio" name\x3d"rdProjection" id\x3d"rdProjectionMap" data-dojo-attach-point\x3d"rdProjection" value\x3d"map"\x3e\x3clabel\x3e${nls.projectionMap}\x3c/label\x3e\r\n        \t\x3c/div\x3e\r\n--\x3e\r\n        \x3c/div\x3e\r\n        \x3ctable data-dojo-attach-point\x3d"actionButtonsContainer" cellspacing\x3d"0" class\x3d"tblActionContainer"\x3e\r\n        \x3ctr\x3e\r\n        \t\x3ctd width\x3d"100%" class\x3d"tdCSVButton"\x3e\r\n        \t\t\x3cinput type\x3d"file" id\x3d"csvFileInput" data-dojo-attach-point\x3d"csvFileInput" data-dojo-attach-event\x3d"change:fileSelected" accept\x3d".csv" role\x3d"button" tabIndex\x3d0\x3e\r\n\t\t\t\t    \x3cdiv class\x3d"jimu-btn hide" data-dojo-attach-point\x3d"showFileDialogBtn" data-dojo-attach-event\x3d"click:showFileDialog" tabIndex\x3d0\x3e${nls.selectCSV}\x3c/div\x3e\r\n\t\t\t\x3c/td\x3e\r\n\t\t\x3c/tr\x3e\r\n        \x3c/table\x3e\r\n        \x3c/form\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"results" class\x3d"hide"\x3e\r\n        \t\x3cdiv class\x3d"results-header"\x3e${nls.messages}\x3c/div\x3e\r\n            \x3ctable class\x3d"widgets-results-table" data-dojo-attach-point\x3d"widgetsResultsTable" cellspacing\x3d"0"\x3e\r\n                \x3ctbody data-dojo-attach-point\x3d"widgetsResultsTableBody"\x3e\r\n\r\n                    \x3ctr class\x3d"controls"\x3e\r\n\r\n                        \x3ctd class\x3d"tdProcessing"\x3e\r\n                            \x3cdiv data-dojo-attach-point\x3d"resultsLoadingImage" id\x3d"resultsLoadingImage" class\x3d"status processing" /\x3e\r\n                        \x3c/td\x3e\r\n                        \x3ctd\x3e\r\n                            \x3cdiv class\x3d"result-text" data-dojo-attach-point\x3d"resultsLoading" tabIndex\x3d0\x3e${nls.loadingCSV}\x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                    \x3c/tr\x3e\r\n\r\n                    \x3ctr class\x3d"controls"\x3e\r\n\r\n                        \x3ctd class\x3d"tdProcessing"\x3e\r\n                            \x3cdiv data-dojo-attach-point\x3d"resultsPlottingImage" id\x3d"resultsPlottingImage" class\x3d"status processing" /\x3e\r\n\r\n                        \x3c/td\x3e\r\n                        \x3ctd\x3e\r\n                            \x3cdiv class\x3d"result-text" data-dojo-attach-point\x3d"resultsPlotting" tabIndex\x3d0\x3e${nls.plottingRows}\x3c/div\x3e\r\n                        \x3c/td\x3e\r\n                    \x3c/tr\x3e\r\n\r\n                \x3c/tbody\x3e\r\n\r\n            \x3c/table\x3e\r\n            \x3cdiv class\x3d"errorLink" data-dojo-attach-point\x3d"enrichErrors" data-dojo-attach-event\x3d"click:showErrorTable"\x3e\x3c/div\x3e\r\n            \x3cdiv class\x3d"hide errorList" id\x3d"enrichErrorsList" data-dojo-attach-point\x3d"enrichErrorsList" tabIndex\x3d0\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3c!--  \x3c/div\x3e--\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"loading" data-dojo-type\x3d"jimu/dijit/LoadingIndicator" data-dojo-props\x3d\'hidden:true\'\x3e\x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"lastNode508" tabIndex\x3d0\x3e\x3c/div\x3e\r\n   \x3c!-- \x3c/div\x3e --\x3e\r\n\x3c/div\x3e',
"url:widgets/GeoLookup/css/style.css":'.solutions-widget-geolookup .widgetDescription {text-align: left; color: #66696C; font-family: proxima-nova; font-style: normal; margin: 0px 0px 20px 0px; font-size: 14px;}.solutions-widget-geolookup .uploadBox {margin: 30px 0 15px 0; float: left;}.solutions-widget-geolookup .hide {display: none;}.solutions-widget-geolookup .fileInputNonHTML5 {position: fixed;}.solutions-widget-geolookup .fileInputHTML5 {position: fixed; width: 0px; height: 0px; display: none;}.solutions-widget-geolookup .divCheckPlot {color: #686868; font-family: proxima-nova; font-style: normal; font-size: 12px; padding-bottom: 10px; width: 100%; position: relative;}.solutions-widget-geolookup .plotChoice {position: absolute; left: 0px; top: 0px; width: 35%;}.solutions-widget-geolookup .projectionChoice {text-align: right; width: 65%; position: absolute; right: 0px; top: 0px;}.solutions-widget-geolookup .labelPad {padding-right: 5px;}.solutions-widget-geolookup .widgets-results-table {margin: 1px;}.solutions-widget-geolookup .tblActionContainer {width: 100%; padding-bottom: 15px;}.solutions-widget-geolookup .optionStyle {padding-bottom: 5px;}.solutions-widget-geolookup .tdCSVButton {width: 100%;}.solutions-widget-geolookup .tdDownloadButton {width: 25%;}.solutions-widget-geolookup .tdClearButton {width: 25%;}.solutions-widget-geolookup .clear-CSVresult {color: #51b1fe; font-family: proxima-nova; font-style: normal; margin: 0px 0px 0px 0px; font-size: 14px; cursor:pointer;}.solutions-widget-geolookup .download-CSVresult {color: #51b1fe; font-family: proxima-nova; font-style: normal; margin: 0px 15px 0px 15px; font-size: 14px; cursor:pointer;} .solutions-widget-geolookup .controls {width: 100%; height: 42px; vertical-align: middle; padding-top: 0px; padding-bottom: 0px; margin-bottom: 0px; margin-top: 0px; font-size:12px;}.solutions-widget-geolookup .status {background-repeat: no-repeat; background-position: left; width: 20px;}.solutions-widget-geolookup .processing {content: url("./images/processing.gif");}.solutions-widget-geolookup .processing:before {content: url("./images/processing.gif");}.solutions-widget-geolookup .tdProcessing {width: 30px; text-align: left;}.solutions-widget-geolookup .complete {content: url("./images/complete.png");}.solutions-widget-geolookup .complete:before {content: url("./images/complete.png");}.solutions-widget-geolookup .error {content: url("./images/x_symbol_red.png");}.solutions-widget-geolookup .error:before {content: url("./images/x_symbol_red.png");}.solutions-widget-geolookup .bypass {content: url("");}.solutions-widget-geolookup .results-header {color: #66696C; font-family: proxima-nova; font-style: Semibold; font-size: 14px; padding-bottom: 0px;}.solutions-widget-geolookup .result-text {color: #686868; font-family: proxima-nova; font-style: normal; font-size: 12px;}.solutions-widget-geolookup .errorLink {color: #0000FF; cursor:pointer; font-family: proxima-nova; font-style: normal; font-size: 12px;}.solutions-widget-geolookup .errorList {color: #686868; font-family: proxima-nova; font-style: normal; font-size: 12px;}',
"*now":function(J){J(['dojo/i18n!*preload*widgets/GeoLookup/nls/Widget*["ar","bg","bs","ca","cs","da","de","en","el","es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sk","sl","sr","sv","th","tr","zh-cn","uk","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dijit/_WidgetsInTemplateMixin jimu/BaseWidget dojo/dom dojo/on dojo/sniff dojo/_base/html dojo/_base/lang dojo/_base/array dojo/string dojo/dom-class dojo/dom-construct dojo/dom-style dojo/keys dojox/data/CsvStore esri/geometry/webMercatorUtils esri/layers/FeatureLayer esri/geometry/Multipoint esri/geometry/Point esri/InfoTemplate esri/tasks/query esri/tasks/QueryTask esri/tasks/GeometryService esri/tasks/ProjectParameters esri/SpatialReference esri/symbols/jsonUtils esri/renderers/UniqueValueRenderer jimu/dijit/Message jimu/exportUtils jimu/utils ./layerQueryDetails".split(" "),function(J,
F,G,H,x,K,a,c,e,g,f,u,p,r,n,q,I,z,C,Q,M,R,S,Y,V,W,Z,N,U,t,aa){return J([G,F],{baseClass:"solutions-widget-geolookup",csvStore:null,layerLoaded:!1,lookupLayersFieldNames:[],lookupLayersFields:[],combinedFields:[],latField:null,longField:null,renderer:null,srWebMerc:null,syncLayers:null,enrichFilter:null,enrichResultsProg:{},enrichResultsText:{},errorList:null,postCreate:function(){this.inherited(arguments);f.add(this.downloadResultsBtn,"hide");this._setFirstLastNodeOnMainScreen();this.handleKeyDownEvents()},
startup:function(){this.inherited(arguments);this.loading.show();a.place(a.toDom(this.nls.description),this.widgetDescription);this._buildRenderer();if(t.file.supportHTML5()){var b=H.byId(this.id);this.own(x(b,"dragover",function(d){d.preventDefault()}));this.own(x(b,"dragenter",function(d){d.preventDefault()}));this.own(x(b,"drop",c.hitch(this,this._handleCSVDrop)))}this.srWebMerc=new V({wkid:102100});t.file.supportHTML5()||K("safari")||!t.file.isEnabledFlash()?(f.add(this.csvFileInput,"fileInputHTML5"),
f.remove(this.showFileDialogBtn,"hide")):t.file.loadFileAPI().then(c.hitch(this,function(){console.log("loading FileAPI");f.add(this.csvFileInput,"fileInputNonHTML5, js-fileapi-wrapper")}));this._initalizeLookupLayers();e.forEach(this.config.enrichLayers,function(d){var h=d.id,k=d.id+"_prog",l=u.toDom("\x3ctr class\x3d'controls'\x3e\x3ctd\x3e\x3cdiv id\x3d'"+k+"' class\x3d'status processing' /\x3e\x3c/td\x3e\x3ctd\x3e\x3cdiv id\x3d'"+h+"' class\x3d'result-text' tabIndex\x3d0\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e");
u.place(l,this.widgetsResultsTableBody);this.enrichResultsProg[h]=H.byId(k);this.enrichResultsText[h]=H.byId(h);this.enrichResultsText[h].innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsEnriched,{0:0,1:0,2:0,3:d.label}))},this);f.add(this.clearResultsBtn,"jimu-state-disabled");this.loading.hide()},_buildRenderer:function(){this.symIn=W.fromJson(this.config.SymbolWithin);this.symOut=W.fromJson(this.config.SymbolOutside);this.renderer=new Z(this.symOut,this.config.intersectField);this.renderer.addValue(this.config.valueIn,
this.symIn);this.renderer.addValue(this.config.valueOut,this.symOut)},_initalizeLookupLayers:function(){this.lookupLayersField=[];this.lookupLayersFieldNames=[];var b,d;e.forEach(this.config.enrichLayers,function(h){b=e.map(h.fields,function(k){return k.fieldName});d=e.map(h.fields,function(k){return k.label});e.forEach(b,function(k){var l=b.indexOf(k),m={name:null,alias:null,type:"esriFieldTypeString",editable:!0,domain:null};m.name=h.label+"_"+k;m.alias=h.label+"_"+d[l];this.lookupLayersFieldNames.push(m.name);
this.lookupLayersFields.push(m)},this)},this)},fileSelected:function(){t.file.supportHTML5()?this._processFiles(this.csvFileInput.files):t.file.supportFileAPI()?this._processFiles(window.FileAPI.getFiles(this.csvFileInput)):console.log("no file handler support !");this.csvFileInput.value=null;f.add(this.downloadResultsBtn,"hide")},_handleCSVDrop:function(b){b.preventDefault();b=b.dataTransfer;f.contains(this.showFileDialogBtn,"jimu-state-disabled")||(f.add(this.downloadResultsBtn,"hide"),this._processFiles(b.files))},
_processFiles:function(b){f.add(this.showFileDialogBtn,"jimu-state-disabled");this._resetResults();0<b.length&&(b=b[0],-1!==b.name.indexOf(".csv")?b?this.handleCSV(b):(N({message:this.nls.error.fileIssue}),f.remove(this.showFileDialogBtn,"jimu-state-disabled"),this.clearCSVResults()):(new N({message:this.nls.error.notCSVFile}),f.remove(this.showFileDialogBtn,"jimu-state-disabled"),this.clearCSVResults()))},showFileDialog:function(){f.contains(this.showFileDialogBtn,"jimu-state-disabled")||this.csvFileInput.click()},
handleCSV:function(b){if(t.file.supportHTML5()){var d=new FileReader;d.onload=c.hitch(this,function(){this._processCSVData(d.result)});d.readAsText(b)}else window.FileAPI.readAsText(b,c.hitch(this,function(h){"load"===h.type&&this._processCSVData(h.result)}))},_processCSVData:function(b){if(2<b.length){var d=b.indexOf("\n");d=c.trim(b.substr(0,d));var h=b.replace(d,"");""!==d&&2<h.length?(d=this._getSeparator(d),this.csvStore=new n({data:b,separator:d}),this.csvStore.fetch({onComplete:c.hitch(this,
this._csvReadComplete),onError:c.hitch(this,function(k){f.remove(this.showFileDialogBtn,"jimu-state-disabled");var l=g.substitute(this.nls.error.fetchingCSV,{0:k.message});N({message:l});console.error(l,k)})})):(new N({message:this.nls.error.CSVNoRecords}),f.remove(this.showFileDialogBtn,"jimu-state-disabled"),this.clearCSVResults())}else new N({message:this.nls.error.CSVEmptyFile}),f.remove(this.showFileDialogBtn,"jimu-state-disabled"),this.clearCSVResults()},_csvReadComplete:function(b){if(b.length<=
parseInt(this.config.maxRowCount,10)){var d=b.length.toString();f.remove(this.results,"hide");this.resultsLoading.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.csvLoaded,{0:d}));f.replace(this.resultsLoadingImage,"complete","processing");var h=1,k=!1,l=this._generateFeatureCollectionTemplateCSV(this.csvStore,b),m=this._generateDefaultPopupInfo(l),A=new Q(this._buildInfoTemplate(m)),v="latlon";e.forEach(this.inputForm.rdProjection,c.hitch(this,function(w){w.checked&&(v=w.value)}));this.longField=
this.latField=null;e.some(this.csvFields,function(w){var B=e.indexOf(this.config.latFields,w.toLowerCase());-1!==B&&(this.latField=w);B=e.indexOf(this.config.longFields,w.toLowerCase());-1!==B&&(this.longField=w);return this.latField&&this.longField?!0:!1},this);if(null===this.latField||null===this.longField)N({message:this.nls.error.invalidCoord}),this.clearCSVResults();else{var y=0;this.errorList=[];e.forEach(b,function(w,B){var T=!1,D={};e.forEach(this.combinedFields,function(O){var X=Number(this.csvStore.getValue(w,
O));D[O]=isNaN(X)?this.csvStore.getValue(w,O):X},this);D.__OBJECTID=h;D[this.config.intersectField]=this.config.valueOut;h++;var E=0,L=0;isNaN(D[this.latField])||isNaN(D[this.longField])?(T=!0,y+=1,this.errorList.push(parseInt(w._csvId,10)+2),this.enrichErrors.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsError,{0:y}))):(E=parseFloat(D[this.latField]),L=parseFloat(D[this.longField]));if(!T)if("latlon"===v)if(this.map.spatialReference.wkid===this.srWebMerc.wkid){var P=new C(q.lngLatToXY(L,
E),this.srWebMerc);E={geometry:P.toJson(),attributes:D};l.featureSet.features.push(E);this.resultsPlotting.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsPlotted,{0:(B-y+1).toString(),1:d}))}else k=!0,T=new V({wkid:4326}),P=new C(L,E,T),E=new S(this.config.geometryServiceURL),L=new Y,L.geometries=[P],L.outSR=this.map.spatialReference,E.project(L,c.hitch(this,function(O){P=O[0];O={geometry:P.toJson(),attributes:D};l.featureSet.features.push(O);this.resultsPlotting.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsPlotted,
{0:(B-y+1).toString(),1:d}));B===b.length-1&&(this._createFeatureCollection(A,l),this.prepEnrich())}));else P=new C(L,E,this.srWebMerc),E={geometry:P.toJson(),attributes:D},l.featureSet.features.push(E),this.resultsPlotting.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsPlotted,{0:(B-y+1).toString(),1:d}))},this);k||(this._createFeatureCollection(A,l),this.prepEnrich())}}else new N({message:g.substitute(this.nls.error.tooManyRecords,{0:this.config.maxRowCount})}),this.clearCSVResults()},
_createFeatureCollection:function(b,d){this.layerLoaded&&this.map.removeLayer(this.featureLayer);this.featureLayer=new I(d,{infoTemplate:b,id:"csvLayer",name:"CSV Layer"});this.featureLayer.setRenderer(this.renderer);f.replace(this.resultsPlottingImage,"complete","processing");f.remove(this.clearResultsBtn,"jimu-state-disabled");this._zoomToData(this.featureLayer)},prepEnrich:function(){var b;if(this.chkboxPlotOnly.checked){for(b in this.enrichResultsText)this.enrichResultsText.hasOwnProperty(b)&&
(this.enrichResultsText[b].innerHTML="");for(b in this.enrichResultsProg)this.enrichResultsProg.hasOwnProperty(b)&&p.set(this.enrichResultsProg[b],"display","none")}else for(b in this._enrichData(this.featureLayer,this.config.enrichLayers),this.enrichResultsProg)this.enrichResultsProg.hasOwnProperty(b)&&p.set(this.enrichResultsProg[b],"display","block")},_enrichData:function(b,d){this.syncLayers=[];var h=0,k=1,l=[];l[h]=[];e.forEach(b.graphics,c.hitch(this,function(m){k>=parseInt(this.config.cacheNumber,
10)?(l[h].push(m),b.graphics.length>(h+1)*parseInt(this.config.cacheNumber,10)&&(h++,k=1,l[h]=[])):(l[h].push(m),k++)}));e.forEach(d,function(m){var A=e.map(m.fields,function(y){return y.fieldName}),v=new aa({layer:m,numberOfRequest:b.graphics.length,totalRecords:b.graphics.length,numberOfHits:0,fields:A,intersectField:this.config.intersectField,valueIn:this.config.valueIn,valueOut:this.config.valueOut,valueInSym:this.symIn,valueOutSym:this.symOut});this.own(x(v,"complete",c.hitch(this,this._syncComplete)));
this.own(x(v,"requestComplete",c.hitch(this,this._requestComplete)));this.own(x(v,"error",c.hitch(this,this._deferredErrorCallback)));this.syncLayers.push(v);this.queryCallback(l,0,m,A,v)},this)},queryCallback:function(b,d,h,k,l){var m=new z(this.map.spatialReference);e.forEach(b[d],function(w){(w=w.geometry)&&m.addPoint({x:w.x,y:w.y})});var A=new R(h.url);if(0===d){var v=new M;v.returnGeometry=!0;v.outFields=["*"];v.geometry=m;var y=A.execute(v,c.hitch(this,this.queryCallback(b,d+1,h,k,l)),c.hitch(this,
this.queryErrorback(h)));l.addDeferred(y,b[d]);this.featureLayer.redraw()}else return function(w){if(b.length>d){var B=new M;B.returnGeometry=!0;B.outFields=["*"];B.geometry=m;y=A.execute(B,c.hitch(this,this.queryCallback(b,d+1,h,k,l)),c.hitch(this,this.queryErrorback(h)));l.addDeferred(y,b[d]);this.featureLayer.redraw()}return{results:w}}},queryErrorback:function(b){return c.hitch(this,function(d){this.enrichResultsProg.hasOwnProperty(b.id)&&(f.replace(this.enrichResultsProg[b.id],"error","complete"),
f.replace(this.enrichResultsProg[b.id],"error","processing"));console.log(d);return d})},_deferredErrorCallback:function(b){this.enrichResultsProg.hasOwnProperty(b.layerID)&&(f.replace(this.enrichResultsProg[b.layerID],"error","complete"),f.replace(this.enrichResultsProg[b.layerID],"error","processing"))},_syncComplete:function(b){f.replace(this.enrichResultsProg[b.layerID],"complete","processing");e.some(this.syncLayers,function(d){return!d.isComplete()},this)||(this.featureLayer.redraw(),f.remove(this.showFileDialogBtn,
"jimu-state-disabled"),f.remove(this.downloadResultsBtn,"hide"))},_requestComplete:function(b){this.enrichResultsText[b.layerID].innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsEnriched,{0:b.currentNumber,1:b.totalRecords,2:b.intesected,3:b.name}));this.featureLayer.redraw()},_resetResults:function(){f.replace(this.resultsLoadingImage,"processing","complete");f.replace(this.resultsPlottingImage,"processing","complete");var b,d="";for(b in this.enrichResultsProg)this.enrichResultsProg.hasOwnProperty(b)&&
(f.replace(this.enrichResultsProg[b],"processing","error"),f.replace(this.enrichResultsProg[b],"processing","complete"));var h=c.hitch(this,function(l){l.id===b&&(k=l)});for(b in this.enrichResultsProg)if(this.enrichResultsText.hasOwnProperty(b)){var k;e.forEach(this.config.enrichLayers,h);k&&(d=k.label);this.enrichResultsText[b].innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsEnriched,{0:0,1:0,2:0,3:d}))}this.resultsLoading.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.csvLoaded,
{0:0}));this.enrichErrors.innerHTML="";this.resultsPlotting.innerHTML=t.sanitizeHTML(g.substitute(this.nls.results.recordsPlotted,{0:0,1:0}))},downloadCSVResults:function(){var b=U.createDataSource({type:U.TYPE_FEATURESET,filename:this.nls.savingCSV,data:t.toFeatureSet(this.featureLayer.graphics)});b.setFormat(U.FORMAT_CSV);b.download()},clearCSVResults:function(){this.layerLoaded&&this.map.removeLayer(this.featureLayer);this._resetResults();f.add(this.downloadResultsBtn,"hide");f.add(this.results,
"hide");p.set(this.enrichErrorsList,"display","none");f.remove(this.showFileDialogBtn,"jimu-state-disabled");f.add(this.clearResultsBtn,"jimu-state-disabled")},destroy:function(){this.layerLoaded&&this.map.removeLayer(this.featureLayer);this.inherited(arguments)},_getSeparator:function(b){var d=0,h="";e.forEach([",","      ",";","|"],function(k){var l=b.split(k).length;l>d&&(d=l,h=k)});return h},_generateFeatureCollectionTemplateCSV:function(b,d){var h={featureSet:{features:[],geometryType:"esriGeometryPoint",
spatialReference:{wkid:102100}},layerDefinition:{geometryType:"esriGeometryPoint",objectIdField:"__OBJECTID",type:"Feature Layer",typeIdField:"",fields:[{name:"__OBJECTID",alias:"Row Number",type:"esriFieldTypeOID",editable:!1,domain:null}],types:[],capabilities:"Query"}};this.csvFields=b.getAttributes(d[0]);this.combinedFields=c.clone(this.csvFields);this.combinedFields.push(this.config.intersectField);e.forEach(this.combinedFields,function(k){var l=b.getValue(d[0],k);isNaN(Number(l))||k===this.config.intersectField?
h.layerDefinition.fields.push({name:k,alias:k,type:"esriFieldTypeString",editable:!0,domain:null}):h.layerDefinition.fields.push({name:k,alias:k,type:"esriFieldTypeDouble",editable:!0,domain:null})},this);h.layerDefinition.fields.push({name:"Out",alias:"GLProcessed",type:"esriFieldTypeString",editable:!1,visible:!1,domain:null});this.combinedFields=this.combinedFields.concat(this.lookupLayersFieldNames);h.layerDefinition.fields=h.layerDefinition.fields.concat(this.lookupLayersFields);return h},_generateDefaultPopupInfo:function(b){var d=
{esriFieldTypeDouble:1,esriFieldTypeSingle:1},h={esriFieldTypeInteger:1,esriFieldTypeSmallInteger:1},k={esriFieldTypeDate:1},l=null;b=e.map(b.layerDefinition.fields,c.hitch(this,function(m){"NAME"===m.name.toUpperCase()&&(l=m.name);var A="esriFieldTypeGlobalID"!==m.type&&"esriFieldTypeGeometry"!==m.type;"GLProcessed"===m.alias&&(A=!1);var v=null;if(A){var y=m.name.toLowerCase();if(-1<",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,".indexOf(","+y+",")||y.indexOf("_i")===
y.length-2)A=!1;m.type in h?v={places:0,digitSeparator:!0}:m.type in d?v={places:4,digitSeparator:!0}:m.type in k&&(v={dateFormat:"shortDateShortTime"})}return c.mixin({},{fieldName:m.name,label:m.alias,isEditable:!1,tooltip:"",visible:A,format:v,stringFieldOption:"textbox"})}));return{title:l?"{"+l+"}":"",fieldInfos:b,description:null,showAttachments:!1,mediaInfos:[]}},_buildInfoTemplate:function(b){var d={content:'\x3cdiv style\x3d"font-weight:bold;"\x3e'+this.nls.results.label+'\x3c/div\x3e\x3cdiv style\x3d"border:none;border-top: 1px solid #333333;margin-top: 6px;margin-bottom: 6px;"\x3e\x3c/div\x3e\x3ctable\x3e'};
e.forEach(b.fieldInfos,function(h){h.visible&&(d.content+='\x3ctr\x3e\x3ctd valign\x3d"top" style\x3d"color:#888888;padding-right:5px;"\x3e',d.content+=h.label+": \x3c/td\x3e",d.content+='\x3ctd valign\x3d"top" style\x3d"padding:2px;padding-bottom:5px;"\x3e${',d.content+=h.fieldName+"}\x3c/td\x3e\x3c/tr\x3e")});d.content+="\x3c/table\x3e";return d},_zoomToData:function(b){var d=new z(this.map.spatialReference);e.forEach(b.graphics,function(h){(h=h.geometry)&&d.addPoint({x:h.x,y:h.y})});b.name="CSV Layer";
this.map.addLayer(this.featureLayer);this.layerLoaded=!0;0<d.points.length&&(this.map.setExtent(d.getExtent().expand(1.05),!0),this.chkboxPlotOnly.checked&&f.remove(this.showFileDialogBtn,"jimu-state-disabled"))},showErrorTable:function(){if("none"===p.get(this.enrichErrorsList,"display")){var b="";e.forEach(this.errorList,c.hitch(this,function(d){b=b+g.substitute(this.nls.results.recordsErrorList,{0:d})+"\x3cbr\x3e"}));this.enrichErrorsList.innerHTML=t.sanitizeHTML(b);p.set(this.enrichErrorsList,
"display","block")}else p.set(this.enrichErrorsList,"display","none")},_setFirstLastNodeOnMainScreen:function(){this._setWidgetFirstFocusNode(this.widgetDescription.focusNode,this.lastNode508)},_setWidgetFirstFocusNode:function(b,d){t.initFirstFocusNode(this.domNode,b);t.initLastFocusNode(this.domNode,d);this.openAtStartAysn=!0;t.isAutoFocusFirstNodeWidget(this)&&this.showFileDialogBtn.focus()},handleKeyDownEvents:function(){this.own(x(this.showFileDialogBtn,"keydown",c.hitch(this,function(b){b.keyCode!==
r.ENTER&&b.keyCode!==r.SPACE||this.showFileDialog()})));this.own(x(this.csvFileInput,"keydown",c.hitch(this,function(b){b.keyCode!==r.ENTER&&b.keyCode!==r.SPACE||this.showFileDialog()})));this.own(x(this.clearResultsBtn,"keydown",c.hitch(this,function(b){b.keyCode!==r.ENTER&&b.keyCode!==r.SPACE||this.clearCSVResults()})));this.own(x(this.downloadResultsBtn,"keydown",c.hitch(this,function(b){b.keyCode!==r.ENTER&&b.keyCode!==r.SPACE||this.downloadCSVResults()})));this.own(x(this.chkboxPlotOnly,"keydown",
c.hitch(this,function(b){if(b.keyCode===r.ENTER||b.keyCode===r.SPACE)this.chkboxPlotOnly.checked=this.chkboxPlotOnly.checked?!1:!0})))}})});