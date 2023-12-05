import React from "react";

import {  
    KeyboardAvoidingView, 
    Keyboard,
    TouchableWithoutFeedback } from "react-native";

const KeyboardView = ( {children} ) => {
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" && "padding"}
            style={{flex: 1}}>
                {children}
            </KeyboardAvoidingView>
</TouchableWithoutFeedback>);
};

export default KeyboardView;
