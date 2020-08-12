import {
  getParsedQuerySettings,
  defaultSettings,
  extendThemeWithMixins,
  defaultThemeOptions,
  mustHaveThemeOptions,
} from "@application";
import { createMuiTheme } from "@material-ui/core/styles";
import _ from "@lodash";
import ApplicationLayoutConfigs from "app/configs/layouts/ApplicationLayoutConfigs";
import SettingsConfig from "app/configs/SettingsConfig";
import ThemesConfig from "app/configs/ThemesConfig";
import * as Actions from "../../actions";

const initialSettings = getInitialSettings();
const initialThemes = getInitialThemes();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
  themes: initialThemes,
  ...getThemeOptions(initialThemes, initialSettings),
};

const settings = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SETTINGS: {
      const newSettings = _.merge(
        {},
        state.current,
        action.value && action.value.layout && action.value.layout.style
          ? {
              layout: {
                config:
                  ApplicationLayoutConfigs[action.value.layout.style].defaults,
              },
            }
          : {},
        action.value
      );
      const themes =
        newSettings.theme.main !== state.current.theme.main
          ? {
              ...state.themes,
            }
          : state.themes;
      return {
        ...state,
        current: newSettings,
        themes,
      };
    }
    default: {
      return state;
    }
  }
};

export default settings;

function getInitialSettings() {
  const defaultLayoutStyle = SettingsConfig.layout.style;
  const layout = {
    style: defaultLayoutStyle,
    config: ApplicationLayoutConfigs[defaultLayoutStyle].defaults,
  };

  return _.merge({}, defaultSettings, { layout }, getParsedQuerySettings());
}

function getInitialThemes() {
  const themes = Object.assign(
    {},
    ...Object.entries(ThemesConfig).map(([key, value]) => {
      const muiTheme = _.merge(
        {},
        defaultThemeOptions,
        value,
        mustHaveThemeOptions
      );
      return {
        [key]: createMuiTheme(
          _.merge({}, muiTheme, { mixins: extendThemeWithMixins(muiTheme) })
        ),
      };
    })
  );

  return {
    ...themes,
  };
}

function getThemeOptions(themes, settings) {
  return {
    mainTheme: themes[settings.theme.main],
    navbarTheme: themes[settings.theme.navbar],
    toolbarTheme: themes[settings.theme.toolbar],
    footerTheme: themes[settings.theme.footer],
  };
}
