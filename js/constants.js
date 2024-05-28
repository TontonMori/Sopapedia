const PATH_IMAGE = 'res/img/';
const IMAGE_EMPTY_CHARACTER = 'character_empty.png';
const IMAGE_EMPTY_SKILL = 'ico_empty_info.png';
const IMAGE_EMPTY_EFFECT = 'ico_empty_book.png';
const IMAGE_TEAM_BUFF = 'ico_team_buff.png';

const ATTR_FILTER_ELEMENT = 'data-filter-element';
const ATTR_FILTER_ROLE = 'data-filter-role';
const ATTR_FILTER_PRIMARY_MARK = 'data-filter-primary-mark';
const ATTR_FILTER_SECONDARY_MARK = 'data-filter-secondary-mark';
const ATTR_FILTER_JOB = 'data-filter-job';
const ATTR_FILTER_DEBUFF = 'data-filter-debuff';
const ATTR_FILTER_BUFF = 'data-filter-buff';
const ATTR_FILTER_EFFECT = 'data-filter-effect';
const ATTR_FILTER_TEAMBUFF = 'data-filter-teambuff';
const ATTR_FILTER_RELATION = 'data-filter-rel';
const ATTR_FILTER_SPE_4 = 'data-filter-spe4';
const ATTR_FILTER_SPE_5 = 'data-filter-spe5';
const ATTR_SERVANT_NAME = 'data-servant-name';

const ELEMENT = Object.freeze({
    FIRE: { key: 'FIRE', text: 'Feu', img: PATH_IMAGE + 'el_1_fire.png', color: '#BB2222', color_bg: '#591408' },
    WATER: { key: 'WATER', text: 'Eau', img: PATH_IMAGE + 'el_2_water.png', color: '#479CBE', color_bg: '#143241' },
    FOREST: { key: 'FOREST', text: 'Forêt', img: PATH_IMAGE + 'el_3_forest.png', color: '#579B46', color_bg: '#1D3E15' },
    LIGHT: { key: 'LIGHT', text: 'Lumière', img: PATH_IMAGE + 'el_4_light.png', color: '#CF9C47', color_bg: '#44331A' },
    DARK: { key: 'DARK', text: 'Ténèbres', img: PATH_IMAGE + 'el_5_dark.png', color: '#A24EC4', color_bg: '#341E38' },
});

const ROLE = Object.freeze({
    TANK: { key: 'TANK', text: 'Tank', img: PATH_IMAGE + 'role_1_tank.png' },
    MELEE: { key: 'MELEE', text: 'Attaquant mélée', img: PATH_IMAGE + 'role_2_melee.png' },
    RANGE: { key: 'RANGE', text: 'Attaquant distance', img: PATH_IMAGE + 'role_3_range.png' },
    SUPPORT: { key: 'SUPPORT', text: 'Soutien', img: PATH_IMAGE + 'role_4_support.png' },
    HEAL: { key: 'HEAL', text: 'Soigneur', img: PATH_IMAGE + 'role_5_heal.png' },
});

const JOB = Object.freeze({
    ATK: { key: 'ATK', text: 'Attaque' },
    SPD: { key: 'SPD', text: 'Vitesse' },
    DEF: { key: 'DEF', text: 'Défense' },
    EHP: { key: 'HP', text: 'PV Ennemis' },
    IGN: { key: 'IGN', text: 'Ignore Def' },
    IGN_COND: { key: 'IGN_C', text: 'Ignore Def (sous conditions)' },
    REVIVAL_SINGLE: { key: 'REVIVAL_SINGLE', text: 'Résurrection (mono)' },
    REVIVAL_ALL: { key: 'REVIVAL_ALL', text: 'Résurrection (multi)' },
    TANK_ANTIDEF: { key: 'TANK_ANTIDEF', text: 'Tank résistant à l\'antidef' },
    TANK_CRIT: { key: 'TANK_CRIT', text: 'Tank résistant aux coups critiques' },
    TANK_MONOHIT: { key: 'TANK_MONOHIT', text: 'Tank avec réduction des dégâts subis par coup' },
    TANK_MULTIHIT: { key: 'TANK_MULTIHIT', text: 'Tank résistant aux frappes multiples' },
	CLEANSE: { key: 'CLEANSE', text: 'Cleanse' },
	STRIP: { key: 'STRIP', text: 'Strip' },
	BUFF_ATB: { key: 'BUFF_ATB', text: 'Augmentation de la jauge d\'aptitude' },
	NONE: { key: 'NONE', text: 'Aucun' }
});

const PRIMARY_MARK = Object.freeze({
    SUNRISE: { key: 'SUNRISE', text: 'Lever de soleil', img: PATH_IMAGE + 'Mark_Sunrise_lit.png' },
    SUNSET: { key: 'SUNSET', text: 'Coucher de soleil', img: PATH_IMAGE + 'Mark_Sunset_lit.png' },
    SOLAR_ECLIPSE: { key: 'SOLAR_ECLIPSE', text: 'Eclipse', img: PATH_IMAGE + 'Mark_Eclipse_lit.png' },
    MOONSET: { key: 'MOONSET', text: 'Coucher de lune', img: PATH_IMAGE + 'Mark_Moonset_lit.png' }
});

const SECONDARY_MARK = Object.freeze({
    SUNRISE: { key: 'SUNRISE', text: 'Lever de soleil', img: PATH_IMAGE + 'Mark_Sunrise.png' },
    SUNSET: { key: 'SUNSET', text: 'Coucher de soleil', img: PATH_IMAGE + 'Mark_Sunset.png' },
    SOLAR_ECLIPSE: { key: 'SOLAR_ECLIPSE', text: 'Eclipse', img: PATH_IMAGE + 'Mark_Eclipse.png' },
    MOONSET: { key: 'MOONSET', text: 'Coucher de lune', img: PATH_IMAGE + 'Mark_Moonset.png' }
});

const DAMAGE_TYPE = Object.freeze({
    ATK: { id: 'Z_ATK', text: 'Dégâts en fonction de l\'attaque', img: PATH_IMAGE + 'Buff_DefensePerDown_Attack.png' },
    DEF: { id: 'Z_DEF', text: 'Dégâts en fonction de la défense', img: PATH_IMAGE + 'Buff_DefensePerDown_Defense.png' },
    SPD: { id: 'Z_SPD', text: 'Dégâts en fonction de la vitesse', img: PATH_IMAGE + 'Buff_DefensePerDown_Haste.png' },
    HP: { id: 'Z_HP', text: 'Dégâts en fonction des PV de l\'ennemi', img: PATH_IMAGE + 'Buff_DefensePerDown_TOT.png' },
    IGN: { id: 'Z_IGN', text: 'Dégâts qui ignore la défense ennemi', img: PATH_IMAGE + 'Buff_DefensePerDown_IgnoreDefense.png' }
});

const AOE = Object.freeze({
    AOE: { id: 'AOE', text: 'Attaque de zone', desc: 'Attaque de zone'}
});

const BUFF = Object.freeze({
    ATK: { text: 'Attaque↑', img: PATH_IMAGE + 'Buff_AttackPerUp.png', desc: 'Augmente l\'attaque de 10\% par niveau. (5 niveaux max)' },
    ATK_WAVE: { text: 'Attaque↑ (Vague)', img: PATH_IMAGE + 'Buff_AttackPerUp.png', desc: 'L\'effet de vague augmente l\'attaque. (Niveau 2 : 33\%, Niveau 3 : 50\%)' },
    DEF: { text: 'Défense↑', img: PATH_IMAGE + 'Buff_DefUP.png', desc: 'Augmente la défense de 14\% par niveau. (5 niveaux max)' },
    DEF_WAVE: { text: 'Défense↑ (Vague)', img: PATH_IMAGE + 'Buff_DefUP.png', desc: 'L\'effet de vague augmente la défense. (Niveau 2 : 46\%, Niveau 3 : 70\%)' },
    CRITICAL: { text: 'Taux critique↑', img: PATH_IMAGE + 'Buff_CriticalPerUp.png', desc: 'Augmente le taux critique de 6\% par niveau. (5 niveaux max)' },
    SPD: { text: 'Vitesse↑', img: PATH_IMAGE + 'Buff_HastePerUp.png', desc: 'Augmente la vitesse de 6\% par niveau. (5 niveaux max)' },
    SPD_WAVE: { text: 'Vitesse↑ (Vague)', img: PATH_IMAGE + 'Buff_HastePerUp.png', desc: 'L\'effet de vague augmente la vitesse. (Niveau 3 :  30\%)' },
    PROVOKE: { text: 'Provocation', img: PATH_IMAGE + 'Buff_AddAggroEnemyOne.png', desc: 'Incite les ennemis à attaquer ce serviteur' },
    HEAL: { text: 'Soin', img: PATH_IMAGE + 'Buff_Heal.png', desc: 'Soigne 0.8% de PV par niveau toutes les 3 secondes (5 niveaux max)' },
    MISS: { text: 'Frappes Obliques↑', img: PATH_IMAGE + 'Buff_MissHitPerUp.png', desc: 'Augmente le taux de frappes obliques de 5% par niveau. (5 niveaux max)' },
    CRI_DEF: { text: 'Résistance aux coups critiques', img: PATH_IMAGE + 'Buff_CriticalResistPerUp.png', desc: 'Réduit les dégâts critiques reçus 10% par niveau. (5 niveaux max)' },
    NO_DEBUFF: { text: 'Immunité', img: PATH_IMAGE + 'Buff_ImmuneWeaken.png', desc: 'Empêche de recevoir des debuffs' },
    NO_DAMAGE: { text: 'Invincibilité', img: PATH_IMAGE + 'Buff_ImmuneAllAttack.png', desc: 'Empêche de subir des dégâts' },
    SHIELD: { text: 'Bouclier', img: PATH_IMAGE + 'Buff_Shield.png', desc: 'Absorbe les dégâts' },
    PROTECT_ALLY: { text: 'Escorte', img: PATH_IMAGE + 'Buff_Guard.png', desc: 'Se lance sur tous les autres alliés; subis 20% de dégâts à leur place' },
    VAMPIRE: { text: 'Vampire', img: PATH_IMAGE + 'Buff_LifeSteal.png', desc: 'Soigne de 20% des dégâts infligés. (jusqu\'à 10000)' },
    ENDURE: { text: 'Résilience', img: PATH_IMAGE + 'Buff_ImmuneDie.png', desc: 'Les PV ne tombent pas en dessous de 1' },
    LESS_DAMAGE: { text: 'Réduction des dégâts subis', img: PATH_IMAGE + 'buff_15_less_damage.png', desc: 'Réduit les dégâts subis' },
    REFLECT_DAMAGE: { text: 'Renvoi', img: PATH_IMAGE + 'Buff_ReflectDamage.png', desc: 'Renvoi 6% des dégâts subis.' },
    REVIVAL: { text: 'Rédemption', img: PATH_IMAGE + 'Buff_Rescue.png', desc: 'Lorsque les PV tombent à 0, vous devenez invincible pendant 1 seconde et récupérez immédiatement une certaine quantité de PV.' },
    RELATIONSHIP: { text: 'Relation', img: PATH_IMAGE + 'buff_18_relation.png', desc: 'Renforcé par un effet de relation' },
    EFFECT_ACC_WAVE: { text: 'Augmente la précision (Vague)', img: PATH_IMAGE + 'Buff_SkillPiercePerUP.png', desc: 'L\'effet de vague augmente la précision. (Niveau 1 : 10%)' },
    SEAL_REMOVE_BUFF: { text: 'Blocage de dissipation', img: PATH_IMAGE + 'Buff_ImmuneRemoveStrengthen.png', desc: 'Les buffs ne peuvent pas être dissipés' },
    UNSTABLE_POTION_IMMUNE_CC_RANDOM: { text: 'Potion instable', img: PATH_IMAGE + 'Buff_ImmuneSilence.png', desc: 'Applique au hasard l\'immunité au gel, à l\'étourdissement ou au silence pendant 15 secondes. Ignore l\'antibuff.' },
    STABLE_POTION_IMMUNE_CC: { text: 'Potion stable', img: PATH_IMAGE + 'Buff_ImmuneIceStunSilence.png', desc: 'Applique au hasard l\'immunité au gel, à l\'étourdissement ou au silence pendant 15 secondes. Ignore l\'antibuff.' },
    INFINITE_KNOWLEDGE: { text: 'Savoir infini', img: PATH_IMAGE + 'Buff_CriticalPowerUp.png', desc: 'Augmente les dégâts critiques. (Feu/Eau/Forêt 150 %, Lumière/Ténèbres 250 %)' },
    IYAGAGAK_OBESSION: { text: 'Obsession d\'Iyagagak', img: PATH_IMAGE + 'Buff_CriticalPowerUp.png', desc: 'Augmente les dégâts critiques si sous l\'effet d\'un buff. (Feu/Eau/Forêt 150 %, Lumière 300 %, Ténèbres 250 %)' },
    SHEEP_BLESSING: { text: 'Bénédiction Ovine', img: PATH_IMAGE + 'Buff_DefensePerUp_IgnoreDefense.png', desc: 'Réduit les dégâts subis d\'attaques anti-def de 70%' },
    DECREASE_IGNORE_DEF_DMG: { text: 'Résistance à l\'anti-def', img: PATH_IMAGE + 'Buff_DefensePerUp_IgnoreDefense.png', desc: 'Réduit les dégâts subis d\'attaques anti-def de 50%' },
    OZYMANDIAS: { text: 'Recherche réussie', img: PATH_IMAGE + 'Buff_RechercheReussie.png', desc: 'Confère l\'immunité à congélation, étourdissement, silence, désorientation, poison' }
});

const DEBUFF = Object.freeze({
    DEF: { text: 'Défense↓', img: PATH_IMAGE + 'Buff_DefensePerDown.png', desc: 'Réduit la défense de 14% par niveau. (5 niveaux max)' },
    ATK: { text: 'Attaque↓', img: PATH_IMAGE + 'Buff_AttackPerDown.png', desc: 'Réduit l\'attaque de 10% par niveau. (5 niveaux max)' },
    CRITICAL: { text: 'Taux critique↓', img: PATH_IMAGE + 'Buff_CriticalPerDown.png', desc: 'Réduit le taux critique de 10% par niveau. (5 niveaux max)' },
    MORE_DAMAGE: { text: 'Marque', img: PATH_IMAGE + 'Buff_ReceivingDamageUp.png', desc: 'Augmente les dégâts subis de 5% par niveau. (5 niveaux max)' },
    MISS: { text: 'Taux de frappes obliques↑', img: PATH_IMAGE + 'Buff_MissPerUp.png', desc: 'Augmente le taux de frappes obliques en attaquant de 7% par niveau. (5 niveaux max)' },
    SPD: { text: 'Vitesse↓', img: PATH_IMAGE + 'Buff_HastePerDown.png', desc: 'Réduit la vitesse de 6% par niveau. (5 niveaux max)' },
    DOT_FIRE: { text: 'Dégâts continus (feu)', img: PATH_IMAGE + 'Buff_ContinuousFireDamage.png', desc: 'Inflige des dégâts égaux à 0,4% des PV max par niveau toutes les 3 secondes. (5 niveaux max)' },
    DOT_WATER: { text: 'Dégâts continus (eau)', img: PATH_IMAGE + 'Buff_ContinuousWaterDamage.png', desc: 'Inflige des dégâts égaux à 0,4% des PV max par niveau toutes les 3 secondes. (5 niveaux max)' },
    DOT_FOREST: { text: 'Dégâts continus (forêt)', img: PATH_IMAGE + 'Buff_ContinuousForestDamage.png', desc: 'Inflige des dégâts égaux à 0,4% des PV max par niveau toutes les 3 secondes. (5 niveaux max)' },
    DOT_LIGHT: { text: 'Dégâts continus (lumière)', img: PATH_IMAGE + 'Buff_ContinuousLightDamage.png', desc: 'Inflige des dégâts égaux à 0,4% des PV max par niveau toutes les 3 secondes. (5 niveaux max)' },
    DOT_DARK: { text: 'Dégâts continus (ténèbres)', img: PATH_IMAGE + 'Buff_ContinuousDarkDamage.png', desc: 'Inflige des dégâts égaux à 0,4% des PV max par niveau toutes les 3 secondes. (5 niveaux max)' },
    CC_STUN: { text: 'Etourdissement', img: PATH_IMAGE + 'Buff_Stun.png', desc: 'Empêche toute action' },
    REDUCED_HEAL: { text: 'Réduction de soin', img: PATH_IMAGE + 'Debuff_ReducedHeal.png', desc: 'Réduit les soins reçus de 50%' },
    NO_HEAL: { text: 'Blocage de soin', img: PATH_IMAGE + 'Buff_ImmuneHeal.png', desc: 'Empêche de recevoir des soins' },
    NO_BUFF: { text: 'Antibuff', img: PATH_IMAGE + 'Buff_ImmuneRemoveWeaken.png', desc: 'Empêche de recevoir des buffs' },
    CC_FEAR: { text: 'Peur', img: PATH_IMAGE + 'Buff_Fear.png', desc: 'Empêche toute action' },
    CC_SILENCE: { text: 'Silence', img: PATH_IMAGE + 'Buff_Silence.png', desc: 'Empêche d\'utiliser des aptitudes actives/combo' },
    CC_PETRIFY: { text: 'Pétrifié', img: PATH_IMAGE + 'debuff_17_cc_petrify.png', desc: 'Empêche toute action et le chargement passif de la jauge d\'aptitude' },
    CC_FREEZE: { text: 'Gelé', img: PATH_IMAGE + 'Buff_Ice.png', desc: 'Empêche toute action' },
    NO_ENDURE: { text: 'Blocage de résilience', img: PATH_IMAGE + 'Buff_ImmuneImmuneDie.png', desc: 'Bloque la résilience' },
    NO_REVIVAL: { text: 'Blocage de résurection', img: PATH_IMAGE + 'Buff_ImmuneRevive.png', desc: 'Bloque la résurection' },
    WEAK_ATK: { text: 'Faiblesse à l\'Attaque', img: PATH_IMAGE + 'Buff_DefensePerDown_Attack.png', desc: 'Augmente les dégâts subis en fonction de l\'attaque' },
    WEAK_DEF: { text: 'Faiblesse à la Défense', img: PATH_IMAGE + 'Buff_DefensePerDown_Defense.png', desc: 'Augmente les dégâts subis en fonction de la défense' },
    WEAK_SPD: { text: 'Faiblesse à la Vitesse', img: PATH_IMAGE + 'Buff_DefensePerDown_Haste.png', desc: 'Augmente les dégâts subis en fonction de la vitesse' },
    WEAK_IGNORE_DEF: { text: 'Faiblesse à l\'anti-DEF', img: PATH_IMAGE + 'Buff_DefensePerDown_IgnoreDefense.png', desc: 'Augmente les dégâts subis qui ignorent la défense' },
    WEAK_ENEMY_HP: { text: 'Faiblesse aux attaques basées sur les PV ennemis', img: PATH_IMAGE + 'Buff_DefensePerDown_TOT.png', desc: 'Augmente les dégâts subis en fonction de ses PV max' },
    NO_PASSIVE: { hide: 'true', text: '', img: PATH_IMAGE + 'Buff_DisablePassive.png', desc: 'Aptitude passive désactivée' },
    RELATIONSHIP: { hide: 'true', text: '', img: PATH_IMAGE + 'Buff_Relation_Weaken.png', desc: 'Affaibli par l\'effet de relation ennemi' },
    OBLIVION: { text: 'Oubli', img: PATH_IMAGE + 'Buff_DisablePassive.png', desc: 'Aptitude passive désactivée' },
    BOMB_2_5: { text: 'Bombe(2sec/5sec)', img: PATH_IMAGE + 'Buff_Bomb.png', desc: 'Place une bombe qui explose après 2 ou 5 secondes. Les dégâts de la bombe sont affectés par la puissance d\'attaque et ne dépassent pas 50% des PV max de la cible.' },
    BOMB_5: { text: 'Bombe(5sec)', img: PATH_IMAGE + 'Buff_Bomb.png', desc: 'Place une bombe qui explose après 5 secondes. Les dégâts de la bombe sont affectés par la puissance d\'attaque et ne dépassent pas 50% des PV max de la cible.' },
    CURSE_NO_SHIELD: { text: 'blocage de bouclier', img: PATH_IMAGE + 'Buff_ImmuneShieldAll.png', desc: 'Empêche la cible de recevoir un bouclier pendant 30 secondes' },
    CURSE_NO_DEBUFF_REMOVE: { text: 'Anti-cleanse', img: PATH_IMAGE + 'Buff_ImmuneRemoveWeaken.png', desc: 'Empêche de dissiper des debuffs sur la cible pendant 5 secondes' },
    SPECIAL_POTION_LOW_DEF: { text: 'Potion spéciale', img: PATH_IMAGE + 'Buff_KeepWeaken_DefensePerDown.png', desc: 'Debuff de défense (Niveau 5), ne peut se dissipé (Feu 20 sec, Ténèbres 30 sec)' },
    ELECTRIC_SHOCK_MORE_DAMAGE: { text: 'Choc électrique', img: PATH_IMAGE + 'debuff_33_electric_shock_more_damage.png', desc: 'Augmente les dégâts subis, ne peut se dissiper' },
    ANKLE_CUT: { text: 'Taillade de la cheville', img: PATH_IMAGE + 'Buff_KeepWeaken_HastePerDown.png', desc: 'Réduit la vitesse de 30%, ne peut se dissiper (10 secondes).' },
    BLOWING_BELLOWS: { text: 'Soufflets du maître', img: PATH_IMAGE + 'Buff_KeepWeaken_Mabel.png', desc: 'Augmente les dégâts subis par la cible de 30%, ne peut se dissiper (Forêt 10 sec, Lumière 20 sec).' },
    BRIGHT_LIGHT: { text: 'Lumière de l\'espérance', img: PATH_IMAGE + 'Buff_AttackPerDown.png', desc: 'Réduit l\'attaque (15% Feu, 25% Lumière), ne peut se dissiper (10 secondes).' },
    BLEEDING: { text: 'Saignement', img: PATH_IMAGE + 'Buff_Bleeding.png', desc: 'Inflige des dégâts en fonction de l\'attaque après 5 secondes, ne dépassant pas 50% des PV max de l\'ennemi. Ne peut se dissiper' },
    POISON: { text: 'Poison', img: PATH_IMAGE + 'Buff_ContinuousNeutralDamage.png', desc: 'Inflige 9% des PV max en dégâts pendant sa durée, ne peut se dissiper.' },
    POWERFUL_POISON: { text: 'Poison puissant', img: PATH_IMAGE + 'Debuff_PowerfulPoison.png', desc: 'Inflige 15% des PV max en dégâts pendant sa durée, ne peut se dissiper.' },
    DISORIENTATION: { text: 'Désorientation', img: PATH_IMAGE + 'Buff_Confusion02.png', desc: 'Empêche la cible d\'utiliser des compétences. En JcJ, réduit son ATK et sa DEF (30% Feu, 50% Ténèbres)' },
    OZYMANDIAS: { text: 'Alchimie effroyable', img: PATH_IMAGE + 'Debuff_ReducedHeal.png', desc: 'Réduit les soins reçus des guérisseurs et soutiens (20% Forêt, 40% Ténèbres)' }

});

const EFFECT = Object.freeze({
	ATK_UP: { text: 'Augmente l\'attaque de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente l\'attaque de {value}%' },
    DEF_UP: { text: 'Augmente la défense de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la défense de {value}%' },
	SPD_UP: { text: 'Augmente la vitesse de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la vitesse de {value}%' },
    HP_UP: { text: 'Augmente les PV de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente les PV de {value}%' },
    CRI_RATE_UP: { text: 'Augmente le taux critique de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente le taux critique de {value}%' },
    CRI_DMG_UP: { text: 'Augmente les dégâts critiques de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente les dégâts critiques de {value}%' },
    SPD_UP: { text: 'Augmente la vitesse de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la vitesse de {value}%' },
    ACC_UP: { text: 'Augmente la précision de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la précision de {value}%' },
    RES_UP: { text: 'Augmente la résistance de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la résistance de {value}%' },
    GLANCING_MAX: { text: 'Augmente le taux de frappe oblique au maximum', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente le taux de frappe oblique au maximum' },

    REVIVAL_ALL: { text: 'Ressucite tous les alliés avec {value}% des PV', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Ressucite tous les alliés avec {value}% des PV', },
    REVIVAL_1: { text: 'Ressucite un allié avec {value}% des PV', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Ressucite un allié avec {value}% des PV' },
    REVIVAL_SELF: { text: 'Soigne 100% des PV (1 fois par combat)', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Soigne 100% des PV (1 fois par combat)' },

    HEAL_BY_DEBUFF: { text: 'Soigne {value}% de PV par debuff', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Soigne {value}% de PV par debuff' },
    HEAL: { text: 'Soigne les alliés de {value}% de PV', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Soigne les alliés de {value}% de PV' },
    HEAL_ATK: { text: 'Soigne les alliés de {value}% de l\'attaque', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Soigne les alliés de {value}% de l\'attaque' },
    ATTACK_LOWERS_DEF: { text: 'Réduit la défense ennemie de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit la défense ennemie de {value}%' },
    DMG_UP: { text: 'Augmente les dégâts de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente les dégâts de {value}%' },
    ATK_DOWN: { text: 'Réduit l\'attaque de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit l\'attaque de {value}%' },
    DMG_DOWN: { text: 'Réduit les dégâts subis de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit les dégâts subis de {value}%' },
    COMBO_DMG_DOWN: { text: 'Réduit les dégâts subis d\'aptitudes de combo de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit les dégâts subis d\'aptitudes de combo de {value}%' },
    IGN_DMG_DOWN: { text: 'Réduit les dégâts subis d\'attaques anti-def de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit les dégâts subis d\'attaques anti-def de {value}%' },
    //MAX_DMG_OF_HP: { text: 'Dégâts maximum de {value}% des PV', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dégâts maximum de {value}% des PV' }, // A remplacer par MAX_DMG_PER_HIT
    MAX_DMG_PER_HIT: { text: 'Dégâts maximum de {value}% des PV max par coup', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dégâts maximum de {value}% des PV max par coup' },
    MULTIHIT_DMG_DOWN: { text: 'Réduit les dégâts d\'aptitudes de combo de {value}% à partir du second coup', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit les dégâts d\'aptitudes de combo de {value}% à partir du second coup' },
    SKILL_CHARGE: { text: 'Augmente la jauge d\'aptitude de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la jauge d\'aptitude de {value}%' },
    SKILL_DISCHARGE: { text: 'Réduit la jauge d\'aptitude de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit la jauge d\'aptitude de {value}%' },
    SKILL_DISCHARGE_HIGHEST: { text: 'Réduit la jauge d\'aptitude la plus chargée de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit la jauge d\'aptitude la plus chargée de {value}%' },
    COMBO_CHARGE: { text: 'Augmente la jauge d\'aptitude de combo de {value}%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente la jauge d\'aptitude de combo de {value}%' },
	
	NO_PASSIVE: { text: 'Passif désactivé', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Passif désactivé' },
    NO_SPEED: { text: 'Réduit la vitesse de 80\%', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Réduit la vitesse de 80\%' },
    REMOVE_DEBUFF_ALL: { text: 'Dissipe tous les debuffs', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dissipe tous les debuffs' },
    REMOVE_DEBUFF: { text: 'Dissipe {value} debuff(s)', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dissipe {value} debuff(s)' },
    REMOVE_BUFF_ALL: { text: 'Dissipe tous les buffs', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dissipe tous les buffs' },
    REMOVE_BUFF: { text: 'Dissipe {value} buff(s)', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dissipe {value} buff(s)' },
    REMOVE_BUFF_SHIELD: { text: 'Dissipe un bouclier', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dissipe un bouclier' },
	REMOVE_BUFF_SHIELDS: { text: 'Dissipe tous les boucliers', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Dissipe tous les boucliers' },
	SPEED_EQUALIZER: { text: 'Vitesse ennemi = vitesse du lanceur', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Vitesse ennemi = vitesse du lanceur' },
    TRANSFER: { text: 'Transfère vers la cible', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Transfère vers la cible' },

	SILENCE_IMMUNE: { text: 'Immunité au silence', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité au silence' },
	PETRIFY_IMMUNE: { text: 'Immunité à pétrification', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité à pétrification' },
	STUN_IMMUNE: { text: 'Immunité à l\'étourdissement', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité à l\'étourdissement' },
	FREEZE_IMMUNE: { text: 'Immunité au gel', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité au gel' },
    ATK_DEBUFF_IMMUNE: { text: 'Immunité à Attaque↓', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité à Attaque↓' },
	DEF_DEBUFF_IMMUNE: { text: 'Immunité à Défense↓', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité à Défense↓' },
    SPD_DEBUFF_IMMUNE: { text: 'Immunité à Vitesse↓', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité à Vitesse↓' },
    HEAL_DEBUFF_IMMUNE: { text: 'Immunité à la privation de soins', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Immunité à la privation de soins' },

    ATK_FROM_HP: { text: 'Augmente les PV de {value}% de l\'attaque', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Augmente les PV de {value}\% de l\'attaque' },

    LOST_BULLET_1: { text: 'Inflige des dégâts antidef à un autre ennemi aléatoire, max {value}% des PV de la cible', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Inflige des dégâts antidef à un autre ennemi aléatoire, max {value}% des PV de la cible' },
    LOST_BULLET_2: { text: 'Inflige des dégâts antidef à deux autres ennemis aléatoires, max {value}% des PV des cibles', img: PATH_IMAGE + 'ico_empty_book.png', desc: 'Inflige des dégâts antidef à deux autres ennemis aléatoires, max {value}% des PV des cibles' },

});

const CONDITION = Object.freeze({
    REGION_ALL: '[Toutes les régions]',
    REGION_STAGE: '[Manoir]',
    REGION_PVP: '[JcJ]',
    REGION_TOWER: '[Abaddon]',
    REGION_DUNGEON: '[Donjon]',
    REGION_RAID: '[Raid]',
    REGION_GUILD: '[Guilde]',
    REGION_INVASION: '[Invasion]',

    FLAG_SKILL_ATTACKED_CRITICAL: '[coup critique subi]',
    FLAG_SKILL_ATTACKED: '[Aptitude subie]',
    FLAG_NORMAL_ATTACKED: '[Attaque normale subie]',
    FLAG_SKILL_USE: '[Aptitude]',
    FLAG_SKILL_CRITICAL: '[Aptitude critique]',
    FLAG_COMBO_USE: '[Combo]',
    FLAG_COMBO_CRITICAL: '[Combo critique]',
    FLAG_COMBO_BY_SEQUEL: '[Marque secondaire]',
    FLAG_EVERY_CRITICAL: '[Coup critique]',
    FLAG_EVERY_ATTACK: '[Toutes les attaques]',
    FLAG_ATTACK_NORMAL: '[Attaque normale]',
    FLAG_ATTACK_CRITICAL: '[Attaque normale critique]',
    FLAG_START: '[Au début du combat]',
    FLAG_PERMA: '[Permanent]',
    FLAG_ELEMENTAL_MATCH: '[Même élément pour tous les alliés]',

    FLAG_TANK_ATTACKED: '[Tank frappé]',
    FLAG_TANK_ATTACKED_BY_SKILL: '[Tank frappé par aptitude]',
    FLAG_TANK_SAME_ELEMENT: '[Tank même élément]',
    FLAG_NO_HIT_3SEC: '[3 secondes sans dégâts]',
    FLAG_NO_HIT_10SEC: '[10 secondes sans dégâts]',

    FLAG_PROVOKE: '[Pendant provocation]',
    FLAG_VAMPIRE: '[Pendant vampire]',
    FLAG_SHIELD: '[Pendant bouclier]',
    FLAG_REFLECT: '[Pendant renvoi]',
    FLAG_REVIVAL_BUFF: '[Pendant rédemption]',
    FLAG_MISS_BUFF: '[Pendant augmentation de frappes obliques]',
    FLAG_HEAL: '[Pendant soins]',
    FLAG_HEAL_OVER_HP: '[Soin excedent]',
    FLAG_HEAL_USE: '[En cas de soin]',
    FLAG_STUN_SELF: '[Si étourdi]',
    FLAG_DEBUFF_DEF_SELF: '[Sous l\'effet d\'un debuff de défense]',
    FLAG_REMOVE_DEBUFF_SELF: '[Si des debuffs sont dissipés]',
	FLAG_REMOVE_DEBUFF_NONE: '[Aucun debuff dissipé]',
    FLAG_REMOVE_BUFF: '[Si des buffs sont dissipés chez l\'ennemi]',
    FLAG_REMOVE_SHIELD: '[Si un bouclier est dissipé]',
    FLAG_BUFF_SELF: '[Sous l\'effet d\'un buff]',
	FLAG_DEF_OVERFLOW: '[DEF > DEF ennemi]',
    FLAG_BUFF_TRANSFORM_1: '[Transforme 1 buff]',
    FLAG_BUFF_TRANSFORM_2: '[Transforme 2 buff]',

    FLAG_HP_DEATH: '[Si les PV tombent à 0]',
    FLAG_HP_LESS_70: '[En dessous de 70\% de PV]',
    FLAG_HP_LESS_90: '[En dessous de 90\% de PV]',
    FLAG_HP_OVER_70: '[Au dessus de 70\% de PV]',
    FLAG_HP_OVER_80: '[Au dessus de 80\% de PV]',
    FLAG_HP_OVER_90: '[Au dessus de 90\% de PV]',
    FLAG_HP_OVER_95: '[Au dessus de 95\% de PV]',
    FLAG_ATTACK_ENEMY_STUN: '[Contre un ennemi étourdi]',

	TARGET_SELF: 'Soi-même',
    TARGET_ALLY: 'Allié',
	TARGET_ALLY_TANK: 'Tank Allié',
	TARGET_ALLY_ATTACK: 'Attaquant Allié',
	TARGET_ALLY_SUPPORT: 'Soutien Allié',
	TARGET_ALLY_HEAL: 'Soigneur Allié',
    TARGET_ALLY_ALL: 'Tous les Alliés',
	TARGET_ALLY_OTHERS: 'Tous les Alliés sauf le lanceur',
    TARGET_ALLY_FIRE: 'Alliés feu',
    TARGET_ALLY_WATER: 'Alliés eau',
    TARGET_ALLY_FOREST: 'Alliés forêt',
    TARGET_ALLY_LIGHT: 'Alliés lumière',
    TARGET_ALLY_DARK: 'Alliés ténèbres',
    TARGET_ALLY_REVIVED: 'Allié ressucité',
    TARGET_ALLY_HP_LOW: 'Allié (PV bas)',

    TARGET_ENEMY: 'Ennemi',
	TARGET_ENEMY_TANK: 'Tank Ennemi',
	TARGET_ENEMY_ATTACK: 'Attaquant Ennemi',
	TARGET_ENEMY_SUPPORT: 'Soutien Ennemi',
	TARGET_ENEMY_HEAL: 'Soigneur Ennemi',
    TARGET_ENEMY_ALL: 'Tous les Ennemis',
    TARGET_ENEMY_SINGLE: 'Un seul ennemi',
    TARGET_ENEMY_BUFF_NO_DEBUFF: 'Ennemi sous immunité',
    TARGET_ENEMY_NOT_DEBUFF_DEF: 'Ennemi sans Défense↓',
    TARGET_ENEMY_DEBUFF_ATK: 'Ennemi sous Attaque↓',
    TARGET_ENEMY_DEBUFF_DEF: 'Ennemi sous Défense↓',
    TARGET_ENEMY_DEBUFF_SPD: 'Ennemis sous Vitesse↓',
    TARGET_ENEMY_DEBUFF_MORE_DMG: 'Ennemi sous marque',
    TARGET_ENEMY_DEBUFF_NO_REVIVAL: 'Ennemi sous Blocage de résurection',
    TARGET_ENEMY_DEBUFF_NO_BUFF: 'Ennemi sans buff',
    TARGET_ENEMY_DEBUFF_POISON: 'Ennemi empoisonné',
    TARGET_ENEMY_DEBUFF_BLEEDING: 'Ennemi sous saignement',
    TARGET_ENEMY_CC_SILENCE: 'Ennemi sous silence',
	TARGET_ENEMY_CC_STUN: 'Ennemi étourdi',
	TARGET_ENEMY_CC_FREEZE: 'Ennemi gelé',

    TARGET_RAID_BOSS: 'Boss de raid',
    TARGET_RAID_LUCIEN: 'Lucian, monarque de feu',
    TARGET_RAID_RAGNA: 'Ragna, monarque d\'eau',
    TARGET_RAID_BASTILLE: 'Bastille, monarque de forêt',
    TARGET_DUNGEON_BOSS: 'Boss du donjon',
    TARGET_DUNGEON_OMEN: 'Présage',
});

const NOR_1 = Object.freeze({
	SPD40: 'Augmente la vitesse de 40',
	CRI80: 'Augmente les dégâts critiques de 80%',
    CRI580: 'Augmente les dégâts critiques de 580%',
});

const SPE_2 = Object.freeze({

});

const SPE_4 = Object.freeze({
    BOOST_ON_CRIT: { text: 'Boost sur coup critique', desc: 'Augmente la jauge d\'aptitude de combo des serviteurs d\'attaque de 14% lorsqu\'une aptitude active inflige un coup critique'},
    BOOST_ACTIVE_SUPP_ON_TANK_HIT: { text: 'Boost apt. act. supp. sur tank touché', desc: 'Augmente la jauge d\'aptitude active du lanceur ainsi que celle des serviteurs de soutien de 10% lorsqu\'un tank allié est touché (rechargement: 6 secondes)'},
    BOOST_ON_STRIP: { text: 'boost sur dissip.', desc: 'Augmente la jauge d\'aptitude de tous les alliés de 18% quand des buffs sont dissipés chez l\'ennemi'},
    SHIELD_ON_SKILL: { text: 'bouclier sur apt.', desc: 'Confère un bouclier à tous les alliés à hauteur de 18% des PV du lanceur durant 30s lors de l\'utilisation d\'une aptitude active'},
    REDUCE_DMG_ON_HEAL: { text: 'dégâts réduits pdt. soin', desc: 'Réduit les dégâts subis par tous les alliés de 28% pendant la durée de vos soins périodiques'},
    BOOST_ATK_ON_TANK_HIT: { text: 'boost atq. sur tank touché', desc: 'Augmente la jauge d\'aptitude de combo des serviteurs d\'attaque de 10% lorsqu\'un tank allié est touché (rechargement: 6 secondes)'},
    DEBUFF_ATK_ON_HIT: { text: 'debuff atk.', desc: '18% de chances de réduire l\'attaque de l\'ennemi (Nv.1) après n\'importe quelle attaque'},
    HEAL_ON_SKILL_DURING_HEAL: { text: 'soin sur apt. pdt. soin', desc: 'Soigne les PV de tous les alliés de 18% lors de l\'utilisation d\'une aptitude en étant affecté par des soins périodiques'},
    REDUCE_DMG_BY_COMBO_DURING_SHIELD: { text: 'réd. dég. combo pdt. bouclier', desc: 'Réduit les dégâts subis par les aptitudes de combo de 60% durant bouclier'},
    BOOST_SUPP_ON_TANK_HIT: { text: 'Boost combo supp. sur tank touché', desc: 'Augmente la jauge d\'aptitude de combo du lanceur ainsi que celle des serviteurs de soutien de 10% lorsqu\'un tank allié est touché (rechargement: 6 secondes)'},
});

const SPE_5 = Object.freeze({

});