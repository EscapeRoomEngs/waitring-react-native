import React, { useState,  useEffect} from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import ArrowBack from "../../assets/icons/arrow-back.svg";
import { themeColors } from "../../styles/variables";

import BottomButton from "../../components/BottomButton";
import TextInputField from "../../components/TextInputField";
import KeyboardView from "../../components/KeyboardView";

const SignUp = () => {
	
    const [step, setStep] = useState(SignupStep.PhoneNo);
	const [phoneNo, setPhoneNo] = useState("");

	return (
		<KeyboardView children = {

		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Platform.OS === "android" ? 20 : 0,
				backgroundColor: "#fff",
			}}>
			<View style={stylesHeaderNav.header}>
				<ArrowBack style={stylesHeaderNav.headerIcon} />
			</View>
			<View style={stylesSignUpArea}>
				<View style={stylesSignUpArea.storeHeader}>
					<View style={stylesSignUpArea.storeHeader.addressArea}>
						<Text style={stylesSignUpArea.storeHeader.addressArea.title}>
							휴대폰번호로{"\n"}간편하게 가입해요!
						</Text>
					</View>

					<View style={{height:54}} />

                    {/*전화번호 입력하는 단계*/}
                    { step == SignupStep.PhoneNo &&
                        <View style={stylesInputPhoneNo}>
                            <Text style={stylesInputPhoneNo.title}>연락처</Text>
                            <View style={stylesInputPhoneNo.content}>
                                <TextInputField style={stylesInputPhoneNo.content.mobileCarrier} placeholder="todo"/>
                                <TextInputField
									value={phoneNo}
									onValueChanged={(valueText) => setPhoneNo(valueText)}
                                    keyboardType="numeric"
									maxLength = {11}
                                    placeholder="숫자만 입력(‘-’제외)"/>
                            </View>
                        </View>
                    }


                    {/*인증 입력하는 단계*/}
					{step == SignupStep.DigitCode &&
					<View style={{gap:24}}>
						<View style={stylesInputDigitCode}>
							<Text style={stylesInputDigitCode.title}>연락처</Text>
							<View style={stylesInputDigitCode.content}>
								<View style={stylesInputDigitCode.content.textArea}>

								</View>
								<TouchableOpacity style={stylesInputDigitCode.content.button}>
								<Text>인증번호 재전송</Text>
								</TouchableOpacity>
							</View>
							<Text style={stylesInputDigitCode.bottom}>인증문자가 발송되었습니다.{"\n"}인증문자를 받지 못했을 경우 스팸함을 확인해주세요</Text>
							</View>

							<View style={stylesInputDigitCode}>
							<Text style={stylesInputDigitCode.title}>인증번호</Text>
							<View style={stylesInputDigitCode.content}>
								<View style={stylesInputDigitCode.content.textArea}>

								</View>
								<TouchableOpacity style={stylesInputDigitCode.content.button}
								onPress={()=> setStep(SignupStep.Password)}>
								<Text>인증번호 확인</Text>
								</TouchableOpacity>
							</View>
							<Text style={stylesInputDigitCode.bottom}>시간 내에 입력하지 못한 경우 재시도해주세요.</Text>
							</View>
						</View>
						}


                    {/*비밀번호 입력하는 단계*/}
						

					{/*가입 완료*/}
                    

				</View>
				
			</View>

			
			{step == SignupStep.PhoneNo && <BottomButton name="인증번호 요청" disabled={phoneNo.length < 10} onClick={()=> setStep(SignupStep.DigitCode) }/>}
            {step == SignupStep.DigitCode && <BottomButton name="회원가입 완료" disabled={true} />}
            {step == SignupStep.Password && <BottomButton name="회원가입 완료"  onClick={()=> setStep(SignupStep.Finish) }/>}
			{step == SignupStep.Finish && <BottomButton name="시작하기"/>} 
        </SafeAreaView>
		} />
	);
};

export default SignUp;

const stylesHeaderNav = StyleSheet.create({
	header: {
		height: 56,
		paddingHorizontal: 24,
		justifyContent : "center"
	},
	headerIcon: {
		width: 24,
		aspectRatio: 1,
		alignContent : "center"
	},
});
const stylesSignUpArea = StyleSheet.create({
	paddingVertical: 18,
	gap: 40,
	storeHeader: {
		paddingHorizontal: 24,
		gap: 8,
		addressArea: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			icon: {
				width: 24,
				aspectRatio: 1,
			},
			title: {
				fontSize: 24,
				lineHeight: 28,
				fontWeight: "bold",
				color: themeColors.gray900 || "#191919",
			},
			
		},
	},
	

	
});

/**
 * phone number를 입력 받을 떄 사용
 */
const stylesInputPhoneNo = StyleSheet.create({
    title: {
        color: themeColors.gray900 || "#191919",
        fontSize: 14,
        fontWeight: "normal",
    },
    content: {
        gap: 16,
        flexDirection: "row",
        mobileCarrier: {
            alignSelf: 'stretch',
            width : 96,
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderBottomColor: themeColors.borderBottom,
            borderBottomWidth: 1 
        }
    }
});

/**
 * 인증 번호 입력 시 사용
 */
const stylesInputDigitCode = StyleSheet.create({
    title: {
        color: themeColors.gray900 || "#191919",
        fontSize: 14,
        fontWeight: "normal",
    },
    content: {
        gap: 16,
        flexDirection: "row",
        textArea: {
            alignSelf: 'stretch',
			flex: 1,
			paddingVertical: 10,
            paddingHorizontal: 8,
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderBottomColor: themeColors.borderBottom,
            borderBottomWidth: 1 
        },
        button: {
            width : 133,
			height: 44,
			color: themeColors.gray600,
			backgroundColor: 'white',
			borderWidth: 1,
    		borderRadius: 8,
    		borderColor: themeColors.borderBottom,
    		alignItems: 'center',
    		justifyContent: 'center',
        },
    },
	bottom: {
		color: themeColors.gray600,
		paddingVertical: 8
	}
});


/**
 * 비밀번호 입력 시 사용
 */

/**
 * 현재 가입 단계
 */
export const SignupStep = {
    PhoneNo: "phoneNo",
    DigitCode: "digitCode",
    Password: "password",
	Finish: "finish"
};