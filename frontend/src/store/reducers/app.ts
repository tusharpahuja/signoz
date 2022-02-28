import { IS_LOGGED_IN } from 'constants/auth';
import { AppAction, LOGGED_IN, SWITCH_DARK_MODE } from 'types/actions/app';
import getTheme from 'lib/theme/getTheme';
import InitialValueTypes from 'types/reducer/app';
import getLocalStorageKey from 'api/browser/localstorage/get';

const InitialValue: InitialValueTypes = {
	isDarkMode: getTheme() === 'darkMode' ? true : false,
	isLoggedIn: getLocalStorageKey(IS_LOGGED_IN) === 'yes',
};

const appReducer = (
	state = InitialValue,
	action: AppAction,
): InitialValueTypes => {
	switch (action.type) {
		case SWITCH_DARK_MODE: {
			return {
				...state,
				isDarkMode: !state.isDarkMode,
			};
		}

		case LOGGED_IN: {
			return {
				...state,
				isLoggedIn: true,
			};
		}

		default:
			return state;
	}
};

export default appReducer;
