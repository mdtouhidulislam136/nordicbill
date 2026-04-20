"use client";

import { useState } from "react";
import InvoiceForm from "../../components/InvoiceForm";
import InvoicePreview from "../../components/InvoicePreview";

export default function CreateInvoicePage() {
  const [invoiceData, setInvoiceData] = useState({
    country: "US", // Default country
    currency: "$",
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentTerms: "14 days net",
    customerNumber: "",
    buyerReference: "",
    paymentReference: "",
    logoUrl: "",
    sender: {
      name: "",
      address: "",
      email: "",
    },
    recipient: {
      name: "",
      address: "",
      email: "",
    },
    bankDetails: {
      iban: "",
      bic: "",
      bankName: "",
    },
    items: [
      { id: 1, description: "", quantity: 1, price: 0 }
    ],
    taxRate: 0,
    notes: "",
  });

  return (
    <div className="app-container">
      <header className="mb-4 no-print" style={{ paddingTop: '2rem' }}>
        <a href="/" className="back-link">&larr; Back to Home</a>
        <h1 className="title mt-4">Create Invoice</h1>
      </header>
      <main className="main-layout">
        <div className="card">
          <InvoiceForm data={invoiceData} setData={setInvoiceData} />
        </div>
        <div className="preview-section">
          <div className="flex justify-between items-center mb-4 no-print">
            <h2 className="subtitle" style={{ marginBottom: 0 }}>Live Preview</h2>
            <button className="btn btn-primary" onClick={() => window.print()}>
              Download / Print PDF
            </button>
          </div>
          <InvoicePreview data={invoiceData} />
        </div>
      </main>
    </div>
  );
}
