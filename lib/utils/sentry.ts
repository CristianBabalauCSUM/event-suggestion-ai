import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://fe862cce51a72e3368cef425a8e34b59@o4508030624071680.ingest.de.sentry.io/4508030625972304",
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
});