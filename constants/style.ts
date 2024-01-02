import { StyleSheet } from 'react-native';
import Colors from './colors';

const StyleValues = {
    marginPage: 20,
    marginComponent: 2,
    marginSpacer: 10,
    paddingInput: 5,
    borderRadius: 5,
    h1FontSize: 32,
    h2FontSize: 24,
    testFontSize: 14,
    cardPadding: 10,
};

const StyleLib = StyleSheet.create({
    text: {
        color: Colors.baseText,
        fontSize: StyleValues.testFontSize,
    },
    h1: {
        fontSize: StyleValues.h1FontSize,
    },
    h2: {
        fontSize: StyleValues.h2FontSize,
    },
    input: {
        backgroundColor: Colors.baseLight,
        borderRadius: StyleValues.borderRadius,
        padding: StyleValues.paddingInput,
        margin: StyleValues.marginComponent,
    },
    card: {
        flex: 1,
        backgroundColor: Colors.baseLight,
        borderRadius: StyleValues.borderRadius,
        padding: StyleValues.cardPadding,
    },
    page: {
        flex: 1,
        backgroundColor: Colors.base,
        padding: StyleValues.marginPage,
        paddingTop: StyleValues.marginPage * 2,
        paddingBottom: 0,
    },
    spacer: {
        margin: StyleValues.marginSpacer,
    },
    rounded: {
        borderRadius: StyleValues.borderRadius,
    },
});

export default StyleLib;
