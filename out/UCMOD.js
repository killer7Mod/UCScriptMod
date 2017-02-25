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

function getActivity() {
	var mActivity = getMainContext(pInt(0));
	if (mActivity instanceof android.app.Activity)
		return mActivity;
	mActivity = com.uc.browser.ActivityBrowser.a();
	if (mActivity == null)
		return com.wmods.activities.MainActivity.mContext;
	return mActivity;
}

function getDraw(name) {
	try
	{
		return android.graphics.drawable.Drawable.createFromStream(new java.io.FileInputStream(name), name);
	}catch(e){
		return android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK);
	}
}

function new_menu(a, b, c) {
	return com.uc.browser.cy(new java.lang.Integer(a), new java.lang.Integer(b), new java.lang.Integer(c));
}

function new_acn(val, str) {
	var acn_cons = getClasse("acn").getConstructor(java.lang.Integer.TYPE, java.lang.String);
	return acn_cons.newInstance(new java.lang.Integer(val), str);
}

function new_option_button(id, name) {
	return getClasse("adj").getConstructor(java.lang.Integer.TYPE, java.lang.String).newInstance(new java.lang.Integer(id), name);
}

function getClasse(name) {
	return Class.forName(name, false, getActivity().getClass().getClassLoader());
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

function dpToPx(dp) {
	var px = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, dp, getActivity().getResources().getDisplayMetrics());
	return px;
}

function pInt(value) {
	return new java.lang.Integer(value);
}
var mLang;

function loadLang(){
	mLang = {};
	var l =com.wmods.utils.LangUtils.getLang();
	if(l.equals("pt"))
	mLang = {
	LANG:"pt",
	JSMOD:["Gerador Play Store","Gerador Google Drive","Gerador Mega","Gerador 4shared","Gerador Userscloud","Gerador dailyuploads","Gerador Upfile"],
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
	EXIT_ALL:"SAIR (FORÇADO)"
	};
	else
	mLang = {
	LANG:"en",
	JSMOD:["Generator Play Store","Generator Google Drive","Generator Mega","Generator 4Shared","Generator Userscloud","Generator dailyuploads","Generator Upfile"],
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
	EXIT_ALL:"EXIT (FORCE)"
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
var DEBUG = new java.io.File("/sdcard/javascript").exists();
// Test for scripts

if (DEBUG)
{
	eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Lang.js")));
	eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Views.js")));
	eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/JSUtils.js")));
}

var menu_di;
var GUIPainel;
var mOptions;
var JSNAMES = new java.util.ArrayList();
var JSCODES = new java.util.ArrayList();
var mPos;
var layoutOptions;
var scroll;
var GUIOptions;

// Packages Imports
var Class = Packages.java.lang.Class;
var URLControl = Packages.com.wmods.modding.URLControl;
var Utils = Packages.com.wmods.modding.Utils;
var LangUtils = Packages.com.wmods.utils.LangUtils;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var TextUtils = Packages.android.text.TextUtils;
var LinearLayout = Packages.android.widget.LinearLayout;
var Spinner = Packages.android.widget.Spinner;
var ArrayAdapter = Packages.android.widget.ArrayAdapter;
var ListView = Packages.android.widget.ListView;
var TextView = Packages.android.widget.TextView;
var CheckBox = Packages.android.widget.CheckBox;
var EditText = Packages.android.widget.EditText;
var Action = Packages.com.wmods.activities.Action;

// url clicked
// Parameter @{String=url} = "Url Clicked"
function hook_url(url) {
	if (mOptions == null)
		loadOptions();

	if (!url)return true;
	url = url.replace("press_link:", "");
	var mUrl = new URLControl(url);

	var host;
	if ((host = mUrl.getHost()) == null)
		return false;

	if (DEBUG && host.contains("sht.io"))
	{
		var s = url.match(/sht\.io\/(.+?)\/(.+)/);
		if (!s || !isURL(s[2]))
			return false;
		print("Skip sht.io");
		openURL(s[2]);
		return true;
	}

	if (host.contains("drive.google.com") && mOptions[0][1])
	{
		return directGoogle(url);
	}
	if (((host.contains("mega.co.nz") || host.contains("mega.nz")) && mOptions[0][2])
		|| (host.contains("userscloud.com") && mOptions[0][4]))
	{
		generatorAuto(url);
		return true;
	}

	if ((host.equals("dailyuploads.net") || host.equals("www.dailyuploads.net")) && mOptions[0][5])
	{
		generatorLink(url);
		return true;
	}

	if (host.contains("upfile.mobi") && mOptions[0][6])
	{
		generatorAuto(url);
		return true;
	}

	if (host.contains("play.google.com") && mOptions[0][0])
	{
		generatorPlay(url);
		return true;
	}

	if (host.contains("4shared.com") && mOptions[0][3])
	{
		generator4shared(url.replace("www.4shared.com", "www.goowap.com"));	
	}

	if (DEBUG && host.contains("uplxoad.mobi") && mUrl.getPath() ? !mUrl.getPath().contains("download") : false)
	{
		generatorUpload(url);
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
function hook_updated() {
	loadLang();
	loadOptions();
	var ht = new android.os.HandlerThread("update");
	ht.start();
	new android.os.Handler(ht.getLooper()).post(
		function() {
			java.lang.Thread.sleep(5000);
			showUpdate();
			var m = com.uc.browser.p.f();
			var f = m.getClass().getDeclaredField("y");
			f.setAccessible(true);
			if (f.get(m) != null)
			{
				f.set(m, new com.uc.browser.cm(getActivity()));
			}
		});
}

// Select File Browser
// Parameter @{String=name} = "name of file"
function hook_select_file(filename) {

}

function hook_proxy(param) {
	if (mOptions == null)loadOptions();

	switch (mOptions[2])
	{
		case 0:
			param[0] = "http://us.muchproxy.com/browse.php?b=2&u=" + java.net.URLEncoder.encode(param[0]);
			param[1] = "http://us.muchproxy.com/" + (param[1] != null ? "browse.php?u=" + java.net.URLEncoder.encode(param[1]) : "");
			break;
		case 1:
			param[0] = "http://hide.muchproxy.com/browse.php?b=2&u=" + java.net.URLEncoder.encode(param[0]);
			param[1] = "http://hide.muchproxy.com/" + (param[1] != null ? "browse.php?u=" + java.net.URLEncoder.encode(param[1]) : "");
			break;
		case 2:
			param[0] = "http://multiwebproxy.com/browse.php?b=2&u=" + java.net.URLEncoder.encode(param[0]);
			param[1] = "http://multiwebproxy.com/" + (param[1] != null ? "browse.php?u=" + java.net.URLEncoder.encode(param[1]) : "");
			break;
		case 3:
			param[0] = "http://buka.link/browse.php?b=2&u=" + java.net.URLEncoder.encode(param[0]);
			param[1] = "http://buka.link/" + (param[1] != null ? "browse.php?u=" + java.net.URLEncoder.encode(param[1]) : "");
			break;
	}
	return false;
}

// Show Page
// Parameter @{Object=o} = "Class com.uc.browser.o"
function hook_page(o) {
	if (!mOptions)loadOptions();
	addNewButton();

}

// Options on Long Click(Listener)
// Parameter @{Object=o} = "Class com.uc.browser.o"
// Parameter @{int=id} = "id of Option"
function hook_options_button(o, id) {
	if (id == 0xf001)
		openURL("ext:es:javascript:location.href=\"View-Source:\".concat(location.href)");
	else if (id == 0xf002)
		showJSInjector();
	else if (id == 0xf003)
	{
		var intent = new android.content.Intent("android.intent.action.VIEW");
		var url = o.Y().ag();
		if (url == null)url = o.S;
		intent.setData(android.net.Uri.parse(url));
		getActivity().startActivity(android.content.Intent.createChooser(intent, "URL"));
	}
}

// Buttons on select text
// Parameter @{Object=adj} = "Class com.uc.browser.adj"
function hook_select_button(adj) {
//var array = o.getClass().getField("D").get(o);
//print(array[0]);
}


// Buttons on select text(Listener)
// Parameter @{Object=o} = "Class com.uc.browser.o"
// Parameter @{int=id} = "id Of Button"
function hook_select_button_listener(o, id) {
//var VwClass = getCl("vw");
//var text = VwClass.getMethod("b").invoke(null).f();
}


// Menu Options
// Parameter @{Object=cw} = "Class com.uc.browser.cw"
// Parameter @{ArrayList=al} = "Add Class com.uc.browser.di<init>(III)V {id,name_id,drawable_id}"
function hook_menu_new(cw, al) {
	al.add(new_menu(0xf004, 0xf003, 0xf104));
	al.add(new_menu(0xf005, 0xf004, 0x2819));
	if (DEBUG)
	{
		al.add(new_menu(0xfa01, 0xfa01, 0xfa01));
	}

}


// Menu Options(Name)
// Parameter @{int=id_name} = "name_id"
// Parameter @{ArrayList=al} = "add String for Id"
function hook_menu_name(id, al) {
	switch (id)
	{
		case 0xf003:
			al.add("JS MOD");
			break;
		case 0xf004:
			al.add(getLangString("EXIT_ALL"));
			break;
		case 0xfa01:
			al.add("TESTE");
			break;
	}
}

// Menu Options(Drawable)
// Parameter @{int=id} = "drawable_id"
// Parameter @{ArrayList=al} = "add Drawable for Id"
function hook_menu_draw(id, al) {
	switch (id)
	{
		case 0xf104:
		case 0xfa01:
			if (!DEBUG)
			{
				al.add(getDraw("/sdcard/javascriptmod/jsmod.png"));
				break;
			}
			al.add(getDraw(getActivity().getFilesDir().getAbsolutePath() + "/script/jsmod.png"));
			break;

	}
}

// Menu Options(Id)
// Parameter @{int=id} = "id"
function hook_menu_check(id) {
	switch (id)
	{
		case 0xf004:
			showJSMOD();
			break;
		case 0xf005:
			exitAll();
			break;
		case 0xfa01:
			hook_updated();
	}
}

// ModService
// Parameter @{ModService=thiz} = "instance of ModService"
// Parameter @{Intent=intent} = "Intent"
function hook_mod_service(thiz, intent) {
}


/* Functions */

function newGUIOptions() {
	GUIOptions = [
		{
			name:getLangString("GN"),
			options:getGenerators(),
			debug:false
		},
		{
			name:"Javascript",
			options:getJavascript(),
			debug: true
		},
		{
			name:"Custom Proxy",
			options:getProxyLayout(),
			debug: false
		},
		{
			name:"Other",
			options:getOther(),
			debug:false
		} 
	];
}

function showJSMOD() {
	loadOptions();
	newGUIOptions();
	getActivity().runOnUiThread(
		function() {
			var clazz = getClasse("agd");
			GUIPainel = clazz.getConstructor(android.content.Context).newInstance(getActivity());
			GUIPainel.setTitle("JSMOD");
			var layout = new LinearLayout(getActivity());
			layout.setBackgroundColor(0xffffff);
			layout.setOrientation(1);

			var names = [];
			for (var i=0;i < GUIOptions.length;i++)
				if (DEBUG || GUIOptions[i].debug == false)
					names.push(GUIOptions[i].name);
			var spinner = new Spinner(getActivity());
			var lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
			lp.setMargins(0, 0, 0, dpToPx(3));
			spinner.setLayoutParams(lp);
			var adapter = new ArrayAdapter(getActivity(), 17367050, JsArrayToJavaArray(java.lang.String, names));
			spinner.setAdapter(adapter);
			spinner.setBackgroundColor(android.graphics.Color.rgb(0, 00, 0x3f));
			scroll = new android.widget.ScrollView(getActivity());
			scroll.setScrollbarFadingEnabled(false);
			layoutOptions = new LinearLayout(getActivity());
			layoutOptions.setBackgroundColor(android.graphics.Color.rgb(0, 0, 0));
			layoutOptions.setOrientation(1);
			spinner.setOnItemSelectedListener(
				{
					onItemSelected:function(adapter, view, position, id) {
						setViews(layoutOptions, position);
					},
					onNothingSelected:function(adapter) {

					}
				});
			layout.addView(spinner);
			scroll.addView(layoutOptions);
			layout.addView(scroll);
			GUIPainel.a(layout);
			GUIPainel.setOnDismissListener(
				function(dialog) {
					layoutOptions.removeAllViews();
					loadOptions();
				});

			GUIPainel.b(LangUtils.getString("SAVE"), function(dialog) {
							dialog.dismiss();
							saveOptions();
						});
			GUIPainel.a(LangUtils.getString("CANCEL"), function(dialog) {
							dialog.dismiss();
							loadOptions();
						});
			GUIPainel.show();
		}
	);
}



function showJSInjector() {
	getActivity().runOnUiThread(
		function() {
			var clazz = getClasse("agd");
			GUIPainel = clazz.getConstructor(android.content.Context).newInstance(getActivity());
			GUIPainel.setTitle("JavaScript " + getLangString("CODE"));
			if (mOptions[1][0].size() == 0)
			{
				print(getLangString("NO_SCRIPT"));
				return;
			}
			var list = mOptions[1][0].toArray(new java.lang.reflect.Array.newInstance(java.lang.String, 0));
			GUIPainel.a(list,
						function(d, position) {
							GUIPainel.dismiss();
							openURL("ext:es:javascript:" + mOptions[1][1].get(position));
						});
			GUIPainel.show();
		});
}


function setViews(layout, position) {
	layout.removeAllViews();
	if (position == 0)
		scroll.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, dpToPx(150)));
	else scroll.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT));
	while (DEBUG == false && GUIOptions[position].debug == true)
	{
		position++;
	}
	var ops = GUIOptions[position].options;
	for (var i=0;i < ops.length;i++)
		layout.addView(ops[i]);
	mPos = position;
}

function loadOptions() {
	var prefs = Utils.getContext().getSharedPreferences("JSMOD", 1);
	mOptions = [];

	// Load Generators
	var arr = [];
	var len = getLangString("JSMOD").length;
	for (var i = 0; i < len; i++)
		arr.push(prefs.getBoolean("generator_" + i, false));
	mOptions[0] = JsArrayToJavaArray(java.lang.Boolean.TYPE, arr);

	// Load Javascript
	JSNAMES.clear();JSCODES.clear();
	if (DEBUG)
	{
		var tmp = new org.json.JSONArray(prefs.getString("JSNAMES", "[]"));
		var tmp2 = new org.json.JSONArray(prefs.getString("JSCODES", "[]"));
		for (var i = 0;i < tmp.length();i++)
		{
			JSNAMES.add(tmp.getString(i));
			JSCODES.add(tmp2.getString(i));
		}
	}
	else
	{
		JSNAMES.add("Proxy TurboHide");
		JSCODES.add(baseToString("ZG9jdW1lbnQud3JpdGUoJzxzY3JpcHQgc3JjPSJodHRwOi8vcGFzdGViaW4uY29tL3Jhdy9TdVNVMHhMdCIgPjwvc2NyaXB0PicpOw=="));
		JSNAMES.add("Skip CloudFlare DDoS");
		JSCODES.add(baseToString("KGZ1bmN0aW9uKCl7dmFyIHg9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoInNjcmlwdCIpWzBdLmlubmVySFRNTDt2YXIgcG9zPXguaW5kZXhPZigic2V0VGltZW91dChmdW5jdGlvbigpIikrMTE7dmFyIHBvczI9eC5pbmRleE9mKCIsIDQwMDAiKTtldmFsKCIoIit4LnN1YnN0cmluZyhwb3MscG9zMikrIikoKSIpO30pKCk7"));
		JSNAMES.add("Youtube Downloader");
		JSCODES.add(baseToString("amF2YXNjcmlwdDpkb2N1bWVudC53cml0ZSgnPHNjcmlwdCBzcmM9Imh0dHA6Ly9qYXZhbW9iaWxlMjAxMy54dGdlbS5jb20vc2NyaXB0L3lvdXR1YmUuZGF0Ij48L3NjcmlwdD4nKTs="));
		JSNAMES.add("OpenLoad Direct");
		JSCODES.add(baseToString("bG9jYXRpb24uaHJlZj0iaHR0cHM6Ly9vcGVubG9hZC5jby9zdHJlYW0vIi5jb25jYXQoJCgiI3N0cmVhbXVybCIpLnRleHQoKSk="));
	}
	mOptions[1] = [JSNAMES,JSCODES];

	// Load Position Proxy
	mOptions[2] = prefs.getInt("JSPROXY", 0);

}

function saveOptions() {
	var editor = Utils.getContext().getSharedPreferences("JSMOD", 0).edit();

	mOptions[1] = [JSNAMES,JSCODES];

	//Save Generators
	var len = getLangString("JSMOD").length;
	for (var i = 0; i < len; i++)
		editor.putBoolean("generator_" + i, mOptions[0][i]);
	editor.commit();

	//Save Javascript
	if (DEBUG)
	{
		var tmp = new org.json.JSONArray();
		var tmp2 = new org.json.JSONArray();
		for (var i = 0;i < mOptions[1][0].size();i++)
		{
			tmp.put(mOptions[1][0].get(i));
			tmp2.put(mOptions[1][1].get(i));
		}
		editor.putString("JSNAMES", tmp.toString());
		editor.putString("JSCODES", tmp2.toString());
	}
	editor.putInt("JSPROXY", mOptions[2]);
	editor.commit();
}

function exitAll() {
	try
	{
		getActivity().finish();
	}catch(e){
		
	}
	android.os.Process.killProcess(android.os.Process.myPid());
}

function showUpdate() {
	getActivity().runOnUiThread(
		function() {
			var clazz = getClasse("agd");
			var painel = clazz.getConstructor(android.content.Context).newInstance(getActivity());
			painel.setTitle(getLangString("JSUP"));
			var content = Utils.readFile(getActivity().getFilesDir().getAbsolutePath() + "/script/UCMOD.txt");
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

function addNewButton() {
	var f,jarray,array;

	var clazz = getClasse("adi");
	f = clazz.getField("g");
	jarray = f.get(null);
	if (!checkYlId(jarray, 0xf001))
	{
		array = JavaArrayToJsArray(jarray);
		array.push(new_option_button(0xf001, getLangString("VS")));
		array.push(new_option_button(0xf002, "Javascript Injector"));
		jarray = JsArrayToJavaArray(getClasse("adj"), array);
		f.set(null, jarray);
	}
	f = clazz.getField("f");
	jarray = f.get(null);
	if (!checkYlId(jarray, 0xf003))
	{
		array = JavaArrayToJsArray(jarray);
		array.push(new_option_button(0xf003, "Abrir Como"));
		jarray = JsArrayToJavaArray(getClasse("adj"), array);
		f.set(null, jarray);
	}
	f = clazz.getField("e");
	jarray = f.get(null);
	if (!checkYlId(jarray, 0xf003))
	{
		array = JavaArrayToJsArray(jarray);
		array.push(new_option_button(0xf003, "Abrir Como"));
		jarray = JsArrayToJavaArray(getClasse("adj"), array);
		f.set(null, jarray);
	}
}

function checkYlId(array, id) {
	for (var i = 0;i < array.length;i++)
		if (array[i].b == id)
			return true;
	return false;
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

function directGoogle(url) {
	var parts = url.match(/\/d\/(.+)\//);
	if (parts == null || parts.length < 2)
	{
		return false;
	}
	else
	{
		print(getLangString("GS"));
		var u = "http://drive.google.com/uc?export=download&id=" + parts[1];
		openURLDirect(u);
		return true;
	}
}


function generatorAuto(url) {
	print(getLangString("GL"));
	new java.lang.Thread(
		{
			run:function() {
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

function generatorLink(url) {
	print(getLangString("GL"));
	new java.lang.Thread(
		{
			run:function() {
				var content = getStringURL("http://www.linkgenerate.com/link.php?link=" + java.net.URLEncoder.encode(url) + "&token=agl");
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

function generatorPlay(url) {
	print(getLangString("GL"));
	var m = url.match("id\=([a-zA-z0-9\.]{3,})");
	if (m != null && m[1] != null)
	{
		print(getLangString("GS"));
		openURL("http://apk-downloaders.com/download/dl.php?dl=" + m[1]);
	}
}

function generator4shared(url) {
	print(getLangString("GL"));
	new java.lang.Thread(
		{
			run:function() {
				var content = getStringURL(url);
				try
				{
					var m = content.match("data: \"(root=(.*?)\")");
					var content = Utils.getStringURL("http://www.goowap.com/root.html", new java.lang.String(m[1]).getBytes());
					print(content);
				}catch(e){
					print(e);
				}
				print(m[1]);
			}
		}).start();
}


function generatorUpload(url) {
	print(getLangString("GL"));
	new java.lang.Thread(
		{
			run:function() {
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



var textwatcher= new android.text.TextWatcher(
	{
		afterTextChanged:function(s) {
			for (var i = s.length(); i > 0; i--)
			{
				if (s.subSequence(i - 1, i).toString().equals("\n"))
					s.replace(i - 1, i, "");
			}
		}
	});

function getGenerators() {
	var names = getLangString("JSMOD");
	var arr = [];
	var params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
	var margin = dpToPx(10);
	params.setMargins(0, margin, 0, margin);
	for (var i=0;i < names.length;i++)
	{
		var cbox = new CheckBox(getActivity());
		cbox.setTag(i);
		cbox.setText(names[i]);
		cbox.setLayoutParams(params);
		cbox.setSelected(true);
		//cbox.setEllipsize(TextUtils.TruncateAt.MARQUEE);
		cbox.setSingleLine(true);
		cbox.setOnCheckedChangeListener(
			function(view, bool) {
				var i = Math.floor(view.getTag());
				mOptions[0][i] = bool;
			});
		if (mOptions[0] != null && i < mOptions[0].length)
		{
			cbox.setChecked(mOptions[0][i]);
		}
		arr[i] = cbox;
	}
	return arr;
}

function getProxyLayout() {
	var arr = [];
	arr[0] = new TextView(getActivity());
	arr[0].setText("Select Proxy");
	arr[1] = new Spinner(getActivity());
	var options = ["MUCHPROXY[USA]","MUCHPROXY[HIDE]","MULTIWEBPROXY","BUKA.LINK"];
	arr[1].setAdapter(new ArrayAdapter(getActivity(), 17367050, JsArrayToJavaArray(java.lang.String, options)));
	arr[1].setOnItemSelectedListener(
		{
			onItemSelected:function(parent, view, position, id) {
				mOptions[2] = position;
			},
			onNothingSelected:function(view) {}
		});

	if (mOptions != null && options.length > mOptions[2])
		arr[1].setSelection(mOptions[2]);
	return arr;
}

function getOther() {
	var arr = [];
	arr[0] = new TextView(getActivity());
	arr[0].setText("UC Super MOD: New Functions\nComing soon...");
	arr[0].setTextSize(18);
	arr[1] = new com.uc.browser.UCButton(getActivity());
	arr[1].setText("FACEBOOK");
	arr[1].setOnClickListener(
		function(view) {
			GUIPainel.dismiss();
			openURL("ext:wo:http://m.facebook.com/UCSuperMOD");
		});
	return arr;
}


function getJavascript() {
	var arr = [];
	var t1 = new ListView(getActivity());
	t1.setScrollbarFadingEnabled(false);
	var lp = new LayoutParams(LayoutParams.MATCH_PARENT, dpToPx(200));
	lp.setMargins(0, dpToPx(10), 0, 0);
	t1.setLayoutParams(lp);
	t1.setOnItemLongClickListener(
		function(parent, view, position, id) {
			JSNAMES.remove(position);
			JSCODES.remove(position);
			parent.getAdapter().notifyDataSetChanged();
			print(getLangString("LIST_R"));
			return true;
		});

	t1.setAdapter(ArrayAdapter(getActivity(), 17367050, JSNAMES));

	if (DEBUG)
		t1.setOnItemClickListener(
			function(parent, view, position, id) {
				showEditor(position);
			});

	if (DEBUG)
	{
		var btn = new com.uc.browser.UCButton(getActivity());
		btn.setOnClickListener(
			function(view) {
				newJavascript();
			});
		btn.setText(getLangString("ADD"));
		return [t1,btn];
	}
	return [t1];
}


function newJavascript() {
	layoutOptions.removeAllViews();
	var params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
	var margin = dpToPx(10);
	params.setMargins(0, margin, 0, 0);
	var t1 = new TextView(getActivity());
	t1.setText(getLangString("NAME"));
	var et1 = new com.uc.browser.UCEditText(getActivity());
	et1.addTextChangedListener(textwatcher);
	var t2 = new TextView(getActivity());
	t2.setText(getLangString("CODE"));
	var et2 = new com.uc.browser.UCEditText(getActivity());
	et2.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, dpToPx(150)));
	et2.setGravity(android.view.Gravity.TOP);
	//et2.addTextChangedListener(textwatcher);
	var btn = new com.uc.browser.UCButton(getActivity());
	btn.setLayoutParams(params);
	btn.setOnClickListener(
		function(view) {
			var text = et1.getText().toString();
			var text2 = et2.getText().toString();
			if (text.trim().length() == 0 || text2.trim().length() == 0)
			{
				print(getLangString("F_EMPTY"));
				return;
			}
			JSNAMES.add(text);
			JSCODES.add(text2);
			print(text);
			GUIOptions[mPos].options = getJavascript();
			setViews(layoutOptions, mPos);

		});
	btn.setText(getLangString("ADD"));
	var btn2 = new com.uc.browser.UCButton(getActivity());
	btn2.setText(LangUtils.getString("CANCEL"));
	btn2.setLayoutParams(params);
	btn2.setOnClickListener(
		function(view) {
			setViews(layoutOptions, mPos);
		});
	layoutOptions.addView(t1);
	layoutOptions.addView(et1);
	layoutOptions.addView(t2);
	layoutOptions.addView(et2);
	layoutOptions.addView(btn);
	layoutOptions.addView(btn2);
}

function showEditor(position) {
	getActivity().runOnUiThread(
		function() {
			var Painel = new android.app.AlertDialog.Builder(getActivity());
			Painel.setTitle("JavaScript " + getLangString("CODE"));
			var layout = new LinearLayout(getActivity());
			layout.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
			layout.setOrientation(1);
			layout.setBackgroundColor(android.graphics.Color.BLACK);
			var t = new TextView(getActivity());
			t.setText(getLangString("NAME") + ": " + JSNAMES.get(position));
			var et = new EditText(getActivity());
			et.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, dpToPx(200)));
			et.setGravity(android.view.Gravity.TOP);
			et.setText(JSCODES.get(position));
			//et.addTextChangedListener(textwatcher);
			layout.addView(t);
			layout.addView(et);
			Painel.setView(layout);
			Painel.setPositiveButton(
				LangUtils.getString("SAVE"), 
				function(dialog, pos) {
					var text = et.getText().toString();
					if (text.trim().length() == 0)
					{
						print(getLangString("F_EMPTY"));
						return;
					}
					JSCODES.set(position, text);
					dialog.dismiss();
				});
			Painel.setNeutralButton(LangUtils.getString("CANCEL"), null);
			Painel.show();
		});
}
