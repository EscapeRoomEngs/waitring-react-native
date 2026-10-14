# Waitring 디자인 시스템 (임시 초안)

> 기준 코드: `styles/variables.js`, `screens/store/StoreDetail.js`, `screens/member/SignUp.js`, `components/common/*`\
> 목적: 현재 구현을 기록하고, 이후 화면에서 공통으로 사용할 표준을 제안한다. 이 문서는 구현을 변경하지 않는 임시 가이드다.

## 1. 디자인 원칙

- **빠르고 명확하게**: 웨이팅 시작과 회원가입에 필요한 정보·행동을 한 화면에서 분명하게 전달한다.
- **따뜻한 주황색을 행동에만 사용**: 브랜드 강조색은 주요 CTA와 선택·완료 상태에 집중해 사용한다.
- **정보의 위계 유지**: 매장명과 화면 제목은 가장 강하게, 보조 설명·메타 정보는 회색으로 낮춘다.
- **터치하기 쉽게**: 아이콘과 텍스트 버튼은 충분한 터치 영역과 명확한 상태 차이를 제공한다.

---

## 2. 현재 구현 현황

### 2.1 색상

현재 색상 토큰은 `styles/variables.js`의 `themeColors`에 정의되어 있다.

| 그룹 | 토큰 | 값 | 현재 사용처 |
| --- | --- | --- | --- |
| Gray | `gray100` | `#F8F8F8` | 섹션 구분 배경 |
| Gray | `gray200` | `#F2F2F2` | 키워드 칩 테두리 |
| Gray | `gray300` | `#E7E7E7` | 구분선, 프로필 플레이스홀더 |
| Gray | `gray500` | `#888888` | 주소·방문 횟수 등 보조 정보 |
| Gray | `gray600` | `#666666` | 입력 안내 문구 |
| Gray | `gray700` | `#444444` | 키워드 칩 텍스트 |
| Gray | `gray900` | `#191919` | 제목·주요 본문 |
| Orange | `orange100` | `#FFF2E9` | 리뷰 반응 버튼 배경 |
| Orange | `orange300` | `#FB974B` | 현재 미사용 |
| Orange | `orange500` | `#FF3D00` | 주요 하단 버튼·강조 텍스트 |
| Border | `borderBottom` | `#AFAFAF` | 언더라인 입력 필드·비활성 버튼 |

토큰과 별개로 `#FFF`, `#DDD`, `#191919`, `#888`, `rgba(...)` 등이 화면 컴포넌트에 직접 작성되어 있다.

### 2.2 타이포그래피

현재 시스템 글꼴(React Native 기본 글꼴)을 사용하며 별도 폰트 패밀리는 없다.

| 역할 | 크기 / 행간 | 굵기 | 현재 예시 |
| --- | --- | --- | --- |
| 화면·매장 제목 | 24 / 28 | `bold` | 매장명, 가입 안내 제목 |
| 섹션 제목 | 18 / 기본 | `700` | 최근 작성된 리뷰, 하단 CTA |
| 본문·입력 | 14~16 / 기본 | `normal` | 연락처 라벨, 리뷰 작성자 |
| 메타·칩 | 12~14 / 19 | `400~600` | 방문 횟수, 키워드 칩, 반응 버튼 |

### 2.3 레이아웃·간격

| 항목 | 현재 값 | 사용 예시 |
| --- | --- | --- |
| 화면 좌우 여백 | 24 | 헤더, 매장·리뷰·가입 콘텐츠 |
| 헤더 아이콘 | 24 × 24 | 뒤로가기, 찜 |
| 기본 콘텐츠 간격 | 8, 16, 40 | 매장 정보, 리뷰, 가입 폼 |
| 이미지 | 275 × 150, 반경 8 | 매장 이미지 캐러셀 |
| 프로필 플레이스홀더 | 36 × 36 | 리뷰 목록 |
| 섹션 구분선 | 높이 8 + 상단선 1 | 매장 정보와 리뷰 사이 |
| 하단 CTA | 화면 너비 전체, 텍스트 18 | 웨이팅·인증번호 요청 |

### 2.4 현재 공통 컴포넌트

| 컴포넌트 | 책임 | 현재 상태 |
| --- | --- | --- |
| `BottomButton` | 화면 하단의 주요 CTA | 활성 주황 / 비활성 회색 및 선택적 아이콘 지원 |
| `TextInputField` | 언더라인 형태의 텍스트 입력 | 값·키보드·마스킹·길이 제한 지원 |
| `KeyboardView` | 키보드 표시 시 화면 보호 및 바깥 탭 해제 | 가입 화면에서 사용 |
| `ReviewListItem` | 프로필·메타·리뷰 본문 표시 | 현재 임시 데이터 기반 |

---

## 3. 표준화 제안

### 3.1 시맨틱 컬러 토큰

색상 값 자체보다 역할을 기준으로 토큰을 사용한다. 이후 다크 모드나 브랜드 변경 시 값 교체 범위를 줄일 수 있다.

```js
export const colors = {
  background: {
    canvas: "#FFFFFF",
    subtle: "#F8F8F8",
  },
  text: {
    primary: "#191919",
    secondary: "#666666",
    tertiary: "#888888",
    inverse: "#FFFFFF",
    accent: "#FF3D00",
  },
  border: {
    subtle: "#E7E7E7",
    default: "#AFAFAF",
  },
  action: {
    primary: "#FF3D00",
    primaryPressed: "#E63600",
    disabled: "#AFAFAF",
    accentSubtle: "#FFF2E9",
  },
};
```

규칙:

- 본문 배경에는 `background.canvas`, 분리 영역에는 `background.subtle`를 사용한다.
- 제목과 일반 본문은 각각 `text.primary`, `text.secondary`를 사용한다.
- `action.primary`는 화면마다 하나의 가장 중요한 행동에만 사용한다.
- 반응·보조 강조에는 `action.accentSubtle`과 `text.accent`를 조합한다.
- 스타일 객체 안의 hex·rgba 직접 입력은 신규 코드에서 사용하지 않는다.

### 3.2 타이포그래피 역할

| 토큰 | 크기 / 행간 | 굵기 | 용도 |
| --- | --- | --- | --- |
| `display` | 24 / 28 | 700 | 화면 안내, 매장명 |
| `heading` | 18 / 24 | 700 | 섹션 제목, 주요 버튼 |
| `body` | 16 / 24 | 400 | 본문, 입력 값 |
| `label` | 14 / 20 | 400 | 폼 라벨, 주소, 보조 본문 |
| `caption` | 12 / 18 | 400 | 방문 횟수, 칩, 상태 보조 문구 |

규칙:

- 굵기는 `400`, `600`, `700`만 사용한다. 제목은 `700`, 클릭 가능한 보조 요소는 `600`을 우선한다.
- 행간이 필요한 텍스트는 위 표의 값을 명시한다. 여러 줄 제목은 `display`를 따른다.
- `fontWeight: "bold"`, `"normal"`, 숫자형 굵기를 혼용하지 않고 토큰에 맞춰 통일한다.

### 3.3 간격·크기·모서리

기본 단위는 4px로 한다.

| 이름 | 값 | 주요 용도 |
| --- | --- | --- |
| `space.1` | 4 | 칩 사이 간격 |
| `space.2` | 8 | 아이콘-텍스트, 작은 요소 간격 |
| `space.3` | 12 | 촘촘한 콘텐츠 간격 |
| `space.4` | 16 | 입력·리뷰 내부 간격 |
| `space.5` | 20 | 중간 여백 |
| `space.6` | 24 | 화면 좌우 여백, 섹션 내부 여백 |
| `space.10` | 40 | 큰 섹션 간격 |

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `radius.sm` | 4 | 작은 입력·버튼 |
| `radius.md` | 8 | 이미지, 보조 버튼 |
| `radius.lg` | 20 | 키워드 칩 |
| `radius.full` | 9999 | 원형 아바타·완전한 pill |
| `icon.md` | 24 | 네비게이션·행동 아이콘 |
| `control.md` | 44 | 입력 및 보조 버튼 최소 높이 |

### 3.4 컴포넌트 표준

#### Primary bottom button

- 용도: 화면의 단일 주요 행동(예: `웨이팅 하기`, `인증번호 요청`).
- 크기: 너비는 화면 전체, 최소 높이는 56px이며 Safe Area 하단 여백을 포함한다.
- 상태: `enabled`, `pressed`, `disabled`, `loading`.
- `disabled` 상태는 클릭을 막고 `action.disabled` 배경을 사용한다.
- 아이콘이 있을 경우 24px, 아이콘과 레이블 간격은 8px이다.
- 버튼 텍스트는 `heading`, `text.inverse`를 사용한다.

#### Underline text field

- 구성: 라벨 + 44px 이상의 입력 영역 + 필요 시 도움말 또는 오류 메시지.
- 기본선: `border.default` 1px, 포커스 시 `action.primary` 2px, 오류 시 별도 오류 토큰을 추가해 적용한다.
- 입력 값은 `body`, 라벨·도움말은 각각 `label`, `caption`을 사용한다.
- `disabled`는 React Native `editable={false}`로 제어한다. 현재 `disabled` prop은 표준 prop이 아니므로 새 공통 컴포넌트에서는 이 규칙을 따른다.

#### Secondary outline button

- 용도: 인증번호 재전송, 확인처럼 주요 CTA를 보조하는 행동.
- 크기: 높이 44px, 최소 너비는 콘텐츠에 맞추되 텍스트 좌우 여백은 16px.
- 배경 `background.canvas`, 테두리 `border.default`, 모서리 `radius.md`.
- 상태: `enabled`, `pressed`, `disabled`, `loading`.

#### Chip

- 용도: 매장 특성·리뷰 키워드처럼 선택과 무관한 짧은 정보를 표시한다.
- 텍스트: `caption`, `text.primary` 또는 `text.secondary`.
- 여백: 세로 6px, 가로 16px; 모서리는 `radius.lg`.
- 기본 스타일은 흰 배경과 `border.subtle` 1px이다.

#### List item / review

- 좌우 패딩은 24px, 상하 패딩은 16px, 항목 사이는 16px.
- 메타 정보는 `caption`과 `text.tertiary`, 본문은 `body`와 `text.primary`를 사용한다.
- 구분선은 `border.subtle` 1px이다.
- 아바타는 36px 원형이며 `radius.full`을 적용한다.

### 3.5 화면 구조

```text
SafeAreaView
├─ Header: 높이 56, 좌우 여백 24
├─ Scrollable content
│  ├─ Content section: 좌우 여백 24
│  ├─ Section divider: 8px subtle background + 1px border
│  └─ Content section: 좌우 여백 24
└─ Primary bottom button: 화면 하단 고정
```

- Android와 iOS의 Safe Area 차이는 화면 컴포넌트가 아닌 공통 `ScreenLayout`에서 처리하는 방향을 권장한다.
- 가로 스크롤 이미지는 콘텐츠 좌우 여백 24px에서 시작하고 이미지 사이 간격은 8px이다.
- 화면별 임의 인라인 스타일보다 `ScreenLayout`, `Header`, `Section` 조합을 우선한다.

---

## 4. 현재 구현과 제안안의 차이

| 우선순위 | 관찰된 차이 | 표준화 방향 |
| --- | --- | --- |
| 높음 | 색상 값이 토큰과 직접 값으로 혼재 | 시맨틱 `colors`로 모든 화면 색상 치환 |
| 높음 | `BottomButton`의 스타일이 버튼 컨테이너와 상태 스타일에 중첩 | 베이스·상태·텍스트 스타일을 분리한 `PrimaryBottomButton`으로 정리 |
| 높음 | `TextInputField`의 `disabled`는 React Native `TextInput`의 표준 비활성 prop이 아님 | `editable={false}` 및 비활성 시각 상태를 공통화 |
| 중간 | 같은 24px 여백, 44px 컨트롤, 8/16px 간격이 화면마다 직접 반복 | spacing·size 토큰과 공통 레이아웃 도입 |
| 중간 | 글자 굵기 표기와 행간 지정이 일관되지 않음 | 역할 기반 typography 토큰 적용 |
| 낮음 | `#DDD`, `#FFF`, `rgba(...)` 등 미정의 색상 존재 | 필요한 semantic token을 추가한 뒤 직접 값 제거 |

## 5. 적용 순서 (제안)

1. `styles/variables.js`를 `colors`, `spacing`, `radius`, `typography`, `size` 토큰 구조로 확장한다.
2. `BottomButton`과 `TextInputField`를 새 토큰과 상태 규칙에 맞춰 정리한다.
3. `StoreDetail`, `SignUp` 화면부터 인라인 색상·간격을 토큰으로 전환한다.
4. 공통 `ScreenLayout`, `Header`, `Section`, `Chip`, `SecondaryButton`을 필요해지는 시점에 추가한다.
5. 후속 화면은 이 문서의 역할 토큰과 컴포넌트 규칙만 사용하도록 한다.

## 6. 결정이 필요한 항목

- 실제 서비스용 한글 폰트와 지원 가중치
- 오류·성공·경고·정보 상태 색상
- 다크 모드 지원 여부
- 버튼 pressed/loading 상태의 구체적인 모션과 피드백
