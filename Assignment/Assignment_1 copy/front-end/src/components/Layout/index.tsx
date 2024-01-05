import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  RightOval,
  CloudOne,
  CloudTwo,
  LeftOval,
} from '..';
import { handleLogout } from '../../utils/helper';

function Layout() {
  window.addEventListener('storage', handleLogout);
  return (
    <div className="content">
      <CloudOne className="background-cloud-one" />
      <CloudTwo className="background-cloud-two" />
      <RightOval className="background-right-oval" />
      <LeftOval className="background-left-oval" />
      <div className="content-body">
        <div className="content-body-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
