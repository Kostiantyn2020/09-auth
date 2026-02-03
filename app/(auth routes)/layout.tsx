"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./LayoutRegister.module.css";

type Props = {
  readonly children: React.ReactNode;
};

function LayoutRegister({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <section className={css.container}>
      <div className={css.registerWrapper}>{children}</div>
    </section>
  );
}

export default LayoutRegister;
