# Design system

Import semantic values from `src/design-system/tokens` and primitives from `src/design-system/components`.

`AppButton` accepts `label`, `variant` (`primary` or `secondary`), `disabled`, and `onPress`.
`TextField` accepts `label`, optional `error`, and native `TextInput` props.
`Screen` accepts `padded` and native `SafeAreaView` props.

```tsx
<Screen>
	<TextField label="휴대폰 번호" keyboardType="phone-pad" />
	<AppButton label="인증번호 요청" onPress={requestCode} />
</Screen>
```

New feature code must use semantic tokens and these primitives. Existing screens may continue to import `themeColors` until their dedicated migration PR; do not mix unrelated screen redesigns into this foundation PR.
