import React from "react";
import Navbar from "../components/navbar";

export default function RootLayout({ children }) {
  return (
<>
        <Navbar />
        <main>{children}</main>
        </>
  )
}
