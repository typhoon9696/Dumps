import { useState } from 'react';
import { mockConfig } from '../mocks/configMock';

export default function useConfig() {
  const [data, setData] = useState(mockConfig);
  const [isSaving, setIsSaving] = useState(false);

  const saveConfig = async (updated) => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    Object.assign(mockConfig, updated);
    setData({ ...updated }); // Update the data state to trigger re-render
    setIsSaving(false);
  };

  return { data, saveConfig, isSaving };
}