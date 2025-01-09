import React from 'react';
import { useInvestmentsPerYear } from '../../services/investimentPerYear';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { saveAs } from 'file-saver';
import { RenderedPDFViewer } from '../../components/Teste/RenderedPDFViewer';

export const BigPdf: React.FC = () => {
  const [searchParams] = useSearchParams();
  const idblock = Number(searchParams.get('idBlock')) || 1;
  const { isLoading } = useInvestmentsPerYear(idblock);

  if (!isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <button
              onClick={async () => {
                const { renderPDF } = await import(
                  '../../components/Teste/renderPDF'
                );
                const blob = await renderPDF({ text: 'd' });
                saveAs(blob, 'test.pdf');
              }}
            >
              Download
            </button>
            <RenderedPDFViewer
              style={{
                backgroundColor: 'grey',
                width: '500px',
                height: '760px',
              }}
              text={'text'}
            />
          </div>
        )}
      </div>
    );
  }
};
