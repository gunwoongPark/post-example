import { RefObject, useEffect } from "react";

type IntersectionObserverParamsType = {
  callback: (entries: IntersectionObserverEntry[]) => void;
  ref: RefObject<HTMLDivElement>;
};

const useIntersectionObserver = ({
  callback,
  ref,
}: IntersectionObserverParamsType) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1 });

    if (!!ref.current) {
      observer.observe(ref.current);
    }

    return () => observer && observer.disconnect();
  }, [callback, ref]);
};

export default useIntersectionObserver;
