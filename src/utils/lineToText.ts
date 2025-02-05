export const lineToText = (line?: string | null) => {
  if (!line) return 'Visão Geral';
  return line === 'AGUA' ? 'Água' : 'Esgoto';
};
