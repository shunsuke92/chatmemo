import { createContext, useState, useContext, useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';

import { authUserState } from '../states/authUserState';

export interface SettingInfo {
  setting: Setting;
  changeHideCompleted: (value: boolean) => void;
  changeDisplayCommentDate: (value: boolean) => void;
  changeDarkMode: (value: DarkMode) => void;
  changePushWithEnter: (value: boolean) => void;
}

interface Setting {
  id: number;
  created_at?: string;
  updated_at?: string;
  hide_completed_memo: boolean;
  display_comment_date: boolean;
  dark_mode: DarkMode;
  push_with_enter: boolean;
  _synchronized: boolean;
}

interface ServerData {
  id: number;
  created_at: string;
  updated_at: string;
  hide_completed_memo: boolean;
  display_comment_date: boolean;
  dark_mode: DarkMode;
  push_with_enter: boolean;
}

interface SendSetting {
  hide_completed_memo: boolean;
  display_comment_date: boolean;
  dark_mode: DarkMode;
  push_with_enter: boolean;
}

export type DarkMode = 'os' | 'dark' | 'light';

const SettingInfoContext = createContext<SettingInfo | null>(null);

export const useSettingInfoContext = () => {
  return useContext(SettingInfoContext);
};

export const SettingInfoProvider = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(authUserState);

  const initialSetting: Setting = {
    id: 0,
    hide_completed_memo: true,
    display_comment_date: true,
    dark_mode: 'os',
    push_with_enter: true,
    _synchronized: true,
  };
  const [setting, setSetting] = useState<Setting>(initialSetting);

  useEffect(() => {
    // サーバーのデータを取得する
    (async () => {
      if (user) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/settings`,
        );
        const serverData: ServerData = res.data?.contents;
        if (serverData) {
          setSetting({
            ...serverData,
            _synchronized: true,
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })();
  }, [user]);

  const getSendSetting = (): SendSetting => {
    return {
      hide_completed_memo: setting.hide_completed_memo,
      display_comment_date: setting.display_comment_date,
      dark_mode: setting.dark_mode,
      push_with_enter: setting.push_with_enter,
    };
  };

  const changeHideCompleted = async (value: boolean) => {
    const sendData = getSendSetting();
    sendData.hide_completed_memo = value;
    // サーバーに保存
    updateServer(sendData);

    // ローカルに保存
    setSetting((prevState) => ({ ...prevState, hide_completed_memo: value }));
  };

  const changeDisplayCommentDate = async (value: boolean) => {
    const sendData = getSendSetting();
    sendData.display_comment_date = value;
    // サーバーに保存
    updateServer(sendData);

    // ローカルに保存
    setSetting((prevState) => ({ ...prevState, display_comment_date: value }));
  };

  const changeDarkMode = async (value: DarkMode) => {
    const sendData = getSendSetting();
    sendData.dark_mode = value;
    // サーバーに保存
    updateServer(sendData);

    // ローカルに保存
    setSetting((prevState) => ({ ...prevState, dark_mode: value }));
  };

  const changePushWithEnter = async (value: boolean) => {
    const sendData = getSendSetting();
    sendData.push_with_enter = value;
    // サーバーに保存
    updateServer(sendData);

    // ローカルに保存
    setSetting((prevState) => ({ ...prevState, push_with_enter: value }));
  };

  const updateServer = async (data: SendSetting) => {
    if (user) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.uid}/settings/${setting.id}`,
          data,
        )
        .then((res) => {})
        .catch((err) => {
          setSetting((prevState) => ({ ...prevState, _synchronized: false }));
        });
    }
  };

  const info: SettingInfo = {
    setting: setting,
    changeHideCompleted: changeHideCompleted,
    changeDisplayCommentDate: changeDisplayCommentDate,
    changeDarkMode: changeDarkMode,
    changePushWithEnter: changePushWithEnter,
  };

  return (
    <SettingInfoContext.Provider value={info}>
      {isLoading ? <LinearProgress /> : children}
    </SettingInfoContext.Provider>
  );
};
