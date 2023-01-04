export enum ActionKind {
  SIDE_MENU = 'SIDE_MENU',
  MENU = 'MENU',
  TOOLBAR = 'TOOLBAR'
}
export interface State {
  sideMenu: boolean | any
  menus: string[] | any
  toolbar: any
}
interface Action {
  type: ActionKind
  payload: boolean | string | number | any
}

export const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ActionKind.SIDE_MENU:
      return { ...state, sideMenu: payload }
    case ActionKind.MENU:
      return { ...state, menus: payload }
    case ActionKind.TOOLBAR:
      return { ...state, toolbar: payload }
    default:
      return state
  }
}