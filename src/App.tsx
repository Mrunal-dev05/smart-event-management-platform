import { useState } from 'react';
import { AppProvider, useApp } from './store';
import { Layout } from './components/Layout';
import { ToastContainer } from './components/Toasts';
import { Landing } from './pages/Landing';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { ParticipantDashboard } from './pages/ParticipantDashboard';
import { JudgeDashboard } from './pages/JudgeDashboard';
import { Registration } from './pages/Registration';
import { CheckIn } from './pages/CheckIn';
import { Teammates } from './pages/Teammates';
import { Announcements } from './pages/Announcements';
import { JudgePortal } from './pages/JudgePortal';
import { Leaderboard } from './pages/Leaderboard';
import { Analytics } from './pages/Analytics';
import { Schedule } from './pages/Schedule';

function Shell() {
  const { entered, role } = useApp();
  const [page, setPage] = useState('dashboard');

  if (!entered) return <Landing />;

  const navigate = (p: string) => setPage(p);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return role === 'organizer' ? <OrganizerDashboard onNavigate={navigate} /> : role === 'participant' ? <ParticipantDashboard onNavigate={navigate} /> : <JudgeDashboard onNavigate={navigate} />;
      case 'registration':
        return <Registration onNavigate={navigate} />;
      case 'checkin':
        return <CheckIn />;
      case 'teammates':
        return <Teammates />;
      case 'announcements':
        return <Announcements />;
      case 'judging':
        return <JudgePortal />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'analytics':
        return <Analytics />;
      case 'schedule':
        return <Schedule />;
      default:
        return role === 'organizer' ? <OrganizerDashboard onNavigate={navigate} /> : role === 'participant' ? <ParticipantDashboard onNavigate={navigate} /> : <JudgeDashboard onNavigate={navigate} />;
    }
  };

  return (
    <Layout active={page} onNavigate={navigate} onRoleSwitch={() => setPage('dashboard')}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
      <ToastContainer />
    </AppProvider>
  );
}
