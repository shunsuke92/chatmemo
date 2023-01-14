import Typography from '@mui/material/Typography';

import { useSettingInfoContext } from './SettingInfoContext';
import { InternalData } from './Timeline';

interface HoursChipProps {
  data: InternalData;
}

export const HoursChip = (props: HoursChipProps) => {
  const { data } = props;

  const settingInfo = useSettingInfoContext();
  const setting = settingInfo?.setting;

  const isDisplay = data.type === 'comment' ? setting?.display_comment_date : true;

  return (
    <>
      {isDisplay && (
        <Typography variant='caption' color='text.disabled' sx={{ whiteSpace: 'nowrap' }}>
          {data.time}
        </Typography>
      )}
    </>
  );
};
