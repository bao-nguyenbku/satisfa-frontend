import React, { useState } from 'react';
import OImage, { ImageProps } from 'next/image';
import fallbackImg from '@/assets/images/fallback.png';

type Props = ImageProps;

export default function Image(props: Props) {
  const [fallback, setFallBack] = useState(props.src);
  return (
    <OImage
      {...props}
      src={fallback}
      onError={() => setFallBack(fallbackImg)}
    />
  );
}
