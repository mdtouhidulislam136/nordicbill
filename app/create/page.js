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
          {/* Desktop PDF button */}
          <button className="btn btn-primary desktop-pdf-btn" onClick={() => window.print()} aria-label="Download or print invoice as PDF">
            ⬇ Download PDF
          </button>
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
      <div className="mobile-pdf-bar no-print" aria-label="Invoice total and download">
        <span className="pdf-amount">Total: <strong>{formattedTotal}</strong></span>
        <button className="btn btn-primary" onClick={() => window.print()} aria-label="Download or print invoice as PDF">
          ⬇ Download PDF
        </button>
      </div>

      <style jsx>{`
        .create-header {
          padding: 1.5rem 2rem 0;
        }
        .create-header-inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .create-header-inner .title {
          flex: 1;
        }
        .desktop-pdf-btn {
          flex-shrink: 0;
        }
        .create-main {
          padding: 0 2rem 2rem;
        }
        .desktop-preview-header { display: flex; }

        @media (max-width: 1024px) {
          .create-header { padding: 1rem 1rem 0; }
          .create-main { padding: 0 1rem 1rem; }
          .desktop-pdf-btn { display: none; }
        }
        @media (max-width: 480px) {
          .create-header { padding: 0.75rem 0.75rem 0; }
          .create-main { padding: 0 0.75rem 0.75rem; }
        }
      `}</style>
    </div>
  );
}
