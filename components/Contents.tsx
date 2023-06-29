import { NoContent } from './NoContent';
import { Timeline } from './Timeline';
import { useGetNowDisplayTabData } from '../hooks/useGetNowDisplayTabData';

export const Contents = () => {
  const displayData = useGetNowDisplayTabData();

  return displayData.length > 0 ? <Timeline data={displayData} /> : <NoContent />;
};
