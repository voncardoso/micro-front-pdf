import React from 'react';
import { MyDocument } from '../components/teste';
import { pdf } from '@react-pdf/renderer';

export const HomePage: React.FC = () => {
  const generatePDF = async () => {
    console.log('Gerando PDF...');

    // Gerar o PDF a partir do componente MyDocument
    const pdfBlob = await pdf(<MyDocument />).toBlob();

    // Criar uma URL temporária para o arquivo PDF
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio.pdf';

    // Iniciar o download do arquivo
    link.click();

    // Liberar o objeto URL
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={generatePDF}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Gerar PDF
      </button>
    </div>
  );
};
