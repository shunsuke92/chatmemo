import { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from '../components/AuthContext';
import axios from 'axios';

export interface SettingInfo {
  setting: Setting;
  changeHideCompleted: (value: boolean) => void;
  changeDisplayCommentDate: (value: boolean) => void;
}

interface Setting {
  id: number;
  created_at?: string;
  updated_at?: string;
  hide_completed_memo: boolean;
  display_comment_date: boolean;
  _synchronized: boolean;
}

interface ServerData {
  id: number;
  created_at: string;
  updated_at: string;
  hide_completed_memo: boolean;
  display_comment_date: boolean;
}

interface SendSetting {
  hide_completed_memo: boolean;
  display_comment_date: boolean;
}

const SettingInfoContext = createContext<SettingInfo | null>(null);

export function useSettingInfoContext() {
  return useContext(SettingInfoContext);
}

export function SettingInfoProvider({ children }: { children: any }) {
  const userInfo = useAuthContext();
  const user = userInfo?.user;

  const initialSetting: Setting = {
    id: 0,
    hide_completed_memo: true,
    display_comment_date: true,
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
      }
    })();
  }, [user]);

  const getSendSetting = (): SendSetting => {
    return {
      hide_completed_memo: setting.hide_completed_memo,
      display_comment_date: setting.display_comment_date,
    };
  };

  async function changeHideCompleted(value: boolean) {
    const sendData = getSendSetting();
    sendData.hide_completed_memo = value;
    // サーバーに保存
    updateServer(sendData);

    // ローカルに保存
    setSetting((prevState) => ({ ...prevState, hide_completed_memo: value }));
  }

  async function changeDisplayCommentDate(value: boolean) {
    const sendData = getSendSetting();
    sendData.display_comment_date = value;
    // サーバーに保存
    updateServer(sendData);

    // ローカルに保存
    setSetting((prevState) => ({ ...prevState, display_comment_date: value }));
  }

  async function updateServer(data: SendSetting) {
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
  }

  const info: SettingInfo = {
    setting: setting,
    changeHideCompleted: changeHideCompleted,
    changeDisplayCommentDate: changeDisplayCommentDate,
  };

  return <SettingInfoContext.Provider value={info}>{children}</SettingInfoContext.Provider>;
}
