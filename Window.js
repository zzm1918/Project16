// ================================================ =============================
//Z_Wolfzq_Window.js
// ================================================ =============================

/*:
 * @plugindesc wolfzq追加窗口
 * @author wolfzq
 */
/*

/*窗口追加*/
//-----------------------------------------------------------------------------
// Window_EnemyState
//
// The window for displaying player basic state on the map screen.

function JSONLength(obj) {
var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

function Window_EnemyState() {
    this.initialize.apply(this, arguments);
}

Window_EnemyState.prototype = Object.create(Window_Base.prototype);
Window_EnemyState.prototype.constructor = Window_EnemyState;

Window_EnemyState.prototype.initialize = function(actor) {
    var width = Graphics.boxWidth;
    Window_Base.prototype.initialize.call(this, 0, 32, 290, 200);
	this.opacity = 0;
	this._lasthp = 0;
	this._actor = actor;
	this.hide();
};

Window_EnemyState.prototype.refresh = function() {
	var actor = this._actor;
	if (!actor) {
		return;
	}
	if (actor.isHidden() || actor._hp == 0) {
		if (this.visible) {
			this.hide();
		}
		return;
	} 
	if (!this.visible) {
		this.show();
	}
	if (this._lasthp != actor.hpRate()) {
		this._lasthp = actor.hpRate();
		this.contents.clear();
		this.drawActorHp(actor, 0, 0, 200);
	}
};

Window_EnemyState.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth('000000');
    var x1 = x + width - valueWidth;
	this.changeTextColor(color1);
	this.drawText(current, x1, y, valueWidth, 'right');
};

Window_EnemyState.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.refresh();
};

/*窗口追加*/

//-----------------------------------------------------------------------------
// Window_HState
//
// The window for displaying H state on the map screen.

function Window_HState() {
    this.initialize.apply(this, arguments);
}

Window_HState.prototype = Object.create(Window_Base.prototype);
Window_HState.prototype.constructor = Window_HState;

Window_HState.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width, 200);
	this.opacity = 0;
	this._lasthp = 0;
	this._lastmp = 0;
	this._lasttp = 0;
};

Window_HState.prototype.refresh = function() {
	this.contents.clear();
	this.drawPlayerHp(0, 0, 400);
	this.drawPlayerPower(0, 30, 400);
	this.drawPlayerFeel(0, 60, 400);
	this.drawEnemyHp(640, 0, 400);
	this.drawEnemyPower(640, 30, 400);
	this.drawEnemyFeel(640, 60, 400);
};

Window_HState.prototype.drawPlayerHp = function(x, y, width) {
	var actor = $gameActors.actor(1);
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 88);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width, this.normalColor(), this.normalColor());
};

Window_HState.prototype.drawPlayerPower = function(x, y, width) {
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
	var power = $we._playerPower;
	var maxPower = $we._playerMaxPower;
	var rate = power / maxPower;
    this.drawGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText('Power', x, y, 88);
    this.drawCurrentAndMax(power, maxPower, x, y, width, this.normalColor(), this.normalColor());
};

Window_HState.prototype.drawPlayerFeel = function(x, y, width) {
    var color1 = this.textColor(27);
    var color2 = this.textColor(26);
	var feel = $we._playerFeel;
	var maxFeel = $we._playerMaxFeel;
	var rate = feel / maxFeel;
    this.drawGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText('Feel', x, y, 88);
    this.drawCurrentAndMax(feel, maxFeel, x, y, width, this.normalColor(), this.normalColor());
};
Window_HState.prototype.drawEnemyHp = function(x, y, width) {
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
	var hp = $we._enemyHP;
	var maxhp = $we._enemyMaxHP;
	var rate = hp / maxhp;
    this.drawReverseGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 88);
    this.drawCurrentAndMax(hp, maxhp, x, y, width, this.normalColor(), this.normalColor());
};

Window_HState.prototype.drawEnemyPower = function(x, y, width) {
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
	var power = $we._enemyPower;
	var maxPower = $we._enemyMaxPower;
	var rate = power / maxPower;
    this.drawReverseGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText('Power', x, y, 88);
    this.drawCurrentAndMax(power, maxPower, x, y, width, this.normalColor(), this.normalColor());
};

Window_HState.prototype.drawEnemyFeel = function(x, y, width) {
    var color1 = this.textColor(27);
    var color2 = this.textColor(26);
	var feel = $we._enemyFeel;
	var maxFeel = $we._enemyMaxFeel;
	var rate = feel / maxFeel;
    this.drawReverseGauge(x, y, width, rate, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText('Feel', x, y, 88);
    this.drawCurrentAndMax(feel, maxFeel, x, y, width, this.normalColor(), this.normalColor());
};

Window_HState.prototype.drawReverseGauge = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  if (eval(Yanfly.Param.GaugeOutline)) {
    color3.paintOpacity = this.translucentOpacity();
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }
  this.contents.gradientFillRect(dx + dw - fillW, gaugeY, fillW, gaugeH, color1, color2);
};

Window_HState.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.refresh();
};

//-----------------------------------------------------------------------------
// Window_PlayerState
//
// The window for displaying player basic state on the map screen.

function Window_PlayerState() {
    this.initialize.apply(this, arguments);
}

Window_PlayerState.prototype = Object.create(Window_Base.prototype);
Window_PlayerState.prototype.constructor = Window_PlayerState;

Window_PlayerState.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    Window_Base.prototype.initialize.call(this, 0, 32, 290, 200);
	this.opacity = 0;
	this._lasthp = 0;
	this._lastmp = 0;
	this._lasttp = 0;
	this._stateIconSprite = new Sprite_StateIcon();
	this.addChild(this._stateIconSprite);
	this._stateIconSprite.x = 240;
	this._stateIconSprite.y = 38;
	this._stateIconSprite.setup($gameActors.actor(1));
};

Window_PlayerState.prototype.refresh = function() {
	if ($gameSwitches.value(53)) {
		this.show();
	} else {
		this.hide();
	}
	var actor = $gameActors.actor(1);
	if (this._lasthp != actor.hpRate() || this._lastmp != actor.mpRate() || this._lasttp != actor.tpRate()) {
		this.contents.clear();
		this._lasthp = actor.hpRate();
		this._lastmp = actor.mpRate();
		this._lasttp = actor.tpRate();
		this.drawActorHp(actor, 0, 0, 200);
		this.drawActorMp(actor, 20, 30, 200);
		this.drawActorTp(actor, 40, 60, 200);
	}
};

Window_PlayerState.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.refresh();
};

/*窗口追加*/
//-----------------------------------------------------------------------------
// Window_PlayerInfo 属性
//
// The window for displaying full playerInfo on the screen.

function Window_PlayerInfo() {
    this.initialize.apply(this, arguments);
}

Window_PlayerInfo.prototype = Object.create(Window_Selectable.prototype);
Window_PlayerInfo.prototype.constructor = Window_PlayerInfo;

Window_PlayerInfo.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.activate();
};

Window_PlayerInfo.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_PlayerInfo.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawHorzLine(lineHeight * 1);
        this.drawBlock2(lineHeight * 2);
        this.drawHorzLine(lineHeight * 6);
        this.drawBlock3(lineHeight * 7);
        //this.drawHorzLine(lineHeight * 13);
        //this.drawBlock4(lineHeight * 14);
		
		var body = new Window_Body(0);
		body.x = Graphics.width - 130;
		body._noEffect = true;
		this.addChild(body);
		body.changePOpacity('cloth', 0);
		body.changePOpacity('milk', 255);
		body.changePOpacity('breast', 255);
		body.changePOpacity('shirt', 255);
		body.changePOpacity('shirt2', 255);
		body.changePOpacity('ushirt2', 255);
		body.changePOpacity('shirt3', 255);
		body.changePOpacity('ushirt', 0);
		body.changePOpacity('skirt', 0);

		body.changePOpacity('hand', 0);
		body.changePOpacity('uhand', 0);
		body.changePOpacity('shoe', 0);
		body.changePOpacity('ushoe', 0);
		body.useCloth();
		body.useCape();
		body.changePOpacity('light', 0);
		body.changePOpacity('weapon', 0);
		body.changePOpacity('uweapon', 0);
    }
};

Window_PlayerInfo.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
    this.drawParamsText($w.getJob($gameVariables.value(15)), 192, y, 168, this.textColor(4));
    this.drawParamsText($w.getSexJob($w.getNum('sexJob')), 384, y, 168, this.textColor(5));
	if ($gameVariables.value(1) == 0) {
		this.drawParamsText($w.getText('p7'), 576, y, 168, this.textColor(6));
	} else {
		this.drawParamsText($w.getText('p16'), 576, y, 168, this.textColor(27)); 
		this.drawParamsText(this.convertEscapeCharacters($w.getText('p19')), 680, y, 268, this.textColor(5)); 
	}
};

Window_PlayerInfo.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    //this.drawExpInfo(456, y);
};

Window_PlayerInfo.prototype.drawBlock3 = function(y) {
    this.drawParameters(28, y);
};

Window_PlayerInfo.prototype.drawBlock4 = function(y) {
    this.drawProfile(6, y);
};

Window_PlayerInfo.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

Window_PlayerInfo.prototype.lineColor = function() {
    return this.normalColor();
};

Window_PlayerInfo.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
	var allC = $wolfzqPlayer.getAllP();
	var allCN = $wolfzqPlayer.getAllPN();
	var line = 0;
	for(var pc in allC){
		if (line > 3)
		{
			x += 196;
			line = 0;
		}
        var y2 = y + lineHeight * line;
        this.changeTextColor(this.systemColor());
        this.drawText(allCN[pc], x, y2, 100);
        this.resetTextColor();
        this.drawText(allC[pc], x + 100, y2, 60, 'right');
		line++;
	}
};

Window_PlayerInfo.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
	var allPC = $w.getAllPC();
	var allPCN = $w.getAllPCN();
	var line = 0;
	for(var pc in allPC){
		if (line > 6)
		{
			x += 256;
			line = 0;
		}
        var y2 = y + lineHeight * line;
        this.changeTextColor(this.systemColor());
        this.drawText(allPCN[pc], x, y2, 160);
        this.resetTextColor();
        this.drawText(allPC[pc], x + 160, y2, 60, 'right');
		line++;
	}
};

Window_PlayerInfo.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

Window_PlayerInfo.prototype.drawProfile = function(x, y) {
    //this.drawTextEx(this._actor.profile(), x, y);
};

/*窗口追加*/
//-----------------------------------------------------------------------------
// Window_Player 称号
//
// The window for displaying player small basic state on the map screen.

function Window_Player() {
    this.initialize.apply(this, arguments);
}

Window_Player.prototype = Object.create(Window_Selectable.prototype);
Window_Player.prototype.constructor = Window_Player;

Window_Player.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, 250);
    this.activate();
};

Window_Player.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_Player.prototype.getTitleCount = function(val) {
	this.drawParamsText($w.getText('p14'), 700, 0, 336, this.textColor(4));
	this.drawParamsText(val, 890, 0, 336, this.textColor(6));
};

Window_Player.prototype.refresh = function() {
    this.contents.clear();
	//wolfzq追加代码
	if (this._player) {
		this.removeChild(this._player);
	}
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawHorzLine(lineHeight * 1);
        this.drawBlock2(lineHeight * 2);
    }
};

Window_Player.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
    this.drawParamsText($w.getJob($gameVariables.value(15)), 192, y, 168, this.textColor(4));
    this.drawParamsText($w.getSexJob($w.getNum('sexJob')), 384, y, 168, this.textColor(5));
	if ($gameVariables.value(1) == 0) {
		this.drawParamsText($w.getText('p7'), 576, y, 168, this.textColor(6));
	} else {
		this.drawParamsText($w.getText('p16'), 576, y, 168, this.textColor(27));
	}
};

Window_Player.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
};

Window_Player.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

Window_Player.prototype.lineColor = function() {
    return this.normalColor();
};

Window_Player.prototype.drawActorSexName = function(actor, x, y) {
    this.changeTextColor(this.textColor(5));
}

Window_Player.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    this.drawActorMp(this._actor, x, y + lineHeight * 3);
};

Window_Player.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};


/*窗口追加*/
//-----------------------------------------------------------------------------
// Window_PlayerTitle
//
// The window for displaying full playerTitle on the screen.

function Window_PlayerTitle() {
    this.initialize.apply(this, arguments);
}

Window_PlayerTitle.prototype = Object.create(Window_Selectable.prototype);
Window_PlayerTitle.prototype.constructor = Window_PlayerTitle;

Window_PlayerTitle.prototype.initialize = function(wx, wy, ww, wh) {
	this._itemCount = 60;
    Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    this.activate();
    this.select(0);
};

Window_PlayerTitle.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._helpWindow) {
        this._helpWindow.setText($wolfzqPlayer.getText('t' + this._tiles[this.index()] + 'memo'));
    }
};

Window_PlayerTitle.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
		this._playerWindow.getTitleCount(this.titleGets + '/' + this._itemCount);
    }
};

Window_PlayerTitle.prototype.setPlayerWindow = function(win) {
	this._playerWindow = win;
}


Window_PlayerTitle.prototype.refresh = function() {
    if (this._actor) {
		this.createContents();
		this.drawParameters(72, 0);
    }
};

Window_PlayerTitle.prototype.lineColor = function() {
    return this.normalColor();
};

Window_PlayerTitle.prototype.maxCols = function() {
    return 3;
};

Window_PlayerTitle.prototype.maxItems = function() {
    return this._itemCount;
};

Window_PlayerTitle.prototype.itemWidth = function() {
    return 360;
};

Window_PlayerTitle.prototype.drawParameters = function(x, y) {
	var index = 0;
	this._tiles = [];
	var text = $w.getAllTitleName();
	this._itemCount = JSONLength(text);
	this.titleGets = 0;
	for (var s in text) {
		var rect = this.itemRectForText(index);
		var x = rect.x + 30;
		var y = rect.y;
		if ($w.getTitle(s) == 0) {
			//未获得用灰色
			this.changeTextColor(this.textColor(7));
		}
		else {
			//已获得用白色
			this.changeTextColor(this.normalColor());
			this.titleGets++;
		}
		this.drawText(text[s], x, y, 200, this.lineHeight());
		this._tiles[index] = s;
		index++;
	}
};

Window_PlayerTitle.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
    this.update();
};

//增加对话框判定逻辑
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'S':
		//记录当前对话，如果该行有信息，则记录到临时变量3，如果该行没有信息，则将下一行信息记录到人名
		var vk = textState.text.indexOf('\n');
		if (vk == -1) {
			$w.setNames(3, textState.text.slice(textState.index));
		} else {
			$we.setName(textState.text.slice(vk + 1));
		}
		textState.text = '';
		this._pauseSkip = true;
        break;
    case '$':
        this._goldWindow.open();
        break;
    case '.':
		if (!this.isSkip()) {
			this.startWait(15);
		}
        break;
    case '|':
		if (!this.isSkip()) {
			this.startWait(60);
		}
        break;
    case '!':
        this.startPause();
        break;
    case '>':
        this._lineShowFast = true;
        break;
    case '<':
        this._lineShowFast = false;
        break;
    case '^':
        this._pauseSkip = true;
        break;
    default:
        Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
        break;
    }
};
//判定类型增加增加S
Window_Base.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = /^[\$\.\|\S\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return '';
    }
};

//-----------------------------------------------------------------------------


//窗口立绘模式
function Window_Body() {
    this.initialize.apply(this, arguments);
}

Window_Body.prototype = Object.create(Window_Base.prototype);
Window_Body.prototype.constructor = Window_Body;

Window_Body.prototype.initialize = function(index, bFace) {
    Window_Base.prototype.initialize.call(this);
	this._width = 0;
	this._height = 512;	
	this._bRight = true;
	this._index = index;
	this._bFace = bFace || false;
	this._waitTimeBlink = 100;
	this.y = Graphics.height; 
	this._waitTime114 = 0;
	this._waitTime115 = 0;
	this._waitTime116 = 0;
	this._waitTime117 = 0;
	this._waitTime118 = 0;
	this.picture();
    //this.update();
};

Window_Body.prototype.reload = function() {
	//删除所有图层
	for (var obj in this.items) {
		this.removeChild(this.items[obj]);
	}
	if ($w.getInfo('shoe').substr(0, 1) == '$') {
		this.y += 10;
	}
	this.picture();
}

Window_Body.prototype.update = function() {
    Window_Base.prototype.update.call(this);

	//主角
	if (this._index == 0 && !this._noEffect) {
		if (!this._bFace) {
			//眨眼
			this.blink();

			//淫纹效果
			this.sextattoo();

			//加载寄生动画
			this.wormPlay();
		}
	}
	/*循环变色脚本，setColorTone（色调）数组代表 R G B 对比度，setBlendColor（叠加）数组代表 R G B 叠加颜色透明度
	
	var ca = this.items['hair'].getColorTone();
	var ic = 2;
	if (ca[3] == 0) {
		if (ca[0] > 0) {
			ca[0] -= ic;
			//ca[1] -= ic;
			//ca[2] -= ic;
		} else {
			ca[3] = 1;
		}
	} else {
		if (ca[0] < 200) {
			ca[0] += ic;
			//ca[1] += ic;
			//ca[2] += ic;
		} else {
			ca[3] = 0;
		}
	}
	this.items['hair'].setColorTone(ca);
	this.items['fronthair'].setColorTone(ca);*/
};
Window_Body.prototype.blink = function() {
	this._waitTimeBlink--;
	if (this._waitTimeBlink == 0) {
		var pic = this.getPicPath('eye', 'eye3', this.items['eye']);
		this.items['eye'].bitmap = ImageManager.loadPicture(pic);
	} else if (this._waitTimeBlink <= -9) {
		this.changePBody('eye', $w.getInfo('eye'));
		this._waitTimeBlink = 100 + Math.floor(Math.random() * 200);
	}
}

Window_Body.prototype.sextattoo = function() {
	if ($gameSwitches.value(68)) {
		var lust = $w.getP('lust');
		var bSex = $gameActors.actor(1).isStateAffected(20);
		if (bSex || lust > 500) {
			var lustsex = Math.floor((lust - 500 + (bSex ? 500 : 0)) / 2);
			lustsex = lustsex > 255 ? 255 : lustsex;
			this.items['sextattoo2'].opacity = lustsex;
			if (lust > 1000) {
				if (bSex) {
					//闪烁
					if (this._sexAddOp) {
						this.items['sextattoo3'].opacity += 3;
						if (this.items['sextattoo3'].opacity >= 255) {
							this._sexAddOp = false;
						}
					} else {
						this.items['sextattoo3'].opacity -= 2;
						if (this.items['sextattoo3'].opacity <= 20) {
							this._sexAddOp = true;
						}
					}
				} else {
					lustsex = Math.floor((lust - 1000) / 10);
					lustsex = lustsex > 255 ? 255 : lustsex;
					this.items['sextattoo3'].opacity = lustsex;
				}
			} else {
				this.items['sextattoo3'].opacity = 0;
			}
		} else {
			this.items['sextattoo2'].opacity = 0;
			this.items['sextattoo3'].opacity = 0;
		}
	}
}

Window_Body.prototype.audioPlay = function(val) {
	if (!$gameSwitches.value(155)) {
		AudioManager.playSe(val);
	}
}

Window_Body.prototype.wormPlay = function() {
	var actor = $gameActors.actor(1);
	if ($w.getInfo('parface') != '') {
		var parface = this.items['parface'];
		var parface2 = this.items['parface2'];
		if (parface._bScale) {
			if (parface.scale.y < 1.007) {
				parface.scale.x -= 0.0005;
				parface.scale.y += 0.0003;
				parface2.scale.x -= 0.0005;
				parface2.scale.y += 0.0003;
			} else {
				parface._bScale = false;
				this.audioPlay({"name":"Z_Papa2","volume":90,"pitch":100,"pan":0});
			}
		} else if (!parface._bScale) {
			if (parface.scale.y > 0.997) {
				parface.scale.x += 0.0005;
				parface.scale.y -= 0.0003;
				parface2.scale.x += 0.0005;
				parface2.scale.y -= 0.0003;
			} else {
				parface._bScale = true;
			}
		}
	}
	var val = $w.getNum('parasite');
	if (val > 0) {
		var parasite = this.items['parasite'];
		var breast = [this.items['breast'], this.items['breast2'], this.items['milk']];
		if (parasite._bScale) {
			if (parasite.scale.y < 1.003) {
				parasite.scale.x -= 0.0005;
				parasite.scale.y += 0.0003;

				if (val == 1 || val > 2) {
					var blen = breast.length;
					for (var i = 0; i < blen; i++)	{
						breast[i].scale.x -= 0.0005;
						breast[i].scale.y += 0.0003;
					}
				}
			} else {
				parasite._bScale = false;
			}
		} else if (!parasite._bScale) {
			if (parasite.scale.y > 0.993) {
				parasite.scale.x += 0.0005;
				parasite.scale.y -= 0.0003;

				if (val == 1 || val > 2) {
					var blen = breast.length;
					for (var i = 0; i < blen; i++)	{
						breast[i].scale.x += 0.0005;
						breast[i].scale.y -= 0.0003;
					}
				}
			} else {
				parasite._bScale = true;
				if (val == 1) {
					$w.addPC('spermml', -1);
				} else if (val == 2) { 
					$gameActors.actor(1).gainMp(-1);
					$w.addPC('milkml', -1);
				} else {
					$gameActors.actor(1).gainMp(-1);
					$w.addPC('spermml', -1);
					$w.addPC('milkml', -1);
				}
				if (!$gameSwitches.value(155)) {
					this.audioPlay({"name":"Z_Ipsation","volume":90,"pitch":60,"pan":0});
				}
			}
		}
	}

	//亚巴顿女妖完全体的瘟疫
	if ($w.getInfo('uitem1') == 'wing20') {
		//有翅膀时为完全体
		if ($w.getNum('abadonwy') > 0) {
			$w.addNum('abadonwy', -1);
		} else {
			$w.setNum('abadonwy', 3600);
			$gamePlayer.requestAnimation(171);
		}
	}

	//获得前穴和后穴饰品的编号
	var iSound = 0;
	//前
	var pussyitem = this.items['pussyitem'];
	pussyitem._bMove = false;
	var itemId = actor._equips[12].itemId();
	val = $we.pussyType();
	if (val > 1) {
		pussyitem._bMove = true;
		iSound = val;
	} else if (val == 1) {
		if (pussyitem._bScale) {
			if (pussyitem.scale.y < 1.007) {
				pussyitem.scale.x -= 0.0005;
				pussyitem.scale.y += 0.0003;
			} else {
				pussyitem._bScale = false;
				if ($w.getInfo('cloth') != '$cloth22v2') {
					$w.mustUnEquip(195);
				}
			}
		} else if (!pussyitem._bScale) {
			if (pussyitem.scale.y > 0.997) {
				pussyitem.scale.x += 0.0005;
				pussyitem.scale.y -= 0.0003;
			} else {
				pussyitem._bScale = true;
				if (Math.random() > 0.7) { $w.addP('lust',  1); }
			}
		}
	}

	//后
	var assitem = this.items['assitem'];
	assitem._bMove = false;
	itemId = actor._equips[13].itemId();
	val = $we.assType();
	if (val > 1) {
		assitem._bMove = true;
		iSound = iSound < val ? val : iSound;
	} else if (val == 1) {
		if (assitem._bScale) {
			if (assitem.scale.y < 1.007) {
				assitem.scale.x -= 0.0004;
				assitem.scale.y += 0.0004;
			} else {
				assitem._bScale = false;
				if ($w.getInfo('cloth') != '$cloth22v2') {
					$w.mustUnEquip(205);
				}
			}
		} else if (!assitem._bScale) {
			if (assitem.scale.y > 0.997) {
				assitem.scale.x += 0.0004;
				assitem.scale.y -= 0.0004;
			} else {
				assitem._bScale = true;
				if (Math.random() > 0.7) { $w.addP('lust',  1); }
			}
		}
	}

	//特殊道具
	itemId = actor._equips[8].itemId();
	if (itemId > 195 && itemId < 200) {
		iSound = 2;
	}

	//振动棒效果
	if (pussyitem._bMove) {
		if (pussyitem._gMove) {
			if (pussyitem.y < -74) {
				pussyitem.y += 0.3;
			} else {
				pussyitem._gMove = false;
			}
		} else {
			if (pussyitem.y > -(74 + 10)) {
				pussyitem.y -= 0.6;
			} else {
				pussyitem._gMove = true;
			}
		}
	}
	if (assitem._bMove) {
		if (assitem._gMove) {
			if (assitem.y < -74) {
				assitem.y += 0.4;
			} else {
				assitem._gMove = false;
			}
		} else {
			if (assitem.y > -(74 + 10)) {
				assitem.y -= 0.8;
			} else {
				assitem._gMove = true;
			}
		}
	}
	if (iSound > 0) {
		if (this._waitTime117 > 0) {
			if (this._steps < $gameParty.steps()) {
				if (actor.mp < 1) {
					this._waitTime117 -= 8;
				} else {
					this._waitTime117 -= 20;
				}
			} else {
				this._waitTime117 --;
				if (this._waitTime117 <= 0 && actor.mp < 1 && this._waitTime118 < 210 && !$gamePlayer._stepAnime) {
					//保证振动时才响
					this._waitTime117 = 1;
				}
			}
		} else {
			if (actor.mp > 0 && Math.random() > 0.9) {
				$w.addP('lust', 5);
				this.audioPlay({"name":"Z_Feel2","volume":90,"pitch":100,"pan":0});
			} else {
				$w.addP('lust', 1);
				var ra = Math.random();
				if (ra < 0.4) {
					this.audioPlay({"name":"Z_HighHA","volume":90,"pitch":100,"pan":0});
				} else if (ra < 0.7) {
					this.audioPlay({"name":"Z_HighER","volume":90,"pitch":100,"pan":0});
				} else {
					this.audioPlay({"name":"Z_High2","volume":90,"pitch":100,"pan":0});
				}
			}
			$wb.changeFeel('feel');
			if (actor.mp < 1 && !$gamePlayer._stepAnime) {
				this._waitTime117 = 260;
			} else {
				this._waitTime117 = 110;
			}
		}

		if (this._waitTime118 > 0) {
				this._waitTime118 --;
		} else {
			this.audioPlay({"name":"Z_Zhendong2","volume":90,"pitch":100,"pan":0});
			if (Math.random() > 0.5) {
				actor.gainMp(-1);
			}
			if (actor.mp < 1) {
				this._waitTime118 = 260;
			} else {
				this._waitTime118 = 110;
			}
		}
	}

	//铃铛效果
	if ($w.getInfo('shirt') == 'shirt41v' || $w.getInfo('item2') == 'collar32') {
		if (this._waitTime116 > 0) {
				this._waitTime116 --;
		} else {
			if (this._steps < $gameParty.steps()) {
				this.audioPlay({"name":"Bell3","volume":90,"pitch":100,"pan":0});
				this._waitTime116 = 20 + Math.floor(Math.random() * 40);
				if ($gamePlayer.isRun()) {
					this._waitTime116 = Math.floor(this._waitTime116 / 2);
				}
			}
		}
	}

	//被独角兽H
	var bHorse = false;
	var cn6 = $gamePlayer.characterName().substr(0, 6);
	if (cn6 == '$m1_0_') {
		bHorse = true;
		val = 8;
	} else if (cn6 == '$m2_0_')	{
		bHorse = true;
		val = 6;
	} else if (cn6 == '$c_7' || cn6 == '$c_8') {
		bHorse = true;
		val = 3;
	}
	if (bHorse) {
		if (this._steps < $gameParty.steps()) {
			//规定步获得一次冲击，有10％的几率高潮
			var ng = this._steps % val;
			if (ng == 0) {
				if (this._waitTime115 > 0) {
					//之后6次规定步内不会高潮
					this._waitTime115 --;
				}
				if (this._waitTime114 > 0) {
					//之后6次规定步内不会射精
					this._waitTime114 --;
				}
				var ran = Math.random();
				if (Math.random() < 0.1 && this._waitTime115 == 0) {
					this._waitTime115 = 6;
					if (ran < 0.25) { $wb.showFace(2, 3); } 
					else if (ran < 0.5) { $wb.showFace(1, 4); }
					else if (ran < 0.65) { $wb.showFace(2, 6); } 
					else { $wb.showFace(1, 6); }
					$gameScreen.startFlash([255,204,255,50], 10);
					$w.addPC('high', 1);
					$w.addP('reason', -1);
					$w.addP('fall', 1);
					$w.addP('cursed', 1);
					$w.addP('lust',  3);
					AudioManager.playSe({"name":"Z_Feel","volume":90,"pitch":100,"pan":0});
					if ($gameMap.mapId() == 119) {
						//操控变量+1，记录女猪高潮次数
						$gameVariables.setValue(19, $gameVariables.value(19) + 1);
					}
				} else {
					if (val == 3) {
						if (ran > 0.75) { $w.addP('lust', 1); }
						AudioManager.playSe({"name":"Z_Papa2","volume":90,"pitch":100,"pan":0});
					} else if (val == 8) {
						if (ran > 0.75) { $w.addP('lust', 1); }
						AudioManager.playSe({"name":"Z_Papa","volume":90,"pitch":100,"pan":0});
					} else {
						if (ran > 0.9) { $w.addP('lust', 1); }
						AudioManager.playSe({"name":"Z_In","volume":90,"pitch":130,"pan":0});
					}
				}
				
				if (val == 3) {
					if (cn6 == '$c_8' && this._waitTime114 == 0 && Math.random() < 0.08) {
						this._waitTime114 = 6;
						$gameScreen.startFlash([255,255,255,170], 60);
						if ($gameVariables.value(1) == 0) {
							//处女
							$w.addSexNum(2, 1);
						} else {
							$w.addSexNum(1, 1);
						}
						$w.addSperm(2);
						AudioManager.playSe({"name":"Z_Shoot3","volume":90,"pitch":100,"pan":0});
						if ($gameMap.mapId() == 119) {
							//操控变量+1，记录教练高潮次数
							$gameVariables.setValue(20, $gameVariables.value(20) + 1);
							$we.changeSwitch(7, 'A', true);
						}
					}
				} else if (val == 6) {
					if (this._waitTime114 == 0 && Math.random() < 0.05) {
						this._waitTime114 = 6;
						$gameScreen.startFlash([255,255,255,170], 60);
						$w.addSexNum(1, 1);
						$w.addSperm(2);
						$gamePlayer.requestAnimation(120);
						actor.addState(27);
						$gameSwitches.setValue(69, false);
						$gameSwitches.setValue(84, true);
						$gameSwitches.setValue(160, true);
						$wb.parface('');
						$w.addP('obscene', -$w.getP('obscene'));
						$w.addNum('djsLove', 50 - $w.getNum('djs') * 5);
						AudioManager.playSe({"name":"Z_Shoot3","volume":90,"pitch":100,"pan":0});
						$gameSwitches.setValue(160, false);
						if ($gameMap.mapId() == 119) {
							if (ran > 0.7) {
								$we.changeSwitch(7, 'A', true);
							}
						}
					}
				}
			}
		}
	}
		
	this._steps = $gameParty.steps();
}
Window_Body.prototype.picture = function() {
	//配件
	this.items = {};
	if (this._index == 0) {
		//主角
		if (!this._bFace) {
			this.addPBody('under', 0, 12);
			this.addPBody('uitem1', 0, 12);
			this.addPBody('ucape', 0, 12);
			this.addPBody('ucap', 0, 12);
			this.addPBody('uassitem', -5, -62);
			this.addPBody('uweapon', 0, 12 + $w.getNum('weapony'));
			this.addPBody('hair', 0, 0);
			this.addPBody('uitem2', 0, 12);
			this.addPBody('cape', 0, 12);
			this.addPBody('uspecial', 0, 12);
			this.addPBody('skirt', 0, 12);
			this.addPBody('shirt3', 0, 12);
			this.addPBody('assitem', -5, -62);
			this.addPBody('ubody', 0, 12);
			this.addPBody('pussyitem', -5, -62);
			this.addPBody('fuck', 0, 12);
			this.addPBody('ulefthand', -8, -201);
			this.addPBody('ushirt2', -33, -201);
			this.addPBody('uhand', -33, -201);
			this.addPBody('uhead', 0, -238);
			this.addPBody('body', 0, 12);
			this.addPBody('pussy', -11, -240);
			this.addPBody('urighthand', -33, -201);
			this.addPBody('breast', 26, -289);
			this.addPBody('breast2', 26, -289);
			this.addPBody('milk', 26, -289);
			this.addPBody('sextattoo1', 4, -192);
			this.addPBody('tattoo', 0, 12);
			this.addPBody('sextattoo2', 4, -192);
			this.addPBody('ushirt', 13, -202);
			this.addPBody('secretion', 0, 12);
			this.addPBody('shirt2', -33, -201);
			if ($w.getNum('vaginPostion') == 0) {
				this.addPBody('vagin', 0, 12);
				this.addPBody('shirt', 0, 12);
			} else {
				this.addPBody('shirt', 0, 12);
				this.addPBody('vagin', 0, 12);
			}
			this.addPBody('sextattoo3', 4, -192);
			this.addPBody('ushoe', -8, 12);
			this.addPBody('front1', 0, 12);
			this.addPBody('righthand', -33, -201);
			this.addPBody('lefthand', -8, -201);
			this.addPBody('hand', -33, -201);
			this.addPBody('shoe', -8, 12);
			this.addPBody('item1', 0, 12);
			this.addPBody('parasite', 13, -202);
			this.addPBody('weapon', 0, 12 + $w.getNum('weapony'));
			this.addPBody('cloth', 0, 12);
			this.addPBody('item2', 0, 12);
			this.addPBody('necklock', 0, 12);
			this.addPBody('shield', 0, 12);
			this.addPBody('face', 17, -398);
			this.addPBody('facetattoo', 17, -398);
			this.addPBody('eye', 13, -397);
			this.addPBody('feel', 18, -391);
			this.addPBody('faceitem', 0, 12);
			this.addPBody('special', 0, 12);
			this.addPBody('fronthair', 30, -136 + $w.getNum('fronthair'));
			this.addPBody('head', 18, -392);
			this.addPBody('cap', 0, -188);
			this.addPBody('fitem1', 0, 12);
			this.addPBody('parface', 0, -388);
			this.addPBody('parface2', 0, -388);
			this.addPBody('urine', 0, 12);
			this.addPBody('urineface', 22, -380);
			this.addPBody('sperm', 0, 12);
			this.addPBody('spermface', 22, -380);
			this.addPBody('front2', 0, 12);
			this.addPBody('light', 0, 12 + $w.getNum('weapony'));
			this.addPBody('fuck2', 0, 12);
			this.addPBody('damage', 0, 12);
			this.addPBody('front3', 0, 12);
			//this.addPBody('abadon', 20, -200);
			//伤害透明化
			this.changePOpacity('damage', 0);
			this.useCape();
			this.useCloth();
		} else {
			this.addPBody('under', 0, 12);
			this.addPBody('uitem1', 0, 12);
			this.addPBody('ucape', 0, 12);
			this.addPBody('ucap', 0, 12);
			this.addPBody('hair', 0, 0);
			this.addPBody('uitem2', 0, 12);
			this.addPBody('cape', 0, 12);
			this.addPBody('uspecial', 0, 12);
			this.addPBody('shirt3', 0, 12);
			this.addPBody('ulefthand', -8, -201);
			this.addPBody('ushirt2', -33, -201);
			this.addPBody('uhand', -33, -201);
			this.addPBody('uhead', 0, -238);
			this.addPBody('body', 0, 12);
			this.addPBody('urighthand', -33, -201);
			this.addPBody('breast', 26, -289);
			this.addPBody('breast2', 26, -289);
			this.addPBody('milk', 26, -289);
			this.addPBody('tattoo', 0, 12);
			this.addPBody('ushirt', 13, -202);
			this.addPBody('shirt2', -33, -201);
			this.addPBody('shirt', 0, 12);
			this.addPBody('righthand', -33, -201);
			this.addPBody('lefthand', -8, -201);
			this.addPBody('hand', -33, -201);
			this.addPBody('item1', 0, 12);
			this.addPBody('parasite', 13, -202);
			this.addPBody('cloth', 0, 12);
			this.addPBody('item2', 0, 12);
			this.addPBody('necklock', 0, 12);
			this.addPBody('face', 17, -398);
			this.addPBody('facetattoo', 17, -398);
			this.addPBody('eye', 13, -397);
			this.addPBody('feel', 18, -391);
			this.addPBody('faceitem', 0, 12);
			this.addPBody('special', 0, 12);
			this.addPBody('fronthair', 30, -136 + $w.getNum('fronthair'));
			this.addPBody('head', 18, -392);
			this.addPBody('cap', 0, -188);
			this.addPBody('fitem1', 0, 12);
			this.addPBody('parface', 0, -388);
			this.addPBody('parface2', 0, -388);
			this.addPBody('urine', 0, 12);
			this.addPBody('urineface', 22, -380);
			this.addPBody('sperm', 0, 12);
			this.addPBody('spermface', 22, -380);
			this.useCape();
		}
		
		this.changePOpacity('weapon', $w.getNum('weapon'));
		this.changePOpacity('uweapon', $w.getNum('weapon'));
		this.changePOpacity('light', $w.getNum('weapon'));
		this.changePOpacity('head', $w.getNum('head'));
		this.changePOpacity('hand', $w.getNum('hand'));
		this.changePOpacity('uhand', $w.getNum('uhand'));
		this.changePOpacity('shirt2', $w.getNum('hand'));
		this.changePOpacity('ushirt2', $w.getNum('uhand'));
		//this.changePOpacity('cloth', $w.getNum('cloth'));
		this.changePOpacity('parface', $w.getNum('parface'));
		this.changePOpacity('pussyitem', $w.getNum('pussyitem'));
		this.changePOpacity('assyitem', $w.getNum('assyitem'));
		this.showShirt();
		this.showPussy();
		this.showVagin();
		this.loadHairColor();
		this.loadBodyColor();
		this.loadFaceColor();
		this.loadEyeColor();
	} else {
		this.addItem('damage', this.loadParty(), 0, 0);
	}
};

Window_Body.prototype.getFileBase = function() {
	return 'lilina';
}

Window_Body.prototype.showHand = function() {
	if ($w.getInfo('ulefthand') != 'lefthand' || ($w.getInfo('urighthand') != 'righthand' && $w.getInfo('urighthand') != 'righthandf')) {
		$w.setNum('hand', 0);
		$w.setNum('uhand', 0);
		this.changePOpacity('hand', 0);
		this.changePOpacity('uhand', 0);
		this.changePOpacity('shirt2', 0);
		this.changePOpacity('ushirt2', 0);
	} else {
		$w.setNum('hand', 255);
		$w.setNum('uhand', 255);
		this.changePOpacity('hand', 255);
		this.changePOpacity('uhand', 255);
		this.changePOpacity('shirt2', 255);
		this.changePOpacity('ushirt2', 255);
	}
}

Window_Body.prototype.showShirt = function() {
	var shirt = $wolfzqPlayer.getInfo('shirt');
	if ($w.getNum('gravidity') > 0) {
		/*if (shirt == 'shirt2' || shirt == 'shirt5') {
			this.changePOpacity('shirt', 255);
			this.changePOpacity('shirt2', 255);
			this.changePOpacity('ushirt2', 255);
		} else {
			this.changePOpacity('shirt', 0);
			this.changePOpacity('shirt2', 0);
			this.changePOpacity('ushirt2', 0);
		}*/
	} else {
		var cloth = $w.getInfo('cloth');
		switch (cloth)		{
			case '$cloth18':
			case '$cloth49':
			case '$cloth61':
			case '$cloth64':
				if ($w.getInfo('shirt') == 'shirt61') {
					this.changePOpacity('shirt', 255);
					this.changePOpacity('shirt3', 255);
				} else {
					this.changePOpacity('shirt', 0);
					this.changePOpacity('shirt3', 0);
				}
				this.changePOpacity('ushirt', 0);
				//this.changePOpacity('shirt2', 0);
				//this.changePOpacity('ushirt2', 0);
				break
			default:
				this.changePOpacity('shirt', 255);
				this.changePOpacity('shirt3', 255);
				this.changePOpacity('ushirt', $w.getNum('ushirt'));
				//this.changePOpacity('shirt2', 255);
				//this.changePOpacity('ushirt2', 255);
		}
	}
}

Window_Body.prototype.showPussy = function() {
	//发情，装备震动道具的情况下，显示开B，否则不显示
	var actor = $gameActors.actor(1);
	if ((!actor.isStateAffected(20) && $w.getInfo('pussyitem') == '' && $w.getInfo('assitem') == '' && $w.getP('lust') < 500) || !this.watchCloth()) {
		if ($w.getInfo('pussy') != '') {
			this.changePBody('pussy', '');
		}
	} else {
		if ($w.getInfo('pussy') == '') {
			this.changePBody('pussy', 'pussy');
		}
	}
}

Window_Body.prototype.showVagin = function() {
	//贞操带隐藏前后穴道具
	var item1 = $w.getInfo('vagin');
	var item2 = $w.getInfo('parasite');
	if (item1 != 'belt6' && item2 != 'parasite2' && item2 != 'parasite3') {
		this.changePOpacity('pussyitem', 255);
		this.changePOpacity('assitem', 255);
	} else {
		this.changePOpacity('pussyitem', 0);
		this.changePOpacity('assitem', 0);
	}
}

Window_Body.prototype.loadHairColor = function() {
	if ($wolfzqPlayer._hairColor) {
		var ca = $wolfzqPlayer._hairColor;
		this.items['hair'].setColorTone(ca);
		this.items['fronthair'].setColorTone(ca);
	}
}
Window_Body.prototype.loadFaceColor = function() {
	if ($w._faceColor) {
		var ca = $w._faceColor;
		this.items['face'].setColorTone(ca);
	}
}
Window_Body.prototype.loadBodyColor = function() {
	if ($w._bodyColor) {
		var ca = $w._bodyColor;
		this.items['breast'].setColorTone(ca);
		this.items['body'].setColorTone(ca);
		if (this.items['ubody']) {
			this.items['ubody'].setColorTone(ca);
		}
		this.items['ulefthand'].setColorTone(ca);
		this.items['lefthand'].setColorTone(ca);
		this.items['urighthand'].setColorTone(ca);
		this.items['righthand'].setColorTone(ca);
	}
}
Window_Body.prototype.loadEyeColor = function() {
	if ($wolfzqPlayer._eyeColor) {
		var ca = $wolfzqPlayer._eyeColor;
		this.items['eye'].setColorTone(ca);
	}
}

Window_Body.prototype.loadParty = function() {
	var member = $gameParty.battleMembers()[this._index];
	return member.faceName() + '_' + member.faceIndex();
};

Window_Body.prototype.addPBody = function(id, px, py) {
	var pic = $wolfzqPlayer.getInfo(id);
	var picname = pic;
	var item = new Sprite_Base();
	pic = this.getPicPath(id, pic, item);
	item.bitmap = ImageManager.loadPicture(pic);
	item.anchor.x = 0.5;
	item.anchor.y = 1;
	if (this._bFace && item.bitmap.width) {
		var fw = item.bitmap.width;
		var fh = item.bitmap.height;
		var fmx = 500;
		//宽度的一半
		var fmhw = 72;
		var fmy = 512;
		if (id == 'uhead') {
			fmy = 762
		}
		//定位一个点，算法执行切出需要的脸部
		var fx = -16;
		var fy = 344;

		var sx = 0, sy = 0, sw = fw, sh = fh;
		//pl pr tl tr dl dr
		var pl = fx + px - fw / 2;
		var pr = fx + px + fw / 2;
		var tl = fx - fmhw;
		var tr = fx + fmhw;

		//X轴
		if (pr < tl || pl > tr) {
			//不画
			sw = 0;
		} else if (pl < tl && pr > tr) {
			//外
			sx = tl - pl - fx;
			sw = fmhw * 2;
			px -= (pr + pl) / 2;
		} else if (pl < tl) {
			//左侧
			sx = pl - fx;
			sw = fw - pl + fmhw;
			px -= (pl - fmhw) / 2;
		} else if (pr > tr) {
			//右侧
			sw = fw - pr + fmhw;
			if (fw < sw) {
				//图片左侧太少，导致截取范围大于图片宽度，需要对顶点进行补偿
				px += (fw - sw) / 2;
			}
			px -= (pr - fmhw) / 2;
		}
		//Y轴
		if (-py < fy) {
			sy = 0;
			if (-py + fh < fmy) {
				sh = (-py + fh) - fy;
			} else {
				sh = fmy - fy;
			}
			if (id == 'cap') {
				sh += 76;
			}
			py = -fy;
		}
		item.setFrame(sx, -sy, sw, sh);
	}
	item.x = px;
	if ((id == 'shoe' || id == 'ushoe')) {
		if (picname.length > 0 && picname.substr(0, 1) == '$') {
			//当前装备为高跟时，如果更换装备为非高跟，则改变py
			py += 20;
			this.y -= 5;
		}
	}
	item.y = py - 12;
	this.addChild(item);
	this.items[id] = item;
	return true;
};

Window_Body.prototype.changePBody = function(id, pic, px, py) {
	if (this.items[id]) {
		var oldpic = $w.getInfo(id);
		var picname = pic;
		$w.setInfo(id, pic);
		pic = this.getPicPath(id, pic, this.items[id]);
		this.items[id].bitmap = ImageManager.loadPicture(pic);
		px = px || this.items[id].x;
		py = py || this.items[id].y;
		switch (id)	{
			case 'shoe':
			case 'ushoe':
				if (oldpic.length > 0 && oldpic.substr(0, 1) == '$') {
					//当前装备为高跟时，如果更换装备为非高跟，则改变py
					if (picname.length == 0 || picname.substr(0, 1) != '$') {
						py -= 20;
						this.y += 5;
					}
				} else {
					//当前装备为非高跟时，如果更换装备为高跟，则改变py
					if (picname.length > 0 && picname.substr(0, 1) == '$') {
						py += 20;
						this.y -= 5;
					}
				}
			break;
			case 'urighthand':
				if (picname != 'righthand') {
					if ($w.getInfo('spermfile') == 'sperm' + ImageManager.gx() + '2v') {
						$wb.setSperm('2');
					}
				} else {
					if ($w.getInfo('spermfile') == 'sperm' + ImageManager.gx() + '2') {
						$wb.setSperm('2v');
					}
				}
			break;
			case 'breast':
				if (oldpic != picname) {
					$w.getInfo('breast', picname);
					this.changePBody('cloth', $w.getInfo('cloth'));
					this.changePBody('shirt', $w.getInfo('shirt'));
				}
			break;
		}
		if ((id == 'shoe' || id == 'ushoe')) {
		}
		this.items[id].x = px;
		this.items[id].y = py;
		if (id == 'cloth' || id == 'ushirt') {
			this.useCloth();
			this.useCape();
		}
		if (id == 'cloth' || id == 'assitem' || id == 'pussyitem') {
			this.showPussy();
		}
		if (id == 'hand' || id == 'uhand' || id == 'ulefthand' || id == 'urighthand') {
			this.useCape();
		}
		if (id == 'ulefthand' || id == 'righthand') {
			this.showHand();
		}
		if (id == 'vagin') {
			this.showVagin();
		}
	}
};

Window_Body.prototype.getPicPath = function(id, pic, obj) {
	if ($gameSwitches.value(124) || $gameActors.actor(1).isStateAffected(40)) {
		//如果光系淫魔法发动，则部分部位无法穿衣
		switch (id)	{
			case 'weapon':
			case 'uweapon':
			case 'light':
			case 'cloth':
			case 'cape':
			case 'shirt':
			case 'shoe':
			case 'ushoe':
			case 'hand':
			case 'uhand':
			case 'ushirt':
			case 'shirt2':
			case 'ushirt2':
				pic = '';
				break;
		}
	}
	switch(id) {
		case 'face':
			if (pic != '')
				pic = $w.getInfo('facefile') + ImageManager.gx() + pic;
			break;
		case 'eye':
		case 'feel':
			if (pic != '')
				pic = $w.getInfo('eyefile') + ImageManager.gx() + pic;
			break;
		case 'body':
			if (pic != '')
				pic = $w.getInfo('bodyfile') + ImageManager.gx() + pic;
			break;
		case 'breast':
			if (pic != '')
				pic = $w.getInfo('breastfile') + ImageManager.gx() + pic;
			break;
		case 'breast2':
			if (pic != '')
				pic = 'breast' + ImageManager.gx() + pic;
			break;
		case 'milk':
			if ($w.getInfo('milkfile') != '') {
				if (pic != '')
					pic = $w.getInfo('milkfile') + ImageManager.gx() + pic;
			}
			break;
		case 'hair':
		case 'fronthair':
			if (pic != '')
				pic = $w.getInfo('hairfile') + ImageManager.gx() + pic;
			break;
		case 'sperm':
		case 'spermface':
		case 'urine':
		case 'urineface':
			if (pic != '')
				pic = $w.getInfo('spermfile') + ImageManager.gx() + pic;
			break;
		case 'shirt':
			$wb.changeBreast();
			if (!$wb.commonShirt(pic)) {
				var type = $w.getNum('bodyType');
				switch (type) {
					case 1:
					case 2:
					case 4:
						if (($wb.clothBreast() || $wb.commonCloth($w.getInfo('cloth'))) && $wb.shirtBreast()) {
							pic += 'b';
						} 
						break;
				}
			}
			if (pic != '') {
				var body = $w.getInfo('body');
				if (body == 'body') {
					pic = 'shirt' + ImageManager.gx() + '0' + ImageManager.gx() + pic;
				} else if (body == 'body2') {
					pic = 'shirt' + ImageManager.gx() + '1' + ImageManager.gx() + pic;
				} else {
					pic = '';
				}
			}
			break;
		case 'shirt2':
			if (pic != '') {
				if ($w.getInfo('urighthand') != 'righthand' && pic.substr(0, 1) == '$') {
					pic = $w.getInfo('shirtfile') + ImageManager.gx() + 'f' + ImageManager.gx() + pic;
				} else {
					pic = $w.getInfo('shirtfile') + ImageManager.gx() + pic;
				}
			}
			break;
		case 'shirt3':
		case 'ushirt2':
			if (pic != '') {
				var body = $w.getInfo('body');
				if (body == 'body') {
					pic = 'shirt' + ImageManager.gx() + '0' + ImageManager.gx() + pic;
				} else if (body == 'body2') {
					pic = 'shirt' + ImageManager.gx() + '1' + ImageManager.gx() + pic;
				} else {
					pic = '';
				}
			}
			break;
		case 'vagin':
			if (!this.watchCloth()) {
				pic = 'null'
			} else {
				var oldPic = pic;
				if (pic != '') {
					var body = $w.getInfo('body');
					if (body == 'body') {
						pic = 'shirt' + ImageManager.gx() + '0' + ImageManager.gx() + pic;
					} else if (body == 'body2') {
						pic = 'shirt' + ImageManager.gx() + '1' + ImageManager.gx() + pic;
					} else {
						pic = '';
					}
				}
				//如果需要显示样式，并且不是魔钢贞操带
				if (pic != '') {
					if (!$gameActors.actor(1).isEquipped($dataArmors[66])) {
						pic += $w.getInfo('vaginFile');
					} else {
						//根据类型进行变化
						var rep = $w.getInfo('vaginType') + oldPic;
						pic = pic.replace(oldPic, rep);
					}
				}
			}
			break;
		case 'head':
			if (pic != '') {
				if ($w.getInfo('headfile') != '') {
					pic += $w.getInfo('headfile');
				}
			}
			break;
		case 'ushirt':
			if (pic != '') {
				if (pic == 'chain2') {
					var bf = $w.getInfo('breastfile');
					if (bf.length > 1) {
						bf = bf.substr(bf.length - 1, 1);
					} else {
						bf = '';
					}
					if (bf == '2') {
						pic = 'chain3';
					} 
					if (bf == '3' || bf == '4') {
						pic = 'chain';
					} else {
						var type = $w.getNum('bodyType');
						switch (type) {
							case 1:
							case 2:
							case 4:
								if (($wb.clothBreast() || $wb.commonCloth($w.getInfo('cloth'))) && $wb.shirtBreast()) {
									pic += 'b';
								}
							break;
							case 5:
								pic += 'b2';
							break;
						}
					}
				}
				pic = $w.getInfo('shirtfile') + ImageManager.gx() + pic;
			}
			break;
		case 'parasite':
			if (pic != '') {
				var type = $w.getNum('bodyType');
				switch (type) {
					case 1:
					case 2:
					case 4:
						pic += 'b';
					break;
					case 5:
						pic = 'parasite4';
					break;
				}
				pic = $w.getInfo('shirtfile') + ImageManager.gx() + pic;
			}
			break;
		case 'ulefthand':
		case 'urighthand':
		case 'righthand':
		case 'lefthand':
			if (pic != '')
				pic = $w.getInfo('handfile') + ImageManager.gx() + pic;
			break;
		case 'sextattoo1':
		case 'sextattoo2':
		case 'sextattoo3':
			if (pic != '') {
				var body = $w.getInfo('body');
				if (body == 'body') {
					pic = 'shirt' + ImageManager.gx() + '0' + ImageManager.gx() + $w.getInfo('sextattoofile') + ImageManager.gx() + pic;
				} else if (body == 'body2') {
					pic = 'shirt' + ImageManager.gx() + '1' + ImageManager.gx() + $w.getInfo('sextattoofile') + ImageManager.gx() + pic;
				} else {
					pic = '';
				}
			}
			break;
		case 'front2':
			if ($w.getInfo('urighthand') != 'righthand' && pic.substr(0, 1) == '$') {
				pic = 'cloth' + ImageManager.gx() + pic;
			}
			break;
		case 'cloth':
			//特殊服装处理胸部-------------
			switch (pic) {
				case '$cloth18':
				case '$cloth49':
				case '$cloth61':
				case '$cloth64':
					this.changePOpacity('breast', 0);
					this.changePOpacity('milk', 0);
					this.changePOpacity('shirt2', 0);
					this.changePOpacity('ushirt2', 0);
					this.changePOpacity('ushirt', 0);
					if ($w.getInfo('shirt') == 'shirt61') {
						this.changePOpacity('shirt', 255);
						this.changePOpacity('shirt3', 255);
					} else {
						this.changePOpacity('shirt', 0);
						this.changePOpacity('shirt3', 0);
					}
					break
				default:
					this.changePOpacity('breast', 255);
					this.changePOpacity('milk', 255);
					this.changePOpacity('shirt', 255);
					this.changePOpacity('shirt2', 255);
					this.changePOpacity('ushirt2', 255);
					this.changePOpacity('shirt3', 255);
					this.changePOpacity('ushirt', $w.getNum('ushirt'));
			}
			//------------------------------
			if (pic == '') {
				pic = 'null';
			} else {
				$wb.changeBreast();
				//判定手臂状态
				if (!$wb.commonCloth(pic)) {
					var type = $w.getNum('bodyType');
					switch (type) {
						case 1:
						case 4:
							//在受孕情况下，特殊涨乳涨肚服装+b1处理
							if ($wb.clothBreast() && ($wb.shirtBreast() || $wb.commonShirt($w.getInfo('shirt')))) {
								pic += 'b1';
							} else {
								pic = 'null';
							}
							break;
						case 2:
							//在涨乳情况下，特殊涨乳服装+b2处理
							if ($wb.clothBreast() && ($wb.shirtBreast() || $wb.commonShirt($w.getInfo('shirt')))) {
								pic += 'b2';
							} else {
							}
							break;
						case 3:
							//在涨肚情况下，特殊涨肚服装+b3处理
							if ($wb.clothBreast() && ($wb.shirtBreast() || $wb.commonShirt($w.getInfo('shirt')))) {
								pic += 'b3';
							} else {
								pic = 'null';
							}
							break;
						case 5:
							//在临盆情况下，只允许特殊服装
							switch (pic) {
								case '':
								case 'cloth20':
								case 'cloth23':
								case 'cloth23v1':
									break;
								default:
									pic = 'null';
							}
							this.changePBody('ushirt', $w.getInfo('ushirt'));
							this.changePBody('shirt', $w.getInfo('shirt'));
							this.changePBody('shirt3', $w.getInfo('shirt3'));
							this.changePBody('parasite', $w.getInfo('parasite'));
							this.changePBody('vagin', $w.getInfo('vagin'));
							this.changePBody('hand', $w.getInfo('hand'));
							this.changePBody('uhand', $w.getInfo('uhand'));
							this.showPussy();
							break;
					}
				}
			}
			if ($w.getInfo('urighthand') != 'righthand' && pic.substr(0, 1) == '$') {
				pic = 'cloth' + ImageManager.gx() + pic;
			}
			if (pic === 'null') {
				this.changePOpacity('breast', 255);
				this.changePOpacity('milk', 255);
				this.changePOpacity('shirt', 255);
				this.changePOpacity('shirt2', 255);
				this.changePOpacity('ushirt2', 255);
				this.changePOpacity('shirt3', 255);
			}
			break;
		case 'weapon':
		case 'uweapon':
		case 'light':
			if (pic != '' && $w.getInfo('urighthand') != 'righthand' && pic.substr(0, 1) == '$') 
				pic = 'cloth' + ImageManager.gx() + pic;
			break;
		case 'faceitem':
			if (pic != '')
				pic = $w.getInfo('faceitemfile') + ImageManager.gx() + pic;
			break;
		case 'hand':
			if (pic != '' && $w.getInfo('urighthand') != 'righthand' && pic.substr(0, 1) == '$') 
				pic = 'cloth' + ImageManager.gx() + pic;
			break;
		case 'uhand':
			break;
		case 'skirt':
			if (pic != '' && $w.getInfo('urighthand') != 'righthand' && pic.substr(0, 1) == '$') 
				pic = 'cloth' + ImageManager.gx() + pic;
			break;
	}
	if (pic != '') {
		pic = this.getFileBase() + ImageManager.gx() + pic;
	}
	return pic;
}

Window_Body.prototype.watchCloth = function() {
	if ($w.getInfo('body') == 'body3') {
		return false;
	}
	return true;
}


Window_Body.prototype.useCloth = function() {
	return;
	var iRight = this.getRight() ? 1 : -1;
	var cloth = $w.getInfo('cloth');
	switch(cloth) {
		case '':
		case 'cloth2':
		case 'cloth3':
		case 'cloth12':
		case 'cloth19':
		case 'cloth19v1':
		case 'cloth19v2':
		case 'cloth29':
		case 'cloth38':
		case 'cloth40':
		case 'cloth45':
		case 'cloth50':
		case 'cloth50v1':
		case '$cloth6':
		case '$cloth17v2':
		case '$cloth17v3':
		case '$cloth22v2':
		case '$cloth33':
		case '$cloth36':
		case '$cloth36v1':
		case '$cloth36v2':
		case '$cloth38':
		case '$cloth40':
		case '$cloth53':
			//显示全部枷锁
			this.items['ushirt'].x = iRight * 13;
			this.items['ushirt'].y = -214;
			this.items['ushirt'].setFrame(0, 0, 194, 224);
			break;
		default:
			if (this.items['cloth']) {
				if (this.items['cloth'].opacity == 0) {
					//显示全部枷锁
					this.items['ushirt'].x = iRight * 13;
					this.items['ushirt'].y = -214;
					this.items['ushirt'].setFrame(0, 0, 194, 224);
				} else {
					//显示部分枷锁
					this.items['ushirt'].x = iRight * -11.5;
					this.items['ushirt'].y = -338;
					this.items['ushirt'].setFrame(0, 0, 145, 100);
				}
			}
	}
};
//斗篷处理
Window_Body.prototype.useCape = function() {
	var iRight = this.getRight() ? 1 : -1;
	var cloth = $w.getInfo('cloth');
	if (!$gameActors.actor(1).isStateAffected(40) && (cloth == 'cloth23' || cloth == 'cloth23v1') && this.items['cloth'] && this.items['cloth'].opacity > 0) {
		//部分部位隐藏
		if (!this._bFace) {
			this.items['ulefthand'].y = -267;
			this.items['ulefthand'].setFrame(0, 0, 246, 170);
			this.items['urighthand'].x = iRight * 42;
			this.items['urighthand'].setFrame(150, 0, 146, 224);

			this.items['hand'].x = iRight * 42;
			this.items['hand'].setFrame(150, 0, 146, 224);
			this.items['uhand'].y = -267;
			this.items['uhand'].setFrame(0, 0, 296, 170);

			this.items['shirt2'].x = iRight * 42;
			this.items['shirt2'].setFrame(150, 0, 146, 224);
			this.items['ushirt2'].y = -297;
			this.items['ushirt2'].setFrame(0, 0, 296, 140);

			this.items['shirt'].x = iRight * -92;
			this.items['shirt'].setFrame(0, 0, 316, 500);
			this.items['shirt3'].x = iRight * -92;
			this.items['shirt3'].setFrame(0, 0, 316, 500);
		}
		//隐藏项圈
		if (this.items['item2']) {
			this.items['item2'].opacity = 0;
		}
	} else {
		if (!this._bFace) {
			this.items['ulefthand'].y = -213;
			this.items['ulefthand'].setFrame(0, 0, 246, 224);
			this.items['urighthand'].x = iRight * -33;
			this.items['urighthand'].setFrame(0, 0, 296, 224);

			this.items['hand'].x = iRight * -33;
			this.items['hand'].setFrame(0, 0, 296, 224);
			this.items['uhand'].y = -213;
			this.items['uhand'].setFrame(0, 0, 296, 224);

			this.items['shirt2'].x = iRight * -33;
			this.items['shirt2'].setFrame(0, 0, 296, 224);
			this.items['ushirt2'].y = -213;
			this.items['ushirt2'].setFrame(0, 0, 296, 224);

			this.items['shirt'].x = 0;
			this.items['shirt'].setFrame(0, 0, 500, 500);
			this.items['shirt3'].x = 0;
			this.items['shirt3'].setFrame(0, 0, 500, 500);
		}
		//显示项圈
		if (this.items['item2']) {
			this.items['item2'].opacity = 255;
		}
	}
}

Window_Body.prototype.changePOpacity = function(id, val) {
	if (this.items[id]) {
		this.items[id].opacity = val;
	}
}

Window_Body.prototype.addItem = function(id, pic, px, py) {
	var item = new Sprite_Base();
	item.bitmap = ImageManager.loadPicture(pic);
	item.anchor.x = 0.5;
	item.anchor.y = 1;
	item.x = px;
	item.y = py;
	this.addChild(item);
	this.items[id] = item;
};

Window_Body.prototype.changeItem = function(id, pic, px, py) {
	if (this.items[id]) {
		this.items[id].bitmap = ImageManager.loadPicture(pic);
		this.items[id].x = px || this.items[id].x;
		this.items[id].y = py || this.items[id].y;
	}
};

Window_Body.prototype.setRight = function(val) {
	if (val) {
		this._bRight = true;
		//右侧
		if ($gameSwitches.value(172)) {
			return;
		}
		for(var it in this.items){
			this.items[it].scale.x = 1;
			this.items[it].x = this._width - this.items[it].x;
		}
	} else {
		this._bRight = false;
		//左侧
		if ($gameSwitches.value(172)) {
			return;
		}
		for(var it in this.items){
			this.items[it].scale.x = -1;
			this.items[it].x = this._width - this.items[it].x;
		}
	}
};

Window_Body.prototype.getRight = function() {
	return this._bRight;
}