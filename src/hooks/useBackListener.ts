import { useEffect, useState } from "react";

const useBackListener = (useCallBack = true, callback) => {
  const [isBack, setIsBack] = useState(false);

  const handleEvent = (e) => {
    setIsBack(true);
    if (document.querySelector(".modal-backdrop")?.classList.contains("show")) {
      e.stopPropagation();
      e.preventDefault();
      document.querySelector(".modal-backdrop")?.remove();
      history.pushState(null, document.title, location.href);
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handleEvent);
    return () => window.removeEventListener("popstate", handleEvent);
  }, [useCallBack]);

  return isBack;
};

export default useBackListener;
