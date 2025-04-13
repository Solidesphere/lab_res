import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req, { params }) {
  const { identifiant } = params;

  // Only allow .pdf files
  if (!identifiant.endsWith(".pdf")) {
    return NextResponse.json(
      { error: "Only PDF files are allowed." },
      { status: 400 }
    );
  }

  const filePath = path.resolve("./res_doc", identifiant);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",

      "Content-Disposition": "inline",
    },
  });
}
