import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder
} from 'react-native';

import { themeColors } from "../styles/variables";

const BottomSheet = (props) => {
    const { modalVisible, setModalVisible, title, children } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
    }

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent>

            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}>
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}>
                        <Text style={styles.bottomSheetContainer.title}>{title}</Text>
                        <View style={styles.bottomSheetContainer.divider}/>
                    {children} 
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        justifyContent: "center",
        backgroundColor: "white",
        padding: 16,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        title: {
            paddingVertical: 16,
            paddingHorizontal: 8,
        },
        divider : {
            flexDirection: "row",
            height: 1,
            width: "100%",
            backgroundColor: themeColors.borderBottom
        }
    }
})

export default BottomSheet;