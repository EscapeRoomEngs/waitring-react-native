# Waitring 디자인 시스템

> 기준 코드: `src/design-system/tokens`, `src/design-system/components`, `styles/variables.js`, `screens/`, `components/`\
> 외부 디자인 원본은 없다. 이 문서와 위 코드가 디자인 기준이며, 값이 다르면 토큰 코드가 우선한다.

## 1. 원칙

- **주황색은 행동에만**: `color.action.primary`는 화면의 가장 중요한 행동과 선택·완료 상태에만 쓴다.
- **정보 위계**: 매장명·화면 제목은 `heading.lg`, 보조 정보는 `text.muted`로 낮춘다.
- **터치 영역**: 누를 수 있는 요소는 높이 44 이상, 주요 버튼은 56 이상으로 한다.
- **역할 이름으로 쓴다**: 신규 코드는 hex·rgba를 직접 쓰지 않고 토큰만 쓴다.

## 2. 사용법

토큰은 `src/design-system/tokens`, 공통 컴포넌트는 `src/design-system/components`에서 가져온다.

```tsx
<Screen>
	<TextField label="휴대폰 번호" keyboardType="phone-pad" />
	<AppButton label="인증번호 요청" onPress={requestCode} />
</Screen>
```

신규 기능 코드는 토큰과 공통 컴포넌트만 쓴다. 기존 화면은 해당 화면의 이전 PR 전까지 `themeColors`를 계속 import해도 되며, 무관한 화면 개편을 섞지 않는다.

## 3. 토큰

### 3.1 색상 — `color`

| 토큰                         | 값        | 용도                                      | 레거시 `themeColors` |
| ---------------------------- | --------- | ----------------------------------------- | -------------------- |
| `color.text.primary`         | `#191919` | 제목·주요 본문                            | `gray900`            |
| `color.text.secondary`       | `#666666` | 입력 안내 문구                            | `gray600`            |
| `color.text.muted`           | `#888888` | 주소·방문 횟수 등 보조 정보               | `gray500`            |
| `color.text.inverse`         | `#FFFFFF` | 주황 배경 위 텍스트                       | —                    |
| `color.surface.default`      | `#FFFFFF` | 화면 배경                                 | —                    |
| `color.surface.subtle`       | `#F8F8F8` | 섹션 구분 배경                            | `gray100`            |
| `color.surface.muted`        | `#F2F2F2` | 키워드 칩 테두리                          | `gray200`            |
| `color.border.default`       | `#E7E7E7` | 구분선, 프로필 플레이스홀더               | `gray300`            |
| `color.border.strong`        | `#AFAFAF` | 입력 필드 선, 비활성 하단 버튼            | `borderBottom`       |
| `color.action.primary`       | `#FF3D00` | 주요 버튼, 강조 텍스트, 타이머            | `orange500`          |
| `color.action.primarySubtle` | `#FFF2E9` | 보조 버튼·리뷰 반응 버튼 배경             | `orange100`          |
| `color.action.accent`        | `#FB974B` | 예비 강조색 (현재 화면 사용처 없음)       | `orange300`          |
| `color.feedback.error`       | `#B42318` | 입력 오류 테두리·메시지 (흰 배경 AA 대비) | —                    |

`themeColors`(`styles/variables.js`)는 위 토큰을 가리키는 호환 어댑터다. `gray700`(`#444444`, 키워드 칩 텍스트)만 대응 토큰 없이 값으로 남아 있다.

### 3.2 타이포그래피 — `typography`

| 토큰                    | 크기 / 행간 | 굵기  | 용도                       |
| ----------------------- | ----------- | ----- | -------------------------- |
| `typography.heading.lg` | 24 / 28     | `700` | 화면 안내 제목, 매장명     |
| `typography.heading.md` | 18 / 24     | `700` | 섹션 제목                  |
| `typography.button`     | 18 / 24     | `700` | 주요 버튼 레이블           |
| `typography.body.md`    | 14 / 20     | 기본  | 본문, 폼 라벨, 주소        |
| `typography.body.sm`    | 12 / 18     | 기본  | 방문 횟수, 칩, 오류 메시지 |

- 글꼴은 시스템 기본 글꼴을 쓴다. 별도 폰트 파일은 넣지 않는다.
- 굵기는 문자열 `"400"`, `"600"`, `"700"`만 쓴다. `"bold"`, `"normal"`, 숫자형 굵기는 쓰지 않는다.
- 강조가 필요한 보조 텍스트(리뷰 작성자, 반응 버튼)는 `body.*`에 `fontWeight: "600"`을 더한다.

### 3.3 간격·모서리 — `spacing`, `radius`

| 토큰          | 값  | 주요 용도                     |
| ------------- | --- | ----------------------------- |
| `spacing[1]`  | 4   | 칩 사이 간격                  |
| `spacing[2]`  | 8   | 아이콘–텍스트, 작은 요소 간격 |
| `spacing[3]`  | 12  | 입력 필드 내부 좌우 여백      |
| `spacing[4]`  | 16  | 리뷰 항목 내부, 칩 좌우 여백  |
| `spacing[5]`  | 20  | 하단 버튼 상하 여백           |
| `spacing[6]`  | 24  | 화면 좌우 여백                |
| `spacing[8]`  | 32  | 비밀번호 입력 그룹 간격       |
| `spacing[10]` | 40  | 섹션 사이 간격                |

| 토큰          | 값   | 용도                         |
| ------------- | ---- | ---------------------------- |
| `radius.sm`   | 4    | 리뷰 반응 버튼               |
| `radius.md`   | 6    | `AppButton`, `TextField`     |
| `radius.lg`   | 8    | 매장 이미지, 보조 버튼       |
| `radius.pill` | 9999 | 칩, 원형 아바타, 더보기 버튼 |

### 3.4 크기

토큰으로 만들지 않고 아래 값을 고정해 쓴다.

| 항목                     | 값        |
| ------------------------ | --------- |
| 헤더 높이                | 56        |
| 헤더·행동 아이콘         | 24 × 24   |
| 보조 버튼·입력 최소 높이 | 44 / 48   |
| 주요 버튼 최소 높이      | 56        |
| 리뷰 아바타              | 36 원형   |
| 매장 이미지              | 275 × 150 |

### 3.5 테마

라이트 모드만 지원한다(`app.json`의 `userInterfaceStyle: "light"`). 다크 모드를 도입하게 되면 semantic 토큰 값만 교체한다.

## 4. 컴포넌트

### 4.1 공통 컴포넌트 — `src/design-system/components`

| 컴포넌트    | Props                                                            | 규칙                                                                                                                                                                     |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AppButton` | `label`, `variant`(`primary`/`secondary`), `disabled`, `onPress` | 최소 높이 56, 좌우 `spacing[6]`, `radius.md`. `primary`는 주황 배경·흰 글자, `secondary`는 `primarySubtle` 배경·주황 글자. 비활성은 opacity 0.45이고 `onPress`를 막는다. |
| `TextField` | `label`, `error?`, `TextInput` props                             | 라벨 `body.md`, 입력은 1px `border.strong`·`radius.md`·최소 높이 48. `error`가 있으면 테두리와 메시지가 `feedback.error`. 비활성은 `editable={false}`.                   |
| `Screen`    | `padded`(기본 `true`), `SafeAreaView` props                      | `surface.default` 배경, `padded`면 좌우 `spacing[6]`.                                                                                                                    |

### 4.2 레거시 컴포넌트 — `components/`

| 컴포넌트         | 현재 상태                                                                                 | 대체 대상                 |
| ---------------- | ----------------------------------------------------------------------------------------- | ------------------------- |
| `BottomButton`   | 화면 하단 고정 전체 너비, 활성 주황·비활성 `border.strong`, 아이콘 선택, 누름 opacity 0.7 | `AppButton` 하단 배치     |
| `TextInputField` | 아래쪽 1px 선만 있는 입력, 비밀번호 보기 토글                                             | `TextField`               |
| `KeyboardView`   | 바깥 탭 시 키보드 닫기, iOS `padding` 회피                                                | 유지                      |
| `BottomSheet`    | 반투명 검정 오버레이, 상단 모서리 32                                                      | 유지                      |
| `member/Input*`  | 휴대폰 번호·인증 코드·비밀번호 입력. 언더라인 입력 + 보조 버튼(133 × 44, `radius.lg`)     | `TextField` + `AppButton` |

### 4.3 표준 규칙

- **주요 행동**: 화면당 하나의 `AppButton variant="primary"`. 하단 고정일 때 Safe Area 하단 여백을 포함한다.
- **보조 행동**(인증번호 재전송 등): `AppButton variant="secondary"`.
- **누름 피드백**: opacity 0.7로 통일한다(레거시 `BottomButton`과 같은 값). `loading` 상태는 필요한 화면이 생길 때 `AppButton`에 추가한다.
- **입력 필드**: 신규 화면은 박스형 `TextField`를 쓴다. 레거시 언더라인 입력은 화면을 이전할 때 교체한다.
- **칩**: `body.sm`, 세로 6 · 가로 `spacing[4]`, `radius.pill`, 1px `surface.muted` 테두리.
- **리뷰 목록 항목**: 좌우 `spacing[6]`, 상하·내부 `spacing[4]`, 하단 1px `border.default`. 메타 정보는 `body.sm` + `text.muted`.
- **상태 색상**: 현재는 `feedback.error`만 둔다. 성공·경고·정보 색은 그 상태를 표시하는 화면이 생길 때 대비 테스트와 함께 추가한다.

### 4.4 화면 구조

```text
Screen (SafeArea, surface.default)
├─ Header: 높이 56, 좌우 spacing[6], 아이콘 24
├─ ScrollView
│  ├─ Section: 좌우 spacing[6], 위아래 spacing[10]
│  ├─ Divider: 높이 8, surface.subtle 배경 + 상단 1px border.default
│  └─ Section
└─ AppButton (primary, 하단 고정)
```

가로 스크롤 이미지는 좌우 `spacing[6]`에서 시작하고 이미지 사이 간격은 `spacing[2]`다.

## 5. 현재 코드와 표준의 차이

`app/` 라우트는 모두 레거시 화면(`screens/`)을 렌더링하며, `AppButton`·`TextField`·`Screen`을 쓰는 화면은 아직 없다.

| 우선순위 | 위치                                                         | 차이                                                                                            | 조치                                                           |
| -------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 높음     | `screens/store/StoreDetail.js:89`                            | `rgba(256, 256, 256, 0.0)` — 채널 범위(0–255) 초과                                              | `rgba(255, 255, 255, 0)`                                       |
| 높음     | `screens/store/StoreDetail.js:212`                           | `borderRadius: "100%"` — 네이티브는 숫자만 허용                                                 | `radius.pill`                                                  |
| 높음     | `screens/MainScreen.js:70`                                   | `fontWeight: "semibold"` — React Native에 없는 값                                               | `"600"`                                                        |
| 높음     | `components/TextInputField.js:33`                            | `disabled`는 `TextInput` prop이 아님                                                            | `editable={!disabled}`                                         |
| 높음     | `components/KeyboardView.js:8`                               | `Platform`을 import하지 않고 사용                                                               | import 추가                                                    |
| 중간     | `screens/store/StoreDetail.js` 46·89·156·180·216·221·254·260 | `#fff`, `#FFF`, `#F2F2F2`, `#F8F8F8`, `#191919`, `#888`, `"white"`, `#DDD` 직접 입력            | 대응 토큰으로 교체, `#DDD`는 `border.default`                  |
| 중간     | `StoreDetail.js`, `SignUp.js`, `member/Input*`               | `themeColors.x \|\| "#..."` 대체값은 불필요하고, `StoreDetail.js:213`의 `#E7E7E7E`는 잘못된 hex | 대체값 삭제                                                    |
| 중간     | `screens/store/StoreDetail.js` 45·160–164                    | `overflowX`·`overflowY` — 웹 전용 스타일                                                        | `ScrollView`로 처리                                            |
| 중간     | 화면·컴포넌트 전반                                           | 굵기 `"bold"`·`"normal"`·숫자 `400`/`600` 혼용                                                  | 3.2 규칙                                                       |
| 중간     | `BottomButton`, `TextInputField`, `member/Input*`            | 공통 컴포넌트 대신 개별 구현                                                                    | 4.2 대체 대상으로 이전                                         |
| 낮음     | `member/Input*`, `TextInputField`, `SignUp.js:123`           | 간격 10·18 — 스케일 밖                                                                          | 10 → `spacing[2]`/`spacing[3]`, 18 → `spacing[4]`/`spacing[5]` |
| 낮음     | `InputForm.js`, `TodoItem.js`, `MainScreen.js`               | 글자 15·16·25, 간격 10·13·15, 별도 회색(`#f4f4f4`, `#737373` 등) — 예제 To-do 화면              | 화면을 제거하거나 이전할 때 함께 정리                          |
| 낮음     | `styles/variables.js`                                        | `gray700`(`#444444`)에 대응 토큰 없음                                                           | 칩 텍스트를 `text.secondary`로 통일한 뒤 제거                  |
| 낮음     | `src/design-system/components/Screen.tsx`                    | React Native core `SafeAreaView`는 deprecated                                                   | `react-native-safe-area-context`로 교체                        |

## 6. 적용 순서

1. **매장 상세**: `StoreDetail`을 `Screen`·`AppButton`과 토큰으로 이전하면서 5장 항목 중 이 화면에 해당하는 것을 고친다.
2. **회원가입**: `SignUp`·`member/Input*`을 `TextField`·`AppButton`으로 이전하고 `TextInputField`·`KeyboardView` 문제를 고친다.
3. **레거시 정리**: `BottomButton`·`TextInputField` import가 사라지면 삭제하고, 예제 To-do 화면을 정리한다.
4. **어댑터 제거**: `themeColors` import가 남지 않으면 `styles/variables.js`를 삭제한다.
5. **이후 화면**: 웨이팅 신청·상태 화면은 처음부터 이 문서의 토큰과 공통 컴포넌트만 쓴다.
