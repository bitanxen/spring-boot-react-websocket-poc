import { createMuiTheme } from "@material-ui/core/styles";
import qs from "qs";

export function getParsedQuerySettings() {
  const parsedQueryString = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  if (parsedQueryString && parsedQueryString.defaultSettings) {
    return JSON.parse(parsedQueryString.defaultSettings);
  }
  return {};
}

export const defaultSettings = {
  customScrollbars: true,
  theme: {
    main: "default",
    navbar: "default",
    toolbar: "default",
    footer: "default",
  },
};

export function setRoutes(config, defaultAuth) {
  let routes = [...config.routes];

  if (config.settings || config.auth) {
    routes = routes.map((route) => {
      let auth = config.auth ? [...config.auth] : defaultAuth || null;
      auth = route.auth ? [...auth, ...route.auth] : auth;
      return {
        ...route,
        settings: { ...config.settings, ...route.settings },
        auth,
      };
    });
  }

  return [...routes];
}

export function generateRoutesFromConfigs(configs, defaultAuth) {
  let allRoutes = [];
  configs.forEach((config) => {
    allRoutes = [...allRoutes, ...setRoutes(config, defaultAuth)];
  });
  return allRoutes;
}

export function extendThemeWithMixins(obj) {
  const theme = createMuiTheme(obj);
  return {
    border: (width = 1) => ({
      borderWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderLeft: (width = 1) => ({
      borderLeftWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderRight: (width = 1) => ({
      borderRightWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderTop: (width = 1) => ({
      borderTopWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    borderBottom: (width = 1) => ({
      borderBottomWidth: width,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    }),
    toolbar: (width = 1) => ({
      minHeight: 48,
      height: 48,
    }),
  };
}

export const defaultThemeOptions = {
  overrides: {
    MuiToolbar: {
      root: {
        height: 48,
        minHeight: 48,
      },
    },
    MuiTableCell: {
      root: {
        padding: "5px",
        "&:last-child": {
          paddingRight: 0,
        },
        textOverflow: "ellipsis",
      },
    },
    MuiDialog: {
      scrollPaper: {
        alignItems: "flex-start",
      },
    },
    MuiDialogContent: {
      root: {
        maxHeight: "60vh",
      },
    },
  },
  typography: {
    fontFamily: ["Asap", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  },
};

export const mustHaveThemeOptions = {
  typography: {
    fontFamily: ["Asap", "sans-serif"].join(","),
    fontSize: 14,
    body1: {
      fontSize: "1.1rem",
    },
    body2: {
      fontSize: "1.2rem",
    },
  },
};
