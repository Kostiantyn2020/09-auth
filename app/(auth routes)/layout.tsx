import css from "./LayoutRegister.module.css";

type Props = {
  readonly children: React.ReactNode;
};

function LayoutRegister({ children }: Props) {
  return (
    <section className={css.container}>
      <div className={css.registerWrapper}>{children}</div>
    </section>
  );
}

export default LayoutRegister;
