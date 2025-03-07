import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { ISpeechToTextProps } from './SpeechToText.config';
import { FaMicrophone } from 'react-icons/fa';
import { FaMicrophoneLinesSlash } from 'react-icons/fa6';

const SpeechToText: FC<ISpeechToTextProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [message, setMessage] = useState<string>('Start talking!');
  const [recognition, setRecognition] = useState<any>();
  const {
    sources: {},
  } = useSources();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition.');
      setTranscript('Your browser does not support Speech Recognition.');
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US'; //maybe use a property here for language

    recognitionInstance.onresult = (event: any) => {
      let finalTranscript = '';
      finalTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(finalTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };
    setRecognition(recognitionInstance);
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setMessage('Listening...');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className="speech-to-text flex flex-col gap-5">
        <div className="speech-buttons flex justify-between w-40">
        <button
          onClick={startListening}
          disabled={isListening}
          className="start-button border rounded-xl p-4"
        >
          <FaMicrophone />
        </button>
        {isListening && (
          <button
            onClick={stopListening}
            disabled={!isListening}
            className="stop-button border rounded-xl p-4"
          >
            <FaMicrophoneLinesSlash />
          </button>
        )}
        </div>
      <div>
        <span className="transcript-content text-lg"> {transcript ? transcript : message}</span>
      </div>
      </div>
    </div>
  );
};

export default SpeechToText;
