const ContainerWrapper = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`${className} w-[90vw] lg:w-[80vw] mx-auto relative`}>
        {children}
      </div>
    );
  };
  export default ContainerWrapper;