import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { ISpeechToTextProps } from './SpeechToText.config';
import { FaMicrophone } from 'react-icons/fa';
import { FaMicrophoneLinesSlash } from 'react-icons/fa6';

const SpeechToText: FC<ISpeechToTextProps> = ({ language, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [message, setMessage] = useState<string>('Start talking!');
  const [recognition, setRecognition] = useState<any>();
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setTranscript('Your browser does not support Speech Recognition.');
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language;

    recognitionInstance.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript || interimTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
    };
    setRecognition(recognitionInstance);
  }, []);

  //set datasource
  useEffect(() => {
    if (!ds) return;
    if (!isListening) {
      ds.setValue(null, transcript);
    }
  }, [isListening, transcript]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setMessage('Start talking!');
      } else {
        recognition.start();
        setMessage('Listening...');
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className="speech-to-text flex flex-col gap-5">
          <button className="toggle-button border rounded-xl p-4 w-fit" onClick={toggleListening}>
            {isListening ? <FaMicrophoneLinesSlash /> : <FaMicrophone />}
          </button>
        <div>
          <span className="transcript-content text-lg"> {transcript ? transcript : message}</span>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
