import React from 'react'
import { Avatar as AntAvatar, AvatarProps } from 'antd'
import { getNameInitials } from '@/utilities'

type Props = AvatarProps & {
    name?: string
}

const CustomAvatar = ({name, style, ...rest}: Props) => {
  return (
    <AntAvatar alt={name} 
    size="small" style={{backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style
    }}
    {...rest}
    >
        {getNameInitials(name || '')}
    </AntAvatar>
  )
}

export default CustomAvatar