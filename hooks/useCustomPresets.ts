'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CustomPreset } from '@/types';

const STORAGE_KEY = 'cue_custom_presets';

export function useCustomPresets() {
  const [presets, setPresets] = useState<CustomPreset[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPresets(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load custom presets', e);
    }
    setIsLoaded(true);
  }, []);

  const savePresets = useCallback((newPresets: CustomPreset[]) => {
    setPresets(newPresets);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPresets));
    } catch (e) {
      console.error('Failed to save custom presets', e);
    }
  }, []);

  const addPreset = useCallback((preset: Omit<CustomPreset, 'id' | 'createdAt'>) => {
    const newPreset: CustomPreset = {
      ...preset,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    // Add to beginning of the list
    savePresets([newPreset, ...presets]);
  }, [presets, savePresets]);

  const updatePreset = useCallback((id: string, updates: Partial<Omit<CustomPreset, 'id' | 'createdAt'>>) => {
    const newPresets = presets.map((p) => (p.id === id ? { ...p, ...updates } : p));
    savePresets(newPresets);
  }, [presets, savePresets]);

  const deletePreset = useCallback((id: string) => {
    const newPresets = presets.filter((p) => p.id !== id);
    savePresets(newPresets);
  }, [presets, savePresets]);

  return { presets, isLoaded, addPreset, updatePreset, deletePreset };
}
