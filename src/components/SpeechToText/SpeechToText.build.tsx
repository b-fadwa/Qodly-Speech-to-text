import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

import { ISpeechToTextProps } from './SpeechToText.config';
import { FaMicrophone } from 'react-icons/fa';

const SpeechToText: FC<ISpeechToTextProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className="speech-to-text flex flex-col gap-5">
        <button className="toggle-button w-fit p-4 border rounded-xl">
          <FaMicrophone />
        </button>
        <div>
          <span className="transcript-content text-lg"> Start talking</span>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
