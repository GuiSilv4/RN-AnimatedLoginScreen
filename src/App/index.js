import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StatusBar,
    Animated,
    TextInput,
    Easing,
    KeyboardAvoidingView,
} from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const bottomHeight = (height / 3) + 20;


const App = () => {
    const [opacity] = useState(new Animated.Value(1));
    const [rotateCross, setRotateCross] = useState(new Animated.Value(1));
    const [textInputZindex] = useState(new Animated.Value(1));
    const [textInputOpacity] = useState(new Animated.Value(1));
    const [textInputY] = useState(new Animated.Value(1));

    const [offsetY] = useState(new Animated.Value(1));
    const [bgY] = useState(new Animated.Value(1));

    const duration = 1000;
    const ClipPathOffset = 30;

    const spin = rotateCross.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '180deg']
    });

    const offsetRange = offsetY.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    });

    const backgroundY = bgY.interpolate({
        inputRange: [0, 1],
        outputRange: [(-bottomHeight - ClipPathOffset), 1]
    });

    const textInputRangeY = textInputY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });

    const textInputZindexRange = textInputZindex.interpolate({
        inputRange: [0, 1],
        outputRange: [1, -1]
    });
    const textInputOpacityRange = textInputOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    });

    function showLoginScreen(value) {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: value,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(offsetY, {
                toValue: value,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(bgY, {
                toValue: value,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(textInputY, {
                toValue: value,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(textInputZindex, {
                toValue: value,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(textInputOpacity, {
                toValue: value,
                duration,
                useNativeDriver: true
            }),
            Animated.timing(rotateCross, {
                toValue: value,
                duration,
                easing: Easing.linear,
                useNativeDriver: true
            }),
        ]).start();
    }

    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-end'
        }}
            behavior='height'
        >
            <StatusBar barStyle="light-content" backgroundColor="#284a29" />
            <Animated.View style={{
                ...StyleSheet.absoluteFill,
                height: height + 2,
                top: 'auto',
                transform: [{ translateY: backgroundY }]
            }}>
                <Svg height={height + ClipPathOffset} width={width + 1} >
                    <ClipPath id="clip">
                        <Circle r={height + ClipPathOffset} cx={width / 2} />
                    </ClipPath>
                    <Image
                        href={require('../../assets/bg.jpg')}
                        height={height + ClipPathOffset}
                        width={width}
                        preserveAspectRatio='xMidYMid slice'
                        clipPath="url(#clip)"
                    />
                </Svg>
            </Animated.View>
            <Animated.View style={[
                { height: bottomHeight, justifyContent: 'center' },
                {
                    transform: [
                        { translateY: offsetRange }
                    ]
                },
            ]}>
                <TouchableWithoutFeedback onPress={() => { showLoginScreen(0) }}>
                    <Animated.View
                        style={[
                            styles.button,
                            {
                                opacity: opacity,
                            }
                        ]}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { showLoginScreen(0) }}>
                    <Animated.View
                        style={[
                            styles.button,
                            {
                                opacity: opacity,
                                backgroundColor: '#2E71DC'
                            }
                        ]}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            SIGN IN WITH FACEBOOK
                    </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View
                style={{
                    zIndex: textInputZindexRange,
                    opacity: textInputOpacityRange,
                    transform: [{ translateY: textInputRangeY }],
                    height: bottomHeight,
                    ...StyleSheet.absoluteFill,
                    top: null,
                    justifyContent: 'center',
                }}
            >
                <TouchableWithoutFeedback onPress={() => { showLoginScreen(1) }}>
                    <Animated.View style={styles.closeButton}>
                        <Animated.Text style={{
                            fontSize: 15,
                            transform: [{ rotate: spin }]
                        }}>X</Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TextInput
                    placeholder="EMAIL"
                    style={styles.textInput}
                    placeholderTextColor="black"
                />
                <TextInput
                    placeholder="PASSWORD"
                    style={styles.textInput}
                    placeholderTextColor="black"
                />
                <TouchableOpacity delayPressIn={0}>
                    <Animated.View style={styles.button}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                    </Animated.View>
                </TouchableOpacity>

            </Animated.View>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({

    button: {
        backgroundColor: 'white',
        height: (bottomHeight) / 4,
        marginHorizontal: 20,
        borderRadius: ((bottomHeight) / 4) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

    textInput: {
        height: (bottomHeight) / 5.3,
        borderRadius: ((bottomHeight) / 5.3) / 2,
        borderWidth: 2,
        marginHorizontal: 20,
        paddingLeft: 20,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
});

export default App;
