import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './utilities/protected_route';
import Layout from './views/includes/layout';
import Dashboard from './views/dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All protected pages will go inside this parent route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}
