function baseToString(a){try{var c=android.util.Base64;return new java.lang.String(c.decode(a,c.DEFAULT))}catch(b){return null}}function stringToBase(a){try{var c=android.util.Base64;return new c.encodeToString(a.getBytes(),c.DEFAULT)}catch(b){return null}}function getDraw(a){try{return android.graphics.drawable.Drawable.createFromStream(new java.io.FileInputStream(a),a)}catch(b){return android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK)}}function new_menu(e,d,f){return com.uc.browser.cy(new java.lang.Integer(e),new java.lang.Integer(d),new java.lang.Integer(f))}function new_acn(c,b){var a=getClasse("acn").getConstructor(java.lang.Integer.TYPE,java.lang.String);return a.newInstance(new java.lang.Integer(c),b)}function new_option_button(b,a){return getClasse("adj").getConstructor(java.lang.Integer.TYPE,java.lang.String).newInstance(new java.lang.Integer(b),a)}function getClasse(a){return Class.forName(a,false,mActivity.getClass().getClassLoader())}function isURL(a){var b=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;return b.test(a)}function JsArrayToJavaArray(c,a){var d=java.lang.reflect.Array.newInstance(c,a.length);for(var b=0;b<a.length;b++){d[b]=a[b]}return d}function JavaArrayToJsArray(a){var b=[];for(i=0;i<a.length;++i){b[i]=a[i]}return b}function dpToPx(b){var a=android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP,b,mActivity.getResources().getDisplayMetrics());return a}function pInt(a){return new java.lang.Integer(a)}var mLang;function loadLang(){mLang={};var a=com.wmods.utils.LangUtils.getLang();if(a.equals("pt")){mLang={LANG:"pt",JSMOD:["Gerador Play Store","Gerador Google Drive","Gerador Mega","Gerador 4shared","Gerador Userscloud","Gerador dailyuploads","Gerador Upfile"],GN:"Geradores",VS:"Ver Codigo Fonte",GL:"Gerando link...",GS:"Gerado com sucesso!",GE:"Erro ao gerar Link",JSUP:"JSMOD Atualizado!",LIST_R:"Removido!",NO_SCRIPT:"Sem Scripts",ADD:"Adicionar",F_EMPTY:"O campo está vazio",NAME_E:"O nome já existe!",NAME:"Nome",CODE:"Codigo",ADDED:"Adicionado script",SCRIPT_E:"Script já Existe"}}else{mLang={LANG:"en",JSMOD:["Generator Play Store","Generator Google Drive","Generator Mega","Generator 4Shared","Generator Userscloud","Generator dailyuploads","Generator Upfile"],GN:"Generators",VS:"View Source",GL:"Generating Link...",GS:"successfully generated",GE:"Error generating Link",JSUP:"JSMOD Updated!",LIST_R:"Removed!",NO_SCRIPT:"No Scripts",ADD:"Add",F_EMPTY:"Field is Empty",NAME_E:"The name already exists!",NAME:"Name",CODE:"Code",ADDED:"Added script",SCRIPT_E:"Script already exists"}}}function getLangString(a){if(!mLang){loadLang()}var b=mLang[a];return(b?b:"Lang: "+a)}var mActivity=getMainContext(0);var FDIR=mActivity.getFilesDir();var DEBUG=new java.io.File("/sdcard/DEBUG").exists();if(DEBUG){eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Lang.js")));eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Views.js")));eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/JSUtils.js")))}var menu_di;var GUIPainel;var mOptions;var tempG=[];var JSNAMES=new java.util.ArrayList();var JSCODES=new java.util.ArrayList();var mPos;var layoutOptions;var scroll;var GUIOptions;var Class=Packages.java.lang.Class;var URLControl=Packages.com.wmods.modding.URLControl;var Utils=Packages.com.wmods.modding.Utils;var LangUtils=Packages.com.wmods.utils.LangUtils;var LayoutParams=Packages.android.widget.LinearLayout.LayoutParams;var TextUtils=Packages.android.text.TextUtils;var LinearLayout=Packages.android.widget.LinearLayout;var Spinner=Packages.android.widget.Spinner;var ArrayAdapter=Packages.android.widget.ArrayAdapter;var ListView=Packages.android.widget.ListView;var TextView=Packages.android.widget.TextView;var CheckBox=Packages.android.widget.CheckBox;var EditText=Packages.android.widget.EditText;var Action=Packages.com.wmods.activities.Action;function hook_url(b){if(mOptions==null){loadOptions()}if(!b){return true}b=b.replace("press_link:","");var a=new URLControl(b);var d;if((d=a.getHost())==null){return false}if(DEBUG&&d.contains("sht.io")){var c=b.match(/sht\.io\/(.+?)\/(.+)/);if(!c||!isURL(c[2])){return false}print("Skip sht.io");openURL(c[2]);return true}if(d.contains("drive.google.com")&&mOptions[0][1]){return directGoogle(b)}if(((d.contains("mega.co.nz")||d.contains("mega.nz"))&&mOptions[0][2])||(d.contains("userscloud.com")&&mOptions[0][4])){generatorAuto(b);return true}if((d.equals("dailyuploads.net")||d.equals("www.dailyuploads.net"))&&mOptions[0][5]){generatorLink(b);return true}if(d.contains("upfile.mobi")&&mOptions[0][6]){generatorAuto(b);return true}if(d.contains("play.google.com")&&mOptions[0][0]){generatorPlay(b);return true}if(d.contains("4shared.com")&&mOptions[0][3]){generator4shared(b.replace("www.4shared.com","www.goowap.com"))}if(DEBUG&&d.contains("upload.mobi")&&a.getPath()?!a.getPath().contains("download"):false){generatorUpload(b);return true}var e=a.getPath();if(e&&e.contains("//:ptth")){var g=e.lastIndexOf("=");if(g!=-1){var f=new java.lang.StringBuffer();f.append(e.substring(g+1));print("Reverse URL Found!!");openURL(f.reverse().toString());return true}}return false}function hook_updated(){loadLang();loadOptions();showUpdate()}function hook_select_file(a){}function hook_proxy(a){return false}function hook_page(a){if(!mOptions){loadOptions()}addNewButton()}function hook_options_button(c,d){if(d==61441){openURL('ext:es:javascript:location.href="View-Source:".concat(location.href)')}else{if(d==61442){showJSInjector()}else{if(d==61443){var b=new android.content.Intent("android.intent.action.VIEW");var a=c.Y().ag();if(a==null){a=c.S}b.setData(android.net.Uri.parse(a));mActivity.startActivity(android.content.Intent.createChooser(b,"URL"))}}}}function hook_select_button(a){}function hook_select_button_listener(a,b){}function hook_menu_new(a,b){b.add(new_menu(65284,65283,65028));if(DEBUG){b.add(new_menu(64001,64001,64001))}}function hook_menu_name(b,a){switch(b){case 65283:a.add("JS MOD");break;case 64001:a.add("TESTE");break}}function hook_menu_draw(b,a){switch(b){case 65028:case 64001:if(DEBUG){a.add(getDraw("/sdcard/javascriptmod/jsmod.png"));break}a.add(getDraw(FDIR.getAbsolutePath()+"/script/jsmod.png"));break}}function hook_menu_check(a){switch(a){case 65284:showJSMOD();break;case 64001:hook_updated()}}function hook_mod_service(a,b){}function newGUIOptions(){GUIOptions=[{name:getLangString("GN"),options:getGenerators(),debug:false},{name:"Javascript",options:getJavascript(),debug:true},{name:"Other",options:getOther(),debug:false}]}function showJSMOD(){loadOptions();newGUIOptions();mActivity.runOnUiThread(function(){var b=getClasse("agd");GUIPainel=b.getConstructor(android.content.Context).newInstance(mActivity);GUIPainel.setTitle("JSMOD");var e=new LinearLayout(mActivity);e.setBackgroundColor(16777215);e.setOrientation(1);var f=[];for(var d=0;d<GUIOptions.length;d++){if(DEBUG||!GUIOptions[d].debug){f.push(GUIOptions[d].name)}}var g=new Spinner(mActivity);var c=new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.WRAP_CONTENT);c.setMargins(0,0,0,dpToPx(3));g.setLayoutParams(c);var a=new ArrayAdapter(mActivity,17367050,JsArrayToJavaArray(java.lang.String,f));g.setAdapter(a);g.setBackgroundColor(android.graphics.Color.rgb(0,0,63));scroll=new android.widget.ScrollView(mActivity);scroll.setScrollbarFadingEnabled(false);layoutOptions=new LinearLayout(mActivity);layoutOptions.setBackgroundColor(android.graphics.Color.rgb(0,0,0));layoutOptions.setOrientation(1);g.setOnItemSelectedListener({onItemSelected:function(k,j,h,l){setViews(layoutOptions,h);mPos=h},onNothingSelected:function(h){}});e.addView(g);scroll.addView(layoutOptions);e.addView(scroll);GUIPainel.a(e);GUIPainel.setOnDismissListener(function(h){layoutOptions.removeAllViews();loadOptions()});GUIPainel.b(LangUtils.getString("SAVE"),function(h){h.dismiss();saveOptions()});GUIPainel.a(LangUtils.getString("CANCEL"),function(h){h.dismiss();loadOptions()});GUIPainel.show()})}function showEditor(a){mActivity.runOnUiThread(function(){var d=new android.app.AlertDialog.Builder(mActivity);d.setTitle("JavaScript "+getLangString("CODE"));var c=new LinearLayout(mActivity);c.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT));c.setOrientation(1);c.setBackgroundColor(android.graphics.Color.BLACK);var b=new TextView(mActivity);b.setText(getLangString("NAME")+": "+JSNAMES.get(a));var e=new EditText(mActivity);e.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,dpToPx(200)));e.setGravity(android.view.Gravity.TOP);e.setText(JSCODES.get(a));c.addView(b);c.addView(e);d.setView(c);d.setPositiveButton(LangUtils.getString("SAVE"),function(f,h){var g=e.getText().toString();if(g.trim().length()==0){print(getLangString("F_EMPTY"));return}JSCODES.set(a,g);f.dismiss()});d.setNeutralButton(LangUtils.getString("CANCEL"),null);d.show()})}function showJSInjector(){mActivity.runOnUiThread(function(){var a=getClasse("agd");GUIPainel=a.getConstructor(android.content.Context).newInstance(mActivity);GUIPainel.setTitle("JavaScript "+getLangString("CODE"));if(mOptions[1][0].size()==0){print(getLangString("NO_SCRIPT"));return}var b=mOptions[1][0].toArray(new java.lang.reflect.Array.newInstance(java.lang.String,0));GUIPainel.a(b,function(e,c){GUIPainel.dismiss();openURL("ext:es:javascript:"+mOptions[1][1].get(c))});GUIPainel.show()})}function setViews(d,a){d.removeAllViews();if(a==0){scroll.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,dpToPx(150)))}else{scroll.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.WRAP_CONTENT))}var c=GUIOptions[a].options;for(var b=0;b<c.length;b++){d.addView(c[b])}}function loadOptions(){var c=mActivity.getSharedPreferences("JSMOD",1);mOptions=[];var b=[];var a=getLangString("JSMOD").length;for(var e=0;e<a;e++){b.push(c.getBoolean("generator_"+e,false))}mOptions[0]=tempG=JsArrayToJavaArray(java.lang.Boolean.TYPE,b);JSNAMES.clear();JSCODES.clear();if(DEBUG){var d=new org.json.JSONArray(c.getString("JSNAMES","[]"));var f=new org.json.JSONArray(c.getString("JSCODES","[]"));for(var e=0;e<d.length();e++){JSNAMES.add(d.getString(e));JSCODES.add(f.getString(e))}}else{JSNAMES.add("Proxy TurboHide");JSCODES.add(baseToString("ZG9jdW1lbnQud3JpdGUoJzxzY3JpcHQgc3JjPSJodHRwOi8vcGFzdGViaW4uY29tL3Jhdy9TdVNVMHhMdCIgPjwvc2NyaXB0PicpOw=="));JSNAMES.add("Skip CloudFlare DDoS");JSCODES.add(baseToString("KGZ1bmN0aW9uKCl7dmFyIHg9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoInNjcmlwdCIpWzBdLmlubmVySFRNTDt2YXIgcG9zPXguaW5kZXhPZigic2V0VGltZW91dChmdW5jdGlvbigpIikrMTE7dmFyIHBvczI9eC5pbmRleE9mKCIsIDQwMDAiKTtldmFsKCIoIit4LnN1YnN0cmluZyhwb3MscG9zMikrIikoKSIpO30pKCk7"))}mOptions[1]=[JSNAMES,JSCODES]}function saveOptions(){var e=mActivity.getSharedPreferences("JSMOD",0).edit();mOptions[0]=tempG;mOptions[1]=[JSNAMES,JSCODES];var a=getLangString("JSMOD").length;for(var c=0;c<a;c++){e.putBoolean("generator_"+c,mOptions[0][c])}e.commit();if(DEBUG){var b=new org.json.JSONArray();var d=new org.json.JSONArray();for(var c=0;c<mOptions[1][0].size();c++){b.put(mOptions[1][0].get(c));d.put(mOptions[1][1].get(c))}e.putString("JSNAMES",b.toString());e.putString("JSCODES",d.toString());e.commit()}}function showUpdate(){mActivity.runOnUiThread(function(){var a=getClasse("agd");var d=a.getConstructor(android.content.Context).newInstance(mActivity);d.setTitle(getLangString("JSUP"));var c=Utils.readFile(FDIR.getAbsolutePath()+"/script/UCMOD.txt");if(c==null){return}var b=c.split("\\|");if(b.length==2&&getLangString("LANG").equals("pt")){c=b[1]}else{c=b[0]}d.a(c);d.b("OK",null);d.show()})}function addNewButton(){var c,b,d;var a=getClasse("adi");c=a.getField("g");b=c.get(null);if(!checkYlId(b,61441)){d=JavaArrayToJsArray(b);d.push(new_option_button(61441,getLangString("VS")));d.push(new_option_button(61442,"Javascript Injector"));b=JsArrayToJavaArray(getClasse("adj"),d);c.set(null,b)}c=a.getField("f");b=c.get(null);if(!checkYlId(b,61443)){d=JavaArrayToJsArray(b);d.push(new_option_button(61443,"Abrir Como"));b=JsArrayToJavaArray(getClasse("adj"),d);c.set(null,b)}c=a.getField("e");b=c.get(null);if(!checkYlId(b,61443)){d=JavaArrayToJsArray(b);d.push(new_option_button(61443,"Abrir Como"));b=JsArrayToJavaArray(getClasse("adj"),d);c.set(null,b)}}function checkYlId(c,b){for(var a=0;a<c.length;a++){if(c[a].b==b){return true}}return false}function directGoogle(b){var c=b.match(/\/d\/(.+)\//);if(c==null||c.length<2){return false}else{print(getLangString("GS"));var a="http://drive.google.com/uc?export=download&id="+c[1];openURLDirect(a);return true}}function generatorAuto(a){print(getLangString("GL"));new java.lang.Thread({run:function(){var c=getStringURL("http://www.autogeneratelink.com/link.php?link="+java.net.URLEncoder.encode(a)+"&token=agl");var b;try{b=c.match("href='([^\\']+)'")}catch(d){print(d)}if(b&&isURL(b[1])){print(getLangString("GS"));openURL(b[1])}else{print(getLangString("GE"));openURLDirect(a)}}}).start()}function generatorLink(a){print(getLangString("GL"));new java.lang.Thread({run:function(){var c=getStringURL("http://www.linkgenerate.com/link.php?link="+java.net.URLEncoder.encode(a)+"&token=agl");var b;try{b=c.match("href='([^\\']+)'")}catch(d){print(d)}if(b&&isURL(b[1])){print(getLangString("GS"));openURL(b[1])}else{print(getLangString("GE"));openURLDirect(a)}}}).start()}function generatorPlay(b){print(getLangString("GL"));var a=b.match("id=([a-zA-z0-9.]{3,})");if(a!=null&&a[1]!=null){print(getLangString("GS"));openURL("http://apk-downloaders.com/download/dl.php?dl="+a[1])}}function generator4shared(a){print(getLangString("GL"));new java.lang.Thread({run:function(){var c=getStringURL(a);try{var b=c.match('data: "(root=(.*?)")');var c=Utils.getStringURL("http://www.goowap.com/root.html",new java.lang.String(b[1]).getBytes());print(c)}catch(d){print(d)}print(b[1])}}).start()}function generatorUpload(a){print(getLangString("GL"));new java.lang.Thread({run:function(){var c=getStringURL(a);var b=c?c.match('<a href="([^"]+)" class="download_link"'):null;if(b){print(getLangString("GS"));openURLDirect("http://upload.mobi/"+b[1])}else{print(getLangString("GE"));openURLDirect(a)}}}).start()}var textwatcher=new android.text.TextWatcher({afterTextChanged:function(b){for(var a=b.length();a>0;a--){if(b.subSequence(a-1,a).toString().equals("\n")){b.replace(a-1,a,"")}}}});function getGenerators(){var e=getLangString("JSMOD");var a=[];var f=new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);var d=dpToPx(10);f.setMargins(0,d,0,d);for(var b=0;b<e.length;b++){var c=new CheckBox(mActivity);c.setTag(b);c.setText(e[b]);c.setLayoutParams(f);c.setSelected(true);c.setSingleLine(true);c.setOnCheckedChangeListener(function(g,h){var j=Math.floor(g.getTag());tempG[j]=h});if(mOptions[0]!=null&&b<mOptions[0].length){c.setChecked(mOptions[0][b])}a[b]=c}return a}function getOther(){var a=[];a[0]=new TextView(mActivity);a[0].setText("UC Super MOD: New Functions\nComing soon...");a[0].setTextSize(18);a[1]=new com.uc.browser.UCButton(mActivity);a[1].setText("FACEBOOK");a[1].setOnClickListener(function(b){GUIPainel.dismiss();openURL("ext:wo:http://m.facebook.com/UCSuperMOD")});return a}function getJavascript(){var a=[];var d=new ListView(mActivity);d.setScrollbarFadingEnabled(false);var c=new LayoutParams(LayoutParams.MATCH_PARENT,dpToPx(200));c.setMargins(0,dpToPx(10),0,0);d.setLayoutParams(c);d.setOnItemLongClickListener(function(g,f,e,h){JSNAMES.remove(e);JSCODES.remove(e);g.getAdapter().notifyDataSetChanged();print(getLangString("LIST_R"));return true});d.setAdapter(ArrayAdapter(mActivity,17367050,JSNAMES));if(DEBUG){d.setOnItemClickListener(function(g,f,e,h){showEditor(e)})}if(DEBUG){var b=new com.uc.browser.UCButton(mActivity);b.setOnClickListener(function(e){newJavascript()});b.setText(getLangString("ADD"));return[d,b]}return[d]}function newJavascript(){layoutOptions.removeAllViews();var h=new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);var e=dpToPx(10);h.setMargins(0,e,0,0);var d=new TextView(mActivity);d.setText(getLangString("NAME"));var g=new com.uc.browser.UCEditText(mActivity);g.addTextChangedListener(textwatcher);var c=new TextView(mActivity);c.setText(getLangString("CODE"));var f=new com.uc.browser.UCEditText(mActivity);f.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,dpToPx(150)));f.setGravity(android.view.Gravity.TOP);var a=new com.uc.browser.UCButton(mActivity);a.setLayoutParams(h);a.setOnClickListener(function(j){var l=g.getText().toString();var k=f.getText().toString();if(l.trim().length()==0||k.trim().length()==0){print(getLangString("F_EMPTY"));return}JSNAMES.add(l);JSCODES.add(k);print(l);GUIOptions[mPos].options=getJavascript();setViews(layoutOptions,mPos)});a.setText(getLangString("ADD"));var b=new com.uc.browser.UCButton(mActivity);b.setText(LangUtils.getString("CANCEL"));b.setLayoutParams(h);b.setOnClickListener(function(j){setViews(layoutOptions,mPos)});layoutOptions.addView(d);layoutOptions.addView(g);layoutOptions.addView(c);layoutOptions.addView(f);layoutOptions.addView(a);layoutOptions.addView(b)};