import { Box } from '@mantine/core';
import { HeroBanner } from './components/HeroBanner/HeroBanner';

// Temporary page shell so the banner has somewhere to live. The sidebar,
// search bar and card sections from the mockup will replace this.
export default function App() {
  return (
    <Box component="main" mih="100vh" p="md" bg="#f1f2f4">
      <Box maw={1225}>
        <HeroBanner
          title="Operations Dashboard"
          description="Welcome back! Find operational dashboards for workloads, monitor open cases, tasks, work queues, intake, exceptions, case aging, flags, and office or program activity."
          launchHref="https://example.com"
        />
      </Box>
    </Box>
  );
}
