import React from "react";

const countryData = {
  US: { taxName: "Tax" },
  GB: { taxName: "VAT" },
  EU: { taxName: "VAT" },
  IN: { taxName: "GST" },
  CA: { taxName: "GST" },
  AU: { taxName: "GST" },
  FI: { taxName: "VAT" },
};

export default function InvoicePreview({ data }) {
  const { currency, items, taxRate, country } = data;
  const taxName = countryData[country]?.taxName || "Tax";

  const formatCurrency = (amount) => {
    return `${currency}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const safeNum = (val) => Number(val) || 0;

  const calculateItemTax = (price, quantity) => {
    const sum = safeNum(price) * safeNum(quantity);
    return sum * (safeNum(taxRate) / 100);
  };

  const subtotal = items.reduce((sum, item) => sum + (safeNum(item.quantity) * safeNum(item.price)), 0);
  const taxAmount = subtotal * (safeNum(taxRate) / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="invoice-preview-outer-wrapper">
      <div className="invoice-preview-container formal">
        {/* HEADER SECTION */}
        <div className="formal-header">
          <div className="formal-header-left">
            {/* Company Logo */}
            <div className="mock-logo" style={{ marginBottom: '2rem', minHeight: '60px' }}>
              {data.logoUrl ? (
                <img src={data.logoUrl} alt="Company Logo" style={{ maxHeight: '60px', maxWidth: '250px', objectFit: 'contain' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="logo-circle" style={{ width: '30px', height: '30px', background: '#6a1b9a', borderRadius: '50%' }}></span>
                  <span className="logo-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6a1b9a' }}>{data.sender.name || "COMPANY"}</span>
                </div>
              )}
            </div>
            <div className="sender-address">
              <p className="font-bold">{data.sender.name || "Your Company Name"}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{data.sender.address || "123 Business Rd.\nCity, State, ZIP"}</p>
            </div>

            <div className="recipient-address mt-4">
              <p className="font-bold">{data.recipient.name || "Client Name"}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{data.recipient.address || "Client Address"}</p>
            </div>
          </div>
          
          <div className="formal-header-right">
            <div className="invoice-title-row">
              <h2>Invoice</h2>
              <span className="page-num">Page 1 / 1</span>
            </div>
            
            <table className="formal-grid-table">
              <tbody>
                <tr>
                  <td>
                    <span className="label">Invoice Date</span>
                    <span className="value">{data.date || "---"}</span>
                  </td>
                  <td>
                    <span className="label">Invoice Number</span>
                    <span className="value">{data.invoiceNumber || "---"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="label">Reference Number</span>
                    <span className="value">{data.paymentReference || "---"}</span>
                  </td>
                  <td>
                    <span className="label">Buyer Reference</span>
                    <span className="value">{data.buyerReference || "---"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="label">Due Date</span>
                    <span className="value">{data.dueDate || "---"}</span>
                  </td>
                  <td>
                    <span className="label">Customer Number</span>
                    <span className="value">{data.customerNumber || "---"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="label">Terms of Payment</span>
                    <span className="value">{data.paymentTerms || "---"}</span>
                  </td>
                  <td>
                    <span className="label">Delay Info</span>
                    <span className="value">Penalty interest as per law</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="table-responsive">
          <table className="formal-items-table mt-4">
            <thead>
              <tr>
                <th>Product / Service</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Tax-free Sum</th>
                <th>{taxName} %</th>
                <th>{taxName} Amount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const sum = safeNum(item.price) * safeNum(item.quantity);
                const tax = calculateItemTax(item.price, item.quantity);
                return (
                  <tr key={index}>
                    <td className="item-desc">{item.description || `Item ${index + 1}`}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(safeNum(item.price))}</td>
                    <td>{formatCurrency(sum)}</td>
                    <td>{taxRate}%</td>
                    <td>{formatCurrency(tax)}</td>
                    <td>{formatCurrency(sum + tax)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="formal-totals-section">
          <div className="vat-breakdown">
            <span className="label">{taxName} Breakdown</span>
            <span>{formatCurrency(subtotal)}</span>
            <span>{taxRate}%</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
          <div className="total-line">
            <span className="label">TOTAL:</span>
            <span className="value">{formatCurrency(total)}</span>
          </div>
        </div>

        {data.notes && (
          <div className="notes-section">
            <strong>Notes:</strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{data.notes}</p>
          </div>
        )}

        {/* BANK TRANSFER SLIP (TILISIIRTO STYLE) */}
        <div className="bank-transfer-slip">
          {/* Row 1: IBAN and BIC */}
          <div className="slip-row border-bottom">
            <div className="slip-cell flex-1 border-right" style={{ display: 'flex' }}>
              <div className="vertical-box">
                <span>IBAN</span>
              </div>
              <div className="slip-content">
                <div className="bank-name">{data.bankDetails.bankName || "Bank Name"}</div>
                <div className="iban">{data.bankDetails.iban || "---"}</div>
              </div>
            </div>
            <div className="slip-cell bic-cell" style={{ display: 'flex', flexDirection: 'column', padding: '4px' }}>
              <div className="slip-label">BIC</div>
              <div className="slip-value mt-2">{data.bankDetails.bic || "---"}</div>
            </div>
          </div>
          
          {/* Row 2: Receiver */}
          <div className="slip-row">
            <div className="slip-cell flex-1 border-right" style={{ display: 'flex' }}>
              <div className="vertical-box">
                <span>RECEIVER</span>
              </div>
              <div className="slip-content" style={{ paddingBottom: '20px' }}>
                <div>{data.sender.name || "Your Company Name"}</div>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>{data.sender.address}</div>
              </div>
            </div>
            <div className="slip-cell bic-cell"></div>
          </div>

          {/* Row 3: Payer / Details */}
          <div className="slip-row border-top">
            <div className="slip-cell flex-1 border-right" style={{ display: 'flex' }}>
               <div className="vertical-box payment-slip-box">
                 <span>PAYMENT SLIP</span>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                 {/* Payer */}
                 <div style={{ display: 'flex', borderBottom: '1px solid #000', flex: 1 }}>
                   <div className="vertical-box">
                     <span>PAYER</span>
                   </div>
                   <div className="slip-content">
                      <div>{data.recipient.name || "Client Name"}</div>
                      <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>{data.recipient.address}</div>
                   </div>
                 </div>
                 {/* Signature */}
                 <div style={{ display: 'flex', minHeight: '60px' }}>
                   <div className="vertical-box">
                     <span>SIGNATURE</span>
                   </div>
                   <div className="slip-content" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                     <div style={{ borderBottom: '1px solid #000', width: '100%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="slip-cell ref-amount-cell" style={{ display: 'flex', flexDirection: 'column' }}>
               <div className="border-bottom" style={{ padding: '4px', flex: 1 }}>
                  <div className="slip-label">REF. NO</div>
                  <div className="slip-value text-right" style={{ fontSize: '1.1rem', letterSpacing: '2px', marginTop: '10px' }}>{data.paymentReference || "---"}</div>
               </div>
               <div style={{ display: 'flex', height: '40px' }}>
                  <div className="border-right" style={{ padding: '4px', flex: 1 }}>
                    <div className="slip-label">DUE DATE</div>
                    <div className="slip-value mt-2">{data.dueDate || "---"}</div>
                  </div>
                  <div style={{ padding: '4px', flex: 1.2, backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
                    <div className="slip-label">AMOUNT</div>
                    <div className="slip-value text-right font-bold mt-auto">{formatCurrency(total)}</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .invoice-preview-outer-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
        }
        .invoice-preview-container {
          min-width: 800px; /* Preserve A4-like width for PDF layout */
          margin: 0 auto;
        }
        .bic-cell { width: 150px; }
        .ref-amount-cell { width: 250px; }
        
        @media print {
          .invoice-preview-outer-wrapper {
            overflow: visible;
            box-shadow: none;
            border-radius: 0;
          }
          .invoice-preview-container {
            min-width: auto;
            width: 100%;
          }
        }

        @media (max-width: 850px) {
           .invoice-preview-outer-wrapper {
             border: 1px solid var(--border-color);
           }
        }
      `}</style>
    </div>
  );
}
