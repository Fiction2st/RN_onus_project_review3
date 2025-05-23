import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import {theme} from "../constraints"


interface Props extends RNTextProps {
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    title?: boolean;
    body?: boolean;
    caption?: boolean;
    small?: boolean;
    size?: number;
    transform?: "none" | "capitalize" | "uppercase" | "lowercase";
    align?: "auto" | "left" | "right" | "center" | "justify";
    weight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    spacing?: number;
    height?: number;
    regular?: boolean;
    bold?: boolean;
    semibold?: boolean;
    medium?: boolean;
    light?: boolean;
    center?: boolean;
    right?: boolean;
    color?: string;
    children?: React.ReactNode;
    style?: any;
}

export default function Text({
                                 h1,
                                 h2,
                                 h3,
                                 title,
                                 body,
                                 caption,
                                 small,
                                 size,
                                 transform,
                                 align,
                                 height,
                                 spacing,
                                 weight,
                                 regular,
                                 bold,
                                 semibold,
                                 medium,
                                 light,
                                 center,
                                 right,
                                 color,
                                 style,
                                 children,
                                 ...rest
                             }: Props) {


    const textStyles = [
        styles.text,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        title && styles.title,
        body && styles.body,
        caption && styles.caption,
        small && styles.small,
        size && { fontSize: size },
        transform && { textTransform: transform },
        align && { textAlign: align },
        height && { lineHeight: height },
        spacing && { letterSpacing: spacing },
        weight && { fontWeight: weight },
        regular && styles.regular,
        bold && styles.bold,
        semibold && styles.semibold,
        medium && styles.medium,
        light && styles.light,
        center && styles.center,
        right && styles.right,
        color && styles[color],
        color && !styles[color] && { color },
        style,
    ];

    return (
        <RNText style={textStyles} {...rest}>
            {children}
        </RNText>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: theme.sizes.font,
        color: theme.colors.black,
    },
    regular: {
        fontWeight: "normal",
    },
    bold: {
        fontWeight: "bold",
    },
    semibold: {
        fontWeight: "600",
    },
    medium: {
        fontWeight: "500",
    },
    light: {
        fontWeight: "200",
    },
    center: {
        textAlign: "center",
    },
    right: {
        textAlign: "right",
    },
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    h3: theme.fonts.h3,
    title: theme.fonts.title,
    body: theme.fonts.body,
    caption: theme.fonts.caption,
    small: theme.fonts.small,
});