import {
  Field,
  Attachment,
  Action,
  ConfirmAction,
  SectionBlock,
  PlainTextObject,
  MarkdownTextObject,
  Image,
  Button,
  StaticSelect
} from 'slack';
import { MemberResponse } from '../member';
import { InitiativeResponse } from '../initiative';
import { MEMBER_DISPLAY, MEMBER_INTENT_DISPLAY } from './display';
import { ActionType, MemberIntent } from '../interactions';

export class MemberCard implements Attachment {
  color: string;
  attachment_type: string;
  callback_id: string;
  fields: Field[];
  actions: Action[];

  constructor(member: MemberResponse, initiative: InitiativeResponse) {
    this.color = MEMBER_DISPLAY[member.role].color;
    this.attachment_type = 'default'; //TODO what are the other options?
    this.callback_id = ActionType.MEMBER_ACTION;
    const name = new Name(member);
    const role = new Role(member);
    this.fields = [name, role];
    this.actions = Object.values(MemberIntent)
      .filter(intent => (member.champion ? intent !== MemberIntent.MAKE_CHAMPION : intent !== MemberIntent.MAKE_MEMBER))
      .map(intent => new MemberAction(member, initiative, intent));
  }
}

export class MemberSection implements SectionBlock {
  type: 'section' = 'section';
  fields?: (PlainTextObject | MarkdownTextObject)[];
  accessory?: Image | Button | StaticSelect;
  constructor(member: MemberResponse, initiative: InitiativeResponse) {
    const name: MarkdownTextObject = {
      type: 'mrkdwn',
      text: `*Name*\n${member.name}`
    };
    const role: MarkdownTextObject = {
      type: 'mrkdwn',
      text: `*Role*\n${MEMBER_DISPLAY[member.role].text}`
    };
    this.fields = [name, role];
    this.accessory = { type: 'image', image_url: member.icon, alt_text: 'profile' };
  }
}

class Name implements Field {
  title: string;
  value: string;
  short: boolean;
  constructor(member: MemberResponse) {
    this.title = 'Name';
    this.value = member.name;
    this.short = true;
  }
}

class Role implements Field {
  title: string;
  value: string;
  short: boolean;
  constructor(member: MemberResponse) {
    this.title = 'Role';
    this.value = MEMBER_DISPLAY[member.role].text;
    this.short = true;
  }
}

class MemberAction implements Action {
  name: string;
  text: string;
  value: string;
  type: string;
  style: string;
  confirm: ConfirmAction;

  constructor(member: MemberResponse, initiative: InitiativeResponse, intent: MemberIntent) {
    this.name = intent;
    this.style = MEMBER_INTENT_DISPLAY[intent].style;
    this.value = JSON.stringify({ initiativeId: initiative.initiativeId, slackUserId: member.slackUserId });
    this.text = MEMBER_INTENT_DISPLAY[intent].text;
    this.type = 'button'; //TODO what are the other options?
    this.confirm = new MemberActionConfirmation(member, intent);
  }
}

class MemberActionConfirmation implements ConfirmAction {
  title: string;
  text: string;
  ok_text: string = 'Yes';
  dismiss_text: string = 'No';

  constructor(member: MemberResponse, intent: MemberIntent) {
    const { verb, action, title } = MEMBER_INTENT_DISPLAY[intent].confirmation;
    this.title = title;
    this.text = `Are you sure you want to ${verb} ${member.name} ${action}?`;
  }
}
