import { NoContent } from './NoContent';
import { Timeline } from './Timeline';
import { useGetNowDisplayTabData } from '../hooks/useGetNowDisplayTabData';

export const Contents = () => {
  const displayData = useGetNowDisplayTabData();

  // Skeletons（現在未使用）コンポーネントで使用
  /* const setIsRendering = useSetRecoilState(isRenderingState);

  useEffect(() => {
    setIsRendering(false);
  }, [setIsRendering]); */

  return displayData.length > 0 ? <Timeline data={displayData} /> : <NoContent />;
};
