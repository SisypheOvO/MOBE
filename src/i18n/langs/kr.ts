export const kr = {
    common: {
        save: "저장",
        cancel: "취소",
        confirm: "확인",
        delete: "삭제",
        edit: "편집",
        loading: "로딩 중...",
    },
    drawer: {
        title: "설정",
        recentContents: "최근 항목",
        language: "언어",
        editorTheme: "편집기 테마",
        selectTheme: "테마 선택",
        storageInfo: "localStorage에 저장됨",
        template: "템플릿",
        renameContent: "이름 바꾸기",
        deleteContent: "콘텐츠 삭제",
        deleteConfirmation: "이 콘텐츠를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.",
        emptyState: "아직 콘텐츠가 없습니다",
        createNew: "새 콘텐츠",
        profile: "의 프로필",
    },
    statusbar: {
        row: "행",
        column: "열",
        charsCount: "문자 수",
        selectedCharsCount: "선택된 문자 수",
    },
    oauthDropdown: {
        importProfile: "프로필 가져오기",
        signOut: "로그아웃",
        globalRanking: "글로벌 랭킹",
        pp: "PP",
        loadError: "사용자 데이터를 불러오지 못했습니다",
        loadErrorDesc: "프로필 정보를 불러오는 중 오류가 발생했습니다. 네트워크 연결을 확인하고 다시 시도해 주세요.",
        retry: "다시 시도",
    },
    toolbar: {
        format: "서식",
        media: "미디어",
        layout: "레이아웃",
        special: "특수",
        osu: "osu!",
    },
    preview: {
        realtimePreview: "실시간 미리보기",
    },
    bbcode: {
        bold: {
            label: "굵게",
            placeholder: "텍스트",
            documentation: "**굵게** - 텍스트를 굵게 만듭니다",
            detail: "BBCode 굵게 태그",
            hoverInfo: "**굵게 태그** - 텍스트를 굵게 만듭니다\n\n사용법: `[b]텍스트[/b]`",
        },
        italic: {
            label: "기울임",
            placeholder: "텍스트",
            documentation: "**기울임** - 텍스트를 기울임체로 만듭니다",
            detail: "BBCode 기울임 태그",
            hoverInfo: "**기울임 태그** - 텍스트를 기울임체로 만듭니다\n\n사용법: `[i]텍스트[/i]`",
        },
        underline: {
            label: "밑줄",
            placeholder: "텍스트",
            documentation: "**밑줄** - 텍스트에 밑줄을 추가합니다",
            detail: "BBCode 밑줄 태그",
            hoverInfo: "**밑줄 태그** - 텍스트에 밑줄을 추가합니다\n\n사용법: `[u]텍스트[/u]`",
        },
        strikethrough: {
            label: "취소선",
            placeholder: "텍스트",
            documentation: "**취소선** - 텍스트에 취소선을 추가합니다",
            detail: "BBCode 취소선 태그",
            hoverInfo: "**취소선 태그** - 텍스트에 취소선을 추가합니다\n\n사용법: `[s]텍스트[/s]`",
        },
        color: {
            label: "색상",
            placeholder: "텍스트",
            documentation: "**텍스트 색상** - 텍스트 색상을 설정합니다\n\n예제: `[color=#ff0000]빨간색 텍스트[/color]`",
            detail: "BBCode 색상 태그",
            hoverInfo: "**색상 태그** - 텍스트 색상을 설정합니다\n\n사용법: `[color=#ff0000]텍스트[/color]`",
        },
        size: {
            label: "크기",
            placeholder: "텍스트",
            documentation: "**텍스트 크기** - 텍스트 크기를 설정합니다(백분율)\n\n예제: `[size=150]큰 텍스트[/size]`",
            detail: "BBCode 크기 태그",
            hoverInfo: "**크기 태그** - 텍스트 크기를 설정합니다\n\n사용법: `[size=100]텍스트[/size]`\n\n팁: 50, 85, 100, 150만 지원됩니다. 100은 보통 크기, 150은 1.5배",
        },
        url: {
            label: "링크",
            placeholder: "링크 텍스트",
            documentation: "**하이퍼링크** - 클릭 가능한 링크를 생성합니다\n\n예제: `[url=https://osu.ppy.sh]osu! 방문[/url]`",
            detail: "BBCode 링크 태그",
            hoverInfo: "**링크 태그** - 하이퍼링크를 생성합니다\n\n사용법: `[url=주소]텍스트[/url]`",
        },
        img: {
            label: "이미지",
            placeholder: "https://example.com/image.jpg",
            documentation: "**이미지** - 이미지를 삽입합니다\n\n예제: `[img]https://example.com/logo.png[/img]`",
            detail: "BBCode 이미지 태그",
            hoverInfo: "**이미지 태그** - 이미지를 삽입합니다\n\n사용법: `[img]이미지 URL[/img]`",
        },
        centre: {
            label: "가운데 정렬",
            placeholder: "가운데 정렬 텍스트",
            documentation: "**가운데 정렬** - 텍스트를 가운데 정렬합니다",
            detail: "BBCode 가운데 정렬 태그",
            hoverInfo: "**가운데 정렬 태그** - 텍스트를 가운데 정렬합니다\n\n사용법: `[centre]텍스트[/centre]`",
        },
        code: {
            label: "코드 블록",
            placeholder: "\n// 코드 내용\n",
            documentation: "**코드 블록** - 서식이 지정된 코드를 표시합니다\n\n프로그래밍 코드를 표시하는 데 사용됩니다",
            detail: "BBCode 코드 블록 태그",
            hoverInfo: "**코드 블록 태그** - 코드 블록을 표시합니다\n\n사용법: `[code]코드[/code]`",
        },
        inlineCode: {
            label: "인라인 코드",
            placeholder: "코드 내용",
            documentation: "**인라인 코드** - 인라인 코드를 표시합니다\n\n프로그래밍 코드를 표시하는 데 사용됩니다",
            detail: "BBCode 인라인 코드 태그",
            hoverInfo: "**인라인 코드 태그** - 인라인 코드를 표시합니다\n\n사용법: `[c]코드[/c]`",
        },
        quote: {
            label: "인용",
            placeholder: "인용 내용",
            documentation: "**인용 블록** - 다른 사람의 말을 인용합니다\n\n답글이나 인용에 자주 사용됩니다\n\n선택적 구문: `[quote=저자]내용[/quote]`",
            detail: "BBCode 인용 태그",
            hoverInfo: "**인용 태그** - 인용된 내용을 표시합니다\n\n사용법: `[quote]인용 텍스트[/quote]`\n또는: `[quote=저자]인용 텍스트[/quote]`",
        },
        list: {
            label: "목록",
            placeholder: "[*]항목1\n[*]항목2\n[*]항목3",
            documentation: "**목록** - 목록을 생성합니다\n\n`[*]`를 사용하여 목록 항목을 나타냅니다\n\n• `[list]` - 순서 없는 목록을 생성합니다(글머리 기호)\n• `[list=TYPE]` - 순서 있는 목록을 생성합니다(번호)",
            detail: "BBCode 목록 태그",
            hoverInfo: "**목록 태그** - 목록을 생성합니다\n\n순서 없는 목록: `[list][*]항목1[*]항목2[/list]`\n\n순서 있는 목록(TYPE은 임의의 값): `[list=TYPE][*]항목1[*]항목2[/list]`",
        },
        spoiler: {
            label: "스포일러",
            placeholder: "숨겨진 내용",
            documentation: "**스포일러 내용** - 클릭해야 볼 수 있는 내용을 생성합니다\n\n스포일러 경고에 자주 사용됩니다",
            detail: "BBCode 스포일러 태그",
            hoverInfo: "**스포일러 태그** - 민감한 콘텐츠를 숨깁니다\n\n사용법: `[spoiler]숨겨진 텍스트[/spoiler]`",
        },
        heading: {
            label: "제목",
            placeholder: "제목 텍스트",
            documentation: "**제목** - osu! 포럼 전용 제목 스타일\n\n눈에 띄는 섹션 제목을 생성합니다",
            detail: "osu! 제목 태그",
            hoverInfo: "**제목 태그** - osu! 포럼 제목 스타일\n\n사용법: `[heading]제목[/heading]`",
        },
        notice: {
            label: "공지 박스",
            placeholder: "공지 내용",
            documentation: "**공지 박스** - osu! 포럼 전용 공지 박스\n\n중요한 공지나 경고를 표시합니다",
            detail: "osu! 공지 박스 태그",
            hoverInfo: "**공지 박스 태그** - osu! 포럼 공지 박스\n\n사용법: `[notice]공지 내용[/notice]`",
        },
        box: {
            label: "접기 박스",
            placeholder: "접힌 내용",
            documentation: "**접기 박스** - osu! 포럼 전용 접기 박스\n\n확장/축소 가능한 콘텐츠 영역을 생성합니다\n\n예제: `[box=클릭하여 확장]내용[/box]`",
            detail: "osu! 박스 태그",
            hoverInfo: "**박스 태그** - osu! 포럼 접기 박스\n\n사용법: `[box=제목]내용[/box]`",
        },
        profile: {
            label: "사용자",
            placeholder: "사용자 이름",
            documentation: "**사용자 링크** - osu! 포럼 사용자 프로필 링크\n\n사용자 홈페이지 링크를 생성합니다\n\n예제: `[profile=2]peppy[/profile]`",
            detail: "osu! 사용자 태그",
            hoverInfo: "**사용자 태그** - osu! 사용자 프로필 링크\n\n사용법: `[profile=사용자 ID]사용자 이름[/profile]`",
        },
        spoilerbox: {
            label: "스포일러 박스",
            placeholder: "스포일러 내용",
            documentation: "**스포일러 박스** - osu! 포럼 전용 스포일러 박스\n\nSPOILER라는 고정 제목의 접기 박스를 생성합니다\n\n예제: `[spoilerbox]스포일러 내용[/spoilerbox]`",
            detail: "osu! 스포일러 박스 태그",
            hoverInfo: "**스포일러 박스 태그** - osu! 포럼 스포일러 박스\n\n사용법: `[spoilerbox]내용[/spoilerbox]`\n\n제목은 SPOILER로 고정됩니다",
        },
        email: {
            label: "이메일",
            placeholder: "Sisy",
            documentation: "**이메일** - 이메일 링크\n\n브라우저의 mailto 기능을 실행하는 이메일 링크를 생성합니다\n\n예제: `[email=test@gmail.com]이메일 이름[/email]`",
            detail: "osu! 이메일 태그",
            hoverInfo: "**이메일 태그** - 이메일 링크\n\n사용법: `[email=이메일 주소]표시 텍스트[/email]`",
        },
        youtube: {
            label: "YouTube",
            placeholder: "",
            documentation: "**YouTube** - YouTube 동영상\n\nYouTube 동영상을 임베드합니다\n\n예제: `[youtube]Ef6zwIR44Ww[/youtube]`",
            detail: "osu! YouTube 태그",
            hoverInfo: "**YouTube 태그** - YouTube 동영상\n\n사용법: `[youtube]동영상 ID[/youtube]`",
        },
        audio: {
            label: "오디오",
            placeholder: "",
            documentation: "**오디오** - 오디오\n\n재생 가능한 오디오를 임베드합니다\n\n예제: `[audio]https://example.com/audiofile[/audio]`",
            detail: "osu! 오디오 태그",
            hoverInfo: "**오디오 태그** - 오디오\n\n사용법: `[audio]오디오 URL(osu!에서 액세스 가능해야 함)[/audio]`",
        },
        imagemap: {
            label: "이미지맵",
            placeholder: "",
            documentation: "**이미지맵** - 이미지맵\n\n클릭 가능한 영역이 있는 이미지를 추가합니다\n\n예제: `[imagemap]https://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/21242012\n\n70 8 30 7 https://osu.ppy.sh/users/27608705\n\n0 16 20 7 https://osu.ppy.sh/users/9650376\n\n22 12 20 7 https://osu.ppy.sh/users/35628968[/imagemap]`",
            detail: "osu! 이미지맵 태그",
            hoverInfo: "**이미지맵 태그** - 이미지맵\n\n사용법: \n\n[imagemap]\n\nhttps://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/1\n\n70 8 30 7 https://osu.ppy.sh/users/2\n\n0 16 20 7 https://osu.ppy.sh/users/3\n\n22 12 20 7 https://osu.ppy.sh/users/4\n\n[/imagemap]",
        },
    },
    defaultContent: `[centre]
[size=150][b]🎨 MOBE에 오신 것을 환영합니다[/b][/size]
[size=85][i]osu! 포럼을 위해 설계된 현대적인 BBCode 편집기[/i][/size]
[/centre]

[heading]✨ 편집기 기능[/heading]

[notice]
이 편집기는 구문 강조, 스마트 자동 완성, 색상 선택기 및 실시간 미리보기를 포함하여 osu! 포럼의 전체 BBCode 구문을 지원합니다.
[/notice]

[heading]📝 텍스트 서식[/heading]

[b]굵은 텍스트[/b] [i]기울임 텍스트[/i] [u]밑줄 텍스트[/u] [s]취소선 텍스트[/s]

[b]조합:[/b][b][i][u]굵게+기울임+밑줄[/u][/i][/b]

[heading]🎨 색상과 크기[/heading]

[color=#ff6b6b]빨간색[/color] [color=#4ecdc4]청록색[/color] [color=#95e1d3]민트 그린[/color] [color=#f38181]분홍색[/color] [color=#d9a6bd]osu! 핑크[/color]

[size=50]작은 텍스트 (50%)[/size]
[size=85]약간 작은 텍스트 (85%)[/size]
[size=100]일반 텍스트 (100%)[/size]
[size=150]큰 텍스트 (150%)[/size]

[heading]🔗 링크와 미디어[/heading]

사용자 프로필 보기: [profile=35628968]SisypheOvO[/profile]의 홈페이지

imagemap 임베드:

[imagemap]
https://sisy.s-ul.eu/UWlCIYOX
53 30 40 60 https://osu.ppy.sh/users/35628968 Sisy
30 70 15 28 https://osu.ppy.sh/users/27608705 MarioKartya
18 70 12 28 https://osu.ppy.sh/users/9650376 Robinia
[/imagemap]

이메일 링크: [email=test@gmail.com]Sisy의 이메일[/email]

오디오 임베드:

[audio]https://raw.githubusercontent.com/ZnCookie/osu-profile/refs/heads/main/music.opus[/audio]

YouTube 동영상 임베드:

[youtube]Ef6zwIR44Ww[/youtube]

[heading]💬 인용과 코드[/heading]

[quote="peppy"]
이것은 peppy의 인용입니다
저자 이름이 있는 인용을 지원합니다
[/quote]

[quote]
이것은 일반 인용 블록입니다
저자 표시 없음
[/quote]

코드 블록 예제:

[code]
function clickCircles() {
    const timing = calculateTiming();
    if (timing.perfect) {
        score += 300;
    }
}
[/code]

인라인 코드: 디버깅을 위해 [c]console.log()[/c]를 사용하거나 [c]beatmap.difficulty[/c] 속성을 확인하세요.

[heading]📋 목록[/heading]

[b]순서 없는 목록 (기본):[/b]
[list]
[*]Standard 모드
[*]Taiko 모드
[*]Catch 모드
[*]Mania 모드
[/list]

[b]순서 있는 목록 (list=1 사용):[/b]
[list=1]
[*]Beatmap 다운로드
[*]osu!로 가져오기
[*]플레이 시작
[*]점수 업로드
[/list]

[heading]👁️ 스포일러와 접기[/heading]

인라인 스포일러: 이것은 [spoiler]숨겨진 텍스트 내용[/spoiler]입니다. 마우스를 올려서 확인하세요.

[box=클릭하여 펼치기: 팁과 요령]
[b]편집기 단축키:[/b]
[list]
[*][b]Ctrl+B[/b] - 굵게
[*][b]Ctrl+I[/b] - 기울임
[*][b]Ctrl+U[/b] - 밑줄
[*][b]Ctrl+K[/b] - 링크 삽입
[/list]

[b]특수 기능:[/b]
[list]
[*]링크 편집: 여는 태그 이름을 수정하면 닫는 태그가 자동으로 동기화됩니다
[*]색상 선택기: [c][color=#...][/c]의 색상 값을 클릭하세요
[*]스마트 자동 완성: [c][[/c]를 입력하여 태그 자동 완성 트리거
[/list]
[/box]

[spoilerbox]
이것은 고정 제목 "SPOILER"가 있는 스포일러 박스입니다
게임 스포일러, 답변 및 기타 민감한 콘텐츠를 숨기는 데 적합합니다
[/spoilerbox]

[heading]🎮 osu! 포럼 태그 중첩 예제[/heading]

[centre]
[url=https://discord.gg/osu][img]https://p.sda1.dev/24/519a9b0cccd78e6b2baf7d385673d596/GcbaktIW4AAuuTF.jpeg[/img][/url]
[b][color=#5CF8EE]V[/color]ocaloid [color=#5CF8EE]A[/color]ppreciation [color=#5CF8EE]T[/color]eam[/b]
[size=85][url=https://discord.gg/osu]Join the Discord![/url][/size]
[/centre]
`,
    // Add more translations as needed
}
