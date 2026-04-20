import React from "react";

const countryData = {
  US: { currency: "$", taxName: "Tax" },
  GB: { currency: "£", taxName: "VAT" },
  EU: { currency: "€", taxName: "VAT" },
  IN: { currency: "₹", taxName: "GST" },
  CA: { currency: "C$", taxName: "GST" },
  AU: { currency: "A$", taxName: "GST" },
  FI: { currency: "€", taxName: "VAT" },
  NG: { currency: "₦", taxName: "VAT" },
  ZA: { currency: "R", taxName: "VAT" },
  SG: { currency: "S$", taxName: "GST" },
  AE: { currency: "AED", taxName: "VAT" },
};

export default function InvoiceForm({ data, setData }) {
  const updateData = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (category, field, value) => {
    setData((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    const { currency } = countryData[country] || { currency: "$" };
    setData((prev) => ({ ...prev, country, currency }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData("logoUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), description: "", quantity: 1, price: 0 }
      ]
    }));
  };

  const updateItem = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeItem = (id) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const taxName = countryData[data.country]?.taxName || "Tax";

  return (
    <div className="flex-col gap-4">
      <h2 className="subtitle">Invoice Details</h2>

      <div className="grid-2">
        <div className="form-group">
          <label className="label" htmlFor="country-select">Country / Region</label>
          <select id="country-select" className="input" value={data.country} onChange={handleCountryChange}>
            <option value="US">United States (USD)</option>
            <option value="GB">United Kingdom (GBP)</option>
            <option value="EU">European Union (EUR)</option>
            <option value="FI">Finland (EUR)</option>
            <option value="IN">India (INR)</option>
            <option value="CA">Canada (CAD)</option>
            <option value="AU">Australia (AUD)</option>
            <option value="NG">Nigeria (NGN)</option>
            <option value="ZA">South Africa (ZAR)</option>
            <option value="SG">Singapore (SGD)</option>
            <option value="AE">UAE (AED)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="invoice-number">Invoice Number</label>
          <input id="invoice-number" className="input" type="text" value={data.invoiceNumber} onChange={(e) => updateData("invoiceNumber", e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="invoice-date">Invoice Date</label>
          <input id="invoice-date" className="input" type="date" value={data.date} onChange={(e) => updateData("date", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="due-date">Due Date</label>
          <input id="due-date" className="input" type="date" value={data.dueDate} onChange={(e) => updateData("dueDate", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="payment-terms">Terms of Payment</label>
          <input id="payment-terms" className="input" type="text" value={data.paymentTerms} onChange={(e) => updateData("paymentTerms", e.target.value)} placeholder="e.g. 14 days net" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="customer-number">Customer Number</label>
          <input id="customer-number" className="input" type="text" value={data.customerNumber} onChange={(e) => updateData("customerNumber", e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="buyer-ref">Buyer Reference</label>
          <input id="buyer-ref" className="input" type="text" value={data.buyerReference} onChange={(e) => updateData("buyerReference", e.target.value)} autoComplete="off" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="payment-ref">Payment Reference No.</label>
          <input id="payment-ref" className="input" type="text" value={data.paymentReference} onChange={(e) => updateData("paymentReference", e.target.value)} autoComplete="off" />
        </div>
      </div>

      <div className="grid-2 mt-4">
        <div>
          <h3 className="font-bold mb-4">Sender Info</h3>
          <div className="form-group">
            <label className="label" htmlFor="logo-upload" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Company Logo</label>
            <input id="logo-upload" className="input" type="file" accept="image/*" onChange={handleLogoUpload} style={{ padding: '0.5rem', fontSize: '0.875rem' }} aria-label="Upload company logo" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="sender-name">Company Name</label>
            <input id="sender-name" className="input" placeholder="Company Name" value={data.sender.name} onChange={(e) => updateNested("sender", "name", e.target.value)} autoComplete="organization" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="sender-address">Company Address</label>
            <textarea id="sender-address" className="input" placeholder="Address" rows="3" value={data.sender.address} onChange={(e) => updateNested("sender", "address", e.target.value)} autoComplete="street-address" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="sender-email">Email (optional)</label>
            <input id="sender-email" className="input" type="email" placeholder="email@company.com" value={data.sender.email} onChange={(e) => updateNested("sender", "email", e.target.value)} autoComplete="email" inputMode="email" />
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Recipient Info</h3>
          <div className="form-group">
            <label className="label" htmlFor="recipient-name">Client Name</label>
            <input id="recipient-name" className="input" placeholder="Client Name" value={data.recipient.name} onChange={(e) => updateNested("recipient", "name", e.target.value)} autoComplete="organization" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="recipient-address">Client Address</label>
            <textarea id="recipient-address" className="input" placeholder="Client Address" rows="3" value={data.recipient.address} onChange={(e) => updateNested("recipient", "address", e.target.value)} autoComplete="street-address" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="recipient-email">Client Email (optional)</label>
            <input id="recipient-email" className="input" type="email" placeholder="client@email.com" value={data.recipient.email} onChange={(e) => updateNested("recipient", "email", e.target.value)} autoComplete="email" inputMode="email" />
          </div>
        </div>
      </div>

      <h3 className="font-bold mt-4 mb-4">Bank Transfer Details</h3>
      <div className="grid-2">
        <div className="form-group">
          <label className="label" htmlFor="bank-name">Bank Name</label>
          <input id="bank-name" className="input" type="text" value={data.bankDetails.bankName} onChange={(e) => updateNested("bankDetails", "bankName", e.target.value)} placeholder="e.g. Danske Bank" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="bic">BIC (SWIFT)</label>
          <input id="bic" className="input" type="text" value={data.bankDetails.bic} onChange={(e) => updateNested("bankDetails", "bic", e.target.value)} placeholder="e.g. DABAFIHH" autoComplete="off" />
        </div>
        <div className="form-group iban-field-full">
          <label className="label" htmlFor="iban">IBAN</label>
          <input id="iban" className="input" type="text" value={data.bankDetails.iban} onChange={(e) => updateNested("bankDetails", "iban", e.target.value)} placeholder="e.g. FI33 8000 1601 0166 95" autoComplete="off" />
        </div>
      </div>

      <h3 className="font-bold mt-4 mb-4">Line Items</h3>
      {data.items.map((item, index) => (
        <div key={item.id} className="invoice-item-row mb-6 pb-6 border-bottom-item">
          <div className="flex-grow-2">
            <label className="label item-label">Description</label>
            <input
              className="input"
              placeholder="Item Description"
              value={item.description}
              onChange={(e) => updateItem(item.id, "description", e.target.value)}
              aria-label={`Item ${index + 1} description`}
            />
          </div>
          <div className="item-qty">
            <label className="label item-label">Qty</label>
            <input
              className="input"
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
              inputMode="decimal"
              min="0"
              aria-label={`Item ${index + 1} quantity`}
            />
          </div>
          <div className="item-price">
            <label className="label item-label">Price ({data.currency})</label>
            <input
              className="input"
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(item.id, "price", e.target.value)}
              inputMode="decimal"
              min="0"
              aria-label={`Item ${index + 1} price`}
            />
          </div>
          <button
            className="btn remove-item-btn"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove item ${index + 1}`}
          >
            Remove
          </button>
        </div>
      ))}

      <style jsx>{`
        .invoice-item-row {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
        }
        .flex-grow-2 { flex: 3; }
        .item-qty { flex: 1; min-width: 70px; }
        .item-price { flex: 1.2; min-width: 90px; }
        .item-label { display: none; }
        .remove-item-btn {
          background: transparent;
          color: var(--danger-color);
          border: 1px solid var(--danger-color);
          padding: 0.5rem 0.75rem;
          font-size: 0.8rem;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .remove-item-btn:hover { background: #fee2e2; }
        .border-bottom-item { border-bottom: 1px solid var(--border-color); }
        .border-bottom-item:last-of-type { border-bottom: none; }

        @media (max-width: 768px) {
          .invoice-item-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          .item-label { display: block; }
          .item-qty, .item-price { min-width: unset; }
          .remove-item-btn {
            background: #fee2e2;
            padding: 0.75rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <button className="btn btn-primary" onClick={addItem} style={{ marginTop: '0.5rem' }}>+ Add Item</button>

      <div className="grid-2 mt-4">
        <div className="form-group">
          <label className="label" htmlFor="tax-rate">Tax Rate (%) — {taxName}</label>
          <input id="tax-rate" className="input" type="number" value={data.taxRate} onChange={(e) => updateData("taxRate", e.target.value)} inputMode="decimal" min="0" max="100" />
        </div>
      </div>

      <div className="form-group mt-4">
        <label className="label" htmlFor="notes">Notes</label>
        <textarea id="notes" className="input" rows="3" value={data.notes} onChange={(e) => updateData("notes", e.target.value)} placeholder="Payment instructions, thank you note, etc." />
      </div>
    </div>
  );
}
