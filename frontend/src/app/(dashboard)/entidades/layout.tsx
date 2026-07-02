import { ReactNode } from "react";

type EntidadesLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function EntidadesLayout({
  children,
  modal,
}: EntidadesLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
