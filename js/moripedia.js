const THUMB_WIDTH = 64;
const THUMB_HEIGHT = 64;
const ICON_WIDTH = 18;
const ICON_HEIGHT = ICON_WIDTH;
const REL_ICON_WIDTH = 28;
const REL_ICON_HEIGHT = REL_ICON_WIDTH;
const MARK_WIDTH = 48;
const MARK_HEIGHT = MARK_WIDTH;

MAP_FILTER_DEBUFF = { 'checked_id': new Set() };
MAP_FILTER_BUFF = { 'checked_id': new Set() };
MAP_FILTER_EFFECT = { 'checked_id': new Set() };
MAP_FILTER_RELATION = { 'checked_id': new Set() };
MAP_FILTER_SPE_4 = { 'checked_id': new Set() };
MAP_FILTER_SPE_5 = { 'checked_id': new Set() };

const filter_tag = 'filter-hide-' + 'sn';

function findServantByName() {
    var filter_name = $('input#inputServantName').val().trim();
    if(filter_name.length == 0)     return;

    $('tr').removeClass(filter_tag);

    $('tr[' + ATTR_FILTER_ELEMENT + ']').filter(function() {
        var sname = new String( $(this).attr(ATTR_SERVANT_NAME) );
        return sname && sname.indexOf(filter_name) == -1;
    }).addClass(filter_tag);

    _showResultCount();
}

function resetSearchName() {
    $('input#inputServantName').val('');
    
    $('tr').removeClass(filter_tag);
    
    _showResultCount();     
}

function makeRow() {
    return $('<div>', {'class': 'row'});
}

function makeCol(num) {
    return $('<div>', {'class': 'col-md-' + num + ' col-xs-' + num});
}
function makeColCenter(num) {
    return makeCol(num).attr('style', 'text-align: -webkit-center;');
}

function makeHead() {
    return $('<h5>', {'class': 'cell-header'});
}

function makeHr() {
    return $('<hr>', {'class': 'separator'});
}

function makeTagImage(img_src, img_name, desc, width, height) {
    var style = '';
    if (width)  style += 'width: ' + width + 'px; ';
    if (height)  style += 'height: ' + height + 'px;';
    var $img = $('<img>', {
        'class': 'media-object',
        'alt': img_name,
        'src': img_src,
        'style': style,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': desc,
    });

    return $img;
}

function makeSkillImage(img_src, element, width, height) {
    var background_img_src = PATH_IMAGE + 'skill_' + element + '.png';

    var $c = $('<div>', { 
        style: 'position: relative; width: ' + width + 'px; height: ' + height + 'px;' 
    });

    $('<img>', { 
        src: background_img_src,
        style: 'position: absolute; left: 1px; top: 1px;',
        'class': 'media-object'
    }).appendTo($c);

    var $skillImg = $('<img>', {
        src: img_src,
        style: 'position: absolute; width: 100%; height: 100%;',
        'class': 'media-object'
    });
    $skillImg.appendTo($c);

    return $c;
}

function makeTagImageEmptySkill() {
    var $img = makeTagImage(PATH_IMAGE + IMAGE_EMPTY_EFFECT, 'effet', 'effet', ICON_WIDTH - 4);   
    $img.attr('style', $img.attr('style') + '; margin: 2px;');
    $img.removeAttr('data-toggle', '');
    $img.removeAttr('title', '');

    return $img;
}
function makeTagImageEmptyCharacter() {
    var $img = makeTagImage(PATH_IMAGE + IMAGE_EMPTY_CHARACTER, 'image cible', '', REL_ICON_WIDTH - 4, REL_ICON_HEIGHT - 4);   
    $img.attr('style', $img.attr('style') + '; margin: 2px;');
    $img.removeAttr('data-toggle', '');
    $img.removeAttr('title', '');

    return $img;
}

function makeServantInfo($parent, s) {
    var $row = makeRow();
    var $frame = $('<div>', {'class': 'media'});
    var $media = $('<div>', {'class': 'media-left media-middle'});
    var $img = makeTagImage(s.img, s.name, s.name, THUMB_WIDTH, THUMB_HEIGHT);
	var $img_border = $('<div>', {'style': 'position: relative; border: 3px solid ' + s.element.color + '; background-color:' + s.element.color_bg + ';'});
    $img.appendTo($('<a>').attr('href', '#').appendTo($img_border));
    var rank = '';
    for (var i = 0; i < Number(s.rank); i++)
        rank += '★';
    var $rank = $('<div>', {'style': 'position: absolute; top: 47px; left: 0; color: #ffc321; width: 100%; text-align: center; letter-spacing: -2px;'}).text(rank);
    $rank.appendTo($img_border);
	var rankT = '';
    for (var i = 0; i < Number(s.rank); i++)
        rankT += '☆';
    var $rankT = $('<div>', {'style': 'position: absolute; top: 47px; left: 0; color: rgba(0, 0, 0, 0.2); width: 100%; text-align: center; letter-spacing: -2px;'}).text(rankT);
    $rankT.appendTo($img_border);

    $img_border.appendTo($media);
    var $media_body = $('<div>', {'class': 'media-body'});
    $('<h4>', {'class': 'media-heading cell-header'}).text(s.name).appendTo($media_body);
    var $role_icon = makeTagImage(s.type[0].img, s.type[0].text, s.type[0].text, ICON_WIDTH).attr('class', 'role-icon');
    $('<p>').text(s.type[0].text).appendTo($media_body).prepend($role_icon);
    $('<p>').text(s.job[0].text).appendTo($media_body);
    $media.appendTo($frame);
    $media_body.appendTo($frame);
    $frame.appendTo($row);
    $row.appendTo($parent);

    makeHr().appendTo($parent);

    $row = makeRow();
    $c1 = makeColCenter(6);
    $c2 = makeColCenter(6);
    makeHead().text('Marque primaire').appendTo($c1);
    makeTagImage(s.primary_mark.img, s.primary_mark.text, s.primary_mark.text, MARK_WIDTH).appendTo($c1);
    makeHead().text('Marque secondaire').appendTo($c2);
    makeTagImage(s.secondary_mark.img, s.secondary_mark.text, s.secondary_mark.text, MARK_WIDTH).appendTo($c2);
    $c1.appendTo($row);
    $c2.appendTo($row);
    $row.appendTo($parent);

    makeHr().appendTo($parent);
}

function _makeRelationEffects($parent, s, list) {
    for (var idx in list) {
        var item = list[idx];
        
        var $frame = $('<div>', {'class': 'media skill-list'});
        var $media = $('<div>', {'class': 'media-left media-middle'});
        var $media_body = $('<div>', {'class': 'media-body'});

        var condition = item[1];
        var effect = item[2];
        var cls = 'condition-ally';
        if (condition.indexOf('allié') < 0)
            cls = 'condition';
        
        if (typeof(item[0]) == 'string') {  
            var servant_or_name = item[0];
            var key = getKey(servant_or_name, ELEMENT.FIRE);
            var $img = '';
            if (DICT_SERVANT[key] !== undefined) {
                var servant = DICT_SERVANT[key];
                $img = makeTagImage(servant.img, servant.name, servant.name, REL_ICON_WIDTH);
                $img.appendTo($('<a>').attr('href', '#').appendTo($media));
            } else {
                makeTagImageEmptyCharacter().appendTo($media);
                // $media.attr('style', 'padding-left: ' + REL_ICON_WIDTH + 'px;'); 
            }
			if (item.length > 3) {
				var value = item[3];
				$('<p>').html('<small class="' + cls + '">&lt;' + servant_or_name + ', ' + condition + '&gt;</small> ' + effect.text.replace('{value}', value)).appendTo($media_body);
			} else {
				$('<p>').html('<small class="' + cls + '">&lt;' + servant_or_name + ', ' + condition + '&gt;</small> ' + effect).appendTo($media_body);
			}
        } else {  
            var role_or_type = item[0];
            var $img = makeTagImage(role_or_type.img, role_or_type.text, role_or_type.desc, REL_ICON_WIDTH);
            $img.appendTo($('<a>').attr('href', '#').appendTo($media));
			if (item.length > 3) {
				var value = item[3];
				$('<p>').html('<small class="' + cls + '">&lt;' + role_or_type.text + ', ' + condition + '&gt;</small> ' + effect.text.replace('{value}', value)).appendTo($media_body);
			} else {
				$('<p>').html('<small class="' + cls + '">&lt;' + role_or_type.text + ', ' + condition + '&gt;</small> ' + effect).appendTo($media_body);
			}
        }
        $media.appendTo($frame);
        $media_body.appendTo($frame);
        $frame.appendTo($parent);
    }
}

function makeMarkRelInfo($parent, s) {
    $row = makeRow();
    $c1 = makeCol(12);
    makeHead().text('Effet de relation').appendTo($c1);
    _makeRelationEffects($c1, s, s.rel_1);
    makeHead().text('Effet de relation secondaire').appendTo($c1);
    _makeRelationEffects($c1, s, s.rel_2);
    $c1.appendTo($row);
    $row.appendTo($parent);
}

function _makePotEffects($parent, list) {
    for (var idx in list) {
        var item = list[idx];
        var $frame = $('<div>', {'class': 'media skill-list'});
        var $media = $('<div>', {'class': 'media-left media-middle'});
        var $media_body = $('<div>', {'class': 'media-body'});
        var desc = item;
        $('<p>').html(desc).appendTo($media_body);
        $media.appendTo($frame);
        $media_body.appendTo($frame);
        $frame.appendTo($parent);
    }
}

function makePotInfo($parent, s) {
    $row = makeRow();
    var $c1 = makeCol(6);
    var $c2 = makeCol(6);
    makeHead().text('Potentiel normal 1').appendTo($c1);
    _makePotEffects($c1, s.nor_1);
    makeHr().appendTo($c1);
    makeHead().text('Potentiel spécial 2').appendTo($c1);
    _makePotEffects($c1, s.spe_2);
    makeHr().appendTo($c1);
    makeHead().text('Potentiel spécial 5').appendTo($c1);
    _makePotEffects($c1, s.spe_5);
    $c1.appendTo($row);

    makeHead().text('Potentiel spécial 4').appendTo($c2);
    _makePotEffects($c2, s.spe_4);
    $c2.appendTo($row);
    $row.appendTo($parent);
}

function _makeSkillEffects($parent, list) {
    for (var idx in list) {
        var item = list[idx];
        var $frame = $('<div>', {'class': 'media skill-list'});
        var $media = $('<div>', {'class': 'media-left media-middle'});
        var $media_body = $('<div>', {'class': 'media-body'});
        var desc = '';

        if (typeof(item[0]) == 'string' && typeof(item[1]) == 'number') {
            if (item.length > 2) {
                var additional = item[2];
                desc += ' <small class="additional">(' + additional + ')</small>';
            }
            makeTagImageEmptySkill().appendTo($media);
        } else if (typeof(item[0]) == 'string') {  
            var cond_or_desc = item[0];
            desc = cond_or_desc;
            if (item.length > 1) {
                var additional = item[1];
                desc += ' <small class="additional">(' + additional + ')</small>';
            }
            makeTagImageEmptySkill().appendTo($media);
        } else {
            var skill_effect = item[0];
            var level = item[1];

            if ((skill_effect.id) && typeof(item[1]) == 'number') {
                if (skill_effect.id.startsWith('Z')) {
                    desc = skill_effect.text + ', ' + (level == 1 ? level + ' coup' : level + ' coups');
                } else if (skill_effect.id.startsWith('B') || skill_effect.id.startsWith('D')) {
                    desc = skill_effect.text;
					if (level != 0) {
						desc += ' ' + '(Niveau ' + level + ')';
					}
				} else if (skill_effect.id.startsWith('E')) {
                    desc = skill_effect.text.replace('{value}', level);
                }
            } else {
                desc = skill_effect.text.replace('{value}', level);
            }

            var $img = makeTagImage(skill_effect.img, skill_effect.text, skill_effect.desc, ICON_WIDTH);
            $img.appendTo($('<a>').attr('href', '#').appendTo($media));
        }
        $('<p>').html(desc).appendTo($media_body);
        $media.appendTo($frame);
        $media_body.appendTo($frame);
        $frame.appendTo($parent);
    }
}

function _makePassiveEffects($parent, list, isTeamBuff) {
    for (var idx in list) {
        var item = list[idx];
        
        var $frame = $('<div>', {'class': 'media skill-list'});
        var $media = $('<div>', {'class': 'media-left media-middle'});
        var $media_body = $('<div>', {'class': 'media-body'});
        if (typeof(item[1]) == 'string') {  
            var cond_or_desc = item[0];
            var effect = item[1];
			var value = item[2]
            var additional = item[3];
            var desc = '<small class="condition">' + cond_or_desc + '</small> ' + effect.replace('{value}', value);
            if (item.length > 3)
                desc += ' <small class="additional">(' + additional + ')</small>';

            if (isTeamBuff) {
                var $img = makeTagImage(PATH_IMAGE + IMAGE_TEAM_BUFF, 'Bonus d\'équipe', 'Bonus d\'équipe', ICON_WIDTH);
                $img.appendTo($('<a>').attr('href', '#').appendTo($media));
            } else {
                makeTagImageEmptySkill().appendTo($media);
                // $media.attr('style', 'padding-left: ' + ICON_WIDTH + 'px;'); 
            }
            $('<p>').html(desc).appendTo($media_body);

        } else {    
            var cond_or_desc = item[0];
            var skill_effect = item[1];
            var level = item[2];
            
            var desc = '<small class="condition">' + cond_or_desc + '</small> ' + skill_effect.text + '';
            if (level != 0) {
                if (skill_effect.id.startsWith('B') || skill_effect.id.startsWith('D')) {
                desc += ' (Niveau ' + level + ')';
                } else if (skill_effect.id.startsWith('E')) {
                desc = skill_effect.text.replace('{value}', level);
                }
            }
            if (item.length > 3) {
                var additional = item[3];
                desc += ' <small class="additional">(' + additional + ')</small>';
            }

            var $img = makeTagImage(skill_effect.img, skill_effect.text, skill_effect.desc, ICON_WIDTH);
            $img.appendTo($('<a>').attr('href', '#').appendTo($media));
            $('<p>').html(desc).appendTo($media_body);
        }
        $media.appendTo($frame);
        $media_body.appendTo($frame);
        $frame.appendTo($parent);
    }
}

function makeSkillInfo($parent, s) {
    var $row = makeRow();
    var $c1 = makeCol(6);
    var $c2 = makeCol(6);
    makeHead().text('Aptitude 1').appendTo($c1);
    _makeSkillEffects($c1, s.skill_1);
    makeHr().appendTo($c1);
    makeHead().text('Aptitude 2').appendTo($c1);
    _makeSkillEffects($c1, s.skill_2);
    makeHr().appendTo($c1);
    makeHead().text('Aptitude de combo').appendTo($c1);
    _makeSkillEffects($c1, s.skill_mark);
    $c1.appendTo($row);

    makeHead().text('Aptitude passive').appendTo($c2);
    _makePassiveEffects($c2, s.passive);
    makeHr().appendTo($c2);
    makeHead().text('Bonus d\'équipe').appendTo($c2);
    _makePassiveEffects($c2, s.team_buff, true);
    $c2.appendTo($row);
    $row.appendTo($parent);
}

function _showResultCount() {   
    $('span#resultFilter').html('<strong>Résultats :</strong>&nbsp; <em>' 
                                    + ($('tr[' + ATTR_FILTER_ELEMENT + ']').length - $('tr[class^="filter-hide-"]').length)
                                    + ' serviteur(s) correspondant(s)</em>');
}

function _makeFilterItem(label_idx, label, desc, img_src, filter_attr, filter_key, id_affix) {
    var $lb = $('<label>', {'class': 'filter-label'}).text(label);
    var $cb = $('<input>', {
        'id': 'cb-' + id_affix + '-' + filter_key.toLowerCase(),
        'type': 'checkbox',
        'aria-label': label,
        'checked': true,
    });
    var w = ICON_WIDTH + 8;
    var $img = $('<img>', {
        
        'alt': label,
        'src': img_src,
        'style': 'width:' + w + 'px; margin: 0px 4px',
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': desc,
    });

    
    var funcFilterEffect = function(thisCb, id_affix) {
        var map_filter;
        if (id_affix == 'efde')     map_filter = MAP_FILTER_DEBUFF;
        else if (id_affix == 'efbu')     map_filter = MAP_FILTER_BUFF;
        else if (id_affix == 're')       map_filter = MAP_FILTER_RELATION;
        else if (id_affix == 'efut')       map_filter = MAP_FILTER_EFFECT;
        else if (id_affix == 'spe4')       map_filter = MAP_FILTER_SPE_4;
        else if (id_affix == 'spe5')       map_filter = MAP_FILTER_SPE_5;

        map_filter[label_idx] = thisCb.checked;
        
        if (thisCb.checked)   map_filter.checked_id.add(label_idx);
        else    map_filter.checked_id.delete(label_idx);

        $('tr').filter(function(index) {
            var isShow = false;
            
            
            if (map_filter.checked_id.size > 0) {
                if ($(this).attr(filter_attr) == undefined)    return false;
                var eff_ids = $(this).attr(filter_attr).split(',');
                eff_ids.forEach(eff_id => {
                    if (map_filter[eff_id]) {
                        isShow = true;
                        return;
                    }
                });

            } else {    
                isShow = true;
            }

            if (isShow)     $(this).removeClass('filter-hide-' + id_affix);
            else     $(this).addClass('filter-hide-' + id_affix);
            
            _showResultCount();     
            return isShow;
        });
    };

    
    var funcChange;
    switch (id_affix) {
        case 'efde':
        case 'efbu':
        case 'efut':
        case 're':
        case 'spe4':
        case 'spe5':
            funcChange = function() {   return funcFilterEffect(this, id_affix); };
            $cb.attr('checked', false);
            break;

        default:    
            
            funcChange = function() {
                if (this.checked) {  
                    $('tr').filter('[' + filter_attr + '="' + filter_key + '"]').removeClass('filter-hide-' + id_affix);
                } else {    
                    $('tr').filter('[' + filter_attr + '="' + filter_key + '"]').addClass('filter-hide-' + id_affix);
                }

                _showResultCount();     
            };
    }
    $cb.change(funcChange);

    return $lb.prepend($img).prepend($cb);
}

function _getServantIndex(sname) {
    idx = SERVANT_INDEX_BY_NAME[sname];
    
    if (idx == undefined)   idx = sname;
    else    idx = ('00' + idx).substr(-3);      

    return idx;
}

function _initFilterRelation(set_targets_enemy, set_targets_ally) {
    set_targets_enemy.forEach(sname => {
        idx = 'E_' + _getServantIndex(sname);
        MAP_FILTER_RELATION[idx] = false;
    });
    set_targets_ally.forEach(sname => {
        idx = 'A_' + _getServantIndex(sname);
        MAP_FILTER_RELATION[idx] = false;
    });

    Object.keys(MAP_FILTER_RELATION).sort().forEach(map_idx => {
        if (map_idx == 'checked_id')    return;

        var idx = Number(map_idx.substr(2));    
        var sname = SERVANT_NAME_BY_INDEX[idx];
        
        if (sname == undefined)     sname = map_idx.substr(2);
        
        var el = ELEMENT.FIRE;
        if (map_idx.startsWith('A_'))
            el = ELEMENT.WATER;

        var key = getKey(sname, el);
        var o = DICT_SERVANT[key];
        var img_src = PATH_IMAGE + IMAGE_EMPTY_CHARACTER;   
        if (o !== undefined)    img_src = o.img;

        var $item = _makeFilterItem(map_idx, sname, sname, img_src, ATTR_FILTER_RELATION, key, 're');

        if (map_idx.startsWith('E_'))
            $('#filterRelationEnemy').append($item);
        else
            $('#filterRelationAlly').append($item);
    });
}

function _triggerCheckboxFrom(panel, is_checked) {
    var q = '#' + panel + ' input:checkbox:';
    if (is_checked)
        q += 'checked';
    else
        q += 'not(:checked)';
    
    $(q).trigger('click');
}
function checkEveryCheckbox(panel) {
    _triggerCheckboxFrom(panel, false);
}
function uncheckEveryCheckbox(panel) {
    _triggerCheckboxFrom(panel, true);
}

function initData() {
  
    Object.keys(ELEMENT).forEach((key, idx) => {
        var element = ELEMENT[key];
        var $item = _makeFilterItem(idx, element.text, element.text, element.img, ATTR_FILTER_ELEMENT, key, 'el');
        $('#filterElement').append($item);
    });
    Object.keys(ROLE).forEach((key, idx) => {
        var role = ROLE[key];
        if (role.img === undefined)    return;
        var $item = _makeFilterItem(idx, role.text, role.text, role.img, ATTR_FILTER_ROLE, key, 'ro');
        $('#filterRole').append($item);
    });
    Object.keys(PRIMARY_MARK).forEach((key, idx) => {
        var b = PRIMARY_MARK[key];
        var $item = _makeFilterItem(idx, b.text, b.text, b.img, ATTR_FILTER_PRIMARY_MARK, key, 'br');
        $('#filterPrimaryMark').append($item);
    });
    Object.keys(SECONDARY_MARK).forEach((key, idx) => {
        var b = SECONDARY_MARK[key];
        var $item = _makeFilterItem(idx, b.text, b.text, b.img, ATTR_FILTER_SECONDARY_MARK, key, 'brse');
        $('#filterSecondaryMark').append($item);
    });
    Object.keys(JOB).forEach((key, idx) => {
        var job = JOB[key];
        var $item = _makeFilterItem(idx, job.text, job.text, PATH_IMAGE + IMAGE_EMPTY_SKILL, ATTR_FILTER_JOB, key, 'jb');
        $('#filterJob').append($item);
    });   
    Object.keys(DEBUFF).forEach((key, idx) => {
        MAP_FILTER_DEBUFF[idx] = false;
        DEBUFF[key].id = 'D' + idx;
        var o = DEBUFF[key];
        if (o.hide !== undefined)   return;   
        var $item = _makeFilterItem(idx, o.text, o.desc, o.img, ATTR_FILTER_DEBUFF, key, 'efde');
		$('#filterDebuff').append($item);
    });
    Object.keys(BUFF).forEach((key, idx) => {
        MAP_FILTER_BUFF[idx] = false;
        BUFF[key].id = 'B' + idx;    
        var o = BUFF[key];
        if (o.hide !== undefined)   return;     
        var $item = _makeFilterItem(idx, o.text, o.desc, o.img, ATTR_FILTER_BUFF, key, 'efbu');
        $('#filterBuff').append($item);
    });
	Object.keys(EFFECT).forEach((key, idx) => {
        MAP_FILTER_EFFECT[idx] = false;
        var o = EFFECT[key];
        o.id = 'E' + idx;
        if (o.hide !== undefined) return;
        var textX = o.text.replace('{value}', 'x');
        var descX = o.desc.replace('{value}', 'x');
        var $item = _makeFilterItem(idx, textX, descX, o.img, ATTR_FILTER_EFFECT, key, 'efut');
        $('#filterEffect').append($item);
    });
    Object.keys(SPE_4).forEach((key, idx) => {
        MAP_FILTER_SPE_4[idx] = false;
        SPE_4[key].id = 'S4' + idx;
        var o = SPE_4[key];
        if (o.hide !== undefined)   return;
        var $item = _makeFilterItem(idx, o.text, o.desc, o.img, ATTR_FILTER_SPE_4, key, 'spe4');
        $('#filterSpe4').append($item);
    });
    Object.keys(SPE_5).forEach((key, idx) => {
        MAP_FILTER_SPE_5[idx] = false;
        SPE_5[key].id = 'S5' + idx;
        var o = SPE_5[key];
        if (o.hide !== undefined)   return;
        var $item = _makeFilterItem(idx, o.text, o.desc, o.img, ATTR_FILTER_SPE_5, key, 'spe5');
        $('#filterSpe5').append($item);
    });
    Object.keys(CONDITION).forEach((key, idx) => {
        if (!key.startsWith('REGION_'))    return;
        if (key == 'REGION_STAGE' || key == 'REGION_INVASION')    return;     

        var region = CONDITION[key];
        var $item = _makeFilterItem(idx, region, region, PATH_IMAGE + IMAGE_TEAM_BUFF, ATTR_FILTER_TEAMBUFF, region, 'te');
        $('#filterTeamBuff').append($item);
    });

    var TEMP_FILTER_SET_RELATION_ENEMY = new Set();     
    var TEMP_FILTER_SET_RELATION_ALLY = new Set();
    var count = 0;      
    Object.keys(SERVANT_NAME).reverse().forEach(k => {
        count++;
        for (idx in ELEMENT) {
            var element = ELEMENT[idx];
            var key = getKey(SERVANT_NAME[k], element);
            if (DICT_SERVANT[key] === undefined)
                return;
            
            s = DICT_SERVANT[key];

            var $tr = $('<tr>');
            var $cell = $('<td>').appendTo($tr.appendTo('tbody'));
            var $row = makeRow();

            var $col_left = $('<div>', {'class': 'col-md-3'});
            var $col_mid = $('<div>', {'class': 'col-md-4'});
            var $col_right = $('<div>', {'class': 'col-md-5'});
            $col_left.appendTo($row);
            $col_mid.appendTo($row);
            $col_right.appendTo($row);

            makeServantInfo($col_left, s);
            makeMarkRelInfo($col_left, s);
            makeSkillInfo($col_mid, s);
            makePotInfo($col_right, s);

            $row.appendTo($cell);

            $tr.attr(ATTR_FILTER_ELEMENT, s.element.key);
            $tr.attr(ATTR_FILTER_ROLE, s.type[0].key);         
            $tr.attr(ATTR_FILTER_PRIMARY_MARK, s.primary_mark.key);
            $tr.attr(ATTR_FILTER_SECONDARY_MARK, s.secondary_mark.key);
            $tr.attr(ATTR_SERVANT_NAME, s.name);

            var fJob = JOB.NONE.key;
            if (s.job[0] && s.job[0].hasOwnProperty('key'))
                fJob = s.job[0].key;
            $tr.attr(ATTR_FILTER_JOB, fJob);

            var data_debuff = '';
            var data_buff = '';
            var data_effect = '';
            var appendEffectList = function(eff, trg) {
                if (typeof(eff) !== 'string') {
                    if (eff.id.startsWith('D')) {
                        data_debuff += eff.id.substr(1) + ',';
                    } else if (eff.id.startsWith('B')) {
                        data_buff += eff.id.substr(1) + ',';
                    } else if (eff.id.startsWith('E')) {
                        data_effect += eff.id.substr(1) + ',';
                    }
                }
            };

            s.skill_1.forEach(item => {     appendEffectList(item[0], item[1]);  });    
            s.skill_2.forEach(item => {     appendEffectList(item[0], item[1]);  });
            s.skill_mark.forEach(item => {     appendEffectList(item[0], item[1]);  });
            s.passive.forEach(item => {     appendEffectList(item[1], item[2]);  });     
            $tr.attr(ATTR_FILTER_DEBUFF, data_debuff);
            $tr.attr(ATTR_FILTER_BUFF, data_buff);
            $tr.attr(ATTR_FILTER_EFFECT, data_effect);
            $tr.attr(ATTR_FILTER_TEAMBUFF, s.team_buff[0][0]);

            var spe_4_ids = s.spe_4 ? s.spe_4.map(pot => 'S4' + pot).join(',') : '';
            $tr.attr(ATTR_FILTER_SPE_4, spe_4_ids);

            var spe_5_ids = s.spe_5 ? s.spe_5.map(pot => 'S5' + pot).join(',') : '';
            $tr.attr(ATTR_FILTER_SPE_5, spe_5_ids);

            sname = s.rel_1[0][0];
            data_rel_target = _getServantIndex(sname);
            if (s.rel_1[0][1] == CONDITION.TARGET_ALLY) {     
                TEMP_FILTER_SET_RELATION_ALLY.add(sname);
                data_rel_target = 'A_' + data_rel_target;
            } else {   
                TEMP_FILTER_SET_RELATION_ENEMY.add(sname);
                data_rel_target = 'E_' + data_rel_target;
            }
            $tr.attr(ATTR_FILTER_RELATION, data_rel_target);
        }
    });

    _initFilterRelation(TEMP_FILTER_SET_RELATION_ENEMY, TEMP_FILTER_SET_RELATION_ALLY);
    _showResultCount();     
}

$(window).load(function() {
    
    initData();
});