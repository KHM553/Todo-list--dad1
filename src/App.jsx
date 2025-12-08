import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DailyTasks from './pages/DailyTasks';
import PreviousTasks from './pages/PreviousTasks';
import LandingPage from './pages/LandingPage';
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <TaskProvider>
      <HashRouter>
        <Routes>
          {/* Public Route - Landing Page */}
          <Route path="/" element={
            <>
              <SignedOut>
                <LandingPage />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            </>
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <SignedIn>
              <Layout />
            </SignedIn>
          }>
            <Route index element={<Dashboard />} />
            <Route path="daily" element={<DailyTasks />} />
            <Route path="previous" element={<PreviousTasks />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;
