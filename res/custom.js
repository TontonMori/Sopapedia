// ==================================================
// Copyrightⓒ 2021. Askai. All rights reserved.
// ==================================================

const THUMB_WIDTH = 64;
const THUMB_HEIGHT = 64;
const ICON_WIDTH = 18;
const ICON_HEIGHT = ICON_WIDTH;
const REL_ICON_WIDTH = 28;
const REL_ICON_HEIGHT = REL_ICON_WIDTH;
const BRAND_WIDTH = 48;
const BRAND_HEIGHT = BRAND_WIDTH;

// 스킬 효과 검색필터 전역변수
MAP_FILTER_DEBUFF = { 'checked_id': new Set() };
MAP_FILTER_BUFF = { 'checked_id': new Set() };
// 특수능력 검색필터 전역변수
MAP_FILTER_UTILS = { 'checked_id': new Set() };

// 관계효과 대상 검색필터 전역변수
MAP_FILTER_RELATION = { 'checked_id': new Set() };


// 서번트 명칭 필터
const filter_tag = 'filter-hide-' + 'sn';
// 서번트 명칭 검색
function findServantByName() {
    var filter_name = $('input#inputServantName').val().trim();
    if(filter_name.length == 0)     return;

    // 이전 검색결과 초기화
    $('tr').removeClass(filter_tag);

    // 서번트 검색
    $('tr[' + ATTR_FILTER_ELEMENT + ']').filter(function() {
        var sname = new String( $(this).attr(ATTR_SERVANT_NAME) );
        return sname && sname.indexOf(filter_name) == -1;
    }).addClass(filter_tag);

    _showResultCount();     // 필터결과 개수 출력
}

// 검색 초기화
function resetSearchName() {
    $('input#inputServantName').val('');
    // 이전 검색결과 초기화
    $('tr').removeClass(filter_tag);
    
    _showResultCount();     // 필터결과 개수 출력
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

function makeTagImageEmptySkill() {
    var $img = makeTagImage(PATH_IMAGE + IMAGE_EMPTY_EFFECT, '스킬 효과', '스킬 효과', ICON_WIDTH - 4);   // Make a small icon
    $img.attr('style', $img.attr('style') + '; margin: 2px;');
    $img.removeAttr('data-toggle', '');
    $img.removeAttr('title', '');

    return $img;
}
function makeTagImageEmptyCharacter() {
    var $img = makeTagImage(PATH_IMAGE + IMAGE_EMPTY_CHARACTER, '대상 이미지', '', REL_ICON_WIDTH - 4, REL_ICON_HEIGHT - 4);   // Make a small icon
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
    var $img_border = $('<div>', {'style': 'border: 3px solid ' + s.element.color + '; background-color:' + s.element.color_bg + ';'});
    $img.appendTo($('<a>').attr('href', '#').appendTo($img_border));
    $img_border.appendTo($media);
    var $media_body = $('<div>', {'class': 'media-body'});
    $('<h4>', {'class': 'media-heading cell-header'}).text(s.name).appendTo($media_body);
    var $role_icon = makeTagImage(s.type[0].img, s.type[0].text, s.type[0].text, ICON_WIDTH).attr('class', 'role-icon');
    $('<p>').text(s.type[0].text).appendTo($media_body).prepend($role_icon);
    $media.appendTo($frame);
    $media_body.appendTo($frame);
    $frame.appendTo($row);
    $row.appendTo($parent);

    makeHr().appendTo($parent);

    $row = makeRow();
    var $c1 = makeColCenter(6);
    var $c2 = makeColCenter(6);
    makeHead().text('[태생 등급]').appendTo($c1);
    var rank = '';
    for (var i=0; i<Number(s.rank); i++)
        rank += '★';
    $('<p>').text(rank).appendTo($c1);
    makeHead().text('[속성]').appendTo($c2);
    makeTagImage(s.element.img, s.element.text, s.element.text, ICON_WIDTH).appendTo($c2);
    $c1.appendTo($row);
    $c2.appendTo($row);
    $row.appendTo($parent);


    $row = makeRow();
    $c1 = makeColCenter(6);
    $c2 = makeColCenter(6);
    makeHead().text('[연계기 낙인]').appendTo($c1);
    makeTagImage(s.brand_default.img, s.brand_default.text, s.brand_default.text, BRAND_WIDTH).appendTo($c1);
    makeHead().text('[후속낙인]').appendTo($c2);
    makeTagImage(s.brand_sequel.img, s.brand_sequel.text, s.brand_sequel.text, BRAND_WIDTH).appendTo($c2);
    $c1.appendTo($row);
    $c2.appendTo($row);
    $row.appendTo($parent);
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
        if (condition.indexOf('아군') < 0) 
            cls = 'condition';
        
        if (typeof(item[0]) == 'string') {  // 단순 설명 텍스트
            var servant_or_name = item[0];
            var key = getKey(servant_or_name, ENUM_ELEMENT.FIRE);
            var $img = '';
            if (DICT_SERVANT[key] !== undefined) {
                var servant = DICT_SERVANT[key];
                $img = makeTagImage(servant.img, servant.name, servant.name, REL_ICON_WIDTH);
                $img.appendTo($('<a>').attr('href', '#').appendTo($media));
            } else {
                makeTagImageEmptyCharacter().appendTo($media);
                // $media.attr('style', 'padding-left: ' + REL_ICON_WIDTH + 'px;'); // Empty padding like a blank image
            }
            $('<p>').html('<small class="' + cls + '">&lt;' + servant_or_name + ', ' + condition + '&gt;</small> ' + effect).appendTo($media_body);

        } else {  // 역할군 객체
            var role_or_type = item[0];
            var $img = makeTagImage(role_or_type.img, role_or_type.text, role_or_type.desc, REL_ICON_WIDTH);
            $img.appendTo($('<a>').attr('href', '#').appendTo($media));
            $('<p>').html('<small class="' + cls + '">&lt;' + role_or_type.text + ', ' + condition + '&gt;</small> ' + effect).appendTo($media_body);
        }
        $media.appendTo($frame);
        $media_body.appendTo($frame);
        $frame.appendTo($parent);
    }
}

function makeBrandRelInfo($parent, s) {
    var $row = makeRow();
    var $c1 = makeCol(12);
    makeHead().text('[Caractéristiques principales]').appendTo($c1);
    if (s.type.length > 1) {
        $('<p>').html('<i>' + s.type[1].text + '</i>').appendTo($c1);
        if (s.note != '-')
            $('<p>').text(s.note).appendTo($c1);
    } else 
        $('<p>').text(s.note).appendTo($c1);
    $c1.appendTo($row);
    $row.appendTo($parent);

    makeHr().appendTo($parent);

    $row = makeRow();
    $c1 = makeCol(12);
    makeHead().text('[관계효과]').appendTo($c1);
    _makeRelationEffects($c1, s, s.rel_1);
    makeHead().text('[보조 관계효과]').appendTo($c1);
    _makeRelationEffects($c1, s, s.rel_2);
    $c1.appendTo($row);
    $row.appendTo($parent);
}

function _makeSkillEffects($parent, list) {
    for (var idx in list) {
        var item = list[idx];
        
        var $frame = $('<div>', {'class': 'media skill-list'});
        var $media = $('<div>', {'class': 'media-left media-middle'});
        var $media_body = $('<div>', {'class': 'media-body'});
        if (typeof(item[0]) == 'string') {  // 단순 설명 텍스트
            var cond_or_desc = item[0];

            var desc = cond_or_desc;
            if (item.length > 1) {
                var addtional = item[1];
                desc += ' <small class="additional">(' + addtional + ')</small>';
            }
            makeTagImageEmptySkill().appendTo($media);
            // $media.attr('style', 'padding-left: ' + ICON_WIDTH + 'px;'); // Empty padding like a blank image
            $('<p>').html(desc).appendTo($media_body);

        } else {    // 스킬 이펙트 객체
            var skill_effect = item[0];
            var level = item[1];

            var desc = skill_effect.text;
            if (level != 0)
                desc += ' ' + level + 'Lv';
            if (item.length > 2) {
                var addtional = item[2];
                desc += ' <small class="additional">(' + addtional + ')</small>';
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

function _makePassiveEffects($parent, list, isTeamBuff) {
    for (var idx in list) {
        var item = list[idx];
        
        var $frame = $('<div>', {'class': 'media skill-list'});
        var $media = $('<div>', {'class': 'media-left media-middle'});
        var $media_body = $('<div>', {'class': 'media-body'});
        if (typeof(item[1]) == 'string') {  // 단순 설명 텍스트
            var cond_or_desc = item[0];
            var effect = item[1];
            var addtional = item[2];
            var desc = '<small class="condition">' + cond_or_desc + '</small> ' + effect;
            if (item.length > 2)
                desc += ' <small class="additional">(' + addtional + ')</small>';

            if (isTeamBuff) {
                var $img = makeTagImage(PATH_IMAGE + IMAGE_TEAM_BUFF, '팀패시브', '팀패시브', ICON_WIDTH);
                $img.appendTo($('<a>').attr('href', '#').appendTo($media));
            } else {
                makeTagImageEmptySkill().appendTo($media);
                // $media.attr('style', 'padding-left: ' + ICON_WIDTH + 'px;'); // Empty padding like a blank image
            }
            $('<p>').html(desc).appendTo($media_body);

        } else {    // 스킬 이펙트 객체
            var cond_or_desc = item[0];
            var skill_effect = item[1];
            var level = item[2];
            
            var desc = '<small class="condition">' + cond_or_desc + '</small> ' + skill_effect.text + '';
            if (level != 0)
                desc += ' ' + level + 'Lv';
            if (item.length > 3) {
                var addtional = item[3];
                desc += ' <small class="additional">(' + addtional + ')</small>';
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
    makeHead().text('[Aptitude 1]').appendTo($c1);
    _makeSkillEffects($c1, s.skill_1);
    makeHead().text('[Aptitude 2]').appendTo($c1);
    _makeSkillEffects($c1, s.skill_2);
    makeHead().text('[Aptitude de combo]').appendTo($c1);
    _makeSkillEffects($c1, s.skill_brand);
    $c1.appendTo($row);

    makeHead().text('[Passif]').appendTo($c2);
    _makePassiveEffects($c2, s.passive);

    makeHr().appendTo($c2);

    makeHead().text('[Bonus d'équipe]').appendTo($c2);
    _makePassiveEffects($c2, s.team_buff, true);
    $c2.appendTo($row);
    $row.appendTo($parent);
}

function _showResultCount() {   // 필터결과 개수 출력
    $('span#resultFilter').html('<strong>검색 결과:</strong>&nbsp; <em>' 
                                    + ($('tr[' + ATTR_FILTER_ELEMENT + ']').length - $('tr[class^="filter-hide-"]').length)
                                    + '개 서번트</em>');
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
        // 'class': 'media-object',
        'alt': label,
        'src': img_src,
        'style': 'width:' + w + 'px; margin: 0px 4px',
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': desc,
    });

    // 약화/강화효과 필터 함수
    var funcFilterEffect = function(thisCb, id_affix) {
        var map_filter;
        if (id_affix == 'efde')     map_filter = MAP_FILTER_DEBUFF;
        else if (id_affix == 'efbu')     map_filter = MAP_FILTER_BUFF;
        else if (id_affix == 'efut')     map_filter = MAP_FILTER_UTILS;
        else if (id_affix == 're')       map_filter = MAP_FILTER_RELATION;

        map_filter[label_idx] = thisCb.checked;
        // 전체 check된 개수 판단용 Set 인스턴스
        if (thisCb.checked)   map_filter.checked_id.add(label_idx);
        else    map_filter.checked_id.delete(label_idx);

        $('tr').filter(function(index) {
            var isShow = false;
            
            // 1개 항목 이상 check인 경우에는 스킬 효과 필터링
            if (map_filter.checked_id.size > 0) {
                if ($(this).attr(filter_attr) == undefined)    return false;
                var eff_ids = $(this).attr(filter_attr).split(',');
                eff_ids.forEach(eff_id => {
                    if (map_filter[eff_id]) {
                        isShow = true;
                        return;
                    }
                });

            } else {    // 모두 check가 아닌 경우 (= 초기화)
                isShow = true;
            }

            if (isShow)     $(this).removeClass('filter-hide-' + id_affix);
            else     $(this).addClass('filter-hide-' + id_affix);
            
            _showResultCount();     // 필터결과 개수 출력
            return isShow;
        });
    };

    // 체크박스 change 이벤트 적용
    var funcChange;
    switch (id_affix) {
        case 'efde':    // 약화 효과 필터 (= check한 항목들을 모두 포함하지 않으면 hide)
        case 'efbu':    // 강화 효과 필터
        case 'efut':    // 특수능력 필터
        case 're':      // 관계효과 대상 필터
            funcChange = function() {   return funcFilterEffect(this, id_affix); };
            $cb.attr('checked', false);
            break;

        default:    // 기타 필터 (= check한 항목이 아니라면 hide)
            //$('tr').filter('[data-filter-element="FIRE"]')
            funcChange = function() {
                if (this.checked) {  // 선택값 표시
                    $('tr').filter('[' + filter_attr + '="' + filter_key + '"]').removeClass('filter-hide-' + id_affix);
                } else {    // 숨김
                    $('tr').filter('[' + filter_attr + '="' + filter_key + '"]').addClass('filter-hide-' + id_affix);
                }

                _showResultCount();     // 필터결과 개수 출력
            };
    }
    $cb.change(funcChange);

    return $lb.prepend($img).prepend($cb);
}

function _getServantIndex(sname) {
    idx = SERVANT_INDEX_BY_NAME[sname];
    // 서번트명 목록에 없으면, index 대신 이름으로 강제 추가 (e.g., 던전보스 오멘)
    if (idx == undefined)   idx = sname;
    else    idx = ('00' + idx).substr(-3);      // 3자리 단위로 '0' 패딩 처리한 인덱스

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

        var idx = Number(map_idx.substr(2));    // 'E_', 'A_' 접두사 제외한 인덱스
        var sname = SERVANT_NAME_BY_INDEX[idx];
        // 강제 추가된 이름이면 index 값을 그대로 할당
        if (sname == undefined)     sname = map_idx.substr(2);
        // console.log(sname + ', ' + idx)
        var el = ENUM_ELEMENT.FIRE;
        if (map_idx.startsWith('A_'))
            el = ENUM_ELEMENT.WATER;

        var key = getKey(sname, el);
        var o = DICT_SERVANT[key];
        var img_src = PATH_IMAGE + IMAGE_EMPTY_CHARACTER;   // 서번트DB에 없으면 empty 이미지
        if (o !== undefined)    img_src = o.img;

        var $item = _makeFilterItem(map_idx, sname, sname, img_src, ATTR_FILTER_RELATION, key, 're');

        if (map_idx.startsWith('E_'))
            $('#filterRelationEnemy').append($item);
        else
            $('#filterRelationAlly').append($item);
    });
}

// 대상 패널 하위의 모든 체크박스 선택 or 선택 해제
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


// ========================================
// Main function for initilization
// ========================================
function initData() {
    // =====
    // 검색 필터 초기화
    // =====
    Object.keys(ENUM_ELEMENT).forEach((key, idx) => {
        var element = ENUM_ELEMENT[key];
        var $item = _makeFilterItem(idx, element.text, element.text, element.img, ATTR_FILTER_ELEMENT, key, 'el');
        $('#filterElement').append($item);
    });
    Object.keys(ENUM_SERVANT_ROLE).forEach((key, idx) => {
        var role = ENUM_SERVANT_ROLE[key];
        if (role.img === undefined)    return;
        var $item = _makeFilterItem(idx, role.text, role.text, role.img, ATTR_FILTER_ROLE, key, 'ro');
        $('#filterRole').append($item);
    });
    Object.keys(ENUM_BRAND).forEach((key, idx) => {
        var b = ENUM_BRAND[key];
        var $item = _makeFilterItem(idx, b.text, b.text, b.img, ATTR_FILTER_BRAND, key, 'br');
        $('#filterBrand').append($item);
    });
    Object.keys(ENUM_BRAND_SEQUEL).forEach((key, idx) => {
        var b = ENUM_BRAND_SEQUEL[key];
        var $item = _makeFilterItem(idx, b.text, b.text, b.img, ATTR_FILTER_BRAND_SEQUEL, key, 'brse');
        $('#filterBrandSequel').append($item);
    });
    Object.keys(ENUM_SERVANT_JOB).forEach((key, idx) => {
        if (key != 'NONE' && !key.startsWith('DPS_'))    return;     // 공격 유형에 대한 필터만 생성

        var job = ENUM_SERVANT_JOB[key];
        var $item = _makeFilterItem(idx, job.text, job.text, PATH_IMAGE + IMAGE_EMPTY_SKILL, ATTR_FILTER_JOB, key, 'jb');
        $('#filterJob').append($item);
    });
    
    Object.keys(ENUM_DEBUFF).forEach((key, idx) => {
        MAP_FILTER_DEBUFF[idx] = false;
        ENUM_DEBUFF[key].id = 'D' + idx;    // 스킬효과 인덱스 번호 추가
        var o = ENUM_DEBUFF[key];
        if (o.hide !== undefined)   return;     // 숨김효과이면 스킵
        var $item = _makeFilterItem(idx, o.text, o.desc, o.img, ATTR_FILTER_DEBUFF, key, 'efde');

        /*  버프/디버프 필터는 어떻게 기능을 압축할까?
        1. ENUM 순서대로 0/1 binary string을 유지? (체크=1, 비체크=0) 
            => 스킬이 몇 개 없는데, string이 너무 sparse해서 낭비인듯

        2. 전역변수(True/False hash map 빠를듯)로 비체크 인덱스를 유지? 
            => 각 <tr>에서 버프/디버프의 인덱스를 표시? 
            => JQuery selector로 data-effect 값을 순차 검색? 
            => 모든 data-effect가 비체크 인덱스에 해당하면 hide 클래스 (i.e., 1개라도 체크라면 show)
        */
        $('#filterDebuff').append($item);
    });
    Object.keys(ENUM_BUFF).forEach((key, idx) => {
        MAP_FILTER_BUFF[idx] = false;
        ENUM_BUFF[key].id = 'B' + idx;    // 스킬효과 인덱스 번호 추가
        var o = ENUM_BUFF[key];
        if (o.hide !== undefined)   return;     // 숨김효과이면 스킵
        var $item = _makeFilterItem(idx, o.text, o.desc, o.img, ATTR_FILTER_BUFF, key, 'efbu');
        $('#filterBuff').append($item);
    });
    Object.keys(CONST_CONDITION).forEach((key, idx) => {
        if (!key.startsWith('REGION_'))    return;     // 팀패시브 활성화 지역 조건에 대한 필터만 생성
        if (key == 'REGION_STAGE' || key == 'REGION_INVASION')    return;     // 탐험, 침공 조건은 스킵

        var region = CONST_CONDITION[key];
        var $item = _makeFilterItem(idx, region, region, PATH_IMAGE + IMAGE_TEAM_BUFF, ATTR_FILTER_TEAMBUFF, region, 'te');
        $('#filterTeamBuff').append($item);
    });
    Object.keys(FILTER_LIST_UTILS).forEach((key, idx) => {
        MAP_FILTER_UTILS[idx] = false;
        FILTER_LIST_UTILS[key].id = 'U' + idx;      // 특수능력 인덱스 번호 추가
        var o = FILTER_LIST_UTILS[key];
        var $item = _makeFilterItem(idx, o.text, o.text, PATH_IMAGE + IMAGE_EMPTY_EFFECT, ATTR_FILTER_UTILS, key, 'efut');
        $('#filterUtil').append($item);
    });

    
    
    
    // =====
    // 서번트DB 테이블 출력
    // =====
    var TEMP_FILTER_SET_RELATION_ENEMY = new Set();     // 관계대상 고유 목록을 위한 Set 객체
    var TEMP_FILTER_SET_RELATION_ALLY = new Set();
    var count = 0;      // 서번트 카운트
    Object.keys(SERVANT_NAME).reverse().forEach(k => {
        count++;
        for (idx in ENUM_ELEMENT) {
            var element = ENUM_ELEMENT[idx];
            var key = getKey(SERVANT_NAME[k], element);
            if (DICT_SERVANT[key] === undefined)
                return;
            // console.log(key);
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


            // $('<p>').text(s.idx).appendTo($col_left);
            makeServantInfo($col_left, s);
            makeBrandRelInfo($col_mid, s);
            makeSkillInfo($col_right, s);

            $row.appendTo($cell);

            // 필터 데이터 추가
            $tr.attr(ATTR_FILTER_ELEMENT, s.element.key);               // 속성
            $tr.attr(ATTR_FILTER_ROLE, s.type[0].key);                  // 역할
            $tr.attr(ATTR_FILTER_BRAND, s.brand_default.key);           // 연계기 낙인
            $tr.attr(ATTR_FILTER_BRAND_SEQUEL, s.brand_sequel.key);     // 후속 낙인
            $tr.attr(ATTR_SERVANT_NAME, s.name);                        // 서번트 명칭

            var fJob = ENUM_SERVANT_JOB.NONE.key;
            if (s.type[1] && s.type[1].hasOwnProperty('key') && s.type[1].key.startsWith('DPS_'))   // 공격 유형에 대한 필터
                fJob = s.type[1].key;
            $tr.attr(ATTR_FILTER_JOB, fJob);

            // 스킬 효과, 특수능력 필터 데이터 추가
            var data_debuff = '';       // 약화 효과
            var data_buff = '';         // 강화 효과
            var data_utils = '';        // 특수능력
            var appendEffectList = function(eff, trg) {
                if (typeof(eff) !== 'string') {     // 약화/강화 체크
                    if (eff.id.startsWith('D'))
                        data_debuff += eff.id.substr(1) + ',';
                    else if (eff.id.startsWith('B'))
                        data_buff += eff.id.substr(1) + ',';

                } else {    // 특수능력 체크
                    // 특수능력 필터 목록에 존재하는지 확인
                    Object.keys(FILTER_LIST_UTILS).forEach((key, idx) => {
                        futil = FILTER_LIST_UTILS[key];
                        hasPrefix = true;
                        hasInterfix = true;
                        hasSuffix = true;
                        hasTarget = true;
                        if (futil.prefix.length > 0 && !eff.startsWith(futil.prefix))
                            hasPrefix = false;
                        if (futil.interfix.length > 0 && eff.indexOf(futil.interfix) < 0)
                            hasInterfix = false;
                        if (futil.suffix.length > 0 && !eff.endsWith(futil.suffix))
                            hasSuffix = false;
                            
                        if (futil.target.length > 0 && trg && typeof(trg) == 'string') {
                            if (futil.target.startsWith('!')) {         // not 조건의 타겟인 경우
                                if (trg.indexOf(futil.target.substr(1)) == 0)     // target 문자열로 시작하면 FALSE
                                    hasTarget = false;
                            } else {    // 그 외 타겟인 경우
                                if (trg.indexOf(futil.target) < 0)  // target이 포함되지 않으면 FALSE
                                   hasTarget = false;
                            }
                        }
                        
                        // 효과 설명 텍스트의 pre-, inter-, surffix, target 모두 TRUE이면, 필터로 추가
                        if (hasPrefix && hasInterfix && hasSuffix && hasTarget) {
                            data_utils += futil.id.substr(1) + ',';
                            return;
                        }
                    });
                }
            };
            s.skill_1.forEach(item => {     appendEffectList(item[0], item[1]);  });    // 특수능력 판단을 위해, "효과 텍스트" + "타겟"을 함께 전달
            s.skill_2.forEach(item => {     appendEffectList(item[0], item[1]);  });
            s.skill_brand.forEach(item => {     appendEffectList(item[0], item[1]);  });
            s.passive.forEach(item => {     appendEffectList(item[1], item[2]);  });     // 패시브에서 effect는 2번째 항목
            $tr.attr(ATTR_FILTER_DEBUFF, data_debuff);
            $tr.attr(ATTR_FILTER_BUFF, data_buff);
            $tr.attr(ATTR_FILTER_UTILS, data_utils);

            $tr.attr(ATTR_FILTER_TEAMBUFF, s.team_buff[0][0]);      // 팀 버프 (활성 지역)

            // 관계효과 대상 필터 데이터 추가
            sname = s.rel_1[0][0];
            data_rel_target = _getServantIndex(sname);
            if (s.rel_1[0][1] == CONST_CONDITION.TARGET_ALLY) {     // 관계대상 종류 = '아군'
                TEMP_FILTER_SET_RELATION_ALLY.add(sname);
                data_rel_target = 'A_' + data_rel_target;
            } else {   // 나머지 관계대상 (적군, 보스 오멘)
                TEMP_FILTER_SET_RELATION_ENEMY.add(sname);
                data_rel_target = 'E_' + data_rel_target;
            }
            $tr.attr(ATTR_FILTER_RELATION, data_rel_target);
        }
    });

    // 관계효과 검색 필터 초기화
    _initFilterRelation(TEMP_FILTER_SET_RELATION_ENEMY, TEMP_FILTER_SET_RELATION_ALLY);


    // ----------
    // ----------
    // Tooltip 전체 초기화
    if (count >= Object.keys(SERVANT_NAME).length) {
        // Modal hide when loading data is finished
        var modalLoad = $('#modalLoading');
        setTimeout(function () { 
            modalLoad.modal('hide'); 
            // Focus on search input text
            $('input#inputServantName').focus();
        }, 500);
        
        // 모든 tooltip 객체 초기화
        $('[data-toggle="tooltip"]').tooltip();
    }
    _showResultCount();     // 필터결과 개수 출력
}


// Show modal for loading data
$('#modalLoading').modal('show');

// JQuery event when document is opened
$(document).ready(function() {
    $('p.text-muted').html('Copyrightⓒ ' + new Date().getFullYear() + '. <i>Askai</i>. All rights reserved.');
    $('a#version').text(APP_VERSION);
    $('span#update_date').text(UPDATE_DATE);

    // Hide alert message if current Web browser is NOT Internet Explorer
    if (navigator.userAgent.indexOf('Trident/') < 0)
        $('#alertBrowserIE').alert('close');

    // FIX: Add padding-right for navbar when open the modal
    $('#modalVersionHistory').on('show.bs.modal', function() {
        $('.navbar').css('padding-right', 17);  // '17px' according to the width of scroll bar
        // console.log('call show');
    });
    $('#modalVersionHistory').on('hidden.bs.modal', function() {
        $('.navbar').css('padding-right', 0);
        // console.log('call hide');
    });
});

// JQuery event when loading document is finished
$(window).load(function() {
    // Start initialization function
    initData();
});
