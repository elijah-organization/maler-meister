import { Box, Typography, TypographyProps } from '@mui/material';

import { useMemo } from 'react';

import { euroValue } from '../../utilities';

interface Props {
  offerServices: OfferService[];
}

function calculatePriceSummary(offerServices: OfferService[]) {
  const netto = offerServices.reduce((prev, os) => {
    return prev + Number(os.netto || 0);
  }, 0);

  const tax = offerServices
    .filter((os) => os.taxRate > 0)
    .reduce((prev, os) => {
      return prev + Number(os.taxValue || 0);
    }, 0);

  const brutto = netto + tax;

  return { brutto, tax, netto };
}

export function PriceSummary({ offerServices }: Props) {
  const { brutto, netto, tax } = calculatePriceSummary(offerServices);

  const grayTextProps = useMemo(() => {
    return {
      align: 'right',
      color: 'GrayText',
      variant: 'h6',
    } as TypographyProps;
  }, []);

  return (
    <Box>
      <Typography align="right" color="primary" variant="h5">
        Netto: {euroValue(netto)}
      </Typography>
      {tax > 0 && <Typography {...grayTextProps}>MwSt 19%: {euroValue(tax)}</Typography>}
      <Typography {...grayTextProps}>Brutto: {euroValue(brutto)}</Typography>
    </Box>
  );
}
