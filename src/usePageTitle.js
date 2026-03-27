import { useEffect } from 'react';

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | Digital Twin Technologies`;
    return () => {
      document.title = 'Digital Twin Technologies';
    };
  }, [title]);
}

export default usePageTitle;
