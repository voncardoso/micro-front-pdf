import React from 'react';
import { MyDocument } from '../components/teste';
import { Document, Page, pdf, PDFViewer } from '@react-pdf/renderer';
import { useInvestmentsMade } from '../../../services/opex';
import InvestmentPerYear from '../../investmentsMade/InvestimentosPerYear';
import Capa from '../../../components/Cover';
import BackCover from '../../../components/BackCover';

export const HomePage: React.FC = () => {
  const { data, isLoading } = useInvestmentsMade();
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
  console.log(data, 'data');

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      teste
      {/* {isLoading && <p>Loading...</p>}
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
      </button> */}
      <PDFViewer width="100%" height="100%">
        <Document>
          <Capa
            concessionarieName={'BRK AMBIENTAL'}
            title={'RELATÓRIO DE INVESTIMENTOS'}
            period={'JUL/2021 - NOV/2023'}
          />
          <BackCover />
          <Page>
            <InvestmentPerYear />
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
