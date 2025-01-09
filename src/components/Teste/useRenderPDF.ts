import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import { wrap } from 'comlink';
import type { WorkerType } from './workers/pdf.worker';

// Importação dinâmica correta do worker
const loadWorker = async () => {
  const WorkerModule = await import('./workers/pdf.worker?worker');
  return new WorkerModule.default(); // Retorna o worker gerado pela importação dinâmica
};

// Configuração do Worker
const setupWorker = async () => {
  const workerInstance = await loadWorker();
  return wrap<WorkerType>(workerInstance);
};

// Worker configurado
export const pdfWorkerPromise = setupWorker();

export const useRenderPDF = ({
  text,
}: Parameters<WorkerType['renderPDFInWorker']>[0]) => {
  const [pdfWorker, setPdfWorker] = useState<ReturnType<
    typeof wrap<WorkerType>
  > | null>(null);

  // Inicializar o Worker assim que o componente for montado
  useEffect(() => {
    let isMounted = true;

    const initializeWorker = async () => {
      const worker = await pdfWorkerPromise;
      if (isMounted) setPdfWorker(worker);
    };

    initializeWorker();

    return () => {
      isMounted = false;
    };
  }, []);

  // Hook para gerenciar o estado de renderização
  const {
    value: url,
    loading,
    error,
  } = useAsync(async () => {
    if (!pdfWorker) return null; // Retorna nulo enquanto o Worker não está pronto
    return pdfWorker.renderPDFInWorker({ text });
  }, [text, pdfWorker]);

  // Limpar a URL criada quando ela não for mais necessária
  useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);

  return { url, loading, error };
};

// import { useEffect, useState } from 'react';
// import { useAsync } from 'react-use';
// import { wrap } from 'comlink';
// import type { WorkerType } from './workers/pdf.worker';

// // Importação dinâmica correta
// const loadWorker = async () => {
//   const WorkerModule = await import('./workers/pdf.worker?worker');
//   return new WorkerModule.default();
// };

// // Configuração do Worker
// const setupWorker = async () => {
//   const workerInstance = await loadWorker();
//   return wrap<WorkerType>(workerInstance);
// };

// // Worker configurado
// export const pdfWorkerPromise = setupWorker();

// export const useRenderPDF = ({
//   text,
// }: Parameters<WorkerType['renderPDFInWorker']>[0]) => {
//   const [pdfWorker, setPdfWorker] = useState<ReturnType<
//     typeof wrap<WorkerType>
//   > | null>(null);

//   // Inicializar o Worker assim que o componente for montado
//   useEffect(() => {
//     let isMounted = true;

//     const initializeWorker = async () => {
//       const worker = await pdfWorkerPromise;
//       if (isMounted) setPdfWorker(worker);
//     };

//     initializeWorker();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Hook para gerenciar o estado de renderização
//   const {
//     value: url,
//     loading,
//     error,
//   } = useAsync(async () => {
//     console.log('pdfWorker', pdfWorker);
//     if (!pdfWorker) return null;
//     try {
//       console.log('text', text);
//       return await pdfWorker.renderPDFInWorker({ text });
//     } catch (e) {
//       console.error('Error rendering PDF:', e);
//       return null;
//     }
//   }, [text, pdfWorker]);
//   console.log('url', url);
//   // Limpar a URL criada quando ela não for mais necessária
//   useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);

//   return { url, loading, error };
// };
