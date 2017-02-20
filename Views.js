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
