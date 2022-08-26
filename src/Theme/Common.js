/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { FontSize } from '@/Theme/Variables'
import { colors } from '@/Theme/Variables'
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      secondary: {
        backgroundColor: Colors.secondary,
        fontSize: FontSize.small,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
        fontSize: FontSize.regular,
      },
      antdes: {
        backgroundColor: colors.gray,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
    }),
  }
}
