function baseToString(s) {
try
{
var Base64 = android.util.Base64;
return new java.lang.String(Base64.decode(s, Base64.DEFAULT));
}catch(e){
return null;
}
}

function stringToBase(s) {
try
{
var Base64 = android.util.Base64;
return new Base64.encodeToString(s.getBytes(), Base64.DEFAULT);
}catch(e){
return null;
}
}

function getDraw(name) {
try
{
return android.graphics.drawable.Drawable.createFromStream(new java.io.FileInputStream(name), name);
}catch(e){
return android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK);
}
}

function new_di(a, b, c) {
return com.uc.browser.di(new java.lang.Integer(a), new java.lang.Integer(b), new java.lang.Integer(c));
}

function new_acn(val, str) {
var acn_cons = getClasse("acn").getConstructor(java.lang.Integer.TYPE, java.lang.String);
return acn_cons.newInstance(new java.lang.Integer(val), str);
}

function new_ym(id, name) {
return getClasse("ym").getConstructor(java.lang.Integer.TYPE, java.lang.String).newInstance(new java.lang.Integer(id), name);
}

function getClasse(name) {
return Class.forName(name, false, mActivity.getClass().getClassLoader());
}

function isURL(url) {
var p = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
return p.test(url);
}

function JsArrayToJavaArray(type, arr) {
var jArr = java.lang.reflect.Array.newInstance(type, arr.length);
for (var i = 0; i < arr.length; i++)
	jArr[i] = arr[i];
return jArr;
}

// Convert a Java array to a JavaScript array
function JavaArrayToJsArray(javaArray) {
var jsArray = [];

for (i = 0; i < javaArray.length; ++i)
	jsArray[i] = javaArray[i];

return jsArray;
}
var mLang;

function loadLang(){
	mLang = {};
	var l =com.wmods.inimod.Lang.getLang();
	if(l.equals("pt"))
	mLang = {
	LANG:"pt",
	JSMOD:["Gerador Play Store","Gerador Google Drive","Gerador Mega","Gerador 4shared","Gerador Userscloud","Gerador dailyuploads"],
	GN:"Geradores",
	VS:"Ver Codigo Fonte",
	GL:"Gerando link...",
	GS:"Gerado com sucesso!",
	GE:"Erro ao gerar Link",
	JSUP:"JSMOD Atualizado!",
	LIST_R:"Removido!",
	NO_SCRIPT:"Sem Scripts",
	ADD:"Adicionar",
	F_EMPTY:"O campo está vazio",
	NAME_E:"O nome já existe!",
	NAME:"Nome",
	CODE:"Codigo",
	ADDED:"Adicionado script",
	SCRIPT_E:"Script já Existe"
	};
	else
	mLang = {
	LANG:"en",
	JSMOD:["Generator Play Store","Generator Google Drive","Generator Mega","Generator 4Shared","Generator Userscloud","Generator dailyuploads"],
	GN:"Generators",
	VS:"View Source",
	GL:"Generating Link...",
	GS:"successfully generated",
	GE:"Error generating Link",
	JSUP:"JSMOD Updated!",
	LIST_R:"Removed!",
	NO_SCRIPT:"No Scripts",
	ADD:"Add",
	F_EMPTY:"Field is Empty",
	NAME_E:"The name already exists!",
	NAME:"Name",
	CODE:"Code",
	ADDED:"Added script",
	SCRIPT_E:"Script already exists"
	};
}

function getLangString(key){
	if(!mLang)
		loadLang();
	var s = mLang[key];
	return (s ? s : "Lang: "+key);
}

/*
 * obj.Z() // UcWebView
 * Z().q() // Url of page
 */
var mActivity = getMainContext();
var FDIR = mActivity.getFilesDir();
eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Lang.js")));eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Views.js")));eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/JSUtils.js")));
var update;
var version = "0.0.8";
var menu_di;
var iniProp;
var GUIPainel;
var mOptions;
var tempG = [];
var tempJS = new java.util.ArrayList();
var tempJSN = new java.util.ArrayList();
var mPos;
var layoutOptions;
var scroll;
var GUIOptions;

// Packages Imports
var Class = Packages.java.lang.Class;
var URLControl = Packages.com.wmods.modding.URLControl;
var Utils = Packages.com.wmods.modding.Utils;
var Lang = Packages.com.wmods.inimod.Lang;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var TextUtils = Packages.android.text.TextUtils;

// url clicked
// Parameter @{String=url} = "Url Clicked"
function hook_url(url)
{
if (mOptions == null)
	loadOptions();

if (!url)return true;
url = url.replace("press_link:", "");
var mUrl = new URLControl(url);

var host;
if ((host = mUrl.getHost()) == null)
	return false;

if (host.contains("sht.io"))
{
var s = url.match(/sht\.io\/(.+?)\/(.+)/);
if (!s || !isURL(s[2]))
	return false;
print("Skip Sht.io");
openURL(s[2]);
return true;
}

if (host.contains("drive.google.com") && mOptions[0][1])
{
return directGoogle(url);
}
if ((host.contains("play.google.com") && mOptions[0][0])
    || ((host.contains("mega.co.nz") || host.contains("mega.nz")) && mOptions[0][2])
	|| (host.contains("4shared.com") && mOptions[0][3])
	|| (host.contains("userscloud.com") && mOptions[0][4])
	|| ((host.equals("dailyuploads.net") || host.equals("www.dailyuploads.net")) && mOptions[0][5]))
{
generator(url);
return true;
}

if (host.contains("upload.mobi") && mUrl.getPath() ? !mUrl.getPath().contains("download") : false)
{
generatorUpload(url);
return true;
}

if (host.contains("ucmod.script"))
{
addNewJS(url);
return true;
}

var path = mUrl.getPath();
if (path && path.contains("//:ptth"))
{
var pos = path.lastIndexOf('=');
if (pos != -1)
{
var sb = new java.lang.StringBuffer();
sb.append(path.substring(pos + 1));
print("Reverse URL Found!!");
openURL(sb.reverse().toString());
return true;
}
}

return false;
}

// New update
function hook_updated()
{
loadLang();
loadOptions();
var m = com.uc.browser.o.f();
var f = m.getClass().getDeclaredField("y");
f.setAccessible(true);
f.set(m, new com.uc.browser.cw(mActivity));
showUpdate();
}

// Select File Browser
// Parameter @{String=name} = "name of file"
function hook_select_file(filename)
{

}

// Show Page
// Parameter @{Object=o} = "Class com.uc.browser.o"
function hook_page(o)
{
if (!mOptions)loadOptions();
addNewButton();
}

// Options on Long Click(Listener)
// Parameter @{Object=o} = "Class com.uc.browser.o"
// Parameter @{int=id} = "id of Option"
function hook_options_button(o, id)
{
if (id == 0xf001)
	openURL("ext:es:javascript:location.href=\"View-Source:\".concat(location.href)");
else if (id == 0xf002)
	showJSInjector();
}

// Buttons on select text
// Parameter @{Object=adj} = "Class com.uc.browser.adj"
function hook_select_button(adj)
{
//var array = o.getClass().getField("D").get(o);
//print(array[0]);
}


// Buttons on select text(Listener)
// Parameter @{Object=o} = "Class com.uc.browser.o"
// Parameter @{int=id} = "id Of Button"
function hook_select_button_listener(o, id)
{
//var VwClass = getCl("vw");
//var text = VwClass.getMethod("b").invoke(null).f();
}


// Menu Options
// Parameter @{Object=cw} = "Class com.uc.browser.cw"
// Parameter @{ArrayList=al} = "Add Class com.uc.browser.di<init>(III)V {id,name_id,drawable_id}"
function hook_menu_new(cw, al)
{
menu_di = new_di(0xff04, 0xff03, 0xfe04);
menu_di.d(isUpdated());
al.add(menu_di);
}


// Menu Options(Name)
// Parameter @{int=id_name} = "name_id"
// Parameter @{ArrayList=al} = "add String for Id"
function hook_menu_name(id, al)
{
switch (id)
{
case 0xff03:
	al.add("JS MOD");
	break;
}
}

// Menu Options(Drawable)
// Parameter @{int=id} = "drawable_id"
// Parameter @{ArrayList=al} = "add Drawable for Id"
function hook_menu_draw(id, al)
{
switch (id)
{
case 0xfe04:
	//al.add(getDraw("/sdcard/javascript/jsmod.png"));
	al.add(getDraw(FDIR.getAbsolutePath()+"/script/jsmod.png"));
	break;
}
}

// Menu Options(Id)
// Parameter @{int=id} = "id"
function hook_menu_check(id)
{
switch (id)
{
case 0xff04:
	showJSMOD();
	if (isUpdated())
		setMenuUpdated(false);
	break;
}
}

// ModService
// Parameter @{ModService=thiz} = "instance of ModService"
// Parameter @{Intent=intent} = "Intent"
function hook_mod_service(thiz, intent)
{
}


/* Functions */

function newGUIOptions()
{
GUIOptions = [
    {
		name:getLangString("GN"),
		options:getGenerators()
	},
	{
		name:"Javascript",
		options:getJavascript()
	},
	{
		name:"Other",
		options:getOther()
	}
];
}

function showJSMOD()
{
loadOptions();
//if(!GUIOptions)
newGUIOptions();
mActivity.runOnUiThread(
	function()
	{
	var clazz = getClasse("abg");
	GUIPainel = clazz.getConstructor(android.content.Context).newInstance(mActivity);
	GUIPainel.setTitle("JSMOD");
	var layout = new android.widget.LinearLayout(mActivity);
	layout.setBackgroundColor(0xffffff);
	layout.setOrientation(1);

	var names = [];
	for (var i=0;i < GUIOptions.length;i++)
		names[i] = GUIOptions[i].name;

	var spinner = new android.widget.Spinner(mActivity);
	var lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
	lp.setMargins(0, 0, 0, Utils.dp2px(mActivity, 3));
	spinner.setLayoutParams(lp);
	var adapter = new android.widget.ArrayAdapter(mActivity, 17367050, JsArrayToJavaArray(java.lang.String, names));
	spinner.setAdapter(adapter);
	spinner.setBackgroundColor(android.graphics.Color.rgb(0, 00, 0x3f));
	scroll = new android.widget.ScrollView(mActivity);
	scroll.setScrollbarFadingEnabled(false);
	layoutOptions = new android.widget.LinearLayout(mActivity);
	layoutOptions.setBackgroundColor(android.graphics.Color.rgb(0, 0, 0));
	layoutOptions.setOrientation(1);
	spinner.setOnItemSelectedListener(
		{
			onItemSelected:function(adapter, view, position, id)
			{
			setViews(layoutOptions, position);
			mPos = position;
			},
			onNothingSelected:function(adapter)
			{

			}
		});
	layout.addView(spinner);
	scroll.addView(layoutOptions);
	layout.addView(scroll);
	GUIPainel.a(layout);
	GUIPainel.setOnDismissListener(
		function(dialog)
		{
		layoutOptions.removeAllViews();
		loadOptions();
		});

	GUIPainel.b(Lang.getString("SAVE"), function(dialog)
				{
				dialog.dismiss();
				saveOptions();
				});
	GUIPainel.a(Lang.getString("CANCEL"), function(dialog){
		dialog.dismiss();
		loadOptions();
	});
	GUIPainel.show();
	}
);
}

function showEditor(position)
{
mActivity.runOnUiThread(
	function()
	{
	var Painel = new android.app.AlertDialog.Builder(mActivity);
	Painel.setTitle("JavaScript " + getLangString("CODE"));
	var layout = new android.widget.LinearLayout(mActivity);
	layout.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
	layout.setOrientation(1);
	layout.setBackgroundColor(android.graphics.Color.BLACK);
	var t = new android.widget.TextView(mActivity);
	t.setText(getLangString("NAME") + ": " + tempJSN.get(position));
	var et = new android.widget.EditText(mActivity);
	et.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, Utils.dp2px(mActivity, 200)));
	et.setGravity(android.view.Gravity.TOP);
	et.setText(tempJS.get(position));
	//et.addTextChangedListener(textwatcher);
	layout.addView(t);
	layout.addView(et);
	Painel.setView(layout);
	Painel.setPositiveButton(
		Lang.getString("SAVE"), 
		function(dialog, pos)
		{
		var text = et.getText().toString();
		if (text.trim().length() == 0)
		{
		print(getLangString("F_EMPTY"));
		return;
		}
		tempJS.set(position, text);
		dialog.dismiss();
		});
	Painel.setNeutralButton(Lang.getString("CANCEL"), null);
	Painel.show();
	});
}

function showJSInjector()
{
mActivity.runOnUiThread(
	function()
	{
	var clazz = getClasse("abg");
	GUIPainel = clazz.getConstructor(android.content.Context).newInstance(mActivity);
	GUIPainel.setTitle("JavaScript " + getLangString("CODE"));
	if (mOptions[1][0].size() == 0)
	{
	print(getLangString("NO_SCRIPT"));
	return;
	}
	var list = mOptions[1][0].toArray(new java.lang.reflect.Array.newInstance(java.lang.String, 0));
	GUIPainel.a(list,
				function(d, position)
				{
				GUIPainel.dismiss();
				openURL("ext:es:javascript:" + mOptions[1][1].get(position));
				});
	GUIPainel.show();
	});
}


function setViews(layout, position)
{
layout.removeAllViews();
if (position == 0)
	scroll.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, Utils.dp2px(mActivity, 150)));
else scroll.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT));	
var ops = GUIOptions[position].options;
for (var i=0;i < ops.length;i++)
{
switch (position)
{
case 0: 
	if (mOptions[0])
		ops[i].setChecked(mOptions[0][i]);
	break;
case 1:
	if (i == 0)
	{
	var adapter = new android.widget.ArrayAdapter(mActivity, 17367050, tempJSN);
	ops[0].setAdapter(adapter);
	}
	break;
}
layout.addView(ops[i]);
}
}

function loadIni()
{
var file = new java.io.File(FDIR, "JSMOD.ini");
iniProp = new java.util.Properties();
if (file.exists())
    iniProp.load(new java.io.FileInputStream(file));
}

function saveIni()
{
var file = new java.io.File(FDIR, "JSMOD.ini");
iniProp.store(new java.io.FileOutputStream(file), "WellingtonMods");
}

function loadOptions()
{
var str;
if (!iniProp)
	loadIni();
mOptions = [];
str = iniProp.getProperty("JSMOD", null);
if (str)
{
var tmp = new java.lang.reflect.Array.newInstance(java.lang.Boolean.TYPE, getLangString("JSMOD").length);
var split = str.split("\\|");
var len = split.length > tmp.length ? tmp.length : split.length;
for (i = 0;i < len;i++)
	tmp[i] = split[i].equals("true");
mOptions[0] = tmp;
}
str = iniProp.getProperty("JSScriptN", null);
str2 = iniProp.getProperty("JSScriptV", null);
tempJSN = new java.util.ArrayList();
tempJS = new java.util.ArrayList();
if (str && str.length() > 0 && str2)
{
var split = str2.split("\\|\\|");
var split2 = str.split("\\|");
for (i = 0;i < split.length;i++)
{
var code = baseToString(split[i]);
if(!code)tempJS.add(split[i]);
else tempJS.add(code);
var name = baseToString(split2[i]);
if(!name)tempJSN.add(split2[i]);
else tempJSN.add(name);
}
mOptions[1] = [tempJSN,tempJS];
}
}

function saveOptions()
{
 var tmp,i;
mOptions[0] = tempG;
mOptions[1] = [tempJSN,tempJS];
var s = TextUtils.join("|", tempG);
tmp = tempJSN.toArray();
for(i=0;i<tmp.length;i++)
tmp[i] = stringToBase(tmp[i]);
var s1 = TextUtils.join("|", tmp);
tmp = tempJS.toArray();
for(i=0;i<tmp.length;i++)
tmp[i] = stringToBase(tmp[i]);
var s2 = TextUtils.join("||", tmp);
if (iniProp == null)loadIni();
iniProp.setProperty("JSMOD", s);
iniProp.setProperty("JSScriptN", s1);
iniProp.setProperty("JSScriptV", s2);
saveIni();
}


function setMenuUpdated(bool)
{
if (menu_di != null)
{
var m = com.uc.browser.o.f();
var f = m.getClass().getDeclaredField("y");
f.setAccessible(true);
var mCw = f.get(m);
var f = mCw.getClass().getDeclaredField("A");
f.setAccessible(true);
var menu = f.get(mCw).get(java.lang.Integer.valueOf(0xff04));
menu_di.d(bool);
menu.a(menu_di);
}
if (!bool)
	setUpdate();
}

function isUpdated()
{
if (update == null)
{
if (iniProp == null)
	loadIni();
update = iniProp.getProperty("UPDATED", null);
}
return !version.equals(update);
}

function setUpdate()
{
if (iniProp == null)
	loadIni();
iniProp.setProperty("UPDATED", version);
saveIni();
}

function showUpdate()
{
mActivity.runOnUiThread(
	function()
	{
	var clazz = getClasse("abg");
	var painel = clazz.getConstructor(android.content.Context).newInstance(mActivity);
	painel.setTitle(getLangString("JSUP"));
	var content = Utils.readFile(FDIR.getAbsolutePath() + "/script/UCMOD.txt");
	//var content = pmod.Utils.readFile("/sdcard/1/UCMOD.txt");
	//print(content);
	if (content == null)
		return;
	var s = content.split("\\|");
	if (s.length == 2 && getLangString("LANG").equals("pt"))
		content = s[1];else content = s[0];
	painel.a(content);
	painel.b("OK", null);
	painel.show();
	}
);
}

function addNewButton()
{
var clazz = getClasse("yl");
var f = clazz.getField("g");
var bjava = f.get(null);
if (bjava.length == 9)return;
var bjs= JavaArrayToJsArray(bjava);
bjs[7] = new_ym(0xf001, getLangString("VS"));
bjs[8] = new_ym(0xf002, "Javascript Injector");
bjava = JsArrayToJavaArray(getClasse("ym"), bjs);
f.set(null, bjava);
}

/*

 function show(url) {
 mActivity.runOnUiThread(
 function() {
 mActivity.getWindow().setFeatureInt(android.view.Window.FEATURE_PROGRESS, android.view.Window.PROGRESS_VISIBILITY_ON);
 var d = new android.app.AlertDialog.Builder(mActivity);
 d.setTitle("Web View");
 var web = new android.webkit.WebView(mActivity);
 var w = JavaAdapter(
 android.webkit.WebViewClient, 
 {
 shouldOverrideUrlLoading:function(view, url) {
 view.loadUrl(url);
 print(url);
 return true;
 },
 onCheckIsTextEditor:function() {
 return true;
 }
 });
 //web.requestFocus(android.view.View.FOCUS_DOWN);
 web.setWebViewClient(w);
 web.setOnTouchListener(
 function(view,event){
 switch (event.getAction())
 {
 case android.view.MotionEvent.ACTION_UP:
 case android.view.MotionEvent.ACTION_DOWN:
 view.requestFocus();
 print("Focus!!");
 break;
 }
 return false;
 });

 web.requestFocusFromTouch();
 web.setDownloadListener(
 function(url, useragent, a, b) {
 m.dismiss();
 openURL(url);
 });
 web.getSettings().setJavaScriptEnabled(true);
 print(url, new java.lang.Integer(20));
 web.loadUrl(url);
 d.setView(web);
 var m = d.show();
 });

 }
 */

function addNewJS(s)
{
var pos = s.indexOf("ucmod.script");
var split = s.substring(pos).split("/");
var name = baseToString(split[1]);
var code = baseToString(split[2]);
if (!name || !code)return;
loadOptions();
if (tempJSN.contains(name))
{
print("Script já existe!!");
return;
}
tempJSN.add(name);
tempJS.add(code);
saveOptions();
print("Script adicionado: " + name);
}



function directGoogle(url)
{
var parts = url.match(/\/d\/(.+)\//);
if (parts == null || parts.length < 2)
{
return false;
}
else
{
print(getLangString("GS"));
var u = "https://drive.google.com/uc?export=download&id=" + parts[1];
openURLDirect(u);
return true;
}
}


function generator(url)
{
print(getLangString("GL"));
new java.lang.Thread(
	{
		run:function()
		{
		var content = getStringURL("http://www.autogeneratelink.com/link.php?link=" + java.net.URLEncoder.encode(url) + "&token=agl");
		var m;
		try
		{
		m = content.match("href='([^\\']+)'");
		}catch(e){
		print(e);
		}
		if (m && isURL(m[1]))
		{
		print(getLangString("GS"));
		openURL(m[1]);
		}
		else
		{
		print(getLangString("GE"));
		openURLDirect(url);
		}
		}
	}).start();
}

function generatorUpload(url)
{
print(getLangString("GL"));
new java.lang.Thread(
	{
		run:function()
		{
		var content = getStringURL(url);
		var m = content ? content.match("<a href=\"([^\"]+)\" class=\"download_link\"") : null;
		if (m)
		{
		print(getLangString("GS"));
		openURLDirect("http://upload.mobi/" + m[1]);
		}
		else
		{
		print(getLangString("GE"));
		openURLDirect(url);
		}
		}
	}).start();
}



var textwatcher= new android.text.TextWatcher({
	afterTextChanged:function(s){
		for(var i = s.length(); i > 0; i--) {
            if(s.subSequence(i-1, i).toString().equals("\n"))
				s.replace(i-1, i, "");
		}
	}
});

function getGenerators(){
	var names = getLangString("JSMOD");
	var arr = [];
	var params = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
	var margin = Utils.dp2px(mActivity,10);
	params.setMargins(0,margin,0,margin);
	for(var i=0;i < names.length;i++){
		var cbox = new android.widget.CheckBox(mActivity);
		cbox.setTag(i);
		cbox.setText(names[i]);
		cbox.setLayoutParams(params);
		cbox.setSelected(true);
		cbox.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
		cbox.setSingleLine(true);
		cbox.setOnCheckedChangeListener(function(view,bool){
		var i = Math.floor(view.getTag());
		tempG[i] = bool;
		});
		arr[i] = cbox;
	}
	return arr;
}

function getOther(){
	var arr = [];
	arr[0] = new android.widget.TextView(mActivity);
	arr[0].setText("UC Super MOD: New Functions\nComing soon...");
	arr[0].setTextSize(18);
	arr[1] = new com.uc.browser.UCButton(mActivity);
	arr[1].setText("FACEBOOK");
	arr[1].setOnClickListener(function(view){
	GUIPainel.dismiss();
	openURL("ext:wo:http://m.facebook.com/UCSuperMOD");
	});
	return arr;
}


function getJavascript(){
	var arr = [];
	var t1 = new android.widget.ListView(mActivity);
	t1.setScrollbarFadingEnabled(false);
	var lp = new LayoutParams(LayoutParams.MATCH_PARENT,Utils.dp2px(mActivity,200));
	lp.setMargins(0,Utils.dp2px(mActivity,10),0,0);
	t1.setLayoutParams(lp);
	t1.setOnItemLongClickListener(function(parent,view,position,id){
	tempJS.remove(position);
	tempJSN.remove(position);
	parent.getAdapter().notifyDataSetChanged();
	print(getLangString("LIST_R"));
	return true;
	});
	t1.setOnItemClickListener(function(parent,view,position,id){
		showEditor(position);
	});
	var btn = new com.uc.browser.UCButton(mActivity);
	btn.setOnClickListener(function(view){
	newJavascript();
	});
	btn.setText(getLangString("ADD"));
	return [t1,btn];
}


function newJavascript(){
	layoutOptions.removeAllViews();
	var params = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
	var margin = Utils.dp2px(mActivity,10);
	params.setMargins(0,margin,0,0);
	var t1 = new android.widget.TextView(mActivity);
	t1.setText(getLangString("NAME"));
	var et1 = new com.uc.browser.UCEditText(mActivity);
	et1.addTextChangedListener(textwatcher);
	var t2 = new android.widget.TextView(mActivity);
	t2.setText(getLangString("CODE"));
	var et2 = new com.uc.browser.UCEditText(mActivity);
	et2.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,Utils.dp2px(mActivity,150)));
	et2.setGravity(android.view.Gravity.TOP);
	//et2.addTextChangedListener(textwatcher);
	var btn = new com.uc.browser.UCButton(mActivity);
	btn.setLayoutParams(params);
	btn.setOnClickListener(function(view){
	var text = et1.getText().toString();
	var text2 = et2.getText().toString();
	if(text.trim().length() == 0 || text2.trim().length() == 0){
	print(getLangString("F_EMPTY"));
	return;
	}
	if(tempJSN.contains(text)){
	print(getLangString("NAME_E"));
	return;
	}
	tempJSN.add(text);
	tempJS.add(text2);
	setViews(layoutOptions,mPos);
	});
	btn.setText(getLangString("ADD"));
	var btn2 = new com.uc.browser.UCButton(mActivity);
	btn2.setText(Lang.getString("CANCEL"));
	btn2.setLayoutParams(params);
	btn2.setOnClickListener(function(view){
	setViews(layoutOptions,mPos);
	});
	layoutOptions.addView(t1);
	layoutOptions.addView(et1);
	layoutOptions.addView(t2);
	layoutOptions.addView(et2);
	layoutOptions.addView(btn);
	layoutOptions.addView(btn2);
}
