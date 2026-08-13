'use client';

import { useState, useEffect, useCallback } from 'react';
import { ALARM_SOUND_STORAGE_KEY, DEFAULT_ALARM_SOUND_ID } from '@/data/alarmSounds';

export function useSettings() {
  const [alarmSoundId, setAlarmSoundIdState] = useState<string>(DEFAULT_ALARM_SOUND_ID);

  useEffect(() => {
    const stored = localStorage.getItem(ALARM_SOUND_STORAGE_KEY);
    if (stored) setAlarmSoundIdState(stored);
  }, []);

  const setAlarmSoundId = useCallback((id: string) => {
    setAlarmSoundIdState(id);
    localStorage.setItem(ALARM_SOUND_STORAGE_KEY, id);
  }, []);

  return { alarmSoundId, setAlarmSoundId };
}
