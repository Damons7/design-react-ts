import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes, renderRouter } from './router/router'
import Header from '@/layout/header/header';
import Main from '@/layout/main/main';
import './App.less';

import { useTranslation } from "react-i18next";


function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="user">
      {/* 懒加载 */}
      {/* <Suspense fallback={<div>loading</div>}> */}
        <Router >
          <Header></Header>

          { t('common:name')}
          <Main>
            {renderRouter(AppRoutes)}
          </Main>
        </Router>
      {/* </Suspense> */}

    </div>
  );
}

export default App;
