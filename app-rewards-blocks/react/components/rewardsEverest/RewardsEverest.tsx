import React, { useEffect, useState } from 'react'

import { useForm } from '../../hooks/useRewards'
import styles from './RewardsEverest.css'
import DynamicForm from './RewardsSubmit'

function RewardsEverest({
  imageUrl,
  isEnabled = true,
}: {
  imageUrl?: string
  isEnabled?: boolean
}) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const { data: formData } = useForm()

  useEffect(() => {
    if (formData?.submissionKey) {
      const cookieKey = `form_${formData.submissionKey}=true`
      const alreadySubmitted = document.cookie.includes(cookieKey)

      setIsOpen(!alreadySubmitted)
    }
  }, [formData])

  if (!isEnabled) return <></>

  if (isOpen === null || !isOpen) return null

  return (
    <div className={styles.Overlay}>
      <div className={styles.EverestContainer}>
        <button className={styles.CloseButton} onClick={() => setIsOpen(false)}>
          ×
        </button>
        <img alt="popup banner" src={imageUrl} />
        {formData && (
          <DynamicForm formSchema={formData} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </div>
  )
}

RewardsEverest.schema = {
  title: 'Rewards Everest',
  description: 'Rewards Everest component for displaying a form overlay',
  type: 'object',
  properties: {
    isEnabled: {
      type: 'boolean',
      title: 'Enable Rewards Everest',
      description: 'Toggle to enable or disable the Rewards Everest component',
      default: true,
    },
  },
  imageUrl: {
    type: 'string',
    title: 'Image URL',
    description: 'URL of the image to display in the popup banner',
    widget: {
      'ui:widget': 'image-uploader',
    },
    default:
      'https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/3e24b48b-212d-4b90-ac50-73d4b3a4f3ac___29b6ee7d9db04b6b54dd17eb1a96834f.png',
  },
}

export default RewardsEverest
