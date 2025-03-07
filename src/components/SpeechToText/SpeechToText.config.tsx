import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineTextSnippet } from 'react-icons/md';

import SpeechToTextSettings, { BasicSettings } from './SpeechToText.settings';

export default {
  craft: {
    displayName: 'SpeechToText',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(SpeechToTextSettings, BasicSettings),
    },
  },
  info: {
    settings: SpeechToTextSettings,
    displayName: 'SpeechToText',
    exposed: true,
    icon: MdOutlineTextSnippet,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {
    name: 'Qodly',
    style:{
      width: 'fit-content',
    }
  },
} as T4DComponentConfig<ISpeechToTextProps>;

export interface ISpeechToTextProps extends webforms.ComponentProps {
  name?: string;
}
