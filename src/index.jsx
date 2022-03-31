import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ChatProvider } from './Providers/chat';
import { CommunProvider } from './Providers/commun';

Sentry.init({
  dsn: "https://001f839c5dc942e4a05aeb4113ea14f6@o505717.ingest.sentry.io/5924520",
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.REACT_APP_ENV,

  tracesSampleRate: 1.0,
});

/* Sentry.captureMessage("testes"); */
var url = window.location.href.split('/')[3];

ReactDOM.render(

  <React.StrictMode>
    <Suspense fallback={url !== "attendant" ? <div style={{ textAlign: 'center', height: '50vh', marginTop: '50vh' }}>
      <h6>WhatsApp Launch Manager</h6>
      <br></br>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div> : <div ></div>}>
      <CommunProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </CommunProvider>
    </Suspense >
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals()
