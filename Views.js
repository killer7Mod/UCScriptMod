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
	var margin = dpToPx(10);
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
	var lp = new LayoutParams(LayoutParams.MATCH_PARENT,dpToPx(200));
	lp.setMargins(0,dpToPx(10),0,0);
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
	var margin = dpToPx(10);
	params.setMargins(0,margin,0,0);
	var t1 = new android.widget.TextView(mActivity);
	t1.setText(getLangString("NAME"));
	var et1 = new com.uc.browser.UCEditText(mActivity);
	et1.addTextChangedListener(textwatcher);
	var t2 = new android.widget.TextView(mActivity);
	t2.setText(getLangString("CODE"));
	var et2 = new com.uc.browser.UCEditText(mActivity);
	et2.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT,dpToPx(150)));
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
	btn2.setText(LangUtils.getString("CANCEL"));
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
