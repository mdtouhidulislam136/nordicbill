"use client";

import { useState } from "react";
import InvoiceForm from "../../components/InvoiceForm";
import InvoicePreview from "../../components/InvoicePreview";

export default function CreateInvoicePage() {
  const [activeTab, setActiveTab] = useState("form"); // 'form' | 'preview'
  const [invoiceData, setInvoiceData] = useState({
    country: "US",
    currency: "$",
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentTerms: "14 days net",
    customerNumber: "",
    buyerReference: "",
    paymentReference: "",
    logoUrl: "",
    sender: { name: "", address: "", email: "" },
    recipient: { name: "", address: "", email: "" },
    bankDetails: { iban: "", bic: "", bankName: "" },
    items: [{ id: 1, description: "", quantity: 1, price: 0 }],
    taxRate: 0,
    notes: "",
  });

  const safeNum = (val) => Number(val) || 0;
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + safeNum(item.quantity) * safeNum(item.price),
    0
  );
  const taxAmount = subtotal * (safeNum(invoiceData.taxRate) / 100);
  const total = subtotal + taxAmount;
  const formattedTotal = `${invoiceData.currency}${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleShare = (method) => {
    const text = `Hi, here is Invoice ${invoiceData.invoiceNumber} for ${formattedTotal}. You can find the PDF attached.`;
    const subject = `Invoice ${invoiceData.invoiceNumber} from NordicBill`;
    
    if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (method === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
  };

  return (
    <div className="app-container">
      {/* Top header */}
      <header className="create-header no-print">
        <div className="create-header-inner">
          <a href="/" className="back-link" aria-label="Back to home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </a>
          <h1 className="title" style={{ marginBottom: 0 }}>Create Invoice</h1>
          
          <div className="desktop-actions no-print">
            <div className="flex-col items-end" style={{ gap: '0.25rem' }}>
              <div className="flex gap-2">
                <button className="btn btn-secondary" onClick={() => handleShare('whatsapp')} title="Share details via WhatsApp">WhatsApp</button>
                <button className="btn btn-secondary" onClick={() => handleShare('email')} title="Share details via Email">Email</button>
                <button className="btn btn-primary" onClick={() => window.print()}>
                  ⬇ Download PDF
                </button>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Download PDF first, then share details</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile tab switcher */}
      <div className="mobile-tabs no-print" role="tablist" aria-label="Invoice sections">
        <button
          className={`mobile-tab${activeTab === 'form' ? ' active' : ''}`}
          role="tab"
          aria-selected={activeTab === 'form'}
          aria-controls="panel-form"
          onClick={() => setActiveTab('form')}
        >
          ✏️ Edit Details
        </button>
        <button
          className={`mobile-tab${activeTab === 'preview' ? ' active' : ''}`}
          role="tab"
          aria-selected={activeTab === 'preview'}
          aria-controls="panel-preview"
          onClick={() => setActiveTab('preview')}
        >
          👁 Preview
        </button>
      </div>

      {/* Main layout */}
      <main className="main-layout create-main">
        {/* Form panel */}
        <div
          id="panel-form"
          role="tabpanel"
          className={`card tab-panel${activeTab === 'form' ? ' active' : ''}`}
        >
          <InvoiceForm data={invoiceData} setData={setInvoiceData} />
        </div>

        {/* Preview panel */}
        <div
          id="panel-preview"
          role="tabpanel"
          className={`preview-section${activeTab === 'preview' ? ' active' : ''}`}
        >
          <div className="flex justify-between items-center mb-4 no-print desktop-preview-header">
            <h2 className="subtitle" style={{ marginBottom: 0 }}>Live Preview</h2>
          </div>
          <InvoicePreview data={invoiceData} />
        </div>
      </main>

      {/* Sticky mobile bottom bar */}
      <div className="mobile-pdf-bar no-print">
        <div className="mobile-pdf-bar-left">
          <span className="pdf-amount">Total: <strong>{formattedTotal}</strong></span>
          <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>Download PDF then share</div>
        </div>
        <div className="mobile-pdf-actions">
          <button className="btn btn-secondary" onClick={() => handleShare('whatsapp')} title="Share via WhatsApp">
            WA
          </button>
          <button className="btn btn-secondary" onClick={() => handleShare('email')} title="Share via Email">
            @
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            ⬇ PDF
          </button>
        </div>
      </div>
    </div>
  );
}
