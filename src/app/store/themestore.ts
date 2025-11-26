import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggleDarkMode() {
      patchState(store, { isDarkMode: !store.isDarkMode() });
    },
  }))
);