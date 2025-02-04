const PageTitle = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  return (
    <h2
      className={`${className} text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400`}
    >
      {title}
      <hr className="border-b-2 min-w-36 mt-2" />
    </h2>
  );
};

export default PageTitle;
