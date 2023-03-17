import { useHoursColor } from '../hooks/useColor';
import { MyTypography } from './MyTypography';
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

  const hoursColor = useHoursColor();

  return (
    <>
      {isDisplay && (
        <MyTypography variant='caption' color={hoursColor} sx={{ whiteSpace: 'nowrap' }}>
          {data.time}
        </MyTypography>
      )}
    </>
  );
};
