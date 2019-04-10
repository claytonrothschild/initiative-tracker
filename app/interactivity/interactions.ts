export enum InitiativeAction {
  JOIN_AS_MEMBER = 'JOIN_AS_MEMBER',
  JOIN_AS_CHAMPION = 'JOIN_AS_CHAMPION',
  VIEW_DETAILS = 'VIEW_DETAILS',
  VIEW_LIST = 'VIEW_LIST',
  UPDATE_STATUS = 'UPDATE_STATUS',
  DELETE = 'DELETE',
  OPEN_EDIT_DIALOG = 'OPEN_EDIT_DIALOG',
  EDIT_INITIATIVE = 'EDIT_INITIATIVE',
  MODIFY_INITIATIVE = 'MODIFY_INITIATIVE',
  OPEN_ADD_MEMBER_DIALOG = 'OPEN_ADD_DIALOG',
  ADD_MEMBER = 'ADD_MEMBER',
  MARK_ACTIVE = 'MARK_ACTIVE',
  MARK_ON_HOLD = 'MARK_ON_HOLD',
  MARK_COMPLETE = 'MARK_COMPLETE',
  MARK_ABANDONED = 'MARK_ABANDONED'
}

export enum ListAction {
  FILTER_BY_OFFICE = 'FILTER_BY_OFFICE',
  FILTER_BY_STATUS = 'FILTER_BY_STATUS',
  VIEW_DETAILS = 'VIEW_DETAILS'
}

export enum MemberAction {
  MAKE_CHAMPION = 'MAKE_CHAMPION',
  MAKE_MEMBER = 'MAKE_MEMBER',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
  REMAIN_MEMBER = 'REMAIN_MEMBER',
  MODIFY_MEMBER = 'MODIFY_MEMBER'
}
