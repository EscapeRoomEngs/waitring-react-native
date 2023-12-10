import React, {useState, useEffect} from "react";
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";

import ArrowBack from "../../assets/icons/arrow-back.svg";
import {themeColors} from "../../styles/variables";

import BottomButton from "../../components/BottomButton";
import TextInputField from "../../components/TextInputField";
import KeyboardView from "../../components/KeyboardView";

import InputPhoneNumber from "../../components/member/InputPhoneNumber"
import InputDigitCode from "../../components/member/InputDigitCode";
import InputPassword from "../../components/member/InputPassword";

const SignUp = () => {

    const [step, setStep] = useState(SignupStep.PhoneNo);
	const [mobileCarrier, setMobileCarrier] = useState("")
    const [phoneNo, setPhoneNo] = useState("");
    const [digitCode, setDigitCode] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
    const [securityPw, setSecurityPw] = useState(0)

    return (
        <KeyboardView children={

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
                        <InputPhoneNumber mobileCarrier={mobileCarrier} setMobileCarrier={setMobileCarrier} phoneNo={phoneNo} setPhoneNo={setPhoneNo} />
                    }


                    {/*인증 입력하는 단계*/}
					{step == SignupStep.DigitCode &&
						<InputDigitCode 
						phoneNo={phoneNo} 
						mobileCarrier={mobileCarrier} 
						digitCode={digitCode}
						setDigitCode={setDigitCode}
						onCheckDigitCode = {() => setStep(SignupStep.Password)}/>
					}


                    {/*비밀번호 입력하는 단계*/}
					{step == SignupStep.Password &&
						<InputPassword 
						phoneNo={phoneNo} 
						mobileCarrier={mobileCarrier} 
						password={password}
                        setPassword={setPassword}
						rePassword={rePassword}
						setRePassword={setRePassword}
                        securityPw={securityPw}
                        setSecurityPw={setSecurityPw}
						/>
					}
						

					{/*가입 완료*/}
                    

				</View>
				
			</View>

			
			{step == SignupStep.PhoneNo && <BottomButton name="인증번호 요청" disabled={phoneNo.length < 10 || mobileCarrier.length == 0} onClick={()=> setStep(SignupStep.DigitCode) }/>}
            {step == SignupStep.DigitCode && <BottomButton name="회원가입 완료" disabled={true} />}
            {step == SignupStep.Password && <BottomButton name="회원가입 완료" disabled={password < 6 || password != rePassword} onClick={()=> setStep(SignupStep.Finish) }/>}
			{step == SignupStep.Finish && <BottomButton name="시작하기"/>} 
        
		</SafeAreaView>
		}/>
    );
};

export default SignUp;

const stylesHeaderNav = StyleSheet.create({
    header: {
        height: 56,
        paddingHorizontal: 24,
        justifyContent: "center"
    },
    headerIcon: {
        width: 24,
        aspectRatio: 1,
        alignContent: "center"
    }
});
const stylesSignUpArea = StyleSheet.create({
    paddingVertical: 18,
    flex: 1,
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
                aspectRatio: 1
            },
            title: {
                fontSize: 24,
                lineHeight: 28,
                fontWeight: "bold",
                color: themeColors.gray900 || "#191919"
            }
        }
    }
});

/**
 * 가입 단계
 */
export const SignupStep = {

    PhoneNo: "phoneNo",
    DigitCode: "digitCode",
    Password: "password",
    Finish: "finish"
};