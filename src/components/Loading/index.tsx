import Logo from '../../assets/logo_observatorio.svg';

const Loading = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <img
        className="mb-2 flex justify-center"
        width={270}
        height={20}
        alt="Logo da Encibra SA"
        src={Logo}
      />
      Carregando...
    </div>
  );
};

export default Loading;
