import { Button } from "antd";
import React from "react";
import type { SizeType } from 'antd/es/config-provider/SizeContext';

interface StyledButton {
  title: string;
  onPress?: () => any;
  size?: SizeType;
  icon? : any
  color? : string
}

export default function StyledButton({
  title,
  onPress,
  size,
  icon,
  color
}: StyledButton) {

  return (
    <Button type="primary" size={size} onClick={onPress} icon={icon} style={{backgroundColor: color ? color : ''}}>
        {title}
    </Button>
  );
}
