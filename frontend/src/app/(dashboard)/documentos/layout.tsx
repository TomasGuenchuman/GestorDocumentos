import { ReactNode } from "react";

type DocumentosLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function DocumentosLayout({
  children,
  modal,
}: DocumentosLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
