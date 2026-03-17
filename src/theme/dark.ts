import { cbh, cdh, cah, cmh } from '@/utils/chromaHelper'
import twc from '@/utils/tailwindColor'

import type { GlobalThemeOverrides } from 'naive-ui'

const DARK = {
  baseColor: '#050505',
  textColorBase: '#f5f5f5',
  textColor1: '#ffffff',
  textColor2: '#e5e5e5',
  textColor3: '#a3a3a3',
  borderColor: '#262626',
}

const closeIconColor = (primaryColor: string) => {
  return {
    closeIconColorSuccess: twc.lime[600],
    closeIconColorInfo: twc.sky[600],
    closeIconColorWarning: twc.amber[600],
    closeIconColorError: twc.pink[600],
    closeIconColorLoading: primaryColor,

    closeColorHoverSuccess: cah(twc.lime[500], 0.1),
    closeIconColorHoverSuccess: cdh(twc.lime[500], 0.2),
    closeColorPressedSuccess: cah(twc.lime[500], 0.16),
    closeIconColorPressedSuccess: cdh(twc.lime[500], 0.6),

    closeColorHoverInfo: cah(twc.sky[500], 0.1),
    closeIconColorHoverInfo: cdh(twc.sky[500], 0.2),
    closeColorPressedInfo: cah(twc.sky[500], 0.16),
    closeIconColorPressedInfo: cdh(twc.sky[500], 0.6),

    closeColorHoverWarning: cah(twc.amber[500], 0.1),
    closeIconColorHoverWarning: cdh(twc.amber[500], 0.2),
    closeColorPressedWarning: cah(twc.amber[500], 0.16),
    closeIconColorPressedWarning: cdh(twc.amber[500], 0.6),

    closeColorHoverError: cah(twc.pink[500], 0.14),
    closeIconColorHoverError: cdh(twc.pink[500], 0.2),
    closeColorPressedError: cah(twc.pink[500], 0.16),
    closeIconColorPressedError: cdh(twc.pink[500], 0.6),

    closeColorHoverLoading: cah(primaryColor, 0.14),
    closeIconColorHoverLoading: cdh(primaryColor, 0.2),
    closeColorPressedLoading: cah(primaryColor, 0.2),
    closeIconColorPressedLoading: cdh(primaryColor, 0.6),
  }
}

export function baseDarkThemeOverrides(primaryColor = ''): GlobalThemeOverrides {
  return {
    common: {
      baseColor: DARK.baseColor,

      textColorBase: DARK.textColorBase,

      textColor1: DARK.textColor1,

      textColor2: DARK.textColor2,

      textColor3: DARK.textColor3,

      bodyColor: '#050505',

      borderColor: DARK.borderColor,

      cardColor: '#0f0f0f',

      hoverColor: '#171717',

      modalColor: '#0a0a0a',

      popoverColor: '#111111',

      scrollbarColor: '#2a2a2a',
      scrollbarColorHover: '#3a3a3a',

      closeIconColor: cbh(twc.neutral[400], 0.2),
      closeColorHover: cah(twc.neutral[400], 0.1),
      closeIconColorPressed: twc.neutral[400],
      closeColorPressed: cah(twc.neutral[400], 0.14),

      infoColor: '#4D7CFF',
      infoColorHover: cdh('#4D7CFF', 0.1),
      infoColorPressed: cdh('#4D7CFF', 0.2),
      infoColorSuppl: '#4D7CFF',

      successColor: '#22E59C',
      successColorHover: cdh('#22E59C', 0.1),
      successColorPressed: cdh('#22E59C', 0.2),
      successColorSuppl: '#22E59C',

      warningColor: '#FFC857',
      warningColorHover: cdh('#FFC857', 0.1),
      warningColorPressed: cdh('#FFC857', 0.2),
      warningColorSuppl: '#FFC857',

      errorColor: '#FF4D6D',
      errorColorHover: cdh('#FF4D6D', 0.1),
      errorColorPressed: cdh('#FF4D6D', 0.2),
      errorColorSuppl: '#FF4D6D',
    },
    Alert: {
      ...closeIconColor(primaryColor),
    },
    Button: {
      textColorSuccess: twc.lime[50],

      textColorInfo: twc.sky[50],

      textColorWarning: twc.amber[50],

      textColorError: twc.pink[50],
    },
    Card: {
      borderColor: DARK.borderColor,
    },
    Checkbox: {
      common: {
        borderColor: twc.neutral[700],
      },
    },
    DataTable: {
      borderColor: DARK.borderColor,
      tdColor: '#0f0f0f',
      tdColorHover: cbh('#171717', 0.12),
      thColor: '#0a0a0a',
    },
    Divider: {
      color: '#262626',
    },
    Drawer: {
      footerBorderTop: `1px solid ${twc.neutral[750]}`,
      headerBorderBottom: `1px solid ${twc.neutral[750]}`,
      peers: {
        Scrollbar: {
          color: twc.neutral[750],
          colorHover: twc.neutral[700],
        },
      },
    },
    Menu: {
      itemColorHover: '#171717',
    },
    Message: {
      textColorSuccess: twc.lime[500],
      textColorInfo: twc.sky[500],
      textColorWarning: twc.amber[500],
      textColorError: twc.pink[500],
      textColorLoading: primaryColor,

      colorSuccess: cmh(twc.neutral[750], twc.lime[950], 0.06),
      colorInfo: cmh(twc.neutral[750], twc.sky[950], 0.06),
      colorWarning: cmh(twc.neutral[750], twc.amber[950], 0.06),
      colorError: cmh(twc.neutral[750], twc.pink[950], 0.06),
      colorLoading: cmh(twc.neutral[750], primaryColor, 0.01),

      ...closeIconColor(primaryColor),
    },
    Modal: {
      peers: {
        Scrollbar: {
          color: twc.neutral[800],
          colorHover: twc.neutral[750],
        },
      },
    },
    Notification: {
      peers: {
        Scrollbar: {
          color: twc.neutral[750],
          colorHover: twc.neutral[700],
        },
      },
    },
    Radio: {
      common: {
        borderColor: twc.neutral[700],
      },
    },
    Select: {
      peers: {
        InternalSelectMenu: {
          peers: {
            Scrollbar: {
              color: twc.neutral[700],
              colorHover: twc.neutral[650],
            },
          },
        },
      },
    },
    Upload: {
      draggerColor: '#0a0a0a',
    },
  }
}
