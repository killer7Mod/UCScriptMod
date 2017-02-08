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

function getActivity(){
	var mActivity = getMainContext(pInt(0));
	if(mActivity instanceof android.app.Activity)
		return mActivity;
	return com.uc.browser.ActivityBrowser.a();
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

function pInt(value){
	return new java.lang.Integer(value);
}
