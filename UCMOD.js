/*
 * obj.Z() // UcWebView
 * Z().q() // Url of page
 */
var mActivity = getMainContext(0);
var FDIR = mActivity.getFilesDir();
var DEBUG = new java.io.File("/sdcard/DEBUG").exists();
// Test for scripts


if (DEBUG)
{
	eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Lang.js")));
	eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/Views.js")));
	eval(String(com.wmods.modding.Utils.readFile("/sdcard/javascript/JSUtils.js")));
}

var update;
var version = "0.0.9";
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
var LangUtils = Packages.com.wmods.utils.LangUtils;
var LayoutParams = Packages.android.widget.LinearLayout.LayoutParams;
var TextUtils = Packages.android.text.TextUtils;

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
	if ((host.contains("play.google.com") && mOptions[0][0])
		|| ((host.contains("mega.co.nz") || host.contains("mega.nz")) && mOptions[0][2])
		|| (host.contains("userscloud.com") && mOptions[0][4])
		|| ((host.equals("dailyuploads.net") || host.equals("www.dailyuploads.net")) && mOptions[0][5]))
	{
		generator(url);
		return true;
	}

	if (host.contains("4shared.com") && mOptions[0][3])
	{
		generator4shared(url.replace("www.4shared.com", "www.goowap.com"));	
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
function hook_updated() {
	loadLang();
	loadOptions();
	/*
	 var m = com.uc.browser.p.f();
	 var f = m.getClass().getDeclaredField("y");
	 f.setAccessible(true);
	 if (f.get(m) != null)
	 {
	 f.set(m, new com.uc.browser.cm(mActivity));
	 }
	 */
	showUpdate();
}

// Select File Browser
// Parameter @{String=name} = "name of file"
function hook_select_file(filename) {

}

function hook_proxy(param) {
	return false;
}

// Show Page
// Parameter @{Object=o} = "Class com.uc.browser.o"
function hook_page(o) {
	if (!mOptions)loadOptions();
	addNewButton();
	/*
	 var v = mActivity.getWindow().getDecorView();
	 v.setBackgroundColor(android.graphics.Color.rgb(0,0,255));
	 v.getLayoutParams().alpha=1;
	 */
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
		mActivity.startActivity(android.content.Intent.createChooser(intent, "URL"));
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
	menu_di = new_menu(0xff04, 0xff03, 0xfe04);
	menu_di.d(isUpdated());
	al.add(menu_di);
	//al.add(new_menu(0xff05, 0xff04, 0xfe04));

}


// Menu Options(Name)
// Parameter @{int=id_name} = "name_id"
// Parameter @{ArrayList=al} = "add String for Id"
function hook_menu_name(id, al) {
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
function hook_menu_draw(id, al) {
	switch (id)
	{
		case 0xfe04:
			if (DEBUG)
				al.add(getDraw("/sdcard/javascript2/jsmod.png"));
			else
				al.add(getDraw(FDIR.getAbsolutePath() + "/script/jsmod.png"));
			break;
	}
}

// Menu Options(Id)
// Parameter @{int=id} = "id"
function hook_menu_check(id) {
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
function hook_mod_service(thiz, intent) {
}


/* Functions */

function newGUIOptions() {
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

function showJSMOD() {
	loadOptions();
	if (!GUIOptions)
		newGUIOptions();
	mActivity.runOnUiThread(
		function() {
			var clazz = getClasse("agd");
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
			lp.setMargins(0, 0, 0, dpToPx(3));
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
					onItemSelected:function(adapter, view, position, id) {
						setViews(layoutOptions, position);
						mPos = position;
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

function showEditor(position) {
	mActivity.runOnUiThread(
		function() {
			var Painel = new android.app.AlertDialog.Builder(mActivity);
			Painel.setTitle("JavaScript " + getLangString("CODE"));
			var layout = new android.widget.LinearLayout(mActivity);
			layout.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
			layout.setOrientation(1);
			layout.setBackgroundColor(android.graphics.Color.BLACK);
			var t = new android.widget.TextView(mActivity);
			t.setText(getLangString("NAME") + ": " + tempJSN.get(position));
			var et = new android.widget.EditText(mActivity);
			et.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, dpToPx(200)));
			et.setGravity(android.view.Gravity.TOP);
			et.setText(tempJS.get(position));
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
					tempJS.set(position, text);
					dialog.dismiss();
				});
			Painel.setNeutralButton(LangUtils.getString("CANCEL"), null);
			Painel.show();
		});
}

function showJSInjector() {
	mActivity.runOnUiThread(
		function() {
			var clazz = getClasse("agd");
			GUIPainel = clazz.getConstructor(android.content.Context).newInstance(mActivity);
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

function loadIni() {
	var file = new java.io.File(FDIR, "JSMOD.ini");
	iniProp = new java.util.Properties();
	if (file.exists())
		iniProp.load(new java.io.FileInputStream(file));
}

function saveIni() {
	var file = new java.io.File(FDIR, "JSMOD.ini");
	iniProp.store(new java.io.FileOutputStream(file), "WellingtonMods");
}

function loadOptions() {
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
	if (DEBUG && str != null && str.length() > 0 && str2 != null)
	{
		var split = str2.split("\\|\\|");
		var split2 = str.split("\\|");
		for (i = 0;i < split.length;i++)
		{
			var code = baseToString(split[i]);
			if (!code)tempJS.add(split[i]);
			else tempJS.add(code);
			var name = baseToString(split2[i]);
			if (!name)tempJSN.add(split2[i]);
			else tempJSN.add(name);
		}
	}
	else
	{
		tempJSN.add("Proxy TurboHide");
		tempJS.add(baseToString("ZG9jdW1lbnQud3JpdGUoJzxzY3JpcHQgc3JjPSJodHRwOi8vcGFzdGViaW4uY29tL3Jhdy9TdVNVMHhMdCIgPjwvc2NyaXB0PicpOw=="));
	}
	mOptions[1] = [tempJSN,tempJS];
}

function saveOptions() {
	var tmp,i;
	mOptions[0] = tempG;
	mOptions[1] = [tempJSN,tempJS];
	var s = TextUtils.join("|", tempG);
	tmp = tempJSN.toArray();
	for (i = 0;i < tmp.length;i++)
		tmp[i] = stringToBase(tmp[i]);
	var s1 = TextUtils.join("|", tmp);
	tmp = tempJS.toArray();
	for (i = 0;i < tmp.length;i++)
		tmp[i] = stringToBase(tmp[i]);
	var s2 = TextUtils.join("||", tmp);
	if (iniProp == null)loadIni();
	iniProp.setProperty("JSMOD", s);
	iniProp.setProperty("JSScriptN", s1);
	iniProp.setProperty("JSScriptV", s2);
	saveIni();
}


function setMenuUpdated(bool) {
	if (menu_di != null)
	{
		var m = com.uc.browser.p.f();
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

function isUpdated() {
	if (update == null)
	{
		if (iniProp == null)
			loadIni();
		update = iniProp.getProperty("UPDATED", null);
	}
	return !version.equals(update);
}

function setUpdate() {
	if (iniProp == null)
		loadIni();
	iniProp.setProperty("UPDATED", version);
	saveIni();
}

function showUpdate() {
	mActivity.runOnUiThread(
		function() {
			var clazz = getClasse("agd");
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

function addNewJS(s) {
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



function directGoogle(url) {
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


function generator(url) {
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



