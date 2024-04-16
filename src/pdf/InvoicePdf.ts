import { capitalizeFirstLetter } from '../utilities';
import PdfBuilder, { Margin } from './PdfBuilder';
import {
  addBancAccount,
  addConstruction,
  addCustomer,
  addDate,
  addDocumentNumber,
  addHeader,
  addLogo,
  addServices,
  addText,
  buildDocId,
} from './shared';

interface CreateInvoicePdfParams {
  invoice: AppInvoice;
  printSettings: PrintSettings;
  construction?: Construction;
}
export function createInvoicePdf(payload: CreateInvoicePdfParams) {
  const { invoice, printSettings, construction } = payload;

  const filename = generateInvoiceFileName(invoice);

  const margin: Margin = {
    left: 20,
    right: 15,
    top: 10,
    bottom: 15,
  };

  const builder = new PdfBuilder(
    filename,
    margin,
    printSettings.primaryColor || '#000',
    printSettings.highlightColor || '#000',
    printSettings.font,
  );

  addLogo(builder, printSettings, margin);
  addHeader(builder, printSettings);
  addCustomer(builder, invoice);
  addDate(builder, invoice);
  addDocumentNumber(builder, invoice, 'Rechnung');

  if (invoice.invoiceType && invoice.invoiceType !== 'RECHNUNG') {
    addText(builder, capitalizeFirstLetter(invoice.invoiceType));
  }

  addConstruction(builder, printSettings.highlightColor, construction);
  addText(builder, printSettings.invoiceTextBefore);
  addServices(builder, invoice.offerServices);

  addText(builder, invoice.text);

  addText(builder, printSettings.invoiceTextAfter);

  addBancAccount(builder, printSettings);

  builder.enumeratePages([`${invoice.id}`]);
  builder.save();
}

function generateInvoiceFileName(invoice: AppInvoice): string {
  let name = buildDocId(invoice);

  const { company, lastName } = invoice;

  if (company) {
    name = name.concat(` ${company}`);
  }
  if (lastName) {
    name = name.concat(` ${lastName}`);
  }

  return name.concat('.pdf');
}
