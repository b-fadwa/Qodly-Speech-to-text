import config, { ISpeechToTextProps } from './SpeechToText.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './SpeechToText.build';
import Render from './SpeechToText.render';

const SpeechToText: T4DComponent<ISpeechToTextProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

SpeechToText.craft = config.craft;
SpeechToText.info = config.info;
SpeechToText.defaultProps = config.defaultProps;

export default SpeechToText;
