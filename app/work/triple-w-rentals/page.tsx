import type { Metadata } from "next";
import CaseStudyContent from "./CaseStudyContent";

export const metadata: Metadata = {
  title: "Triple W Rentals, 46x return on ad spend | Client Growth",
  description:
    "How I took Triple W Rentals from $900 in ad spend to $41,085 in 30 days. A 46x return, at around $33 per qualified call.",
};

export default function TripleWCaseStudy() {
  return <CaseStudyContent />;
}
