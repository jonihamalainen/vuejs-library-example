export const useSivuState = createGlobalState(() => {
  const sivuData = useState<string>("lainaus");

  const setSivuData = (sivu: string): void => {
      sivuData.value = sivu;
  };
  return { sivuData, setSivuData };
});
