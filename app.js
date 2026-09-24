/**
 * くまさんくまさん まねっこ＆ことばあそび アプリロジック
 * 特別支援学校（知的障害）小学部 国語科単元用
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. 定数・プリセットデータ定義
  // =========================================================================

  // ポーズごとのSVG表現・アクセサリ定義
  const POSE_DEFINITIONS = {
    maware: {
      name: 'まわる',
      icon: '🔄',
      animClass: 'anim-maware',
      faceType: 'smile',
      arms: 'normal',
      legs: 'normal'
    },
    ryoute: {
      name: 'りょうてをつく',
      icon: '🙇',
      animClass: 'anim-ryoute',
      faceType: 'happy',
      arms: 'down',
      legs: 'squat'
    },
    kataashi: {
      name: 'かたあしあげ',
      icon: '🦩',
      animClass: 'anim-kataashi',
      faceType: 'wink',
      arms: 'balance',
      legs: 'one-up'
    },
    sayounara: {
      name: 'さようなら（てをふる）',
      icon: '👋',
      animClass: 'anim-sayounara',
      faceType: 'smile',
      arms: 'wave',
      legs: 'normal'
    },
    jump: {
      name: 'ジャンプ',
      icon: '🦘',
      animClass: 'anim-jump',
      faceType: 'happy',
      arms: 'up',
      legs: 'jump'
    },
    clap: {
      name: 'てをたたく',
      icon: '👏',
      animClass: 'anim-clap',
      faceType: 'happy',
      arms: 'clap',
      legs: 'normal'
    },
    banzai: {
      name: 'バンザイ',
      icon: '🙌',
      animClass: 'anim-banzai',
      faceType: 'big-smile',
      arms: 'banzai',
      legs: 'normal'
    },
    atama: {
      name: 'あたまポンポン',
      icon: '🙆',
      animClass: 'anim-atama',
      faceType: 'smile',
      arms: 'head',
      legs: 'normal'
    },
    oshiri: {
      name: 'おしりふりふり',
      icon: '🍑',
      animClass: 'anim-oshiri',
      faceType: 'back', // 後ろ姿
      arms: 'side',
      legs: 'normal'
    },
    oyasumi: {
      name: 'おやすみなさい',
      icon: '🌙',
      animClass: 'anim-oyasumi',
      faceType: 'sleep',
      arms: 'hug',
      legs: 'lie'
    },
    ashibumi: {
      name: 'あしぶみ',
      icon: '👟',
      animClass: 'anim-ashibumi',
      faceType: 'smile',
      arms: 'walk',
      legs: 'walk'
    },
    shinkokyu: {
      name: 'しんこきゅう',
      icon: '🌬️',
      animClass: 'anim-shinkokyu',
      faceType: 'happy',
      arms: 'normal',
      legs: 'normal'
    },
    ojigi: {
      name: 'おじぎ',
      icon: '🙇',
      animClass: 'anim-ojigi',
      faceType: 'smile',
      arms: 'ojigi',
      legs: 'normal'
    },
    shagamu: {
      name: 'しゃがむ',
      icon: '🧘',
      animClass: 'anim-shagamu',
      faceType: 'smile',
      arms: 'normal',
      legs: 'squat'
    },
    nobi: {
      name: 'せのび',
      icon: '🙆',
      animClass: 'anim-nobi',
      faceType: 'happy',
      arms: 'stretch',
      legs: 'normal'
    },
    stop: {
      name: 'ストップ！',
      icon: '✋',
      animClass: 'anim-stop',
      faceType: 'surprise',
      arms: 'stop',
      legs: 'normal'
    }
  };

  // 標準プリセットカード（全15種）
  const DEFAULT_CARDS = [
    {
      id: 'default_maware',
      text: 'ま わ れ み ぎ',
      speech: 'くるっと まわってみよう！',
      pose: 'maware',
      isDefault: true,
      customImage: null
    },
    {
      id: 'default_ryoute',
      text: 'り ょ う て を つ い て',
      speech: 'ゆかに てを ぺったん！',
      pose: 'ryoute',
      isDefault: true,
      customImage: null
    },
    {
      id: 'default_kataashi',
      text: 'か た あ し あ げ て',
      speech: 'おっとっと！ たてるかな？',
      pose: 'kataashi',
      isDefault: true,
      customImage: null
    },
    {
      id: 'default_sayounara',
      text: 'さ よ う な ら',
      speech: 'てを ふって バイバイ！',
      pose: 'sayounara',
      isDefault: true,
      customImage: null
    },
    {
      id: 'preset_ashibumi',
      text: 'あ し ぶ み し て',
      speech: 'いち に！ いち に！ あしぶみ！',
      pose: 'ashibumi',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_jump',
      text: 'ジ ャ ン プ し て',
      speech: 'ぴょんぴょん とんでみよう！',
      pose: 'jump',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_clap',
      text: 'て を た た い て',
      speech: 'パチパチ いいおと！',
      pose: 'clap',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_banzai',
      text: 'バ ン ザ イ し て',
      speech: 'ぐーんと おててを あげよう！',
      pose: 'banzai',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_atama',
      text: 'あ た ま を ポ ン ポ ン',
      speech: 'やさしく ポンポンしてね！',
      pose: 'atama',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_shinkokyu',
      text: 'し ん こ き ゅ う',
      speech: 'おおきく すって〜 はいて〜',
      pose: 'shinkokyu',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_ojigi',
      text: 'お じ ぎ し て',
      speech: 'ぺこり！ よろしくね',
      pose: 'ojigi',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_shagamu',
      text: 'し ゃ が ん で',
      speech: 'ちいさく まるくなろう！',
      pose: 'shagamu',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_nobi',
      text: 'の び を し て',
      speech: 'ぐーんと せのびしよう！',
      pose: 'nobi',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_oshiri',
      text: 'お し り ふ り ふ り',
      speech: 'フリフリ ダンスだよ！',
      pose: 'oshiri',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_stop',
      text: 'ス ト ッ プ ！',
      speech: 'ピタッ！ とまれるかな？',
      pose: 'stop',
      isDefault: false,
      customImage: null
    },
    {
      id: 'preset_oyasumi',
      text: 'お や す み な さ い',
      speech: 'めを とじて おやすみなさい',
      pose: 'oyasumi',
      isDefault: false,
      customImage: null
    }
  ];

  // =========================================================================
  // 2. アプリケーション状態
  // =========================================================================

  let allCards = [];           // 全カードリスト（プリセット＋カスタム）
  let playlistIds = [];        // 現在の演奏順（カードIDの配列）
  let currentIndex = 0;        // 現在表示中のカードインデックス
  let autoPlayTimer = null;    // 自動送りタイマー
  let selectedNewPose = 'jump';// 新規作成モーダルで選択されたポーズ
  let customImageDataUrl = null;// 新規作成モーダルでアップロードされた画像

  // =========================================================================
  // 3. くまさん SVG 生成ジェネレータ
  // =========================================================================

  function generateBearSVG(poseKey) {
    const pose = POSE_DEFINITIONS[poseKey] || POSE_DEFINITIONS.maware;

    // 後ろ姿（おしりふりふり）の場合
    if (pose.faceType === 'back') {
      return `
        <svg class="bear-svg ${pose.animClass}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
          <!-- 影 -->
          <ellipse cx="160" cy="290" rx="90" ry="16" fill="#E2D9C8" />
          
          <!-- 後頭部の耳 -->
          <circle cx="95" cy="80" r="28" fill="#8D5B28" stroke="#6D431B" stroke-width="4" />
          <circle cx="225" cy="80" r="28" fill="#8D5B28" stroke="#6D431B" stroke-width="4" />
          
          <!-- 後ろ足 -->
          <ellipse cx="115" cy="270" rx="30" ry="20" fill="#75471F" />
          <ellipse cx="205" cy="270" rx="30" ry="20" fill="#75471F" />

          <!-- 体（後ろ向き・丸っこいお尻） -->
          <ellipse cx="160" cy="210" rx="85" ry="75" fill="#A06934" stroke="#6D431B" stroke-width="5" />
          
          <!-- しっぽ -->
          <circle cx="160" cy="225" r="24" fill="#C2874E" stroke="#6D431B" stroke-width="4" />

          <!-- 頭（後ろ向き） -->
          <circle cx="160" cy="120" r="75" fill="#A06934" stroke="#6D431B" stroke-width="5" />

          <!-- 腕（後ろから見た腕） -->
          <ellipse cx="80" cy="180" rx="22" ry="38" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(25 80 180)" />
          <ellipse cx="240" cy="180" rx="22" ry="38" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(-25 240 180)" />
          
          <!-- 音符アクセント -->
          <g fill="#F59E0B">
            <path d="M260 90 A10 10 0 1 1 250 105 L250 70 L280 60 L280 80 Z" />
            <path d="M50 110 A8 8 0 1 1 40 122 L40 95 L65 88 L65 105 Z" />
          </g>
        </svg>
      `;
    }

    // 目・表情のバリエーション
    let eyesSvg = `
      <!-- 通常のつぶらな目 -->
      <ellipse cx="135" cy="115" rx="7" ry="9" fill="#2B1810" />
      <circle cx="137" cy="112" r="3" fill="#FFF" />
      <ellipse cx="185" cy="115" rx="7" ry="9" fill="#2B1810" />
      <circle cx="187" cy="112" r="3" fill="#FFF" />
    `;

    if (pose.faceType === 'wink') {
      eyesSvg = `
        <!-- ウインク -->
        <ellipse cx="135" cy="115" rx="7" ry="9" fill="#2B1810" />
        <circle cx="137" cy="112" r="3" fill="#FFF" />
        <path d="M175 116 Q185 108 195 116" stroke="#2B1810" stroke-width="4" fill="none" stroke-linecap="round" />
      `;
    } else if (pose.faceType === 'happy' || pose.faceType === 'big-smile') {
      eyesSvg = `
        <!-- にっこり目 -->
        <path d="M125 116 Q135 106 145 116" stroke="#2B1810" stroke-width="4.5" fill="none" stroke-linecap="round" />
        <path d="M175 116 Q185 106 195 116" stroke="#2B1810" stroke-width="4.5" fill="none" stroke-linecap="round" />
      `;
    } else if (pose.faceType === 'sleep') {
      eyesSvg = `
        <!-- 閉じた目＆Zzz -->
        <path d="M125 116 Q135 124 145 116" stroke="#2B1810" stroke-width="4" fill="none" stroke-linecap="round" />
        <path d="M175 116 Q185 124 195 116" stroke="#2B1810" stroke-width="4" fill="none" stroke-linecap="round" />
        <text x="240" y="80" font-size="28" font-weight="bold" fill="#3B82F6">Z</text>
        <text x="260" y="60" font-size="22" font-weight="bold" fill="#60A5FA">z</text>
        <text x="275" y="44" font-size="16" font-weight="bold" fill="#93C5FD">z</text>
      `;
    } else if (pose.faceType === 'tongue') {
      eyesSvg = `
        <!-- 楽しそうな細目 -->
        <path d="M125 115 Q135 108 145 115" stroke="#2B1810" stroke-width="4.5" fill="none" stroke-linecap="round" />
        <path d="M175 115 Q185 108 195 115" stroke="#2B1810" stroke-width="4.5" fill="none" stroke-linecap="round" />
      `;
    } else if (pose.faceType === 'funny') {
      eyesSvg = `
        <!-- へんがお目（渦巻き風） -->
        <circle cx="135" cy="115" r="10" fill="#FFF" stroke="#2B1810" stroke-width="3" />
        <circle cx="135" cy="115" r="4" fill="#2B1810" />
        <circle cx="185" cy="115" r="14" fill="#FFF" stroke="#2B1810" stroke-width="3" />
        <circle cx="183" cy="113" r="5" fill="#2B1810" />
      `;
    } else if (pose.faceType === 'surprise') {
      eyesSvg = `
        <!-- びっくり丸目 -->
        <circle cx="135" cy="115" r="10" fill="#FFF" stroke="#2B1810" stroke-width="3.5" />
        <circle cx="135" cy="115" r="5" fill="#2B1810" />
        <circle cx="185" cy="115" r="10" fill="#FFF" stroke="#2B1810" stroke-width="3.5" />
        <circle cx="185" cy="115" r="5" fill="#2B1810" />
      `;
    }

    // 口のバリエーション
    let mouthSvg = `
      <!-- 通常の口 -->
      <path d="M160 135 L160 144 M160 144 Q152 153 145 146 M160 144 Q168 153 175 146" stroke="#2B1810" stroke-width="3.5" fill="none" stroke-linecap="round" />
    `;

    if (pose.faceType === 'tongue') {
      mouthSvg = `
        <!-- 舌出し -->
        <path d="M160 135 L160 144" stroke="#2B1810" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <path d="M150 144 Q160 148 170 144" stroke="#2B1810" stroke-width="3.5" fill="none" />
        <path d="M153 145 C153 162 167 162 167 145 Z" fill="#F43F5E" stroke="#E11D48" stroke-width="2" />
      `;
    } else if (pose.faceType === 'funny') {
      mouthSvg = `
        <!-- へんがお口（波々） -->
        <path d="M142 146 Q150 138 160 146 Q170 154 178 144" stroke="#2B1810" stroke-width="4" fill="none" stroke-linecap="round" />
      `;
    } else if (pose.faceType === 'surprise') {
      mouthSvg = `
        <!-- びっくりお口（まる） -->
        <ellipse cx="160" cy="148" rx="8" ry="10" fill="#2B1810" />
      `;
    }

    // 腕のバリエーション
    let armsSvg = `
      <!-- 通常の腕 -->
      <g class="bear-arm-left">
        <ellipse cx="90" cy="190" rx="20" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(20 90 190)" />
      </g>
      <g class="bear-arm-right">
        <ellipse cx="230" cy="190" rx="20" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(-20 230 190)" />
      </g>
    `;

    if (pose.arms === 'wave') {
      armsSvg = `
        <!-- 左腕通常、右腕バイバイ：肩(220, 180)から右上へ綺麗に伸びる -->
        <g class="bear-arm-left">
          <ellipse cx="90" cy="190" rx="20" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(20 90 190)" />
        </g>
        <g class="bear-arm-right">
          <path d="M220 180 Q240 135 250 110" stroke="#8D5B28" stroke-width="34" stroke-linecap="round" fill="none" />
          <circle cx="252" cy="105" r="18" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
      `;
    } else if (pose.arms === 'balance') {
      armsSvg = `
        <!-- 両手を左右に広げてバランスをとる（かたあしあげて） -->
        <g class="bear-arm-left">
          <ellipse cx="75" cy="180" rx="35" ry="18" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(-10 75 180)" />
          <circle cx="45" cy="178" r="15" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
        <g class="bear-arm-right">
          <ellipse cx="245" cy="180" rx="35" ry="18" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(10 245 180)" />
          <circle cx="275" cy="178" r="15" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
      `;
    } else if (pose.arms === 'clap') {
      armsSvg = `
        <!-- 拍手する腕 -->
        <g class="bear-arm-left">
          <ellipse cx="120" cy="190" rx="18" ry="36" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(45 120 190)" />
        </g>
        <g class="bear-arm-right">
          <ellipse cx="200" cy="190" rx="18" ry="36" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(-45 200 190)" />
        </g>
        <!-- キラキラ星アクセント -->
        <polygon points="160,165 163,172 170,172 164,177 167,184 160,179 153,184 156,177 150,172 157,172" fill="#F59E0B" />
      `;
    } else if (pose.arms === 'banzai') {
      armsSvg = `
        <!-- バンザイ両手：頭より高くV字に挙げる -->
        <g class="bear-arm-left">
          <path d="M100 180 Q75 110 55 60" stroke="#8D5B28" stroke-width="36" stroke-linecap="round" fill="none" />
          <circle cx="55" cy="60" r="18" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
        <g class="bear-arm-right">
          <path d="M220 180 Q245 110 265 60" stroke="#8D5B28" stroke-width="36" stroke-linecap="round" fill="none" />
          <circle cx="265" cy="60" r="18" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
      `;
    } else if (pose.arms === 'head') {
      armsSvg = `
        <!-- あたまポンポン：右手が頭のてっぺんに直接触れる -->
        <g class="bear-arm-left">
          <ellipse cx="90" cy="190" rx="20" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(20 90 190)" />
        </g>
        <g class="bear-arm-right">
          <path d="M225 180 Q255 105 185 52" stroke="#8D5B28" stroke-width="36" stroke-linecap="round" fill="none" />
          <circle cx="178" cy="48" r="19" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
      `;
    } else if (pose.arms === 'stretch') {
      armsSvg = `
        <!-- のびをして：両手を真上にピーンと高く挙げる -->
        <g class="bear-arm-left">
          <path d="M105 180 Q95 95 100 35" stroke="#8D5B28" stroke-width="36" stroke-linecap="round" fill="none" />
          <circle cx="100" cy="30" r="18" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
        <g class="bear-arm-right">
          <path d="M215 180 Q225 95 220 35" stroke="#8D5B28" stroke-width="36" stroke-linecap="round" fill="none" />
          <circle cx="220" cy="30" r="18" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
      `;
    } else if (pose.arms === 'ojigi') {
      armsSvg = `
        <!-- お辞儀：両手をお腹・太ももの前に揃える -->
        <g class="bear-arm-left">
          <ellipse cx="125" cy="235" rx="17" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(-15 125 235)" />
        </g>
        <g class="bear-arm-right">
          <ellipse cx="195" cy="235" rx="17" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(15 195 235)" />
        </g>
      `;
    } else if (pose.arms === 'stop') {
      armsSvg = `
        <!-- 手のひらを前に出す（ストップ） -->
        <g class="bear-arm-left">
          <ellipse cx="90" cy="190" rx="20" ry="35" fill="#8D5B28" stroke="#6D431B" stroke-width="4" transform="rotate(15 90 190)" />
        </g>
        <g class="bear-arm-right">
          <ellipse cx="210" cy="170" rx="20" ry="32" fill="#8D5B28" stroke="#6D431B" stroke-width="4" />
          <circle cx="225" cy="160" r="22" fill="#E65100" stroke="#6D431B" stroke-width="3" />
          <circle cx="225" cy="160" r="17" fill="#FFF" />
          <path d="M217 153 L233 167 M233 153 L217 167" stroke="#DC2626" stroke-width="4" stroke-linecap="round" />
        </g>
      `;
    } else if (pose.arms === 'down') {
      armsSvg = `
        <!-- 前屈みで両手を床につく：両手が地面(cy=278)にペタッと接地 -->
        <g class="bear-arm-left">
          <path d="M110 200 L95 272" stroke="#8D5B28" stroke-width="34" stroke-linecap="round" fill="none" />
          <ellipse cx="95" cy="276" rx="20" ry="12" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
        <g class="bear-arm-right">
          <path d="M210 200 L225 272" stroke="#8D5B28" stroke-width="34" stroke-linecap="round" fill="none" />
          <ellipse cx="225" cy="276" rx="20" ry="12" fill="#C2874E" stroke="#6D431B" stroke-width="3" />
        </g>
      `;
    }

    // 足のバリエーション
    let legsSvg = `
      <!-- 通常の足 -->
      <g class="bear-leg-left">
        <ellipse cx="120" cy="265" rx="26" ry="18" fill="#75471F" stroke="#543112" stroke-width="3" />
      </g>
      <g class="bear-leg-right">
        <ellipse cx="200" cy="265" rx="26" ry="18" fill="#75471F" stroke="#543112" stroke-width="3" />
      </g>
    `;

    if (pose.legs === 'one-up') {
      legsSvg = `
        <!-- 片足を上げる（右足をグッと高く持ち上げる） -->
        <g class="bear-leg-left">
          <ellipse cx="125" cy="265" rx="28" ry="18" fill="#75471F" stroke="#543112" stroke-width="3" />
        </g>
        <g class="bear-leg-right">
          <ellipse cx="230" cy="215" rx="26" ry="17" fill="#75471F" stroke="#543112" stroke-width="3" transform="rotate(-35 230 215)" />
        </g>
      `;
    } else if (pose.legs === 'squat') {
      legsSvg = `
        <!-- しゃがみ・両手つきの足（外側にしっかり踏ん張る） -->
        <g class="bear-leg-left">
          <ellipse cx="110" cy="268" rx="28" ry="16" fill="#75471F" stroke="#543112" stroke-width="3" transform="rotate(10 110 268)" />
        </g>
        <g class="bear-leg-right">
          <ellipse cx="210" cy="268" rx="28" ry="16" fill="#75471F" stroke="#543112" stroke-width="3" transform="rotate(-10 210 268)" />
        </g>
      `;
    }

    return `
      <svg class="bear-svg ${pose.animClass}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <!-- 影 -->
        <ellipse cx="160" cy="285" rx="90" ry="16" fill="#E2D9C8" />

        <!-- 足 -->
        ${legsSvg}

        <!-- 体 -->
        <ellipse cx="160" cy="205" rx="80" ry="70" fill="#A06934" stroke="#6D431B" stroke-width="5" />
        <!-- お腹のパッチ -->
        <ellipse cx="160" cy="205" rx="50" ry="46" fill="#FEEFD0" />

        <!-- 腕 -->
        ${armsSvg}

        <!-- 頭グループ（耳・顔・表情）：お辞儀等で連動して前に倒れる -->
        <g class="bear-head-group">
          <!-- 耳 -->
          <g class="bear-ears">
            <circle cx="95" cy="80" r="28" fill="#A06934" stroke="#6D431B" stroke-width="4" />
            <circle cx="95" cy="80" r="16" fill="#F8B4B4" />
            <circle cx="225" cy="80" r="28" fill="#A06934" stroke="#6D431B" stroke-width="4" />
            <circle cx="225" cy="80" r="16" fill="#F8B4B4" />
          </g>

          <!-- 頭 -->
          <circle cx="160" cy="120" r="72" fill="#A06934" stroke="#6D431B" stroke-width="5" />

          <!-- ほっぺ -->
          <ellipse cx="115" cy="135" rx="14" ry="8" fill="#FFA4A4" opacity="0.8" />
          <ellipse cx="205" cy="135" rx="14" ry="8" fill="#FFA4A4" opacity="0.8" />

          <!-- 目 -->
          ${eyesSvg}

          <!-- マズル（鼻・口のまわり） -->
          <ellipse cx="160" cy="138" rx="28" ry="22" fill="#FEEFD0" />
          <!-- 鼻 -->
          <ellipse cx="160" cy="128" rx="11" ry="8" fill="#2B1810" />
          <!-- 口 -->
          ${mouthSvg}
        </g>
      </svg>
    `;
  }

  // =========================================================================
  // 4. ストレージ連携＆画像圧縮ユーティリティ
  // =========================================================================

  const STORAGE_KEY_CARDS = 'manekko_all_cards_persistent_v1';
  const STORAGE_KEY_PLAYLIST = 'manekko_playlist_persistent_v1';

  /**
   * 写真を軽量化する関数（最大600pxに自動縮小＆圧縮）
   * アルバムやカメラの高画質写真（数MB〜十数MB）を約40〜70KBに軽量化し、
   * 即時反映と確実な永続保存（localStorageへの保存）を実現します。
   */
  function compressImage(file, maxWidth, maxHeight, quality, callback) {
    if (!file || !file.type.match(/image.*/)) {
      callback(new Error('画像ファイルを選択してください。'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = (file.type === 'image/png') ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, quality);
        callback(null, compressedDataUrl);
      };
      img.onerror = () => callback(new Error('画像の読み込みに失敗しました。'));
      img.src = e.target.result;
    };
    reader.onerror = () => callback(new Error('ファイルの読み込みに失敗しました。'));
    reader.readAsDataURL(file);
  }

  function loadData() {
    try {
      // 過去のストレージキー（v1〜v3）も含めて自作カードを確実に救出・統合する
      let existingCustomCards = [];
      const keysToCheck = [
        STORAGE_KEY_CARDS,
        'manekko_all_cards_v3',
        'manekko_all_cards_v2',
        'manekko_all_cards_v1'
      ];

      keysToCheck.forEach(key => {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              parsed.forEach(c => {
                if (c && !c.isDefault && !existingCustomCards.some(e => e.id === c.id)) {
                  existingCustomCards.push(c);
                }
              });
            }
          }
        } catch (_) {}
      });

      // 常に最新のデフォルトカードに、ユーザーが作った自作カードをマージ
      allCards = [...DEFAULT_CARDS, ...existingCustomCards];

      const savedPlaylist = localStorage.getItem(STORAGE_KEY_PLAYLIST) || localStorage.getItem('manekko_playlist_v3');
      if (savedPlaylist) {
        const parsedPlaylist = JSON.parse(savedPlaylist);
        // 存在確認
        playlistIds = parsedPlaylist.filter(id => allCards.some(c => c.id === id));
      }

      if (!playlistIds || playlistIds.length === 0) {
        playlistIds = ['default_maware', 'default_ryoute', 'default_kataashi', 'default_sayounara'];
      }

      saveCards();
      savePlaylist();
    } catch (e) {
      console.warn('LocalStorage access error, fallback to defaults:', e);
      allCards = [...DEFAULT_CARDS];
      playlistIds = ['default_maware', 'default_ryoute', 'default_kataashi', 'default_sayounara'];
    }
  }

  function saveCards() {
    try {
      localStorage.setItem(STORAGE_KEY_CARDS, JSON.stringify(allCards));
      return true;
    } catch (e) {
      console.error('Could not save cards to localStorage:', e);
      alert('【容量エラー】保存容量がいっぱいです。不要な自作カードを削除するか、「カードをファイルに保存」でバックアップしてください。');
      return false;
    }
  }

  function savePlaylist() {
    try {
      localStorage.setItem(STORAGE_KEY_PLAYLIST, JSON.stringify(playlistIds));
    } catch (e) {
      console.warn('Could not save playlist to localStorage:', e);
    }
  }

  // =========================================================================
  // 5. 画面描画とインタラクション
  // =========================================================================

  const elActionText = document.getElementById('currentActionText');
  const elBearContainer = document.getElementById('bearContainer');
  const elCharacterStage = document.getElementById('characterStage');
  const elCardCounter = document.getElementById('cardCounter');
  const elChkAutoPlay = document.getElementById('chkAutoPlay');

  function getCurrentCard() {
    if (playlistIds.length === 0) return null;
    const id = playlistIds[currentIndex];
    return allCards.find(c => c.id === id) || allCards[0];
  }

  function renderCurrentStage() {
    const card = getCurrentCard();
    if (!card) return;

    // 歌詞テキストの更新
    elActionText.textContent = card.text;
    // 再アニメーション用トリガー
    elActionText.style.animation = 'none';
    void elActionText.offsetWidth; // リフロー
    elActionText.style.animation = 'pop-text 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    // くまさんキャラクター描画
    if (card.customImage) {
      // アップロードされた画像がある場合
      elBearContainer.innerHTML = `<img src="${card.customImage}" alt="${card.text}" class="custom-card-image">`;
    } else {
      // SVGキャラクター描画
      elBearContainer.innerHTML = generateBearSVG(card.pose || 'maware');
    }

    // カウンター更新
    elCardCounter.textContent = `${currentIndex + 1} / ${playlistIds.length}`;
  }

  // くまさんタッチで「もう一回」アニメーション再生
  function replayCurrentAnimation() {
    const card = getCurrentCard();
    if (!card) return;

    if (!card.customImage) {
      elBearContainer.innerHTML = generateBearSVG(card.pose || 'maware');
    } else {
      elBearContainer.style.transform = 'scale(0.92)';
      setTimeout(() => {
        elBearContainer.style.transform = 'scale(1.05)';
        setTimeout(() => { elBearContainer.style.transform = ''; }, 200);
      }, 150);
    }
  }

  function goNext() {
    if (currentIndex < playlistIds.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // ループ
    }
    renderCurrentStage();
  }

  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = playlistIds.length - 1; // 最後のカードへ
    }
    renderCurrentStage();
  }

  function toggleAutoPlay(enable) {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (enable) {
      autoPlayTimer = setInterval(() => {
        goNext();
      }, 5000);
    }
  }

  // =========================================================================
  // 6. 全画面表示（電子黒板対応）
  // =========================================================================

  const btnFullscreen = document.getElementById('btnFullscreen');
  const fullscreenIcon = document.getElementById('fullscreenIcon');

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        fullscreenIcon.textContent = '✕ 解除';
      }).catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          fullscreenIcon.textContent = '⛶ 全画面';
        });
      }
    }
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullscreenIcon.textContent = '⛶ 全画面';
    } else {
      fullscreenIcon.textContent = '✕ 解除';
    }
  });

  // =========================================================================
  // 7. モーダル1: カード選択・並び替えマネージャー
  // =========================================================================

  const modalCardSelect = document.getElementById('modalCardSelect');
  const btnSelectCards = document.getElementById('btnSelectCards');
  const btnCloseCardSelect = document.getElementById('btnCloseCardSelect');
  const btnApplyCards = document.getElementById('btnApplyCards');
  const availableCardList = document.getElementById('availableCardList');
  const activePlaylist = document.getElementById('activePlaylist');
  const activeCardCount = document.getElementById('activeCardCount');
  const btnResetToDefault = document.getElementById('btnResetToDefault');
  const btnSelectAllCards = document.getElementById('btnSelectAllCards');

  const btnExportCards = document.getElementById('btnExportCards');
  const btnImportCards = document.getElementById('btnImportCards');
  const inputImportFile = document.getElementById('inputImportFile');

  // 編集用一時プレイリスト
  let tempPlaylistIds = [];

  function openCardSelectModal() {
    tempPlaylistIds = [...playlistIds];
    renderCardSelectModal();
    modalCardSelect.classList.remove('hidden');
  }

  function closeCardSelectModal() {
    modalCardSelect.classList.add('hidden');
  }

  // 自作カードの削除
  function deleteCustomCard(cardId) {
    const card = allCards.find(c => c.id === cardId);
    if (!card || card.isDefault) return;

    if (!confirm(`「${card.text}」のカードを削除しますか？`)) {
      return;
    }

    allCards = allCards.filter(c => c.id !== cardId);
    tempPlaylistIds = tempPlaylistIds.filter(id => id !== cardId);
    playlistIds = playlistIds.filter(id => id !== cardId);

    if (playlistIds.length === 0) {
      playlistIds = ['default_maware'];
    }
    if (currentIndex >= playlistIds.length) {
      currentIndex = 0;
    }

    saveCards();
    savePlaylist();
    renderCardSelectModal();
    renderCurrentStage();
  }

  // ファイルへエクスポート（ダウンロード）
  function exportCardsToFile() {
    const customCards = allCards.filter(c => !c.isDefault);
    const exportData = {
      app: 'kumasan-manekko',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      customCards: customCards,
      playlistIds: playlistIds
    };

    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    a.href = url;
    a.download = `くまさんカード保存_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ファイルからインポート（読み込み）
  function importCardsFromFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!imported || !Array.isArray(imported.customCards)) {
          alert('正しいカード保存ファイルではありません。');
          return;
        }

        let addedCount = 0;
        imported.customCards.forEach(newCard => {
          if (!allCards.some(c => c.id === newCard.id)) {
            allCards.push(newCard);
            addedCount++;
          }
        });

        if (Array.isArray(imported.playlistIds)) {
          imported.playlistIds.forEach(id => {
            if (!tempPlaylistIds.includes(id) && allCards.some(c => c.id === id)) {
              tempPlaylistIds.push(id);
            }
          });
        }

        saveCards();
        renderCardSelectModal();
        alert(`${addedCount}枚のカードを読み込みました！`);
      } catch (err) {
        alert('ファイルの読み込みに失敗しました: ' + err.message);
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  function renderCardSelectModal() {
    // 利用可能カード一覧
    availableCardList.innerHTML = '';
    allCards.forEach(card => {
      const isSelected = tempPlaylistIds.includes(card.id);
      const poseInfo = POSE_DEFINITIONS[card.pose] || { icon: '🐻' };

      // サムネイル表示（写真カードの場合は実際の写真を表示）
      let iconHtml = `<div class="card-icon">${poseInfo.icon}</div>`;
      if (card.customImage) {
        iconHtml = `<div class="card-icon"><img src="${card.customImage}" alt="${card.text}" class="card-item-thumb"></div>`;
      }

      // バッジ表示
      let badgeHtml = '';
      if (card.isDefault) {
        badgeHtml = '<span class="card-badge">きほん</span>';
      } else {
        badgeHtml = '<span class="card-badge card-badge-custom">じさく</span>';
      }

      // 自作カード専用の削除ボタン
      let trashHtml = '';
      if (!card.isDefault) {
        trashHtml = `<button class="btn-card-trash" title="このカードを削除">🗑️</button>`;
      }

      const cardEl = document.createElement('div');
      cardEl.className = `card-item ${isSelected ? 'selected' : ''}`;
      cardEl.innerHTML = `
        ${trashHtml}
        ${iconHtml}
        <div class="card-title">${card.text}</div>
        ${badgeHtml}
      `;

      cardEl.addEventListener('click', (e) => {
        // 削除ボタンが押された場合
        if (e.target.closest('.btn-card-trash')) {
          e.stopPropagation();
          deleteCustomCard(card.id);
          return;
        }
        toggleCardInPlaylist(card.id);
      });

      availableCardList.appendChild(cardEl);
    });

    // 選択中プレイリスト一覧
    activePlaylist.innerHTML = '';
    activeCardCount.textContent = tempPlaylistIds.length;

    tempPlaylistIds.forEach((id, idx) => {
      const card = allCards.find(c => c.id === id);
      if (!card) return;

      const itemEl = document.createElement('div');
      itemEl.className = 'playlist-item';
      itemEl.innerHTML = `
        <div class="playlist-item-left">
          <span class="playlist-item-num">${idx + 1}</span>
          <span class="playlist-item-text">${card.text}</span>
        </div>
        <div class="playlist-item-actions">
          <button class="btn-order btn-move-up" title="うえへ" ${idx === 0 ? 'disabled style="opacity:0.3"' : ''}>▲</button>
          <button class="btn-order btn-move-down" title="したへ" ${idx === tempPlaylistIds.length - 1 ? 'disabled style="opacity:0.3"' : ''}>▼</button>
          <button class="btn-remove-item" title="はずす">✕</button>
        </div>
      `;

      itemEl.querySelector('.btn-move-up').addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx > 0) {
          const tmp = tempPlaylistIds[idx];
          tempPlaylistIds[idx] = tempPlaylistIds[idx - 1];
          tempPlaylistIds[idx - 1] = tmp;
          renderCardSelectModal();
        }
      });

      itemEl.querySelector('.btn-move-down').addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx < tempPlaylistIds.length - 1) {
          const tmp = tempPlaylistIds[idx];
          tempPlaylistIds[idx] = tempPlaylistIds[idx + 1];
          tempPlaylistIds[idx + 1] = tmp;
          renderCardSelectModal();
        }
      });

      itemEl.querySelector('.btn-remove-item').addEventListener('click', (e) => {
        e.stopPropagation();
        if (tempPlaylistIds.length > 1) {
          tempPlaylistIds.splice(idx, 1);
          renderCardSelectModal();
        } else {
          alert('カードは最低1枚必要です。');
        }
      });

      activePlaylist.appendChild(itemEl);
    });
  }

  function toggleCardInPlaylist(id) {
    const idx = tempPlaylistIds.indexOf(id);
    if (idx >= 0) {
      if (tempPlaylistIds.length > 1) {
        tempPlaylistIds.splice(idx, 1);
      } else {
        alert('カードは最低1枚必要です。');
        return;
      }
    } else {
      tempPlaylistIds.push(id);
    }
    renderCardSelectModal();
  }

  btnResetToDefault.addEventListener('click', () => {
    tempPlaylistIds = ['default_maware', 'default_ryoute', 'default_kataashi', 'default_sayounara'];
    renderCardSelectModal();
  });

  btnSelectAllCards.addEventListener('click', () => {
    tempPlaylistIds = allCards.map(c => c.id);
    renderCardSelectModal();
  });

  if (btnExportCards) {
    btnExportCards.addEventListener('click', exportCardsToFile);
  }
  if (btnImportCards && inputImportFile) {
    btnImportCards.addEventListener('click', () => inputImportFile.click());
    inputImportFile.addEventListener('change', importCardsFromFile);
  }

  btnApplyCards.addEventListener('click', () => {
    playlistIds = [...tempPlaylistIds];
    currentIndex = 0;
    savePlaylist();
    renderCurrentStage();
    closeCardSelectModal();
  });

  // =========================================================================
  // 8. モーダル2: 新しい言葉をつくる（カスタム追加）
  // =========================================================================

  const modalCreateCard = document.getElementById('modalCreateCard');
  const btnCreateCard = document.getElementById('btnCreateCard');
  const btnCloseCreate = document.getElementById('btnCloseCreate');
  const btnCancelCreate = document.getElementById('btnCancelCreate');
  const btnSaveCard = document.getElementById('btnSaveCard');
  const inputActionPhrase = document.getElementById('inputActionPhrase');
  const poseSelector = document.getElementById('poseSelector');
  const inputCustomImage = document.getElementById('inputCustomImage');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  const customImagePreview = document.getElementById('customImagePreview');
  const btnRemoveImage = document.getElementById('btnRemoveImage');

  function openCreateModal() {
    inputActionPhrase.value = '';
    customImageDataUrl = null;
    inputCustomImage.value = '';
    imagePreviewContainer.classList.add('hidden');
    selectedNewPose = 'jump';

    renderPoseSelector();
    modalCreateCard.classList.remove('hidden');
    setTimeout(() => inputActionPhrase.focus(), 100);
  }

  function closeCreateModal() {
    modalCreateCard.classList.add('hidden');
  }

  function renderPoseSelector() {
    poseSelector.innerHTML = '';
    Object.keys(POSE_DEFINITIONS).forEach(key => {
      const p = POSE_DEFINITIONS[key];
      const opt = document.createElement('div');
      opt.className = `pose-option ${selectedNewPose === key ? 'selected' : ''}`;
      opt.innerHTML = `
        <span style="font-size:1.8rem">${p.icon}</span>
        <span>${p.name}</span>
      `;
      opt.addEventListener('click', () => {
        selectedNewPose = key;
        renderPoseSelector();
      });
      poseSelector.appendChild(opt);
    });
  }

  // 写真選択時の処理（高解像度写真を最大600pxに自動圧縮・即時反映）
  inputCustomImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    compressImage(file, 600, 600, 0.82, (err, dataUrl) => {
      if (err) {
        alert(err.message);
        return;
      }
      customImageDataUrl = dataUrl;
      customImagePreview.src = customImageDataUrl;
      imagePreviewContainer.classList.remove('hidden');
    });
  });

  btnRemoveImage.addEventListener('click', () => {
    customImageDataUrl = null;
    inputCustomImage.value = '';
    imagePreviewContainer.classList.add('hidden');
  });

  btnSaveCard.addEventListener('click', () => {
    const textVal = inputActionPhrase.value.trim();
    if (!textVal) {
      alert('「うしろのことば（どうさ）」を入力してください。');
      inputActionPhrase.focus();
      return;
    }

    const newCardId = 'custom_' + Date.now();

    const newCard = {
      id: newCardId,
      text: textVal,
      pose: selectedNewPose,
      isDefault: false,
      customImage: customImageDataUrl
    };

    allCards.push(newCard);
    saveCards();

    // プレイリストの末尾にも自動追加し、そのカードをすぐに表示
    playlistIds.push(newCardId);
    savePlaylist();
    currentIndex = playlistIds.length - 1;

    renderCurrentStage();
    closeCreateModal();
  });

  // =========================================================================
  // 9. モーダル3: つかいかた・ヒント
  // =========================================================================

  const modalHelp = document.getElementById('modalHelp');
  const btnHelp = document.getElementById('btnHelp');
  const btnCloseHelp = document.getElementById('btnCloseHelp');
  const btnCloseHelpBottom = document.getElementById('btnCloseHelpBottom');

  function openHelpModal() {
    modalHelp.classList.remove('hidden');
  }

  function closeHelpModal() {
    modalHelp.classList.add('hidden');
  }

  // =========================================================================
  // 10. イベントリスナー登録と初期化
  // =========================================================================

  // 前へ／次へボタン
  document.getElementById('btnNext').addEventListener('click', goNext);
  document.getElementById('btnPrev').addEventListener('click', goPrev);

  // ステージタッチで再アニメーション
  elCharacterStage.addEventListener('click', replayCurrentAnimation);

  // 自動送り切り替え
  elChkAutoPlay.addEventListener('change', (e) => {
    toggleAutoPlay(e.target.checked);
  });

  // 全画面
  btnFullscreen.addEventListener('click', toggleFullscreen);

  // モーダル開閉
  btnSelectCards.addEventListener('click', openCardSelectModal);
  btnCloseCardSelect.addEventListener('click', closeCardSelectModal);

  btnCreateCard.addEventListener('click', openCreateModal);
  btnCloseCreate.addEventListener('click', closeCreateModal);
  btnCancelCreate.addEventListener('click', closeCreateModal);

  btnHelp.addEventListener('click', openHelpModal);
  btnCloseHelp.addEventListener('click', closeHelpModal);
  btnCloseHelpBottom.addEventListener('click', closeHelpModal);

  // モーダル背景クリックで閉じる
  [modalCardSelect, modalCreateCard, modalHelp].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // キーボードショートカット（電子黒板用リモコンやキーボード操作）
  window.addEventListener('keydown', (e) => {
    // モーダルが開いている時は無効
    if (!modalCardSelect.classList.contains('hidden') ||
        !modalCreateCard.classList.contains('hidden') ||
        !modalHelp.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeCardSelectModal();
        closeCreateModal();
        closeHelpModal();
      }
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  });

  // アプリ初期化実行
  loadData();
  renderCurrentStage();

})();
