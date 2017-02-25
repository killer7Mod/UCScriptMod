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

