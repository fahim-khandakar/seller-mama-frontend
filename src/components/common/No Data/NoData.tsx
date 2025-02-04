"use client";

import Image from "next/image";
import noDataFound from "../../../assets/image_processing20210917-4617-1u39vt2.gif";

const NoData = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Image
        className="w-full h-full object-contain"
        src={noDataFound}
        alt="No Data Found"
        width={500} // Adjust width accordingly
        height={500} // Adjust height accordingly
        priority // Ensures faster loading
      />
    </div>
  );
};

export default NoData;
