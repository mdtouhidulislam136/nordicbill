import React from "react";

const countryData = {
  US: { currency: "$", taxName: "Tax" },
  GB: { currency: "£", taxName: "VAT" },
  EU: { currency: "€", taxName: "VAT" },
  IN: { currency: "₹", taxName: "GST" },
  CA: { currency: "C$", taxName: "GST" },
  AU: { currency: "A$", taxName: "GST" },
  FI: { currency: "€", taxName: "VAT" }, // Changed back to English "VAT"
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

  return (
    <div className="flex-col gap-4">
      <h2 className="subtitle">Invoice Details</h2>
      
      <div className="grid-2">
        <div className="form-group">
          <label className="label">Country / Region</label>
          <select className="input" value={data.country} onChange={handleCountryChange}>
            <option value="US">United States (USD)</option>
            <option value="GB">United Kingdom (GBP)</option>
            <option value="EU">European Union (EUR)</option>
            <option value="FI">Finland (EUR)</option>
            <option value="IN">India (INR)</option>
            <option value="CA">Canada (CAD)</option>
            <option value="AU">Australia (AUD)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Invoice Number</label>
          <input className="input" type="text" value={data.invoiceNumber} onChange={(e) => updateData("invoiceNumber", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Invoice Date</label>
          <input className="input" type="date" value={data.date} onChange={(e) => updateData("date", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Due Date</label>
          <input className="input" type="date" value={data.dueDate} onChange={(e) => updateData("dueDate", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Terms of Payment</label>
          <input className="input" type="text" value={data.paymentTerms} onChange={(e) => updateData("paymentTerms", e.target.value)} placeholder="e.g. 14 days net" />
        </div>
        <div className="form-group">
          <label className="label">Customer Number</label>
          <input className="input" type="text" value={data.customerNumber} onChange={(e) => updateData("customerNumber", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Buyer Reference</label>
          <input className="input" type="text" value={data.buyerReference} onChange={(e) => updateData("buyerReference", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="label">Payment Reference No.</label>
          <input className="input" type="text" value={data.paymentReference} onChange={(e) => updateData("paymentReference", e.target.value)} />
        </div>
      </div>

      <div className="grid-2 mt-4">
        <div>
          <h3 className="font-bold mb-4">Sender Info</h3>
          <div className="form-group">
            <label className="label" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Company Logo</label>
            <input className="input" type="file" accept="image/*" onChange={handleLogoUpload} style={{ padding: '0.5rem', fontSize: '0.875rem' }} />
          </div>
          <div className="form-group">
            <input className="input" placeholder="Company Name" value={data.sender.name} onChange={(e) => updateNested("sender", "name", e.target.value)} />
          </div>
          <div className="form-group">
            <textarea className="input" placeholder="Address" rows="3" value={data.sender.address} onChange={(e) => updateNested("sender", "address", e.target.value)} />
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Recipient Info</h3>
          <div className="form-group">
            <input className="input" placeholder="Client Name" value={data.recipient.name} onChange={(e) => updateNested("recipient", "name", e.target.value)} />
          </div>
          <div className="form-group">
            <textarea className="input" placeholder="Client Address" rows="3" value={data.recipient.address} onChange={(e) => updateNested("recipient", "address", e.target.value)} />
          </div>
        </div>
      </div>

      <h3 className="font-bold mt-4 mb-4">Bank Transfer Details</h3>
      <div className="grid-2">
        <div className="form-group">
          <label className="label">Bank Name</label>
          <input className="input" type="text" value={data.bankDetails.bankName} onChange={(e) => updateNested("bankDetails", "bankName", e.target.value)} placeholder="e.g. Danske Bank" />
        </div>
        <div className="form-group">
          <label className="label">BIC (SWIFT)</label>
          <input className="input" type="text" value={data.bankDetails.bic} onChange={(e) => updateNested("bankDetails", "bic", e.target.value)} placeholder="e.g. DABAFIHH" />
        </div>
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label className="label">IBAN</label>
          <input className="input" type="text" value={data.bankDetails.iban} onChange={(e) => updateNested("bankDetails", "iban", e.target.value)} placeholder="e.g. FI33 8000 1601 0166 95" />
        </div>
      </div>

      <h3 className="font-bold mt-4 mb-4">Line Items</h3>
      {data.items.map((item, index) => (
        <div key={item.id} className="invoice-item-row mb-6 pb-6 border-bottom-mobile">
          <div className="flex-grow-2">
            <label className="label mobile-only">Description</label>
            <input 
              className="input" 
              placeholder="Item Description" 
              value={item.description} 
              onChange={(e) => updateItem(item.id, "description", e.target.value)} 
            />
          </div>
          <div className="flex-1">
            <label className="label mobile-only">Qty</label>
            <input 
              className="input" 
              type="number" 
              placeholder="Qty" 
              value={item.quantity} 
              onChange={(e) => updateItem(item.id, "quantity", e.target.value)} 
            />
          </div>
          <div className="flex-1">
            <label className="label mobile-only">Price</label>
            <input 
              className="input" 
              type="number" 
              placeholder="Price" 
              value={item.price} 
              onChange={(e) => updateItem(item.id, "price", e.target.value)} 
            />
          </div>
          <button className="btn btn-danger remove-btn" onClick={() => removeItem(item.id)}>
             <span className="desktop-only">×</span>
             <span className="mobile-only">Remove Item</span>
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
        .flex-1 { flex: 1; }
        .mobile-only { display: none; }
        
        @media (max-width: 768px) {
          .invoice-item-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          .mobile-only { display: block; }
          .desktop-only { display: none; }
          .border-bottom-mobile {
            border-bottom: 1px solid var(--border-color);
          }
          .remove-btn {
            background-color: #fee2e2;
            color: var(--danger-color);
            margin-top: 0.5rem;
            padding: 0.75rem;
          }
        }
      `}</style>
      <button className="btn btn-primary" onClick={addItem}>+ Add Item</button>

      <div className="grid-2 mt-4">
        <div className="form-group">
          <label className="label">Tax Rate (%) - {countryData[data.country]?.taxName || "Tax"}</label>
          <input className="input" type="number" value={data.taxRate} onChange={(e) => updateData("taxRate", e.target.value)} />
        </div>
      </div>

      <div className="form-group mt-4">
        <label className="label">Notes</label>
        <textarea className="input" rows="3" value={data.notes} onChange={(e) => updateData("notes", e.target.value)}></textarea>
      </div>
    </div>
  );
}
