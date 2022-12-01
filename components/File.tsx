import React from "react";

const File = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="file">{children}</div>
    </>
  );
};

export default React.memo(File);
