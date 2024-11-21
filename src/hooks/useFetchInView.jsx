import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useFetchInView = (handleFunction = () => {}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleFunction();
    }
  }, [inView, handleFunction]);

  return { ref };
};

export default useFetchInView;
