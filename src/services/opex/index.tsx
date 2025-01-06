import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import api from '../../infra/providers/axios/apit';

const fetchPosts = async () => {
  const userToken = Cookies.get('__Secure-next-auth.session-token.0');

  const { data } = await api.get(
    '/capex/investment/chart/by-block-and-municipality?idBlock=1',
    {
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXZlbndpbGxpYW1zaWx2YWJhcnJvc0BnbWFpbC5jb20iLCJpYXQiOjE3MzU5MjEwNDEsImV4cCI6MTczNTkyNDY0MX0.oLP1k0ldV8ehu54SV45Eh5mgWVz5Jb3MGU6wB2SexGY',
      },
    }
  );
  return data;
};
export const useInvestmentsMade = () => {
  return useQuery({
    queryKey: ['investmentsMade'],
    queryFn: fetchPosts,
  });
};
