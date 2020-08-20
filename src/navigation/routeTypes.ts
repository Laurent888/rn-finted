export enum TabNavigator {
  HOME_TAB = 'hometab',
  SEARCH_TAB = 'searchtab',
  SELL_TAB = 'selltab',
  INBOX_TAB = 'inboxtab',
  PROFILE_TAB = 'profiletab',
}

export enum Screens {
  HOME = 'home',
  NEWSFEED = 'newsfeed',
  LISTING = 'listing',
  LOGIN = 'login',
  REGISTER = 'register',
  SELL = 'sell',
  SEARCH = 'search',
  LISTINGS = 'listings',
  INBOX = 'inbox',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  LOGIN_HOME = 'loginHome',
  OTHER_PROFILE = 'otherProfile',
}

export type HomeStackParamsList = {
  home: undefined;
  listing: { id: string };
  otherProfile: undefined;
};

export type StackSearchParamsList = {
  searchHome: undefined;
  listings: { keyword: string };
};
