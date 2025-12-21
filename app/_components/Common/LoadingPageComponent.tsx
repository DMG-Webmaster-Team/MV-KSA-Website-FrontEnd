export default function Loading({ white }: any) {
  return (
    <div className={`${white ? "" : " bg-primary-100"}`}>
      <div className="max-w-[1512px] lg:px-10 px-5 mx-auto">
        <div
          className={`${
            white ? "loading-shimmer-white" : "loading-shimmer"
          } w-full !h-[766px]`}
        ></div>
        <div className="max-w-[1512px] mx-auto md:px-12 px-4 py-7">
          <div
            className={`w-full !h-[80px] ${
              white ? "loading-shimmer-white" : "loading-shimmer"
            }`}
          ></div>
        </div>
        <div className="max-w-[1000px] mx-auto md:px-12 px-5 lg:py-16 py-8">
          <div
            className={`w-full !h-[200px] ${
              white ? "loading-shimmer-white" : "loading-shimmer"
            }`}
          ></div>
        </div>
        <div className="relative md:h-fit h-[895px] py-20 md:px-10 px-5 mx-auto">
          <div
            className={`${
              white ? "loading-shimmer-white" : "loading-shimmer"
            } w-full h-full absolute inset-0`}
          ></div>
          <div className="max-w-[708px] mx-auto bg-white p-4 lg:p-10 relative z-10">
            <div
              className={`${
                white ? "loading-shimmer-white" : "loading-shimmer"
              } w-full h-[400px]`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
