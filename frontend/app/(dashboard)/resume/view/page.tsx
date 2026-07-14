"use client";

import { useEffect, useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import { api } from "@/services/api";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
export default function ResumeViewerPage() {

  const [file, setFile] = useState<string>();

  const [pages, setPages] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadResume();

  }, []);

  async function loadResume() {

    try {

      const response = await api.get(

        "/resume/view",

        {

          responseType: "blob",

        }

      );

      const url = URL.createObjectURL(response.data);

      setFile(url);

    } catch (error) {

      console.error(error);

      alert("Failed to load resume.");

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return <div>Loading Resume...</div>;

  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">

        Resume Viewer

      </h1>

      <div className="rounded-xl border p-6 overflow-x-auto bg-zinc-100">

        <Document

          file={file}

          onLoadSuccess={({ numPages }) =>

            setPages(numPages)

          }

        >

          {

            Array.from(

              new Array(pages),

              (_, index) => (

                <Page
                  key={index}
                  pageNumber={index + 1}
                  scale={1.5}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />

              )

            )

          }

        </Document>

      </div>

    </div>

  );

}