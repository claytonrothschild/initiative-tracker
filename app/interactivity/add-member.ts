import { ActionPayload, Message } from 'slack';
import { parseValue } from './id-helper';
import { getInitiativeDetails } from './get-initiative-details';
import { DetailResponse } from '../slack-messages';
import { getChannelInfo } from '../slack-api';
import { getInitiativeIdentifiers } from '../initiatives';
import { initiativesTable } from '../shared';
import { joinInitiative } from './join-initiative';

export async function addMemberAction(teamId: string, channel: string, payload: ActionPayload): Promise<Message> {
  const { member: slackUserId } = payload.submission;
  const { initiativeId } = parseValue(payload.state);
  await joinInitiative(teamId, initiativeId, slackUserId, false);
  const initiative = await getInitiativeDetails(teamId, initiativeId);
  return new DetailResponse(initiative, slackUserId, channel);
}

async function updateInitiative(
  teamId: string,
  initiativeId: string,
  name: string,
  description: string,
  status: string,
  channelId: string
): Promise<any> {
  const channel = channelId ? await getChannelInfo(channelId, teamId) : null;
  const params = {
    TableName: process.env.INITIATIVES_TABLE,
    Key: { initiativeId, identifiers: getInitiativeIdentifiers(teamId) },
    UpdateExpression: 'set #name = :name, #description = :description, #status = :status, #channel = :channel',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#description': 'description',
      '#status': 'status',
      '#channel': 'channel'
    },
    ExpressionAttributeValues: { ':name': name, ':description': description, ':status': status, ':channel': channel }
  };
  console.log('Updating initiative with params', params);
  return initiativesTable.update(params).promise();
}
