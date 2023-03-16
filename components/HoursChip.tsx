import { useDateColor } from '../hooks/useColor';
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

  const dateColor = useDateColor();

  return (
    <>
      {isDisplay && (
        <MyTypography variant='caption' color={dateColor} sx={{ whiteSpace: 'nowrap' }}>
          {data.time}
        </MyTypography>
      )}
    </>
  );
};
