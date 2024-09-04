import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { AppRoutes } from '/imports/startup/client/Route.jsx';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  console.log(AppRoutes)
  root.render(<AppRoutes />);
});