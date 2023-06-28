import { RecoilRoot } from 'recoil';

import { Auth } from '../components/Auth';
import { DelayCompletedProvider } from '../components/DelayCompletedContext';
import { Main } from '../components/Main';
import { ManageTentativeIDProvider } from '../components/ManageTentativeIDContext';
import { SettingInfoProvider } from '../components/SettingInfoContext';
import { SynchronizationProvider } from '../components/SynchronizationContext';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <RecoilRoot>
      <Auth>
        <SettingInfoProvider>
          <SynchronizationProvider>
            <ManageTentativeIDProvider>
              <DelayCompletedProvider>
                <Main />
              </DelayCompletedProvider>
            </ManageTentativeIDProvider>
          </SynchronizationProvider>
        </SettingInfoProvider>
      </Auth>
    </RecoilRoot>
  );
};

export default Home;
