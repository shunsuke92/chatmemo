import { RecoilRoot } from 'recoil';

import { Auth } from '../components/Auth';
import { BottomBar } from '../components/BottomBar';
import { DelayCompletedProvider } from '../components/DelayCompletedContext';
import { Main } from '../components/Main';
import { ManageTentativeIDProvider } from '../components/ManageTentativeIDContext';
import { MenuBar } from '../components/MenuBar';
import { SettingInfoProvider } from '../components/SettingInfoContext';
import { SkeletonContents } from '../components/SkeletonContents';
import { SynchronizationProvider } from '../components/SynchronizationContext';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
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
          <SkeletonContents />
        </Auth>
        <MenuBar />
        <BottomBar />
      </RecoilRoot>
    </>
  );
};

export default Home;
