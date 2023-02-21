import { useState, useEffect, useRef, useCallback } from 'react';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import LinearProgress from '@mui/material/LinearProgress';

import { useGetNowAllTabData } from '../hooks/useGetNowAllTabData';
import { changeDisplayStepState } from '../states/changeDisplayStepState';
import { changeMemoState } from '../states/changeMemoState';
import { displayStepState } from '../states/displayStepState';
import { displayingMemoState } from '../states/displayingMemoState';
import { isAllDisplayedState } from '../states/isAllDisplayedState';
import { Memo } from '../states/memoState';
import { resetDisplayPositionState } from '../states/resetDisplayPositionState';
import { splitByDisplayStep } from '../utils/splitByDisplayStep';

export const DataController = ({ children }: { children: any }) => {
  const [isGettingData, setIsGettingData] = useState(true);

  const setFilteredMemo = useSetRecoilState(displayingMemoState);
  const filteredMemoAll = useRef<Memo[][]>([]);

  const displayStep = useRecoilValue(displayStepState);
  const beforeDisplayedStep = useRef(1);

  const setResetDisplayPosition = useSetRecoilState(resetDisplayPositionState);

  const setChangeDisplayStep = useSetRecoilState(changeDisplayStepState);

  const [changeMemo, setChangeMemo] = useRecoilState(changeMemoState);
  const nowAllTabData = useGetNowAllTabData();

  const setIsAllDisplayed = useSetRecoilState(isAllDisplayedState);

  const setDisplayStep = useSetRecoilState(displayStepState);

  // 表示用のデータを退避
  // タイミング：初回、タブ切り替え、実行済み表示切り替え、ログイン、ログアウト
  useEffect(() => {
    // 表示データを表示ステップごとに分けて格納する
    filteredMemoAll.current = splitByDisplayStep(nowAllTabData);

    // 表示ステップ１のデータを表示する
    setFilteredMemo(filteredMemoAll.current[0] ?? []);

    // すべてのデータを表示済みか？（「表示データがなし」または「表示ステップが１つ」）
    if (filteredMemoAll.current.length === 0 || filteredMemoAll.current.length === 1) {
      setIsAllDisplayed(true);
    } else {
      setIsAllDisplayed(false);
    }

    // 表示数と表示位置をリセットする
    setResetDisplayPosition(true);
    setDisplayStep(1);

    // 表示済みステップ（ローカル変数）を初期化
    setBeforeDisplayedStep(1);

    if (changeMemo) {
      setChangeMemo(false);
    }

    setIsGettingData(false);
  }, [
    nowAllTabData,
    setResetDisplayPosition,
    setDisplayStep,
    setFilteredMemo,
    setIsAllDisplayed,
    changeMemo,
    setChangeMemo,
  ]);

  const isExistContents = useCallback(() => {
    return filteredMemoAll.current.length >= displayStep;
  }, [displayStep]);

  const isIncreasedDisplayStep = useCallback(() => {
    return displayStep >= beforeDisplayedStep.current;
  }, [displayStep]);

  const isNotFirstTime = useCallback(() => {
    return displayStep !== 1;
  }, [displayStep]);

  const setBeforeDisplayedStep = (value: number) => {
    beforeDisplayedStep.current = value;
  };

  // 表示するコンテンツ数を増やす
  // タイミング：ページ上部に到達
  useEffect(() => {
    // 「まだ表示するコンテンツがある」かつ「表示数が増えている」かつ「初回でない」とき
    if (isExistContents() && isIncreasedDisplayStep() && isNotFirstTime()) {
      setFilteredMemo((prevState) => [...filteredMemoAll.current[displayStep - 1], ...prevState]);
      setBeforeDisplayedStep(displayStep);

      // 最後まで表示したら
      if (filteredMemoAll.current.length === displayStep) {
        setIsAllDisplayed(true);
      }

      // 「表示コンテンツ追加時のスクロール」を発火する
      setChangeDisplayStep(true);
    }
  }, [
    displayStep,
    setFilteredMemo,
    setChangeDisplayStep,
    setIsAllDisplayed,
    isExistContents,
    isIncreasedDisplayStep,
    isNotFirstTime,
  ]);

  return <>{isGettingData ? <LinearProgress /> : children}</>;
};
