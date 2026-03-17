import { useComponentModifier, useDiscreteApi } from '@/composables'
import i18n from '@/i18n'

import type { MessageType, ModalOptions, NotificationType } from 'naive-ui'

const { message, modal, notification } = useDiscreteApi()

const { getModalModifier } = useComponentModifier()

export const useMessageDiscrete = (msg: string, type: MessageType = 'info') => {
  message.create(msg, {
    type,
    duration: 5000,
    closable: true,
  })
}

export const useModalDiscrete = (content: string, type: ModalOptions['type'] = 'info') => {
  const { t } = i18n.global

  modal.create({
    ...getModalModifier(),
    title: `${type}`,
    content,
    preset: 'dialog',
    type,
    positiveText: t('discrete.confirm'),
    negativeText: t('discrete.cancel'),
  })
}

export const useNotificationDiscrete = (type: NotificationType = 'info') => {
  const { t } = i18n.global

  notification.create({
    type,
    content: t('discrete.notificationContent'),
    meta: t('discrete.notificationMeta'),
    duration: 5000,
  })
}
