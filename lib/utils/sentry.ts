import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://4bb0c4018348a4b4bf2017f5009078a0@o4508061418717184.ingest.de.sentry.io/4508061421469776",
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
});